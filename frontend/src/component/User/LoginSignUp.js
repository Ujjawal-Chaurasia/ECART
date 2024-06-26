import React, { Fragment ,useRef,useState,useEffect} from 'react'
import "./LoginSignUp.css"
import Loading from "../loader/loader"
import {Link} from "react-router-dom"
import {MailOutline,LockOpen,Face} from "@material-ui/icons"
import { useDispatch,useSelector } from 'react-redux'
import {login,clearErrors,register} from "../../actions/userAction"

import { useAlert } from 'react-alert'
const LoginSignUp = ({history,location}) => {

    const dispatch=useDispatch();
    const alert =useAlert();

    const {error,loading,isAuthenticated} =useSelector(state=>state.user)

    const loginTab= useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
    const {name,email,password}=user;
    const [avatar,setAvatar]=useState()
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png")

    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
        
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm));

    }

    const registerDataChange=(e)=>{
        if(e.targete.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    const redirect=location.search?location.search.split("=")[1]:"/account"
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isAuthenticated){
            history.push(redirect)
        }

    },[alert, dispatch, error, history, isAuthenticated, redirect])
    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft");

        }
        if(tab==="register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");       
            
            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft");            
        }
    }
  return (
        <Fragment>
            {loading?<Loading/>:
                <Fragment>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                                <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form action="" ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                            <div className="loginEmail">
                                <MailOutline/>
                                <input 
                                type="email" 
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e)=>setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpen/>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e)=>setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login"  className="loginBtn"/>
                        </form>
                        <form 
                        className='signUpForm'
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                        >
                            <div className="signUpName">
                                <Face/>
                                <input 
                                type="text" 
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <MailOutline/>
                                <input 
                                type="email"
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <MailOutline/>
                                <input 
                                type="password"
                                placeholder='Password'
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                                />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                            </div>
                            <input type="submit" value="Register" className='signUpBtn'/>
                        </form>
        
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>
  )
}

export default LoginSignUp