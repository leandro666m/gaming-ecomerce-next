import { createContext, useEffect, useMemo, useState } from "react";
import { getMe, getTokenFromLocalStorage, hasExpired, removeTokenFromLocalStorage, setTokenToLocalStorage,  } from "@/api";


export const AuthContext = createContext()


export const AuthProvider = ( { children } ) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAndLogin = async () => {
            const storedToken = getTokenFromLocalStorage();
            
            if (!storedToken) {
                logout();
                setLoading(false);
                return;
            }

            if (hasExpired(storedToken)) {
                logout();
            } else {
                await login(storedToken);
            }
        };

        checkAndLogin().catch(error => {
            console.error("😺 Error checkeando token y loggeando: ", error);
            setLoading(false);
        });

        
    }, [])
    
    const login = async (token) => {

        try {
            setTokenToLocalStorage(token)
            const response = await getMe()
            setUser(response)

            setToken(token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("🍔 AuthProvider-login-error: ", error);
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        removeTokenFromLocalStorage()
    }

    const updateUser = (key, value) => {
        setUser( { ...user, [key]: value } )
    }   



    const data = useMemo(() => ({
        accessToken: token,
        user,
        login,
        logout,
        updateUser
    }), [token, user])

 
    if(loading) return  null;


    
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}