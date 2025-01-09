import {CartLayout} from "@/layouts";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useCart} from "@/hooks";
import {getGameById} from "@/api";
import {Cart} from '@/components/Cart'
import {Seo} from "@/components/Shared";


export default function CartPage(){

    const { query: { step = 1 } } = useRouter()
    const currentStep = Number(step);
    const [games, setGames] = useState()
    const { cart } = useCart()

    useEffect(() => {
        if (!cart) return

        (  async () => {
                try {
                    const data = []
                    for await (const item of cart) {
                        const response =  await getGameById(item.id)
                        data.push( {...response.data, quantity: item.quantity})
                    }
                    setGames(data)
                } catch (error) {
                    console.error('🐞 CartPage error: ', error)
                }
            }
        )()
    }, [cart]);


    return(
        <>
            <Seo title="Carrito" />

            <CartLayout>
                {currentStep === 1 && <Cart.StepOne games={games} />}

                {currentStep === 2 && <Cart.StepTwo games={games} />}

                {currentStep === 3 && <Cart.StepThree />}

            </CartLayout>
        </>
    )
}