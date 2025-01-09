"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  text: string;
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end">
          Delete
        </button>
      )}
    </>
  );
}

export function ChceckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="relative w-full overflow-hidden bg-primary text-primary-foreground transition-all hover:bg-primary/90">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Please Wait
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </Button>
      ) : (
        <Button type="submit" className="relative w-full overflow-hidden bg-primary text-primary-foreground transition-all hover:bg-primary/90">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Pay with Stripe
            <ChevronRight className="h-4 w-4" />
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </Button>
      )}
    </>
  );
}
