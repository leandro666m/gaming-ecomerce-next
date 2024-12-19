import { getBySlug} from "@/api";

export {default} from './game'


export async function getServerSideProps(context) {
    const { game } = context.params;

    const response = await getBySlug(game);

    return {
        props: {
            game: response,
        },
    }

}

