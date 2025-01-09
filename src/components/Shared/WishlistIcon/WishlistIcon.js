import styles from './WishlistIcon.module.scss';
import {Icon} from "semantic-ui-react";
import classNames from "classnames";
import {useEffect, useState} from "react";
import {getCheckWishlist, addToMyWishlist,  deleteFromMyWishlist} from "@/api";
import {useAuth} from "@/hooks";



export function WishlistIcon(props) {

    const { gameId, className, removeCallback } = props;
    const [hasWishlist, setHasWishlist] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        ( async () => {
            try {
                const response = await getCheckWishlist(user.id , gameId);
                setHasWishlist(response);
            } catch (error) {
                setHasWishlist(false);
                console.error("💥 WishlistIcon-error: ", error);
            }
        }  )()
    }, [gameId]);

    const addWishlist = async()=> {
        const response = await addToMyWishlist(user.id, gameId);
        setHasWishlist(response);
    }

    const deleteWishlist =  async ()=> {
        try {
            await deleteFromMyWishlist(hasWishlist.id);
            setHasWishlist(false);

            if (removeCallback) {
                removeCallback();
            } // para actualizar el compo cuando se elimina en la lista de deseos

        } catch(error) {
            console.error("💥 deleteWishlist-error: ", error)
            throw new Error(error);
        }
    }



    if (hasWishlist === null) return null;

    return (
        <Icon
            name={ hasWishlist ? "heart" : "heart outline"}
            onClick={hasWishlist ? deleteWishlist : addWishlist}
            className={ classNames(styles.wishlistIcon, { [className]: className, } ) } />
    );
}

