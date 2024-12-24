import BlackFridayBanner from '@/components/BlackFridayBanner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Plus, Star, Users } from 'lucide-react'


export default async function Home() {

  //   const products = await getAllProducts();
  //   const categories = await getAllCategories()


  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 pt-16 lg:pt-8">
        <div className="lg:grid lg:grid-cols-[280px,1fr] gap-8">
          {/* Mobile Store Info */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Store logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">Xaris Concept Store</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Ανοιχτό μέχρι 11:00 μ.μ.</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Ελάχιστη παραγγελία 10,00 €
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="flex-1 justify-start gap-2">
                <Clock className="h-4 w-4" />
                Παράδοση 20-30 λ.
              </Button>
              <Button variant="outline" className="flex-1 justify-start gap-2">
                <Users className="h-4 w-4" />
                Περισσότερα
              </Button>
            </div>
          </div>
          {/* Desktop Store Info */}
          <div className="hidden lg:block space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-xl bg-gray-200 mb-4 overflow-hidden">
                    <img
                      src="/logo.png"
                      alt="Store logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Xaris Concept Store</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Ανοιχτό μέχρι 11:00 μ.μ.</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Ελάχιστη παραγγελία 10,00 €
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <Clock className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Παράδοση 20-30 λ.</div>
                    <div className="text-sm text-muted-foreground">Δωρεάν παράδοση</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="space-y-6 mb-5">
            <section>
              <BlackFridayBanner />
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Προσφορές</h3>
                <Button variant="ghost" className="text-blue-500 -mr-2">
                  Όλα
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    title: "Μπρελοκ με Ροζ Πέτρες",
                    price: "3,00 €",
                    originalPrice: "5,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Κολιέ Χρυσό Γούρι 25 με Ασημί Αλυσίδα",
                    price: "18,00 €",
                    originalPrice: "20,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Κολιέ Φτερό",
                    price: "15,00 €",
                    originalPrice: "18,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Βραχιόλι με Χάντρες",
                    price: "12,00 €",
                    originalPrice: "15,00 €",
                    image: "/placeholder.svg"
                  }
                ].map((product, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="p-3">
                        <div className="flex items-baseline gap-1 mb-1">
                          <div className="font-bold text-sm">{product.price}</div>
                          <div className="text-xs text-muted-foreground line-through">
                            {product.originalPrice}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {product.title}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Δημοφιλή</h3>
                <Button variant="ghost" className="text-blue-500 -mr-2">
                  Όλα
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    title: "Σκουλαρίκια Κρίκοι",
                    price: "22,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Δαχτυλίδι Ασημένιο",
                    price: "30,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Βραχιόλι Χρυσό",
                    price: "45,00 €",
                    image: "/placeholder.svg"
                  },
                  {
                    title: "Κολιέ με Πέρλες",
                    price: "38,00 €",
                    image: "/placeholder.svg"
                  }
                ].map((product, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="p-3">
                        <div className="font-bold text-sm mb-1">{product.price}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {product.title}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}


