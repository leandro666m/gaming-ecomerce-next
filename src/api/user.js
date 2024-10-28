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