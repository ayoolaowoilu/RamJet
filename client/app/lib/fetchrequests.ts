

const base_ur = "http://localhost:5140";
export type login_request = {
        email :string
        password : string
}

export type register_request = {
     email : string ,
     password : string , 
     name : string
}

export type login_response = {
    message:string,
    status_code:number,
    token:string | null
}


export const  Login = async(data:login_request):Promise<login_response> => {
        try{
            const resp = await fetch(`${base_ur}/auth/login`,{
               method:"POST",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(data)
            })
           return await resp.json();
        }catch (error){
           console.log(error)
           return {
             message:"An error occurred",
             status_code:500,
             token:null
           }
        }
}

export const Register = async(data:register_request):Promise<login_response> => {
         try{
         const resp = await fetch(`${base_ur}/auth/register`,{
               method:"POST",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(data)
            })
           return await resp.json();
         }catch (error) {
           console.log(error)
              return {
             message:"An error occurred",
             status_code:500,
             token:null
           }
         }
}

