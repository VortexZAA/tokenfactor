import { ChainName } from "@/enums/Chain";
import { ChainAsset } from "@/types/types";

const injAsset: ChainAsset = {
    name: "Injective",
    shortName: "INJ",
    denom: "inj",
    decimal: 18,
    ausdDecimal: 18,
    imageURL: "/images/token-images/inj.svg",
    priceId: "2d9315a88f3019f8efa88dfe9c0f0843712da0bac814461e27733f6b83eb51b3",
    priceServiceUrl: "https://hermes-beta.pyth.network/",
    oracleContractAddress: process.env.NEXT_PUBLIC_INJECTIVE_ORACLE_CONTRACT_ADDRESS_V2 as string
}

const seiAsset: ChainAsset = {
    name: "SEI",
    shortName: "SEI",
    denom: "usei",
    decimal: 6,
    ausdDecimal: 6,
    imageURL: "/images/token-images/sei.png",
    priceId: "53614f1cb0c031d4af66c04cb9c756234adad0e1cee85303795091499a4084eb",
    priceServiceUrl: "https://hermes.pyth.network/",
    oracleContractAddress: process.env.NEXT_PUBLIC_ORACLE_CONTRACT_ADDRESS as string
}

const archAsset: ChainAsset = {
    name: "Archway",
    shortName: "ARCH",
    denom: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
    decimal: 6,
    ausdDecimal: 6,
    imageURL: "/images/token-images/archway-coin.png",
    priceId: "b00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
    priceServiceUrl: "https://hermes.pyth.network/",
    oracleContractAddress: ''
}

const neutronAsset: ChainAsset = {
    name: "Neutron",
    shortName: "NTRN",
    denom: "untrn",
    decimal: 6,
    ausdDecimal: 6,
    imageURL: "/images/token-images/neutron.svg",
    priceId: "8112fed370f3d9751e513f7696472eab61b7f4e2487fd9f46c93de00a338631c",
    priceServiceUrl: "https://hermes-beta.pyth.network/",
    oracleContractAddress: ''
}

const xionAsset: ChainAsset = {
    name: "Xion",
    shortName: "XION",
    denom: "uxion",
    decimal: 6,
    ausdDecimal: 6,
    imageURL: "/images/token-images/xion.png",
    priceId: "",
    priceServiceUrl: "",
    oracleContractAddress: ''
}

export const ChainAssets: ChainAsset[] = [
    injAsset,
    seiAsset
]

export const DefaultAssetByChainName: Record<ChainName, ChainAsset> = {
    [ChainName.SEI]: seiAsset,
    [ChainName.INJECTIVE]: injAsset,
    [ChainName.ARCHWAY]: archAsset,
    [ChainName.NEUTRON]: neutronAsset,
    [ChainName.XION]: xionAsset
}

export const assetByDenom: Record<string, ChainAsset | undefined> = Object
    .values(DefaultAssetByChainName)
    .reduce<Record<string, ChainAsset | undefined>>((acc, asset) => {
        acc[asset.denom] = asset;
        return acc;
    }, {})