import Head from 'next/head';

export function Seo(props){

    const {title = 'Gaming - Tus juegos favoritos',
        description = 'Tus juegos favoritos para Steam, PS4, Xbox, Switch y más.'
    } = props;

    return(
        <Head>
            <title> { title } </title>
            <meta property='description' content={description} />
        </Head>
    )

}