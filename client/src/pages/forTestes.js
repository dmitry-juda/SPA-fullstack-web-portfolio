import React,{useState} from 'react'
import {useText} from '../hooks/testHook.hook'

console.log('START TEST')

export const TestPage = () => {

    let fromHook = '...'

    const {request} = useText()

    fromHook = async () => {
        try {
            console.log('выполняю запрос....')
            const rq = await request()  
        } catch (error) {
            return 'err'
        }

    } 

    let [isOn,tumbler] = useState(false)

    const setOn = () => tumbler(true)
    const setOff = () => tumbler(false)

    let stateIs = isOn ? 'turned on' : 'turned off'

    return(
        <div>
            state: {stateIs} : ({fromHook()})
            <br />
            <button onClick={setOn}>on</button><button onClick={setOff}>off</button>
        </div>
    )
}