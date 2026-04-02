import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"


export default function Home(){
    const {user,loading}=useAuth()

    if(user && !loading){
        return <Navigate to={"/profile"} replace/>
    };

    return (
        <div>
            hello home page
        </div>
    )
}