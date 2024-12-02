import { authFetch, ENV } from "@/utils";


export const getMe = async() => {

    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;

        const response = await authFetch(url)
        const result = await response.json()

        if(response.status !== 200) throw result

        return result
    } catch (error) {
        console.error("🍋 getMe-error: ", error);
        throw new Error(error)
        
    }

}


export const updateMe = async (userId, data) => {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await authFetch(url, params)

        const result = await response.json()

        if(response.status !== 200) throw result

        return result
    } catch (error) {
        console.error("🍋 updateMe-error: ", error);
        throw new Error(error)
    }
}