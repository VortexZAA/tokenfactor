import { ChainName } from "@/enums/Chain";
import { WalletType } from "@/enums/WalletType";
import { ChainInfo } from "@/types/types";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { isEmpty, isNil } from "lodash";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAbstraxionAccount } from "@/hooks/xion";
import { ChainInfoByName } from "@/constants/chainConstants";
import { Abstraxion } from "@/components/xion/Abstraxion";
import { usePathname } from "next/navigation";

export type AppContextState = {
    selectedChainName?: ChainName;
    selectedWallet?: WalletType;
    userAddress?: string;
    isConnecting: boolean;
    chainInfo: ChainInfo;
    selectChainName: (chainName?: ChainName) => void;
    selectWallet: (wallet?: WalletType) => void;
    disconnectMetamask: () => void;
    disconnectXion: () => void;
    selectXionChain: () => void;
    openXionChainModal: () => void;
}

const AppContext = createContext<AppContextState>({
    selectedChainName: ChainName.INJECTIVE,
    isConnecting: false,
    chainInfo: ChainInfoByName[ChainName.INJECTIVE],
    selectChainName: () => { },
    selectWallet: () => { },
    disconnectMetamask: () => { },
    disconnectXion: () => { },
    selectXionChain: () => { },
    openXionChainModal: () => { }
});

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const pathname = usePathname();

    const [abstraxionOpen, setAbstraxionOpen] = useState(false);

    const [selectedChainName, setSelectedChainName] = useState<ChainName>();

    const [selectedWallet, setSelectedWallet] = useState<WalletType>();

    const [userAddress, setUserAddress] = useState<string>();

    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    const { data: abstraxionData } = useAbstraxionAccount();

    const chainInfo = useMemo(() => ChainInfoByName[selectedChainName ?? ChainName.INJECTIVE], [selectedChainName])

    const getMetamaskAccount = useCallback(async () => {
        try {
            setIsConnecting(true);
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const ethAddress = accounts[0];
            setUserAddress(getInjectiveAddress(ethAddress));
            setIsConnecting(false);
        }
        catch (err) {
            setUserAddress(undefined);
            setIsConnecting(false);
        }
    }, [])

    const selectChainName = useCallback((chainName?: ChainName) => {
        setSelectedChainName(chainName);
        localStorage.setItem("savedChainName", chainName || '');
    }, [])

    const selectWallet = useCallback(async (wallet?: WalletType) => {
        setSelectedWallet(wallet);
        localStorage.setItem('selectedWallet', wallet || '');

        if (wallet === WalletType.METAMASK) {
            getMetamaskAccount();
        }
    }, [getMetamaskAccount])

    const disconnectMetamask = useCallback(() => {
        setUserAddress(undefined);
        setSelectedWallet(undefined);
        localStorage.removeItem('selectedWallet');
    }, [])

    const disconnectXion = useCallback(() => {
        setUserAddress(undefined);
        setSelectedWallet(undefined);
        setSelectedChainName(undefined);
        setAbstraxionOpen(false);
        localStorage.removeItem('selectedWallet');
        localStorage.removeItem('savedChainName');
    }, [])


    const openXionChainModal = useCallback(() => {
        setAbstraxionOpen(true);
    }, [])

    const selectXionChain = useCallback(() => {
        setAbstraxionOpen(false);
        setSelectedChainName(ChainName.XION);
        localStorage.setItem("savedChainName", ChainName.XION);
    }, [])

    const value = useMemo<AppContextState>(() => ({
        selectedChainName,
        selectedWallet,
        userAddress,
        isConnecting,
        chainInfo,
        selectChainName,
        selectWallet,
        disconnectMetamask,
        disconnectXion,
        selectXionChain,
        openXionChainModal
    }), [
        selectedChainName,
        selectedWallet,
        userAddress,
        isConnecting,
        chainInfo,
        selectChainName,
        selectWallet,
        disconnectMetamask,
        disconnectXion,
        selectXionChain,
        openXionChainModal
    ])

    useEffect(() => {
        const savedChainName = localStorage.getItem("savedChainName");
        if (!isNil(savedChainName) && !isEmpty(savedChainName)) {
            setSelectedChainName(savedChainName as ChainName);

            if (savedChainName === ChainName.XION) {
                setAbstraxionOpen(true);
            }
        }
    }, [])

    useEffect(() => {
        const savedWallet = localStorage.getItem('selectedWallet');
        if (!isNil(savedWallet) && !isEmpty(savedWallet)) {
            setSelectedWallet(savedWallet as WalletType);

            if (savedWallet === WalletType.METAMASK) {
                getMetamaskAccount();
            }
        }
    }, [getMetamaskAccount]);

    useEffect(() => {
        if (selectedChainName === ChainName.XION && !isNil(abstraxionData)) {
            setUserAddress(abstraxionData.bech32Address);
        }
    }, [selectedChainName, abstraxionData])

    return (
        <AppContext.Provider value={value}>
            {children}

            {pathname != "/" &&
                <Abstraxion
                    isOpen={abstraxionOpen}
                    onClose={() => setAbstraxionOpen(false)}
                />
            }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;