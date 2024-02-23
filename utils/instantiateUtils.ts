import { GenerateTokenModel, InstantiateMsg } from "@/types/types";

export const convertToInstantiateMsg = (
  generateToken: GenerateTokenModel
): InstantiateMsg => {
  return {
    name: generateToken.tokenName,
    symbol: generateToken.symbol,
    decimals: generateToken.decimal,
    initial_balances: generateToken.initialBalances.map((balance) => {
      return {
        address: balance.address,
        amount: (
          Number(balance.amount) *
          10 ** Number(generateToken.decimal)
        ).toLocaleString("fullwide", { useGrouping: false }),
      };
    }),
    mint: {
      minter: generateToken.minterAddress,
      cap:
        generateToken.tokenCap === 0
          ? undefined
          : (Number(generateToken.tokenCap) * 10 ** Number(generateToken.decimal)).toLocaleString("fullwide", { useGrouping: false }) ,
    },
    marketing: {
      project: generateToken.project,
      description: generateToken.description,
      logo: {
        url: generateToken.logoUrl,
      },
    },
    transfer_percentages: {
      liquidity_pool: (
        (Number(generateToken.adminFee.value) > 0
          ? generateToken.adminFee.value
          : 0.001) ?? 0.001
      ).toString(),
      holder: (
        (Number(generateToken.holders.value) > 0
          ? generateToken.holders.value
          : 0.001) ?? 0.001
      ).toString(),
      burn: (
        (Number(generateToken.tokenBurn.value) > 0
          ? generateToken.tokenBurn.value
          : 0.001) ?? 0.001
      ).toString(),
    },
  };
};
