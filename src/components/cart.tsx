import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, decreaseFromCart, removeFromCart } from "../redux/cartSlice";
import trashcan from "../assets/trash.svg";
import "../styles/Pages/cart.scss";

const Cart: React.FC = () => {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            <span className="Cart__box" onClick={toggleCart}>
                <img src="/src/assets/Cart.png" alt="Cart" className="Cart__box--img" />
            </span>
            
            {isCartVisible && (
                <section className="cart">
                    
                    {/* Omslut varorna med en div för att hantera scrollning */}
                    <div className="cart__items">
                        {cartItems.length === 0 ? (
                            <p className="cart__empty">Din varukorg är tom.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="cart__row">
                                    <h2 className="cart__underheader">{item.name}</h2>

                                    <div className="cart__controls">
                                        <button className="cart__button" onClick={() => dispatch(decreaseFromCart(item.id))}>-</button>
                                        <span className="cart__quantity">{item.quantity}</span>
                                        <button className="cart__button" onClick={() => dispatch(addToCart(item))}>+</button>
                                    </div>

                                    <p className="cart__price">{item.price * item.quantity} SEK</p>

                                    <img 
                                        src={trashcan} 
                                        alt="trash" 
                                        className="cart__trash" 
                                        onClick={() => dispatch(removeFromCart(item.id))} 
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Totalsumma + orderknapp längst ner */}
                    <section className="cart__lower--wrapper">
                        <article className="cart__lower--article">
                            <h3 className="cart__lower--header">Totalt</h3>
                            <p className="cart__lower--price">
                                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} SEK
                            </p>
                        </article>
                        <button className="cart__lower--button">Lägg din order</button>
                    </section>
                </section>
            )}
        </>
    );
};

export default Cart;
