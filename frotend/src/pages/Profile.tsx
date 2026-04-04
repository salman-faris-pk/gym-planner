import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"


export default function Profile(){
    const {user,loading}=useAuth()
    const plan=true;
    
        if(!user && !loading){
            return <Navigate to={"/auth/sign-in"} replace/>
        }

        if(!plan){
            return <Navigate to={"/onboarding"} replace/>
        };

    return (
        <div>
            heyllo! from Profile page
        </div>
    )
}