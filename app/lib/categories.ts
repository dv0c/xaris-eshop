const categories = async () => {
  try {
    const response = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/categories"
        : "https://xaris-eshop.vercel.app/api/categories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default categories;
