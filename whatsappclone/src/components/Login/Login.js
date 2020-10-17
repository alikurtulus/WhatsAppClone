import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import {auth,provider} from '../../firebase.js'
import {actionTypes} from '../../reducer'
import {useStateValue} from '../../StateProvider'

function Login() {
    const [{}, dispatch] = useStateValue()
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((res) => { 
            dispatch({ 
                type:actionTypes.SET_USER,
                user:res.user})
         })
        .catch((err) => {alert(err.message)})
    }
    return (
        <div className="login">
            <div className="login__container" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png" alt="" />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
            <Button onClick={signIn} >SignIn with Google</Button>
            </div>
           
        </div>
    )
}

export default Login
