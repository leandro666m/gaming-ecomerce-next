import styles from './GridGames.module.scss';
import {map} from "lodash";
import Link from "next/link";
import {Image} from "semantic-ui-react";
import {ENV} from "@/utils";



export function GridGames(props) {

    const {wishlist} = props;


    return (
        <div className={styles.gridGames}>
            {
                map(wishlist, (item) => {
                    const game = item.attributes.game.data;
                    const cover = game.attributes.cover.data;
                    // <Image src={ `${ENV.SERVER_HOST}${screenshot.attributes.url}` }

                           return (
                        <div key={item.id} className={styles.game}>
                            <Link href={`/${game.attributes.slug}`} >
                                <Image src={`${ENV.SERVER_HOST}${cover.attributes.url}`} />
                            </Link>
                        </div>
                    )
                } )
            }

        </div>
    );
}

