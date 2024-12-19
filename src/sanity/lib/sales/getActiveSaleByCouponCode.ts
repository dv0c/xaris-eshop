import { defineQuery } from "next-sanity";
import { couponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: couponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[
            _type == "sale"
            && isActive == true
            && couponCode == $couponCode
        ] | orderType(validForm desc)[0]
    `)

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode
            }
        })
    } catch (error) {
        console.error("Error fetching active sale by coupon code: ", error)
        return null
    }
}