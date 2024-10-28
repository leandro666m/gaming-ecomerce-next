
import { ENV } from '@/utils'
import {jwtDecode} from 'jwt-decode'

export const setTokenToLocalStorage = (token) => {

        localStorage.setItem( ENV.TOKEN, token);
}

export const getTokenFromLocalStorage = ( ) => {
       return localStorage.getItem( ENV.TOKEN );
}

export const hasExpired = (token) => {

        const { exp } = jwtDecode(token)

        const currentTime = Date.now() / 1000

        return currentTime > exp
}

export const removeTokenFromLocalStorage = () => {
        localStorage.removeItem( ENV.TOKEN );
}