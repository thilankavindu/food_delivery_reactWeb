import React from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '../context/CartContext';
interface CartItemProps {
  item: CartItemType;
}
const CartItem: React.FC<CartItemProps> = ({
  item
}) => {
  const {
    updateQuantity,
    removeFromCart
  } = useCart();
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  return <div className="flex items-center py-5 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          ${item.price.toFixed(2)} each
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button onClick={handleDecreaseQuantity} className="p-1 text-gray-600 hover:text-orange-500">
              <MinusIcon size={16} />
            </button>
            <span className="px-2 py-1 min-w-[30px] text-center">
              {item.quantity}
            </span>
            <button onClick={handleIncreaseQuantity} className="p-1 text-gray-600 hover:text-orange-500">
              <PlusIcon size={16} />
            </button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
            <TrashIcon size={18} />
          </button>
        </div>
      </div>
    </div>;
};
export default CartItem;