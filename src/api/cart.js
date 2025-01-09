import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";



export const addToCart = (gameId) => {

    const games = getAllCart();
    
    const objIndex = games.findIndex((game) => game.id === gameId);
    
    if (objIndex < 0) {
        games.push( { id: gameId, quantity: 1 } );
    } else {
        const game = games[objIndex];
        games[objIndex].quantity = game.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(games));
}

export const getAllCart = () => {
        const response = localStorage.getItem(ENV.CART);
        
        if (!response) {
            return [];
        } else {
            return JSON.parse(response);
        }
}
                
export const getCountCart = () => {
        const response = getAllCart();
        let count = 0;

        forEach(response, (item) => {
            count += item.quantity;
        });

        return count;
}

export const changeQuantity = (gameId, quantity) => {
    const games = getAllCart();
    const objIndex = games.findIndex((game) => game.id === gameId);

    games[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(games));
}

export const deleteGame = (gameId) => {
    const games = getAllCart();
    const updateGames = games.filter((game) => game.id !== gameId);

    localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
}

export const deleteAll = () => {
        localStorage.removeItem(ENV.CART);
    }

export const paymentCart = async (token, products, idUser, address) => {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    products,
                    idUser,
                    addressShipping: address,
                }),
            };

            return await authFetch(url, params);

        } catch (error) {
            console.error("💥 paymentCart error: ", error);
            throw error;
        }
    }

