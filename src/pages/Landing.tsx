import React from "react";
import Menu from "../components/menu";
import Header from "../components/header";



const Landing: React.FC = () => {
   
    return (
        <>

             <Header onCartClick={() => { /* handle cart click */ }}>
                <Menu />
                </Header>
        </>
    );
};

export default Landing;
