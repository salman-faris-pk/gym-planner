/* eslint-disable */

import { authClient } from "@/lib/auth";
import type { User } from "@/types"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);


export default function AuthProvider({ children }:{children: ReactNode}){

    const [neonUser,setNeonUser]=useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
       async function laodUser(){
         try {
            const result= await authClient.getSession();
            if(result && result.data?.user){
                setNeonUser(result.data.user)
            }else{
                setNeonUser(null);
            }
         } catch {
                setNeonUser(null)
         }finally{
            setLoading(false); 
         }
       }

       laodUser()
    },[]);

   return <AuthContext.Provider value={{user: neonUser,loading}}>
       {children}
   </AuthContext.Provider>
}


export function useAuth(){
    const context= useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    };
    return context;
};