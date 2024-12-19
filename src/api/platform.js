import { ENV } from '@/utils';

export const getAllPlatform= async ( ) => {

    try {
        const populate = 'populate=icon'
        const sort = 'sort=order:asc'
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${populate}&${sort}`
        const response = await fetch(url)

        return  await response.json()

    }catch (error) {
        console.error("🍋 getAllPlatform-error: ", error);
        throw error;
    }
}

export const getPlatformBySlug = async (slug) => {

    try {
        const filters = `filters[slug][$eq]=${slug}`
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}`

        const response = await fetch(url)
        const result = await response.json()

        return result.data[0];

    }catch (error) {
        console.error("🍋 getPlatformBySlug-error: ", error);
        throw error;
    }
}