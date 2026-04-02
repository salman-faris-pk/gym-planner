import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"


export default function Profile(){
    const {user,loading}=useAuth()
    const plan=false;
    
        if(!user && !loading){
            return <Navigate to={"/auth/sign-in"} replace/>
        }

        if(!plan){
            return <Navigate to={"/onboarding"} replace/>
        };

    return (
        <div>
            hello Profile page
        </div>
    )
}