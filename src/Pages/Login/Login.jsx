import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const Login = () => {
    const { user, loginUser, signInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.state)
    const captchaRef = useRef(null)
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(4);
    }, [])
    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
        loginUser(email, password)
            .then(res => {
                navigate(location?.state || '/')
                toast.success('Login successful')
                // console.log(res.user)
            })
            .catch(err => {
                console.log(err)
            })
        console.log(email, password)
    }
    const handleValidation = () => {
        const captchaValue = captchaRef.current.value
        if (validateCaptcha(captchaValue)) {
            setDisable(false)
        }

    }
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(res => {

                const userInfo = {
                    user_name: res.user?.displayName,
                    user_email: res.user?.email
                }
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state || '/')
                    })


            })
            .then(err => {
            })
    }
    return (
        <div className="flex justify-center">
            <ToastContainer />
            <div className=" mt-28 shadow-2xl shadow-[#53492a8e] w-fit p-10 rounded-md">
                <form
                    onSubmit={handleLogin}
                >
                    <h1 className={`text-5xl text-center font-semibold `}>Login</h1>

                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 my-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=12623&format=png&color=D4AF37" alt="" />
                        <input
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="email"
                            type="text"
                            name="email"
                            id="" />
                    </div>
                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 my-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=2862&format=png&color=D4AF37" alt="" />
                        <input
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="password"
                            type="text"
                            name="password"
                            id="" />
                    </div>
                    <LoadCanvasTemplate />
                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 mb-3" >
                        <input
                            ref={captchaRef}
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="type the text above"
                            type="text"
                            name="captcha"
                            id="" />
                    </div>
                    <button
                        onClick={handleValidation}
                        className="btn btn-sm w-full">valideted</button>
                    <div className="flex mt-10">
                        <button
                            disabled={disable}
                            className="rounded-sm w-full text-center py-3 text-xl font-semibold bg-[#D4AF37] hover:shadow-xl duration-300">Sign In</button>
                    </div>
                </form>
                <div className="flex pt-4 mt-4 border-t-2">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex justify-center items-center  rounded-sm w-full  py-3 text-xl font-semibold bg-[#D4AF37] hover:shadow-xl duration-300">
                        <img className="w-7" src="https://img.icons8.com/?size=100&id=17950&format=png&color=000000" alt="" />
                        oogle
                    </button>
                </div>
                <p className={`pt-2 text-center `}>You have a account?
                    <Link to={'/register'}> <span className={`text-[#D4AF37] border-b-2 hover:border-[#D4AF37] border-white `}
                    >Signup </span>
                    </Link></p>
            </div>
        </div>
    );
};

export default Login;