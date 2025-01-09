
import { getGamesByPlatformSlug, getPlatformBySlug} from '@/api'
export { default } from './platform';


/*getServerSideProps es una función de Next.js que se ejecuta en el servidor en cada solicitud a la página.
En este caso, en /index.js para obtener datos del servidor antes de renderizar la página*/
export async function getServerSideProps(context) {

    const { page = 1 } = context.query;
    const { platform } = context.params;

    const responsePlatform = await getPlatformBySlug( platform);

    const responseGames = await getGamesByPlatformSlug( platform, page);

    return {
        props: {
            platform: responsePlatform,
            games: responseGames.data,
            pagination: responseGames.meta.pagination
        }
    };
}