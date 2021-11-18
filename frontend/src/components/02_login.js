import React, { useState } from 'react';
import axios from 'axios';
 
function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    // id, passwd => msg, userId, sessionId
    // Success or failure errors are determined as msg, and the session ID and user ID are stored in the session storage, and used for user authentication.
    const onClickLogin = () => {
        axios.post('http://172.30.1.14:4000/user/login', 
        {
            'id': inputId,
            'passwd': inputPw
        }, 
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                alert(res.data.userId)
                sessionStorage.setItem('userId', res.data.userId)
                sessionStorage.setItem('sessionId', res.data.sessionId)
            } else {
                alert(res.data.msg)
            }
            document.location.href = '/'
        })
        .catch()
    }
 
    return(

        <main class="form-signin">
            <form>
                <input hidden="hidden" />
                <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
                <h1 class="h3 mb-3 fw-normal">Login</h1>
                <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='input_id' value={inputId} onChange={handleInputId}/>
                <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='input_pw' value={inputPw} onChange={handleInputPw}/>
                <label for="floatingPassword">Password</label>
                </div>
                <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" onClick={onClickLogin}>Login</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
        </main>
    )
}
 
export default Login;