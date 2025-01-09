import styles from './Panel.module.scss';
import { WishlistIcon } from "@/components/Shared";
import {Button, Container, Icon, Image} from "semantic-ui-react";
import {ENV, fn} from "@/utils";
import { useCart } from '@/hooks'
import { useState } from 'react';



export function Panel(props) {

    const { addCart } = useCart()
    const [loading, setLoading] = useState(false);
    const { gameId, game } = props;
    const platform = game.platform.data;
    const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

    const addCartWrapper = () => {
        setLoading(true);
        addCart(gameId);

        setTimeout(() => {
            setLoading(false);
        } , 500)
    }

    return (
        <Container className={styles.panel}>
            <div className={styles.imgContiner}>
                <Image src={`${ENV.SERVER_HOST}${game.cover.data.attributes.url}`} alt={game.title} />
            </div>

            <div className={styles.actionsContainer}>
                <div>
                    <h2>{game.title}</h2>

                    <div className={styles.moreInfo}>
                        <span>
                            <Image src={`${ENV.SERVER_HOST}${platform.attributes.icon.data.attributes.url}`} />
                            {platform.attributes.title}
                        </span>

                        <span>
                            <Icon name='check' /> En stock
                        </span>
                    </div>

                    <div className={styles.price}>
                        { game.discount > 0 && (
                            <>
                                <span className={styles.originalPrice}>
                                    <Icon name='tag' /> ${game.price}
                                </span>

                                <span className={styles.discount}> -{game.discount}%</span>
                            </>
                        )
                        }

                        <span className={styles.price}> ${ buyPrice } </span>
                    </div>


                </div>

                <Button primary fluid onClick={addCartWrapper} loading={loading} > Agregar al carrito </Button>

                <WishlistIcon gameId={gameId} className={styles.heart}/>
            </div>

        </Container>
    );
}

