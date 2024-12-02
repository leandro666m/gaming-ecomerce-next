import styles from './BannerLastGamePublished.module.scss';
import {useEffect, useState} from "react";
import {getLastPublished} from "@/api";
import {Container, Image} from "semantic-ui-react";
import {ENV, fn} from "@/utils";
import Link from "next/link";
import { DateTime } from "luxon";
import { Label } from '@/components/Shared'


export function BannerLastGamePublished( ) {

    const [game, setGame] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await getLastPublished()
                setGame(response.data[0])
            } catch (error) {
                console.log(error)
            }
        })  ()
    }, []);

    if(!game) return null;

    const wallpaper = game.attributes.wallpaper
    const releaseDate = new Date(game.attributes.releaseDate).toISOString();
    const price = fn.calcDiscountedPrice( game.attributes.price, game.attributes.discount )

    return (
        <div className={styles.container}>
            <Image src={`${ENV.SERVER_HOST}${wallpaper.data.attributes.url}`} className={styles.wallpaper} />

            <Link href={game.attributes.slug } className={styles.infoContainer} >
                <Container>
                    <span className={styles.date}> { DateTime.fromISO(releaseDate).minus({days: 1}).toRelative() } </span>
                    <h2>{game.attributes.title}</h2>
                    <p className={styles.price}>
                        <Label.Discount> -{ game.attributes.discount }% </Label.Discount>
                        <span className={styles.finalPrice}> {price} </span>
                    </p>
                </Container>
            </Link>
        </div>
    );
}



