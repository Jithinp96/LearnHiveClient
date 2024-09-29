import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLoginAPI } from "../../api/adminAPI/adminAPI";
import { setAdminToken } from "../../redux/slices/adminSlice";

const AdminSignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();

        try {
            console.log("Inside try adminsign page try");
            
            const response = await adminLoginAPI(email, password);
            console.log("Response Inside admin signin try: ", response);
            
            const token = response?.data?.accessToken;
            console.log("Token from adminSiginFOrm: ", token);
            
            if(response?.data?.success && response.data.accessToken) {
                console.log('Admin login successful:', token);
                dispatch(setAdminToken(response.data.accessToken));
                navigate('/admin/dashboard');
            } else {
                setError('Login failed, please check your credentials');
            }
        } catch (error) {
            console.error('Error during admin login:', error);
            // setError('Login failed, please check your credentials');
        }
    }
    return (
        <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-['Montserrat',sans-serif] min-h-screen py-10">
          <div className={`bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[400px] max-w-full min-h-[600px]`}>
            <div className={`absolute top-0 h-full`}>
                <div className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
                    <img className='h-16' src="../../src/assets/logo/Logo.png" alt="Logo" />
                    <h1 className="text-4xl font-bold m-4">Admin Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#eee] border-none py-3 px-[15px] my-2 w-full" />
                        <button className="rounded-[20px] border border-solid border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-[15px] active:scale-95 focus:outline-none">Sign In</button>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
          </div>
        </div>
      );
}

export default AdminSignInForm;