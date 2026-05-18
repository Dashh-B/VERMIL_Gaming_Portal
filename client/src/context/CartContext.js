import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const addToCart = (item) => {

        const existingItem = cart.find(
            product => product.id === item.id
        );

        if (existingItem) {

            setCart(
                cart.map(product =>
                    product.id === item.id
                        ? {
                            ...product,
                            quantity: product.quantity + 1
                        }
                        : product
                )
            );

            return;
        }

        setCart([
            ...cart,
            {
                ...item,
                quantity: 1
            }
        ]);
    };

    const removeFromCart = (id) => {

        setCart(
            cart.filter(item => item.id !== id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = useMemo(() => {

        return cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    }, [cart]);

    const totalItems = useMemo(() => {

        return cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice,
                totalItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
}