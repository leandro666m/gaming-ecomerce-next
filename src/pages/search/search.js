import {BasicLayout} from '@/layouts';
import {useEffect} from "react";
import {Container} from "semantic-ui-react";
import {GridGames, Pagination, Separator} from "@/components/Shared";
import {size} from "lodash";




export default function SearchPage( props ) {

    const { games, pagination, searchText } = props;
    const hasGames = size(games) > 0;

    useEffect(() => {
        document.getElementById('search-games').focus()
    }, []);


    return (
        <BasicLayout relative isOpenSearch={true}>
            <Container>
                <Separator height={50} />
                <h2>Buscando: {searchText}</h2>
                {
                    hasGames ? (
                        <>
                            <GridGames games={games} />
                            <Separator height={50} />
                            <Pagination totalPages={pagination.page} currentPage={pagination.pageCount} />
                        </>
                    ) : ( <h3>No se han encontrado juegos</h3> )
                }
                <Separator height={100} />
            </Container>
        </BasicLayout>
    );
}

