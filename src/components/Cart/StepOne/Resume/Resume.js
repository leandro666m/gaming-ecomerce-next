import styles from './Resume.module.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {forEach} from "lodash";
import {fn} from "@/utils";
import {Button} from "semantic-ui-react";
import Link from "next/link";
import {Separator} from "@/components/Shared";



export function Resume(props) {

    const { games } = props;
    const [totals, setTotals] = useState(null)
    const  router  = useRouter()

    useEffect(() => {
        let totals = {
            original: 0,
            discount: 0,
            price: 0
        }

        forEach(games, game => {
            const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)
            totals = {
                original: totals.original + game.attributes.price * game.quantity,
                discount: totals.discount + (game.attributes.price - price) * game.quantity,
                price: totals.price + price * game.quantity
            }
        })
      setTotals(totals)
    }, [games]);

    const goToStepTwo = () => {
        router.push( { query: { ...router.query, step: 2 } } )
    }

    if(!totals) return null


    return (
        <div className={styles.resume}>
            <h2>Resúmen</h2>

            <div className={styles.block}>
                <div className={styles.prices}>
                    <div>
                        <span>Precio:</span>
                        <span>${totals.original.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Descuento:</span>
                        <span>${totals.discount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>${totals.price.toFixed(2)}</span>
                    </div>
                </div>

            <Separator height={20}/>
            <Button primary fluid onClick={goToStepTwo}>Continuar</Button>
            <Separator height={5}/>
            <Link href={'/'}>Seguir comprando</Link>
            </div>
        </div>
    );
}

