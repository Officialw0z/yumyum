import React, {useState} from "react";
import '../styles/Pages/cart.scss';

const Cart: React.FC = () => {
    const [isCartVisible, setIsCartVisible] = useState(false);
    
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
                    <span className="cart__dotted--between"></span>
                    <div className="cart__row">
                        <h2 className="cart__underheader">Karlstad</h2>
                        <span className="cart__dotted"></span>
                        <p className="cart__price">27kr</p>
                        
                    </div>
                </section>
                )}
        </>
    )
}

export default Cart