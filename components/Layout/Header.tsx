'use client';

import React from 'react'
import { ExitIcon, Logo } from '../icons';
import Text from '@/components/Text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletButton from '../WalletButton';
import useChainAdapter from '@/hooks/useChainAdapter';
import { ChainName } from '@/enums/Chain';
import { WalletType } from '@/enums/WalletType';
import GradientButton from '../Buttons/GradientButton';
import OutlinedButton from '../Buttons/OutlinedButton';

const Header = () => {
    const {
        selectedChainName,
        isWalletConnected,
        baseCoin,
        walletInfo,
        address,
        username,
        selectedWallet,
        disconnect,
        disconnectMetamask,
        disconnectXion,
    } = useChainAdapter();

    const pathname = usePathname();

    const disconnectWallet = () => {
        if (selectedChainName === ChainName.XION) {
            disconnectXion();
        } else if (walletInfo?.name === WalletType.METAMASK) {
            disconnectMetamask();
        } else {
            disconnect();
        }
        localStorage.removeItem("selectedWallet");
        localStorage.removeItem("profile-detail");
    };

    return (
        <>
            <div className="bg-celticBlue/10 h-[700px] w-full md:w-[700px] absolute -bottom-60 -translate-x-1/3 left-0 rounded-full blur-md -z-10 px-3" />
            <header className="md:mb-[88px] pt-8 w-full flex justify-between items-center">
                <Link href={"/"} className="flex items-center gap-2 mr-2">
                    <Logo className="w-6 md:w-14 h-6 md:h-14 hover:animate-bounce" />
                    <Text size="2xl">Token Factory</Text>
                </Link>
                {pathname !== "/" &&
                    (isWalletConnected ?
                        (<>
                            {!pathname.includes('created-tokens') &&
                                <Link href={'/created-tokens/list'} className='ml-auto z-[20]'>
                                    <OutlinedButton
                                        disabledText={"Enter the INJ amount. 999 INJ is the upper limit for now."}
                                        className="min-w-[240px] h-11"
                                    >
                                        <Text size='lg'>Created Tokens</Text>
                                    </OutlinedButton>
                                </Link>}
                            <button
                                className="flex ml-12 gap-2 items-center hover:blur-[1px] transition-all duration-300"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center ml-auto">
                                        <img
                                            alt={walletInfo?.name}
                                            className="w-4 h-4 object-contain rounded"
                                            src={walletInfo?.logo as string}
                                        />
                                        <Text
                                            size="lg"
                                            weight="font-regular"
                                            className="truncate ml-2"
                                        >
                                            {username}
                                        </Text>
                                    </div>
                                    <Text size="sm">
                                        {address?.slice(0, 6)}...{address?.slice(-6)}
                                    </Text>
                                    <div></div>
                                </div>
                                <button
                                    className="w-12 h-12 flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        disconnectWallet();
                                    }}
                                >
                                    <ExitIcon className="text-white" />
                                </button>
                            </button>
                        </>)
                        :
                        (<WalletButton />))
                }
            </header>
        </>
    )
}

export default Header; 