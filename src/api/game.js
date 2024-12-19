import {ENV} from '@/utils'



export const getLastPublished = async () => {
    try {
        const sort = 'sort=publishedAt:desc'
        const pagination = 'pagination[limit]=1'
        const populate = 'populate=*'

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

        const response = await fetch(url)

        return await response.json()

    } catch (error) {
        console.error("🍋 getLastPublished-error: ", error);
        throw new Error(error)

    }

}

export const getLatestPublished = async ( limit = 9, platformId = null ) => {
    try {
        const filterPlatform = platformId && `filters[platform][id][$eq]=${platformId}`
        const paginationLimit = `pagination[limit]=${limit}`
        const sort = `sort=publishedAt:desc`
        const populate = `populate=*`

        const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

        const response = await fetch(url)

        return await response.json()

    } catch (error) {
        console.error("🍋 getLatestPublished-error: ", error);
        throw new Error(error)

    }

}

export const getGamesByPlatformSlug = async (slug, page) => {
    try {
        const filters = `filters[platform][slug][$eq]=${slug}`
        const pagination = `pagination[page]=${page}&pagination[pageSize]=6`
        const populate = 'populate=*'
        const urlParams = `${filters}&${pagination}&${populate}`

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

        const response = await fetch(url)

        return await response.json()

    }catch (error) {
        console.error("🍋 getGamesByPlatformSlug-error: ", error);
        throw error;
    }
}

export const searchGames = async (text, page) => {
    try {
        const filters = `filters[title][$contains]=${text}`
        const pagination = `pagination[page]=${page}&pagination[pageSize]=6`
        const populate = 'populate=*'
        const urlParams = `${filters}&${pagination}&${populate}`

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

        const response = await fetch(url)

        return await response.json()

    }catch (error) {
        console.error("🍋 searchGames-error: ", error);
        throw error;
    }
}

export const getBySlug = async (slug) => {
    try {
        const filters = `filters[slug][$eq]=${slug}`
        const populateGame = `populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots&populate[3]=platform`
        const populatePlatform = `populate[4]=platform.icon`
        const populates = `${populateGame}&${populatePlatform}`

        const urlParams = `${filters}&${populates}`

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

        const response = await fetch(url)
        const result = await response.json()

        return result.data[0]

    }catch (error) {
        console.error("🍋 getBySlug-error: ", error);
        throw error;
    }
}
