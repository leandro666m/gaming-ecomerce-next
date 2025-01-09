import React, {useEffect, useState} from 'react';
import {getAllMyWishlist} from "@/api";
import {useAuth} from "@/hooks";
import { size } from "lodash";
import { NoResult } from "@/components/Shared";
import {GridGames} from "./GridGames";


export function Wishlist(props) {

    const [wishlist, setWishlist] = useState(null);
    const [reload, setReload] = useState(false);
    const {user} = useAuth()

    const onReload = () => setReload( (prevState)=> !prevState );
    
    useEffect(() => {
        ( async()=> {
            try{
                const response = await getAllMyWishlist(user.id);
                setWishlist(response);
            } catch (error) {
                console.error("💥 Wishlist-error: ", error);
                throw new Error(error)
            }
        } )()
    }, [reload]);


    return size(wishlist) === 0 ?
        <NoResult text={'No hay deseados agregados.'}/> :
        (
            <GridGames wishlist={wishlist} onReload={onReload} />
        )
}

