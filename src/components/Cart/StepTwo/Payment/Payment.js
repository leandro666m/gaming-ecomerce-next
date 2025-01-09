import styles from './Payment.module.scss';
import {CardElement} from "@stripe/react-stripe-js";



export function Payment(props) {

    const cardStyle= {
        style: {
            base: {
                color: "#fff",
                fontSize: "16px",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                    color: "#ccc"
                }
            },
            invalid: {
                color: "#f44336",
                iconColor: "#f44336"
            }
        }
    }

    return (
        <div className={styles.payment}>
            <h2>Métodos de pago:</h2>

            <div className={styles.block}>
                <CardElement options={cardStyle}/>
            </div>
        </div>
    );
}

