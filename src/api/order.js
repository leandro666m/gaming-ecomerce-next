import {authFetch, ENV} from "@/utils";


export const getAllOrder = async (userId) => {
    try {
        const filters = `filters[user][id][$eq]=${userId}`
        const sort = 'sort[0]=createdAt:desc'
        const urlParams = `${filters}&${sort}`

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;

        const response = await authFetch(url)
        return await response.json()

    }catch (error) {
        console.error("🍋 getAllOrder-error: ", error);
        throw error;
    }
}