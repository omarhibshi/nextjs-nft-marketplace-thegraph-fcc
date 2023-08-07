import { useQuery, gql } from "@apollo/client"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(
            first: 5
            where: { buyer: "0x0000000000000000000000000000000000000000" }
        ) {
            id
            buyer
            seller
            nftAddress
        }
    }
`

export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)
    console.log(data)

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <div>hi</div>
        </main>
    )
}
