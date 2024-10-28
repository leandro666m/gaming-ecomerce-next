import { getTokenFromLocalStorage, hasExpired, removeTokenFromLocalStorage } from "@/api";



export async function authFetch(url, params) {
    const token = getTokenFromLocalStorage();

    const logout = () => {
        removeTokenFromLocalStorage();
        window.location.replace("/");
    }

    if (!token) {
        console.log('authFetch - No token')
        logout();
    }else{

        if( !hasExpired(token)){
            console.log('authFetch - Token válido')

            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                },
            };


            try {
                return await fetch(url, paramsTemp);
            } catch (error) {
                console.error("🦐 authFetch - error: ", error);
                throw new Error(error);
            }

        }else{
            console.log('authFetch - Token expirado')
            logout();
        }

    }


}