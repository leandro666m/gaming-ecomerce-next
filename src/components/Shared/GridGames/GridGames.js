import styles from './GridGames.module.scss';
import Link from 'next/link';
import { map } from 'lodash';
import {ENV, fn} from '@/utils'
import { Label } from '@/components/Shared';
import {Image} from "semantic-ui-react";



export const GridGames = (props) => {

    const { games } = props;

   return (
        <div className={styles.gridGames}>
            { map(games, (game) => (
                <Link key={game.id} href={`/${game.attributes.slug}`} className={styles.game} >
                    <div>
                        <Image src={`${ENV.SERVER_HOST}${game.attributes.cover.data.attributes.url}`} />
                        { game.attributes.discount > 0 && (
                                <Label.Discount className={styles.discount} >
                                    {`-${game.attributes.discount}%`}
                                </Label.Discount>
                            )
                        }
                    </div>

                    <div>
                        <span>{game.attributes.title} </span>
                        <span className={styles.price}>
                            {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS'
                            }).format(fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount))}
                        </span>
                    </div>
                </Link>

                )
            ) }

        </div>
    );
};

