import { ENV }  from '@/utils'


export const RegisterApi =  async (data) => {
        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
            const params = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if (response.status !== 200)  throw result
            
            return result

        } catch (error){
            console.error("🐙 error: ", error);
            throw new Error(error)
        }

    }
    
    
export const LoginApi = async (data) => {

        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
            const params = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if (response.status !== 200)  throw result
            
            return result

        } catch (error){
            console.error("🦜 error: ", error);
            throw new Error(error)
        }

    }


