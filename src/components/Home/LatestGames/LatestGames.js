import {useState, useEffect} from 'react';
import { getLatestPublished } from '@/api';
import {GridGames} from "@/components/Shared";


const limit = 9;
const platformId = null;


export function LatestGames(props) {

    const { title,limit,platformId } = props;
    const [games, setGames] = useState(null)

    useEffect(() => {
        ( async () => {
                try {
                    const response = await getLatestPublished( limit, platformId );
                    setGames(response.data)
                    console.log(games)
                }catch (error) {
                    console.log(error)
                }
            }

        )()

    }, [] )

    if (!games) return null;

    return (
        <div>
            <h2>{title}</h2>

            <GridGames games={games} />
        </div>
    );
}

