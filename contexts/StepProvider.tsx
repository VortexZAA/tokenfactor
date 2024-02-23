"use client";

import { useAbstraxionAccount, useAbstraxionSigningClient } from "@/hooks/xion";
import { GenerateTokenModel } from "@/types/types";
import { convertToInstantiateMsg } from "@/utils/instantiateUtils";

import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNotification } from "./NotificationProvider";
import pb from "@/lib/pocketbase";

const codeId = Number(process.env.NEXT_PUBLIC_XION_INSTANTIATE_CODE_ID);

export enum StepTypes {
  "tokenDetail",
  "mintingDetails",
  "initialBalances",
  "tokenFunctions",
  "marketing",
  "preview",
  "tokenResponse",
}

const initialGenerateToken: GenerateTokenModel = {
  tokenName: "",
  symbol: "",
  decimal: 0,
  initialBalances: [{ address: "", amount: 0 }],
  minterAddress: "",
  tokenCap: 0,
  adminFee: {
    status: false,
    value: 0,
  },
  tokenBurn: {
    status: false,
    value: 0,
  },
  holders: {
    status: false,
    value: 0,
  },
  project: "",
  description: "",
  logoUrl: "",
};

type StepContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  processLoading: boolean;
  generateToken: GenerateTokenModel;
  setGenerateToken: Dispatch<GenerateTokenModel>;
  instantiateToken: () => Promise<void>;
};

const StepContext = createContext<StepContextValue>({
  activeStep: StepTypes.tokenDetail,
  setActiveStep: () => {},
  processLoading: false,
  generateToken: {} as GenerateTokenModel,
  setGenerateToken: () => {},
  instantiateToken: async () => {},
});

const StepProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const { data } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();
  const [activeStep, setActiveStep] = useState(StepTypes.tokenDetail);

  const [generateToken, setGenerateToken] =
    useState<GenerateTokenModel>(initialGenerateToken);

  const { addNotification, setProcessLoading, processLoading } =
    useNotification();

  async function saveDb(msg: any, contract: string) {
    try {

      const data = {
        name: msg.name,
        symbol: msg.symbol,
        decimals: Number(msg.decimals),
        contract_address: contract,
        wallet_address: msg?.initial_balances[0]?.address,
        total_suply: Number(msg?.initial_balances[0]?.amount),
        mint_address: msg.mint.minter,
        max_suply: Number(msg.mint.cap),
        admin_fee: Number(msg.transfer_percentages.liquidity_pool),
        distribution_to_holders: Number(msg.transfer_percentages.holder),
        token_burn: Number(msg.transfer_percentages.burn),
        project_name: msg.marketing.project,
        description: msg.marketing.description,
        logo_url: msg.marketing.logo.url,
      };
      const res = await pb.collection("token_create").create(data);
      console.log("res", res);
      //alert("Data saved successfully");
      return true;
    } catch (error) {
      console.log("error", error);
      alert("Error in saving data");
      return false;
    }
  }
  const instantiateToken = useCallback(async () => {
    if (!client || !data?.bech32Address) return;

    setProcessLoading(true);
    addNotification({
      status: "process",
    });

    let transactionHash;
    try {
      const msg = convertToInstantiateMsg(generateToken);
      console.log("msg", msg);
      console.log();
      
      const response = await client.instantiate(
        data.bech32Address,
        codeId,
        msg,
        msg.name,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "1200000",
        },
        {
          memo: `Instantiating Token ${msg.name}`,
          admin: data.bech32Address,
        }
      );

      transactionHash = response.transactionHash;
      addNotification({
        status: "success",
        directLink: transactionHash,
        message: `Token created successfully`,
      });

      setActiveStep((prev) => prev + 1);
      const contract = response.contractAddress;
      const res = await saveDb(msg, contract);
      router.push(`/generate-token?success=${response.contractAddress}`);
      setGenerateToken(initialGenerateToken);
    } catch (error: any) {
      addNotification({
        message: JSON.stringify(error.message),
        status: "error",
        directLink: transactionHash,
      });
    } finally {
      setProcessLoading(false);
    }
  }, [client, data, generateToken]);

  const value = useMemo<StepContextValue>(
    () => ({
      activeStep,
      setActiveStep,
      processLoading,
      generateToken,
      setGenerateToken,
      instantiateToken,
    }),
    [
      activeStep,
      setActiveStep,
      processLoading,
      generateToken,
      setGenerateToken,
      instantiateToken,
    ]
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStep = () => useContext(StepContext);

export default StepProvider;
