import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

const BlackFridayBanner = async () => {
    
    const sale = await getActiveSaleByCouponCode("BFRIDAY");

    if (!sale?.isActive) {
        return null;
    }
    
    return <div>BlackFridayBanner</div>
}

export default BlackFridayBanner