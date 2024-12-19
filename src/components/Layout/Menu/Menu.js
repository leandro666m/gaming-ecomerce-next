import { useState, useEffect } from "react";
import styles from './Menu.module.scss'
import { map } from 'lodash'
import Link from "next/link";
import { Image, Icon, Input } from "semantic-ui-react";
import {getAllPlatform} from "@/api";
import classNames from "classnames";
import {ENV} from "@/utils";
import {useRouter} from "next/router";


export function Menu( props ) {

    const { isOpenSearch } = props
    const [platforms, setPlatforms] = useState(null)
    const [showSearch, setShowSearch] = useState(isOpenSearch)
    const [searchText, setSearchText] = useState('')
    const router = useRouter()

    const openCloseSearch = () => {
        setShowSearch((prev) => !prev)
    }

    useEffect(() => {
        if (showSearch) {
            document.getElementById('search-games').focus()
        }
    }, [showSearch]);

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

    useEffect(() => {
        setSearchText( router.query.search || '' )
    }, [  ]);

    const onSearch = (text) => {
        setSearchText(text)
       router.replace(`/search?search=${text}`)
    }


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

            <div className={classNames(styles.inputContainer, { [styles.active]: showSearch, } ) }>
                <Input id='search-games' value={searchText} placeholder='Buscador' className={styles.input} focus={true} onChange={ (_,data)=> onSearch(data.value) } />
                <Icon name='close' className={styles.closeInput} onClick={ openCloseSearch } />
            </div>
        </div>
    )
}
