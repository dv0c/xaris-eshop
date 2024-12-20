import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
        *[
            _type == "product" && slug.current == $slug
        ] | order(name asc) [0]
        `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });

    return products.data || null;
  } catch (error) {
    console.error("error fetching product by ID:", error);
    return null;
  }
};
