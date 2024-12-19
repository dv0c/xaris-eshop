export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMAS: "XMAS",
} as const

export type couponCode = keyof typeof COUPON_CODES