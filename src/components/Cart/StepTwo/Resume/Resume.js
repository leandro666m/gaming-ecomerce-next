import styles from './Resume.module.scss';
import {useEffect, useState} from "react";
import {fn} from "@/utils";
import {forEach, map} from "lodash";
import {Button} from "semantic-ui-react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart, useAuth} from '@/hooks'
import {paymentCart} from '@/api'
import { useRouter } from 'next/router'



export function Resume(props) {

    const { games, addressesSelected } = props;
    const [total, setTotal] = useState(null)
    const [loading, setLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const router = useRouter()
    const { deleteAllItems } = useCart()


    useEffect(() => {
        let totalTemp = 0

        forEach(games, (game) => {
            const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)
            totalTemp += price * game.quantity
        })

        setTotal(totalTemp.toFixed(2))

    }, [games]);

    const onPay = async () => {
        setLoading(true)

        if(!stripe || !elements) {
            setLoading(false)
            return
        }

        const cardElement = elements.getElement(CardElement)
        const result = await stripe.createToken(cardElement)

        if(result.error) {
            console.error(result.error.message)
        } else{
            const response = await paymentCart(result.token, games, user.id, addressesSelected)

            if(response.status === 200){
                deleteAllItems()
                goToStepEnd()
            } else {
                console.error('Error al realizar el pago.')
            }

        }

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const goToStepEnd = () => {
        router.push( { query: {...router.query, step: 3} })
    }


    if(!total) return null

    return (
        <div className={styles.resume}>
            <h2>Resúmen</h2>

            <div className={styles.block}>
                <div className={styles.products}>
                    { map(games, (game) => (
                        <div key={game.id} className={styles.product}>
                            <div>
                                <p>{game.attributes.title}</p>
                                <span>{game.attributes.platform.data.attributes.title}</span>
                            </div>
                            <span> {game.quantity > 0 && `${game.quantity}x`} ${ fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount) } </span>
                        </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles.blockTotal}>
                <div>
                    <span>Total: </span>
                    <span>${total}</span>
                </div>
                <Button primary fluid disabled={!addressesSelected} onClick={onPay} loading={loading}>Pagar</Button>
            </div>
        </div>

    );
}

