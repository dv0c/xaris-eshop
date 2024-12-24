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

    return <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
        
    </div>
}

export default page