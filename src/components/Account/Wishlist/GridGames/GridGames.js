import styles from './GridGames.module.scss';
import {map} from "lodash";
import Link from "next/link";
import {Image} from "semantic-ui-react";
import {ENV, fn} from "@/utils";
import {Label, WishlistIcon} from "@/components/Shared";



export function GridGames(props) {

    const {wishlist, onReload} = props;


    return (
        <div className={styles.gridGames}>
            {
                map(wishlist, (item) => {
                    const game = item.attributes.game.data;
                    const cover = game.attributes.cover.data;

                    return (
                        <div key={item.id} className={styles.game}>
                            <Link href={`/${game.attributes.slug}`}>
                                <div>
                                    <Image src={`${ENV.SERVER_HOST}${cover.attributes.url}`}/>
                                    {game.attributes.discount > 0 &&
                                        <Label.Discount className={styles.discount}>
                                            {`-${game.attributes.discount}% `}
                                        </Label.Discount>
                                    }
                                </div>

                                <div>
                                    <span>{game.attributes.title}</span>
                                    <span className={styles.price}>
                                         {new Intl.NumberFormat('es-AR', {
                                             style: 'currency',
                                             currency: 'ARS'
                                         }).format(fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount))}
                                    </span>
                                </div>
                            </Link>

                            <WishlistIcon gameId={game.id} className={styles.wishlistIcon} removeCallback={onReload} />
                        </div>
                    )
                })
            }

        </div>
    );
}

