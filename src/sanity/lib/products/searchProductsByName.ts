import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const searchProductsByName = async (query: string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product" 
            && name match $query
        ] | order(name asc)
        `)

        try {
            const products = await sanityFetch({
                query: PRODUCT_SEARCH_QUERY,
                params: {
                    query: `${query}*` as any,
                }
            })

            return products.data || []
        } catch (error) {
            console.error("Error fetching products by name: ", error)
            return []
        }
}