
import { decrypt, encrypt } from "./encryptor.";

export type user = {
     id : number,
     name:string,
     email:string,
     password:string,
     created_at:string,
     updated_at:string
}

const base_url = "http://localhost:5140";

export async function Create_session(token:string , session_type:"LATE" | "EARLY"){
     try {
     const response = await fetch(`${base_url}/auth/profile`,{
             method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({ token })
      })

      const data = await response.json()
    

      const session_id = Math.floor(Math.random() * 900000000);
      const expiry_date = Date.now() + 1000 * 60 * 60 * 24 * 5;
      const session_data = { ...data , session_id , expiry_date , session_type}
      console.log(session_data)
      const encrypted_session_data = encrypt(JSON.stringify(session_data))
      
     if (session_type == "EARLY"){
            sessionStorage.setItem("session",JSON.stringify({session_id,expiry_date,_sk:encrypted_session_data}))
     }else{
            localStorage.setItem("session",JSON.stringify({session_id,expiry_date,_sk:encrypted_session_data}))
     }
     

     }catch(error) {
            console.log(error)
            throw new Error("Error Creating session try logging in again!")
     }
}

export function Get_session_data(){
        let status:"Loading"|"Unauthorized" | "Ready" = "Loading"
        const data = localStorage.getItem("session") || sessionStorage.getItem("session")
        if(!data){
              return {error:"Please login or register , no active session found "}
        }
        const parsed_string = JSON.parse(data as string);
        if(Date.now() >= parsed_string.expiry_date){
             return { error : "Session expired" }
        }
        const decrypted_data = JSON.parse(decrypt(parsed_string._sk))
        status = "Ready"

        return {user:decrypted_data , status:status}
        

}

export function Delete_session(){
      localStorage.removeItem("session")
      sessionStorage.removeItem("session")
}