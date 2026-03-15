// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CartItem } from "@/components/cart/CartItem";
import { formatPrice } from "@/lib/utils";
import {
  PAYMENT_METHODS,
  SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { show: addToast } = useToast();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = getTotalPrice();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock order processing
    addToast("Order placed successfully!");
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <Button onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ORDER SUMMARY */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border border-gray-200 rounded-xl">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="border-t pt-6 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CHECKOUT FORM */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SHIPPING */}
            <Card className="shadow-sm border border-gray-200 rounded-xl">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-semibold">
                  Shipping Information
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />

                  <Input
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      email: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        city: e.target.value,
                      })
                    }
                    required
                  />

                  <Input
                    placeholder="ZIP Code"
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Input
                  placeholder="Country"
                  value={shippingInfo.country}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      country: e.target.value,
                    })
                  }
                  required
                />
              </CardContent>
            </Card>

            {/* PAYMENT */}
            <Card className="shadow-sm border border-gray-200 rounded-xl">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-semibold">
                  Payment Method
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6">
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="w-full"
                >
                  <option value="">Select payment method</option>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </Select>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
