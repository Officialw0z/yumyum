/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReceiptById } from "../services/api"; // Importera rätt API-funktion
import Logo from "../assets/Logo.png";
import Logo2 from "../assets/logo2.png";
import "../styles/Pages/receipt.scss";
import { useNavigate } from "react-router-dom";

const Receipt: React.FC = () => {
  const { orderId } = useParams(); // Hämta orderId från URL
  const [receipt, setReceipt] = useState<any | null>(null); // Typen är valfri här för att matcha API-responsen
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleNewOrder = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("orderId:", orderId);
    const fetchReceipt = async () => {
      if (!orderId) return;

      try {
        console.log("🔍 Hämtar kvitto för orderId:", orderId);
        const receiptData = await getReceiptById(orderId); // Hämtar kvitto från API
        console.log("✅ Kvitto-data:", receiptData);

        // Antag att response har formen {receipt: {...}}
        setReceipt(receiptData.receipt); // Sätt kvittodata till state
      } catch (error) {
        console.error("❌ Fel vid hämtning av kvitto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [orderId]);

  if (loading) return <p>Laddar kvitto...</p>;
  if (!receipt) return <p>Ingen order hittades.</p>;

  return (
    <article className="wrappers">
      <section className="receipt__wrapper">
        <img src={Logo} alt="" className="receipt__logo" />
        <div className="receipt__box">
          <img src={Logo2} alt="" className="receipt__logo2" />
          <h1 className="receipt__header">KVITTO</h1>
          <p>Ordernummer: #{receipt.id}</p>

          

          <div className="receipt__items">
            <ul>
              {receipt.items?.length > 0 ? (
                receipt.items.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                  <li key={index} className="receipt__item">
                    <div className="receipt__item-left">
                      {item.name}
                    </div>
                    <div className="receipt__dotted"></div>
                    <div className="receipt__item-right">
                      {item.price} SEK
                    </div>
                  </li>
                   <div className="receipt__item-quantity">
                   {item.quantity + " stycken"}
                 </div>
                    </React.Fragment>
                ))
              ) : (
                <p>Inga produkter i ordern.</p>
              )}
            </ul>
          </div>

          <article className="receipt__lower--article">
            <div className="receipt__lower--left">
              <h3 className="receipt__lower--header">Totalt</h3>
              <p className="receipt__moms">inkl 20% moms</p>
            </div>
            <p className="receipt__lower--price">{receipt.orderValue} SEK</p>
          </article>
        </div>
      </section>
      <button className="receipt__neworder--btn" onClick={handleNewOrder}>
        GÖR EN NY BESTÄLLNING
      </button>
    </article>
  );
};

export default Receipt;
