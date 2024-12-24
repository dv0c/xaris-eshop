import { FC } from 'react'
import { Category, Product } from '../../../sanity.types'
import ProductGrid from '../ProductGrid'
import CategorySelector from './CategorySelector'

interface ProductsViewProps {
    products: Product[],
    categories: Category[],
}

const ProductsView: FC<ProductsViewProps> = ({ products, categories }) => {
    return <div className='flex flex-col'>
        {/* categories */}
        <div className='w-full sm:w-[200px]'>
            <CategorySelector categories={categories} />
        </div>

        {/* products */}
        <div className='flex-1'>
            <div>
                <ProductGrid products={products} />
            </div>
        </div>
    </div>
}

export default ProductsView