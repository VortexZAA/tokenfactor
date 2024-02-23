"use client";

import React, { FC, PropsWithChildren } from "react";

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as ninjiWallets } from "@cosmos-kit/ninji";
import { wallets as ledgerWallets } from "@cosmos-kit/ledger";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { ChainName } from "@/enums/Chain";
import { GasPrice } from "@cosmjs/stargate";
import { XionProviders } from "./xionProviders";
import AppProvider from "./AppProvider";
import { NotificationProvider } from "./NotificationProvider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <XionProviders>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={[
          keplrWallets[0],
          leapWallets[0],
          ninjiWallets[0],
          cosmostationWallets[0],
          ledgerWallets[0],
        ]}
        signerOptions={{
          signingCosmwasm: (chain) => {
            switch (typeof chain === "string" ? chain : chain.chain_name) {
              case ChainName.INJECTIVE:
                return {
                  gasPrice: GasPrice.fromString("0.025inj"),
                };
              case ChainName.SEI:
                return {
                  gasPrice: GasPrice.fromString("0.025sei"),
                };
              case ChainName.ARCHWAY:
                return {
                  gasPrice: GasPrice.fromString("0.025uatom"),
                };
              case ChainName.NEUTRON:
                return {
                  gasPrice: GasPrice.fromString("0.025untrn"),
                };
              default:
                return {
                  gasPrice: GasPrice.fromString("0.025inj"),
                };
            }
          },
        }}
      >
        <AppProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AppProvider>
      </ChainProvider>
    </XionProviders>
  );
};

export default Providers;
