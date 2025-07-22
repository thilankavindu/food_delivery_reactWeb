import React, { createContext, useContext, useReducer } from 'react';
// Define types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  total: number;
}
type CartAction = {
  type: 'ADD_ITEM';
  payload: Omit<CartItem, 'quantity'>;
} | {
  type: 'REMOVE_ITEM';
  payload: {
    id: number;
  };
} | {
  type: 'UPDATE_QUANTITY';
  payload: {
    id: number;
    quantity: number;
  };
} | {
  type: 'CLEAR_CART';
};
// Create context
interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      {
        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex > -1) {
          // Item exists, update quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
          return {
            ...state,
            items: updatedItems,
            total: calculateTotal(updatedItems)
          };
        } else {
          // Add new item
          const newItem = {
            ...action.payload,
            quantity: 1
          };
          const updatedItems = [...state.items, newItem];
          return {
            ...state,
            items: updatedItems,
            total: calculateTotal(updatedItems)
          };
        }
      }
    case 'REMOVE_ITEM':
      {
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    case 'UPDATE_QUANTITY':
      {
        const {
          id,
          quantity
        } = action.payload;
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return cartReducer(state, {
            type: 'REMOVE_ITEM',
            payload: {
              id
            }
          });
        }
        const updatedItems = state.items.map(item => item.id === id ? {
          ...item,
          quantity
        } : item);
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    default:
      return state;
  }
};
// Helper to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
// Provider component
interface CartProviderProps {
  children: ReactNode;
}
export const CartProvider = ({
  children
}: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });
  };
  const removeFromCart = (id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id
      }
    });
  };
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id,
        quantity
      }
    });
  };
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART'
    });
  };
  return <CartContext.Provider value={{
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }}>
      {children}
    </CartContext.Provider>;
};
// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};