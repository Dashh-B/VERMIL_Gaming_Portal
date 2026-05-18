import { useContext } from 'react';

import { CartContext } from '../context/CartContext';

function StorePage() {

    const {
        addToCart,
        cart,
        totalPrice,
        removeFromCart,
        clearCart
    } = useContext(CartContext);

    const products = [
        {
            id: 1,
            title: 'Коллекционное издание',
            price: 80
        },
        {
            id: 2,
            title: 'Артбук Moontrade',
            price: 25
        },
        {
            id: 3,
            title: 'Саундтрек VERMIL',
            price: 15
        },
        {
            id: 4,
            title: 'Набор стикеров',
            price: 5
        }
    ];

    return (
        <div className="container py-5 text-light">

            <h1 className="mb-5">
                Магазин
            </h1>

            <div className="row g-4">

                <div className="col-lg-8">

                    <div className="row g-4">

                        {
                            products.map(product => (

                                <div
                                    className="col-md-6"
                                    key={product.id}
                                >

                                    <div className="store-card">

                                        <h3 className="text-danger mb-3">
                                            {product.title}
                                        </h3>

                                        <p className="mb-4">
                                            ${product.price}
                                        </p>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                addToCart(product)
                                            }
                                        >
                                            Добавить
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="store-card sticky-top">

                        <h3 className="mb-4 text-danger">
                            Корзина
                        </h3>

                        {
                            cart.length === 0 ? (
                                <p className="text-secondary">
                                    Корзина пуста
                                </p>
                            ) : (
                                <>
                                    {
                                        cart.map(item => (

                                            <div
                                                className="cart-item"
                                                key={item.id}
                                            >

                                                <div>

                                                    <strong>
                                                        {item.title}
                                                    </strong>

                                                    <div className="small text-secondary">
                                                        {item.quantity} × ${item.price}
                                                    </div>

                                                </div>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        ))
                                    }

                                    <hr />

                                    <h5 className="mb-4">
                                        Итого: ${totalPrice}
                                    </h5>

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={clearCart}
                                    >
                                        Очистить корзину
                                    </button>
                                </>
                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StorePage;