import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import style from '../components/form.css'

import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'


export const AuthPage = () => {


    const message = useMessage()

    const {loading,request,error,clearErrors} = useHttp() 

    const [form,setForm] = useState({
        username:'',
        password:''
    })

    useEffect(() => {
        message(error)
        clearErrors()
    },[error,message,clearErrors])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {

            const data = await request('api/auth/register','POST',{...form})
            console.log('data',data)

        } catch(e) {
            throw(e.message)
        }
    }

    let wreak = loading ? '...' : 'screw it'
    let knock = loading ? 'is knocking...' : 'knock it'

    return(
        <div className="container">
            <div className="authForm">
                <label className='gray'>control panel</label>entrance
                <input placeholder="user" name="username" id="username" type="text"
                    onChange={changeHandler}
                 />
                <input placeholder="passcode" className="password" name="password" id="password" type="password" 
                    onChange={changeHandler}
                />
                <button name="signin" id="signin">{knock}</button>
                <button name="regin" id="regnin"
                    onClick={registerHandler}
                    disabled={loading}
                >{wreak}</button>
                <label id="error" name="error"></label>
            </div>
        </div>

    )   
}