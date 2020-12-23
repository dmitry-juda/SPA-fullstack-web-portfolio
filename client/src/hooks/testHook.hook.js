import {useCallback} from 'react' 

export const useText = () => {
    const request =  useCallback(async () => {

        try {

            let res = await fetch('/api/auth/test',{method:'POST',body:null,headers:{}})
            let data = await res.json()


            if (res.ok) {
                return data
            }
            else {
                throw new Error(data.message || 'err')
            }

        } catch(e) {
            return e.message
        }

    },[])

    return { request }
}