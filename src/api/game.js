import {ENV} from '@/utils'



export const getLastPublished = async () => {
    try {
        const sort = 'sort=publishedAt:desc'
        const pagination = 'pagination[limit]=1'
        const populate = 'populate=*'

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

        const response = await fetch(url)
        const result = await response.json()

        if(response.status !== 200) throw result

        return result
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
        const result = await response.json()

        if(response.status !== 200) throw result

        return result
    } catch (error) {
        console.error("🍋 getLatestPublished-error: ", error);
        throw new Error(error)

    }

}