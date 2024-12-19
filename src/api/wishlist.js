import { ENV, authFetch } from '@/utils'

export const getCheckWishlist = async ( userId, gameId ) => {
    try {
        const filterUser = `filters[user][id][$eq][0]=${userId}`;
        const filterGame = `filters[game][id][$eq][1]=${gameId}`;
        const urlParams = `${filterUser}&${filterGame}`;

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;

        const response = await authFetch(url);
        const result = await response.json();

        if (result.data.length === 0) {
            return false
        }

        return result.data[0]

    } catch (error) {
        console.error("🍋 getCheckWishlist-error: ", error);
        throw new Error(error)
    }
}

export const addToMyWishlist = async ( userId, gameId ) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    user: userId,
                    game: gameId,
                },
            }),
        };

        const response = await authFetch(url, params);
        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("🍋 addWishlist-error: ", error);
        throw new Error(error)
    }
}

export const deleteFromMyWishlist = async ( id ) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${id}`
        const params = {
                method: 'DELETE',
            }
        const response = await authFetch(url, params)

        return await response.json()

    } catch (error) {
        console.error("🍋 deleteWishlist-error: ", error);
        throw new Error(error)
    }
}

export const getAllMyWishlist = async ( userId ) => {
    try {
        const filterUser = `filters[user][id][$eq][0]=${userId}`;
        const populate = `populate[0]=game&populate[1]=game.cover`;
        const urlParams = `${filterUser}&${populate}`;

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;

        const response = await authFetch(url);
        const result = await response.json();

        return result.data

    } catch (error) {
        console.error("🍋 getAllMyWishlist-error: ", error);
        throw new Error(error)
    }
}