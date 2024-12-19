import {BasicLayout} from "@/layouts";
import {ENV} from "@/utils";
import {Game} from "@/components/Game";
import {Separator} from "@/components/Shared";


export default function GamePage(props) {

    const { game } = props;
    const wallpaperURL = `${ENV.SERVER_HOST}${game.attributes.wallpaper.data.attributes.url}`


    return (
        <BasicLayout>
            <Game.HeaderWallpaper image={wallpaperURL}/>
            <Game.Panel gameId={game.id} game={game.attributes}/>

            <Separator height={50} />

            <Game.Info game={game.attributes} />

            <Separator height={30} />

            <Game.Media video={game.attributes.video} screenshots={game.attributes.screenshots.data}/>

            <Separator height={50} />
        </BasicLayout>
    );
}

