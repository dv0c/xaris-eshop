import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import { FC } from 'react'

interface pageProps {
    params: Promise<{
        slug: string
    }>
}

const page: FC<pageProps> = async ({ params }) => {
    const { slug } = await params;

    const products = await getProductsByCategory(slug)
    const categories = await getAllCategories()

    return <div>page</div>
}

export default page