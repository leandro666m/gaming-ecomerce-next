import { ENV } from '@/utils';

export const getAllPlatform= async ( ) => {

    try {
        const populate = 'populate=icon'
        const sort = 'sort=order:asc'
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${populate}&${sort}`
        const response = await fetch(url)
        const result = await response.json()

        if(response.status !== 200)  throw result

        return result

    }catch (error) {
        console.error("🍋 getAllPlatform-error: ", error);
        throw error;
    }
}