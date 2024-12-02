import { useState, useEffect } from "react";
import styles from './Menu.module.scss'
import { map } from 'lodash'
import Link from "next/link";
import { Image, Icon, Input } from "semantic-ui-react";
import {getAllPlatform} from "@/api";
import classNames from "classnames";
import {ENV} from "@/utils";


export function Menu( props ) {

    const { isOpenSearch } = props
    const [platforms, setPlatforms] = useState(null)
    const [showSearch, setShowSearch] = useState(false)

    const openCloseSearch = () => setShowSearch(  (prev) => !prev )
    
    useEffect(() => {
        (async () => {
            try {
                const response = await getAllPlatform()
                setPlatforms(response.data)
            }catch (e) {
                console.log('Error: ', e)
            }
        } ) ()
    }, [])

    return (
        <div className={styles.platform}>
            {
                map(platforms, (platform) => (
                 <Link key={platform.id} href={`/games/${platform.attributes.slug}`} >
                    <Image src={ `${ENV.SERVER_HOST}${platform.attributes.icon.data.attributes.url}` }  />
                     { platform.attributes.title }
                 </Link>
                ) )
            }

            <button className={styles.search} onClick={ openCloseSearch  } >
                <Icon name='search' />
            </button>

            <div className={classNames(styles.inputContainer, {
                [styles.active]: showSearch,
            } ) }>
                <Input id='search-games' placeholder='Buscador' className={styles.input} focus={true}  />
                <Icon name='close' className={styles.closeInput} onClick={ openCloseSearch } />
            </div>
        </div>
    )
}
