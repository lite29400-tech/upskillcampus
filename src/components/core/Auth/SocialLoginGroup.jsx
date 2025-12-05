import React from 'react'
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider, facebookProvider } from '../../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { socialLogin } from '../../../services/operations/authAPI'

const SocialLoginGroup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Extract details
            const email = user.email;
            const displayName = user.displayName || "";
            const [firstName, ...lastNameArr] = displayName.split(" ");
            const lastName = lastNameArr.join(" ") || "User";
            const image = user.photoURL;

            console.log("Google Login Success:", user);

            // Call Backend
            dispatch(socialLogin(email, firstName, lastName, image, navigate));

        } catch (error) {
            console.error("Google Login Error:", error);
        }
    }

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            // Extract details
            const email = user.email; // Facebook might not return email without permissions
            const displayName = user.displayName || "";
            const [firstName, ...lastNameArr] = displayName.split(" ");
            const lastName = lastNameArr.join(" ") || "User";
            const image = user.photoURL;

            if (!email) {
                alert("Facebook did not provide an email. Please use Google or Email Login.");
                return;
            }

            dispatch(socialLogin(email, firstName, lastName, image, navigate));
        } catch (error) {
            console.error("Facebook Login Error:", error);
        }
    }

    return (
        <div className='flex flex-col gap-3 mt-6'>
            <div className='flex items-center gap-2'>
                <div className='h-[1px] w-full bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium text-sm'>OR</p>
                <div className='h-[1px] w-full bg-richblack-700'></div>
            </div>

            <button
                type='button'
                onClick={handleGoogleLogin}
                className='w-full flex justify-center items-center gap-2 rounded-md bg-richblack-800 p-[12px] text-richblack-5 font-medium border border-richblack-700 hover:bg-richblack-700 transition-all duration-200'
            >
                <FaGoogle className="text-yellow-50" />
                Continue with Google
            </button>

            {/* Facebook Button - Optional, kept it here if user configures it later */}
            {/* 
        <button 
            type='button'
            onClick={handleFacebookLogin}
            className='w-full flex justify-center items-center gap-2 rounded-md bg-richblack-800 p-[12px] text-richblack-5 font-medium border border-richblack-700 hover:bg-richblack-700 transition-all duration-200'
        >
            <FaFacebook className="text-[#1877F2]"/>
            Continue with Facebook
        </button> 
        */}
        </div>
    )
}

export default SocialLoginGroup
