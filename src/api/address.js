import { ENV, authFetch } from '@/utils'



export const getAddressById = async (userId) => {

    try {
        const filters = `filters[user][id][$eq]=${userId}`
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

        const response = await authFetch(url)
        const result = await response.json()

        if(response.status !== 200) throw result

        return result
    } catch (error) {
        console.error("🍋 getAddress-error: ", error);
        throw new Error(error)

    }

}

export  const createAddress = async (data, userId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                data: {
                    ...data,
                    user: userId
                }
            })
        }

        const response = await authFetch( url, params )

        return await response.json()

    } catch (error) {
        console.error("🍋 createAddress-error: ", error);
        console.error(error)
    }
}

export const updateAddress = async (data, addressId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { data } )
        }

        const response = await authFetch( url, params )

        return await response.json()

    } catch (error) {
        console.error("🍋 updateAddress-error: ", error);
        console.error(error)
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
        const params = {
            method: 'DELETE'
        }

        const response = await authFetch( url, params )

        return await response.json()

    } catch (error) {
        console.error("🍋 deleteAddress-error: ", error);
        console.error(error)
    }
}