import { FC } from 'react'
import { Product } from '../../sanity.types'
import Link from 'next/link'
import Image from 'next/image'
import { imageUrl } from '@/lib/imageUrl'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

interface ProductThumbProps {
    product: Product
}

const ProductThumb: FC<ProductThumbProps> = ({ product }) => {
    const isOutOfStock = product.stock != null && product.stock <= 0
    return (
        <Link href={`/product/${product.slug?.current}`} >
            <Card className={`overflow-hidden group ${isOutOfStock ? 'opacity-50' : ""}`}>
                <CardContent className="p-0">
                    <div className="aspect-square relative">
                        {
                            product.image && (
                                <img
                                    src={imageUrl(product.image).url()}
                                    alt={product.name}
                                    className="w-full h-full object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                />

                            )}
                        {
                            isOutOfStock && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                    <span className='text-white font-bold text-lg'>Out of Stock </span>
                                </div>
                            )
                        }
                        {
                            !isOutOfStock && (
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Plus className="h-5 w-5" />
                                </Button>
                            )
                        }
                    </div>
                    <div className="p-3">
                        <div className="flex items-baseline gap-1 mb-1">
                            <div className="font-bold text-sm">{product.price}</div>
                            {/* <div className="text-xs text-muted-foreground line-through">
                            {product.price}
                            </div> */}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                            {product.name}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
        // <Link href={`/product/${product.slug?.current}`}
        //     className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? 'opacity-50' : ""}`}>

        //     <div className='relative aspect-square w-full h-full overflow-hidden'>
        //         {product.image && (
        //             <Image className='object-contain transition-transform duration-300 group-hover:scale-105'
        //                 src={imageUrl(product.image).url()}
        //                 alt={product.name || "Product image"}
        //                 fill
        //                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
        //         )}
        //         {
        //             isOutOfStock && (
        //                 <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        //                     <span className='text-white font-bold text-lg'>Out of Stock </span>
        //                 </div>
        //             )
        //         }
        //     </div>
        //     <div className='p-4'>
        //         <h2 className='text-lg font-semibold text-gray-800 truncate'>
        //             {product.name}
        //         </h2>
        //         <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
        //             {product.description?.map((block) => block._type === "block" ? block.children?.map((child) => child.text).join("") : "").join("") || "No description available"}
        //         </p>
        //         <p className='mt-2 text-lg font-bold text-gray-900'>
        //             ${product.price?.toFixed(2)}
        //         </p>
        //     </div>
        // </Link>
    )
}

export default ProductThumb