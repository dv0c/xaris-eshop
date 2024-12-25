import BlackFridayBanner from '@/components/BlackFridayBanner';
import ProductThumb from '@/components/ProductThumb';
import StoreInfo from '@/components/StoreInfo';
import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { getCategoriesWithProducts } from '@/sanity/lib/products/getCategoriesWithProducts';

export default async function Home() {

  const products = await getAllProducts();
  const categories = await getAllCategories()
  const productsFiltered = await getCategoriesWithProducts()

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 pt-16 lg:pt-8">
        <div className="lg:grid lg:grid-cols-[280px,1fr] gap-8">
          <StoreInfo />

          {/* Products Grid */}
          <div className="space-y-6 mb-5">
            <section>
              <BlackFridayBanner />
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Νέα</h3>
                <Button variant="ghost" className="text-blue-500 -mr-2">
                  Όλα
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                  <ProductThumb product={product} key={index} />
                ))}
              </div>
            </section>

            {
              productsFiltered.map((item, index) => (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <Button variant="ghost" className="text-blue-500 -mr-2">
                      Όλα
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {item.products.map((product, index) => (
                      <ProductThumb product={product} />
                    ))}
                  </div>
                </section>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  )
}


