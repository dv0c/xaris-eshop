import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategoriesWithProducts = async () => {
  const CATEGORIES_WITH_PRODUCTS_QUERY = defineQuery(`
    *[_type == "category"] {
      ...,
      "products": *[
        _type == "product" && references(^._id)
      ] | order(name desc)
    }
  `);

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_WITH_PRODUCTS_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching categories with products: ", error);
    return [];
  }
};
