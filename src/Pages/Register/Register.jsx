import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const { user, createUser, updateUserProfile, signInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((res) => {
                // update user name and phot url
                updateUserProfile(data.name, data.photo)
                    .then(res => {
                        // create a new profile api in mongoDB
                        const userInfo = {
                            user_name: data.name,
                            user_email: data.email,
                            user_password: data.password
                        }
                        axiosPublic.post('/user', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('User update successful')
                                    reset()
                                }
                            })

                    })
                    .catch(() => {
                    })
                toast.success('Registration successful')
                navigate("/")
            })
            .catch(err => {
                const massage = err.code
                const split = massage.split('/')[1].split('-').join(" ")
                toast.error(split)
            })

    }


    const navigate = useNavigate()
    const { state } = useLocation()
    const handleRegistration = e => {
        e.preventDefault()
        const form = new FormData(e.target)
        const name = form.get('name')
        const email = form.get('email')
        const password = form.get('password')
        const photo = form.get('photo')
        const userInfo = { name, email, password, photo }
        console.log(userInfo)
        // if (!password) {
        //     return toast.warn('Please enter your password')
        // }
        // if (!/[A-Z]/.test(password)) {
        //     return toast.warn('Please enter must be uppercase')
        // }
        // if (!/[a-z]/.test(password)) {
        //     return toast.warn('Please enter must be lowercase')
        // }
        // if (!/.{6,}$/.test(password)) {
        //     return toast.warn('Please enter must be 6 characters')
        // }
        // createUser(email, password)
        //     .then((res) => {
        //         console.log(res)
        //         // toast.success('Registration successful')
        //         navigate(state || "/")
        //     })
        //     .catch(err => {
        //         const massage = err.code
        //         const split = massage.split('/')[1].split('-').join(" ")
        //         // toast.error(split)
        //     })

    }
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(res => {
                navigate("/")
            })
            .then(err => {
            })
    }
    return (
        <div className="flex justify-center">
            <ToastContainer />
            <div className=" mt-28 shadow-2xl shadow-[#53492a8e] w-fit p-10 rounded-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                // onSubmit={handleRegistration}
                >

                    <h1 className={`text-5xl text-center font-semibold `}>Register</h1>
                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 my-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=ywULFSPkh4kI&format=png&color=D4AF37" alt="" />
                        <input
                            {...register('name')}

                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="username"
                            type="text"
                            name="name"
                            id="" />
                    </div>

                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 mt-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=12623&format=png&color=D4AF37" alt="" />
                        <input
                            {...register('email', { required: true })}
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="email"
                            type="text"
                            name="email"
                            id="" />
                    </div>
                    {errors.email && <span className="text-red-600">email is required</span>}
                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 mt-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=2862&format=png&color=D4AF37" alt="" />
                        <input
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                maxLength: 10,
                                pattern: /[A-Z]/
                            })}
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="password"
                            type="text"
                            name="password"
                            id="" />
                    </div>
                    {errors.password?.type === 'required' && <span className="text-red-600">password is required</span>}
                    {errors.password?.type === 'minLength' && <span className="text-red-600">password must be 6 characters</span>}
                    {errors.password?.type === 'maxLength' && <span className="text-red-600">password must be less then 10 characters</span>}
                    {errors.password?.type === 'pattern' && <span className="text-red-600">password must be uppercase characters</span>}
                    <div className="flex items-center border-b-2 border-[#D4AF37] gap-2 my-10" >
                        <img className="w-8 h-7 " src="https://img.icons8.com/?size=100&id=2724&format=png&color=D4AF37" alt="" />
                        <input
                            {...register('photo')}
                            className={`pl-3 pr-16 py-2 border-none `}
                            placeholder="photoURL"
                            type="text"
                            name="photo"
                            id="" />
                    </div>

                    <div className="flex mt-10">
                        <button className="rounded-sm w-full text-center py-3 text-xl font-semibold bg-[#D4AF37] hover:shadow-xl duration-300">Sign Up</button>
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
                    <Link to={'/login'}> <span className={`text-[#D4AF37] border-b-2 hover:border-[#D4AF37] border-white `}
                    >SignIn </span>
                    </Link></p>
            </div>
        </div>
    );
};

export default Register;