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