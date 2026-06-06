# Ramjet-auth Documentation

- ## Routes (users authentication)

 ### POST /auth/login

 this is for the login function

  * request :
 ```text 
    ```json

      {"email":"johndoe@gmail.com",
        "password":"givebread123"
      }
    ```
 ```

 * response :
 ```text 
    ```json

      {"message":"Login is successful" ,
        "status_code":200 // or 401 if password is not correct,
         "token":Some(token) // or None is password aint correct
      }
    ```
 ```


 ### POST /auth/register

   * request :
 ```text 
    ```json

      {"email":"johndoe@gmail.com",
        "password":"givebread123",
        "name:"John doe"
      }
    ```
 ```

 * response :
 ```text 
    ```json

      {"message":"Login is successful" , // or email or name is already taken  
        "status_code":200 , // or 401
         "token":Some(token) ,
      }
    ```
 ```

### POST /auth/update

  * request :
 ```text 
    ```json

      {"email":"johndoe@gmail.com", // optional
        "name":"givebread123", // optional
        "id": 12345 // essential
      }
    ```
 ```

 * response :
 ```text 
    ```json

      {"message":"Data updated successfully" // or email or name is already taken  ,
        "status_code":200  // or 401,
         user:{
              id:1234,
              name:"john doe",
              email:"johndoe@gmail.com",
              password:"#randomhash",
              created_at:TIMESTAMP,
              updated_at:TIMESTAMP,
              role:"normal"
         },
         updated:"email,name"
      }
    ```
 ```

 ### POST /auth/delete

  * request :
 ```text 
    ```json

      {
        "id": 12345 // essential
      }
    ```
 ```

 * response :
 ```text 
    ```json

      {"message":"Login is successful" // or email or name is already taken  ,
        "status_code":200  // or 401,
         "updated": "Deleted data successfully" ,
      }

    ```
 ```

 ### POST /auth/profile

   * request :
 ```text 
    ```json

      {
        token:"#Your session token" // essential
      }
    ```
 ```

 * response :
 ```text 
    ```json

     {
              id:1234,
              name:"john doe",
              email:"johndoe@gmail.com",
              password:"#randomhash",
              created_at:TIMESTAMP,
              updated_at:TIMESTAMP,
              role:"normal"
         }

    ```
 ```


 ### Rust types code

 ```text 
   ```rust 
   use serde::{Serialize, Deserialize};



#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User{
  pub id:u32, 
  pub email:String,
  pub name:String,
  pub password:String,
  pub role:String,
  pub created_at: String,
  pub updated_at: String,
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserLoginRequest{
    pub email:String,
    pub password:String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserRegisterRequest{
    pub email:String,
    pub name:String,
    pub password:String,
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserLoginResponse{
    pub message:String,
    pub status_code:u16,
    pub token:String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserUpdateRequest{ 
    pub email:Option<String>,
    pub name:Option<String>,
    pub id:u32
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserUpdateResponse{
    pub message:String,
    pub status_code:u16,
    pub user:Option<User>,
     pub updated:String
}

 ```