// components/cart/CartItem.tsx
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
      {/* IMAGE */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>

      {/* TITLE + PRICE */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* QUANTITY */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <Button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="w-10 text-center text-sm font-medium">
            {item.quantity}
          </span>

          <Button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* TOTAL PRICE */}
        <div className="w-20 text-right">
          <p className="text-sm font-semibold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* DELETE */}
        <Button
          onClick={() => removeItem(item.id)}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
