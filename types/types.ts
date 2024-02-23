import { ChainName } from "@/enums/Chain";

export type ChainInfo = {
    name: ChainName;
    displayName: string;
    logo: string;
    bech32Prefix: string;
}

export type BaseCoin = {
    name: string,
    denom: string,
    image: string,
    tokenImage: string,
    decimal: number,
    ausdDecimal: number
}

export type WalletInfo = {
    name: string;
    prettyName: string;
    logo: string;
}

export type ChainAsset = {
    name: string;
    shortName: string;
    denom: string;
    decimal: number;
    ausdDecimal: number;
    imageURL: string;
    priceId: string;
    priceServiceUrl: string;
    oracleContractAddress: string;
}

interface InitialBalance {
    address: string;
    amount: number | string;
}

export interface GenerateTokenModel {
    tokenName: string,
    symbol: string,
    decimal: number | string,
    initialBalances: InitialBalance[],
    minterAddress: string,
    tokenCap: number | string,
    adminFee: {
        status: boolean,
        value?: number | string
    },
    tokenBurn: {
        status: boolean,
        value?: number | string
    },
    holders: {
        status: boolean,
        value?: number | string
    },
    project: string,
    description: string,
    logoUrl: string
}

export interface InstantiateMsg {
    name: string;
    symbol: string;
    decimals: number | string;
    initial_balances: InitialBalance[];
    mint?: MinterResponse;
    marketing?: MarketingInfo;
    transfer_percentages: TransferPercentages;
}

export interface MarketingInfo {
    project?: string;
    description?: string;
    marketing?: string;
    logo?: InstantiateLogo;

}

export interface InstantiateLogo {
    url?: string
}

export interface TransferPercentages {
    liquidity_pool: number | string;
    holder: number | string;
    burn: number | string;
}

export interface MinterResponse {
    minter: string;
    cap?: number| string;
}

export interface GeneratedTokenInfo {
    admin_fee: number;
    collectionId: string;
    collectionName: string;
    contract_address: string;
    created: string;
    decimals: number;
    description: string;
    distribution_to_holders: number;
    id: string;
    logo: string;
    logo_url: string;
    max_suply: number;
    mint_address: string;
    name: string;
    project_name: string;
    symbol: string;
    token_burn: number;
    total_suply: number;
    updated: string;
    wallet_address: string;
}
