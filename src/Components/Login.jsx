import React from 'react'
import { useAppContext } from '../Context/AppContext';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { showUserLogin, setShowUserLogin, setUser, axios} = useAppContext();
    const navigate = useNavigate();


    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try{
        const {data} = await axios.post(state ==='login' ? '/api/user/login' : '/api/user/register', {
            email, password, 
            ...(state === "register" && { name })

        })
        if(data.success){
            setUser(data.user);
            setShowUserLogin(false);
            console.log("Login/Register success:", data);
            toast.success("Welcome!");
            navigate('/');

        }else{
            console.log("Failed:", data.message);
            toast.error(data.message);
        }
        }catch (error) {
            console.error("Error in login/register:", error);
        }
    }

    

    return (
        <div  onClick={() =>setShowUserLogin(false)} className="fixed inset-0 flex justify-center items-center bg-black/20 z-50">
        <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()}  className="z-30 flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white mt-32">
            <p className="text-2xl font-medium m-auto">
                <span style={{ color: 'var(--color-primary-dull)' }} >User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="cursor-pointer" style={{ color: 'var(--color-primary-dull)' }}>click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className=" cursor-pointer" style={{ color: 'var(--color-primary-dull)' }}>click here</span>
                </p>
            )}
            <button style={{ background: 'var(--color-primary-dull)' }} className=" transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
        </div>
    );
};


export default Login
