import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { addToCart, decreaseFromCart, removeFromCart, clearCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";
import trashcan from "../assets/trash.svg";
import "../styles/Pages/cart.scss";

const Cart: React.FC = () => {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const cartItems = useSelector((state: RootState) => state.cart.items);

    

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    const handleOrder = async () => {
        if (cartItems.length === 0) return;
    
        setLoading(true);
    
        const tenantName = "your-tenant-name"; 
       
        const itemIds = cartItems.reduce<number[]>((acc, item) => {
            for (let i = 0; i < item.quantity; i++) {
                acc.push(item.id);
            }
            return acc;
        }, []);
    
        try {
           
            const orderResponse = await dispatch(placeOrder({ tenantName, items: itemIds })).unwrap();
            
            console.log('API-respons från placeOrder:', orderResponse);
            
            dispatch(clearCart()); 
            
          
            localStorage.setItem("latestOrderId", orderResponse.id);
            
            
            navigate("/status");
            
        } catch (error) {
            console.error("Orderfel:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <span className="Cart__box" onClick={toggleCart}>
                <img src="/src/assets/Cart.png" alt="Cart" className="Cart__box--img" />
                {cartQuantity > 0 && <span className="Cart__box--count">{cartQuantity}</span>}
            </span>
    
            {isCartVisible && (
                <section className="cart">
                    
                   
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

                    
                    <section className="cart__lower--wrapper">
                        <article className="cart__lower--article">
                            <h3 className="cart__lower--header">Totalt</h3>
                            <p className="cart__lower--price">
                                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} SEK
                            </p>
                        </article>
                        <button 
                            className="cart__lower--button" 
                            onClick={handleOrder} 
                            disabled={loading}
                        >
                            {loading ? "Skickar..." : "Lägg din order"}
                        </button>
                    </section>
                </section>
            )}
        </>
    );
};

export default Cart;
