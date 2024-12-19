import {searchGames} from "@/api";

export {default} from './search'

export async function getServerSideProps(context) {

    const { query: {search, page = 1} } = context

    const response = await searchGames(search, page)


    return {
        props: {
            games: response.data,
            pagination: response.meta.pagination,
            searchText: search
        }
    }
}