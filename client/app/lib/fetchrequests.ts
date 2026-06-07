

const base_ur = process.env.BASE_URL;
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

const fetch_function_generator = async (method:"POST" | "GET", path:string , body:any ) => { 
    const res = await fetch(`${base_ur}${path}`,{
           method:method,
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(body)
    })

    return await res.json()
}

export const  Login = async(data:login_request):Promise<login_response> => {
        try{
            const resp = await fetch_function_generator("POST","/auth/login",data );
           return resp;
        }catch {
           return {
             message:"An error occurred",
             status_code:500,
             token:null
           }
        }
}

export const Register = async(data:register_request):Promise<login_response> => {
         try{
           const resp = await fetch_function_generator("POST","/auth/register",data );
           return resp;
         }catch {
              return {
             message:"An error occurred",
             status_code:500,
             token:null
           }
         }
}

