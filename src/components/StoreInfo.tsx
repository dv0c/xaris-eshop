import { Clock, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const StoreInfo = () => {
    return (<>
        <div className="lg:hidden mb-6" >
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
        <div className="hidden lg:block space-y-4" >
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
    </>

    )
}

export default StoreInfo