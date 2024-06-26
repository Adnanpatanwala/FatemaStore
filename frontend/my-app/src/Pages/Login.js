import React, { useState } from 'react'
import styled from 'styled-components';
import LoginOrRegister from '../Components/LoginOrRegister'
import { NavLink } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import ToggleBtn from '../Components/ToggleBtn';
import { FaRegEyeSlash } from "react-icons/fa6"; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
 
import { useAuthContext } from '../Context/AuthContext';
const Login = () => { 

    const {setCookie} = useAuthContext();

     
    const [view,setView] = useState({open:false,type:'password'});
    const [check,setCheck] = useState(true)
    const navigate = useNavigate(); 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
 
    const onSignIn = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_DOMAINURL}/api/v1/login`,{email:email,password:password});
            if(response.status===200){
              
                 setCookie("accessToken",response?.data?.accessToken);
                 setCookie("refreshToken",response?.data?.refreshToken );
                 setCookie("user", response?.data.user.name)
                 setEmail('');
                 setPassword(''); 
                 navigate("/shop"); 
                 window.location.reload();
            } 

        } catch (error) {
            console.log(error);
        }
    }
     
    const onPasswordToggel = ()=>{ 
        setView({...view,open:!view.open,type:view.type === 'password' ? 'text' : 'password'}); 
    }

     

  return ( 
    <Wrapper> 
        <div className="login-container">
            <LoginOrRegister/>
            <div className="right-container-login">
                <form className="login-center-container" onSubmit={onSignIn}>
                    <h4>Nice to see you again!</h4>
                    {/* email-----     */}
                    
                    <PhoneInput placeholder="Enter Phone number"  value={email}
                    onChange={setEmail} flags={flags} defaultCountry='IN' className='phono' />
                    {/* password ------ */}
                    <div className="password-input">
                    <input type={view.type}  placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    
                    />
                    <button className='eye-btn' onMouseDown={onPasswordToggel}>{view.open?<FaRegEye />:<FaRegEyeSlash />}</button>
                    </div>
                    
                    <div className="forgot-container">
                        <span className='togglebtn'>
                            <ToggleBtn check={check}  />
                            <h5>Remember me</h5>
                        </span>
                        <NavLink className='forgotpassword'>forgot password?</NavLink>
                    </div>
                    <button className='signin' type='submit' >Sign in</button>
                    <div className='register-container'>
                    <h5>Don't have an account?</h5>
                    <NavLink className="register" to='/register'>Get Started</NavLink>
                    </div>
                </form>
            </div>
        </div>
    </Wrapper>
  )
}

export default Login;
const Wrapper = styled.div`
position: fixed;
top: 0%;
left: 0%;
width: 100%;
height: 100%;
background: white;
z-index: 1;

.login-container{
    display: grid;
    grid-template-columns: 60% 40%;
    height: 100%;
}
 
.login-center-container{
    width: 360px; 
    margin: auto;
    display: block; 
} 
.right-container-login{
    display: flex;
    align-items: center;
}
.PhoneInput{
    margin: 20px 0px;
}
.login-center-container input{
    width: 88%;
    padding: 6px 20px;
    background-color: #F6F6F6;
    border: 0.1px solid #D2D2D2;
    border-radius: 8px;
}
.login-center-container h4{
    font-size: 18px;
    font-weight: 500;
}
.signin{
    width: 100%;
    padding: 6px 0px;
    background-color: #2D2D2D;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
.forgot-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
}
.forgotpassword{
    font-size: 12px;
    text-decoration: none;
    color: gray;
    font-weight: 500;
}
.register{
    font-size: 14px;
    color: #DB6B97;
    text-decoration: none;
}
.register-container{
    display: flex;
    justify-content: center;
    margin-top:20px;
    gap: 15px;
    font-weight: 500;
}
.togglebtn{
    display: flex;
    align-items: center;
    gap: 10px;
    h5{
        font-size: 12px;
        color: gray;
        font-weight: 300;
    }
} 
.password-input{
    position: relative;
}
.eye-btn{
    border: none;
    background:none;
    font-size: 20px;
    position: absolute;
    right: 10px;
    bottom: 0px; 
    cursor: pointer;
}

@media screen and (min-width:766px) and (max-width:991px) {
    .bottom-img img{
        width: 500px;
    }
    .login-center-container{
        padding: 25px;
    }
}

@media screen and (max-width:767px) {
    .login-container{
        display: block;
    }
    .login-center-container h4{
        font-size: 16px;
    } 
    .bottom-img img{
        max-width: 300px;
        min-width: 280px;
    }
    .bottom-img{
        right: 0px;
    }
    .left-container-login img {
        margin-left: 10px;
        margin-top: 15px;
        width: 80px;
    }
    .right-container-login{
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-30%);
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 85%;
        max-width: 400px;
        box-sizing: border-box;
    }
    .login-center-container input{
        box-sizing: border-box;
        width: 100%;
    }
    .forgot-container{
        display: block;

    }
    .forgotpassword{  
        display: block;
        text-align: right;
    }
    .register-container h5,.register{
        font-size: 12px;
    }
    .register-container{
        gap: 0px;
        justify-content: space-between;
    }
}

`