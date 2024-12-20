import { imageUrl } from '@/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react'

interface pageProps {
    params: Promise<{
        slug: string
    }>
}

const page: FC<pageProps> = async ({ params }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug)

    if (!product) {
        return notFound()
    }

    const isOutOfStock = product.stock != null && product.stock <= 0

    return <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-50' : ''}`}>
                {product.image && (
                    <Image
                        src={imageUrl(product.image).url()}
                        alt={product.name ?? "Product Image"}
                        fill
                        className='object-container transition-transform duration-300 hover:scale-105'
                    />
                )}


            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
                    <div className='text-xl font-semibold mb-4'>
                        ${product.price?.toFixed(2)}
                    </div>
                    <div className='prose max-w-none mb-6'>
                        {Array.isArray(product.description) && (
                            <PortableText value={product.description} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default page