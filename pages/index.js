import Image from "next/image"
import { Inter } from "next/font/google"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subGraphQueries"
import { useQuery } from "@apollo/client"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    //
    const chainIdString = chainId ? parseInt(chainId).toString() : "31337"
    //
    const marketplaceAddress = networkMapping[chainIdString].NFTMarketplace[0]
    //
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    let counter = 0

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            {" "}
            <div className="container mx-auto">
                <h1 className="py-4 px-3 font-bold text-2xl">
                    Recently Listed
                </h1>
                <div className="flex flex-wrap">
                    {isWeb3Enabled && chainId ? (
                        loading || !listedNfts ? (
                            <div>Loading...</div>
                        ) : (
                            listedNfts.activeItems.map((nft) => {
                                console.log(nft)
                                const { price, nftAddress, tokenId, seller } =
                                    nft
                                return marketplaceAddress ? (
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={parseInt(tokenId)}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}-${tokenId}-${counter++}`}
                                    />
                                ) : (
                                    <div>
                                        Network error, please switch to a
                                        supported network.{" "}
                                    </div>
                                )
                            })
                        )
                    ) : (
                        <div>Web3 currently Not Enabled</div>
                    )}
                </div>
            </div>
        </main>
    )
}
