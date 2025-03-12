import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../redux/menuSlice";
import { addToCart } from "../redux/cartSlice";
import { RootState, AppDispatch } from "../redux/store";
import "../Styles/Pages/menu.scss";

const Menu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: menu, status } = useSelector((state: RootState) => state.menu);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const handleAddToCart = (id: number, name: string, price: number) => {
        dispatch(addToCart({ id, name, price }));
    };

    return (
        <article className="menu">
            <h1 className="menu__header">MENY</h1>

            {status === "loading" && <p>Laddar meny...</p>}
            {status === "failed" && <p>Något gick fel! Försök igen.</p>}

            {status === "succeeded" && (
                <>
                    {/* Wonton Section */}
                    <section className="menu__category">
                        {menu.filter(item => item.type === "wonton").map((item) => (
                            <section 
                                key={item.id} 
                                className="menu__box"
                                onClick={() => handleAddToCart(item.id, item.name, item.price)}
                            >
                                <div className="menu__row">
                                    <h2 className="menu__underheader">{item.name.toUpperCase()}</h2>
                                    <div className="menu__dotted"></div>
                                    <p className="menu__price">{item.price} SEK</p>
                                </div>
                                <p className="menu__info">{item.description}</p>
                                <span className="menu__dotted--underline"></span>
                            </section>
                        ))}
                    </section>

                    {/* Dip Section */}
                    <section className="menu__category">
                        <h2 className="menu__category-header">DIPSÅSER</h2>
                        <div className="menu__subcategory">
                            {menu.filter(item => item.type === "dip").map((item) => (
                                <div 
                                    key={item.id} 
                                    className="menu__small-box"
                                    onClick={() => handleAddToCart(item.id, item.name, item.price)}
                                >
                                    <h3 className="menu__header--dropdown">{item.name}</h3>
                                    <p className="menu__price--dropdown">{item.price} SEK</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Drink Section */}
                    <section className="menu__category">
                        <h2 className="menu__category-header">LÄSK</h2>
                        <div className="menu__subcategory">
                            {menu.filter(item => item.type === "drink").map((item) => (
                                <div 
                                    key={item.id} 
                                    className="menu__small-box"
                                    onClick={() => handleAddToCart(item.id, item.name, item.price)}
                                >
                                    <h3 className="menu__header--dropdown">{item.name}</h3>
                                    <p className="menu__price--dropdown">{item.price} SEK</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </article>
    );
};

export default Menu;
