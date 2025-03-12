import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderById } from "../services/api";

const Status: React.FC = () => {
    const navigate = useNavigate();
    const { orderId } = useSelector((state: RootState) => state.order.currentOrder);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        if (!orderId) {
            navigate("/");
            return;
        }

        const fetchOrderStatus = async () => {
            try {
                const tenantName = "your-tenant-name"; // Byt till din tenant om nödvändigt
                const orderData = await getOrderById(tenantName, orderId);

                console.log("API-respons:", orderData); // Logga API-responsen för inspektion

                // Kontrollera om vi får tillbaka ett giltigt ETA
                if (!orderData || !orderData.order || !orderData.order.eta) {
                    console.error("Missing eta in API response");
                    setTimeLeft("Okänd tid");
                    return;
                }

                const etaString = orderData.order.eta;
                console.log("Beräknad ETA:", etaString);

                // Omvandla eta till ett Date-objekt
                const etaDate = new Date(etaString);
                console.log("Omvandlat ETA:", etaDate);

                // Kontrollera om datumet är giltigt
                if (isNaN(etaDate.getTime())) {
                    console.error("Ogiltigt datum:", etaDate);
                    setTimeLeft("Okänd tid");
                    return;
                }

                // Skapa ett intervall för att uppdatera nedräkningen varje sekund
                const intervalId = setInterval(() => {
                    const currentTime = new Date();
                    const timeDifference = etaDate.getTime() - currentTime.getTime();
                    const remainingMinutes = Math.floor(timeDifference / (1000 * 60));
                    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // Kvarvarande sekunder

                    // Om det finns mer tid kvar, uppdatera nedräkningen
                    if (timeDifference > 0) {
                        setTimeLeft(`${remainingMinutes} minuter ${remainingSeconds} sekunder kvar`);
                    } else if (timeDifference <= 0) {
                        // När nedräkningen är klar, visa att ordern är klar
                        clearInterval(intervalId);
                        setTimeLeft("Ordern är klar!");
                    }
                }, 1000); // Uppdatera varje sekund (1000 ms)

                // Rensa intervallet när komponenten tas bort
                return () => clearInterval(intervalId);
            } catch (error) {
                console.error("Kunde inte hämta orderstatus:", error);
                setTimeLeft("Fel vid hämtning av orderstatus.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatus();
    }, [orderId, navigate]);

    return (
        <section className="status">
            <h1>Status på din beställning</h1>
            {loading ? (
                <p>Laddar...</p>
            ) : (
                <>
                    <p>Ordernummer: <strong>{orderId}</strong></p>
                    <p>Beräknad tid: <strong>{timeLeft}</strong></p>
                </>
            )}
        </section>
    );
};

export default Status;
