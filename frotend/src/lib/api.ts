import type { UserProfile } from "../types"


const BASE_URL= import.meta.env.VITE_API_URL || "http://localhost:3009"


async function post(path: string, body: object){
    const res= await fetch(`${BASE_URL}/api${path}`,{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if(!res.ok){
        throw new Error(
            (await res.json().catch(()=> ({}))).error || "Request failed"
        );
    };

    return res.json();
}

// async function get(path: string, body: object){

// }


export const api = {
   SaveProfile: (userId: string, profile: Omit<UserProfile, 'userId' | 'updatedAt'>) => {
      return post("/profile", {userId, ...profile})
   },
   GeneratePlan: (userId:string) =>{
     return post("/plan/generate", { userId})
   }

}