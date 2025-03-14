import React from "react";
import Cart from "./cart";
import '../styles/Pages/header.scss';

interface HeaderProps {
    children: React.ReactNode;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ children}) => {
    return (
        <article className="wrapper">
            
            <div className="background">
                
                <img src="/src/assets/Logo.png" alt="Logo" className="logo"/>
                <Cart />
                
                </div>
            {children} 
        </article>
    );
}

export default Header;
