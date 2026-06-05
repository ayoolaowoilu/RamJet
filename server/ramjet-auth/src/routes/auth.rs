
use axum::{extract::State, Json};
use sqlx::{MySqlPool};

use crate::{types::user_type::{
    User, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserUpdateRequest, UserUpdateResponse
}, utils::{hasher::{hash_password, verify_password}, jwt::{create_jwt, decode_jwt}}};

pub async fn login_fn(
    State(pool): State<MySqlPool>,
    Json(payload): Json<UserLoginRequest>,
) -> Json<UserLoginResponse> {

    let user = sqlx::query!(
        "SELECT * FROM users WHERE email = ?",
        payload.email
    )
    .fetch_optional(&pool)
    .await
    .expect("Failed to fetch user");

    match user {
        Some(user) => {
            
            let is_valid = verify_password(payload.password.as_str(), user.password.as_str());

            if !is_valid {
                return Json(UserLoginResponse {
                    message: "Invalid email or password".into(),
                    status_code: 401,
                    token: String::new(),
                });
            }

         
            let token = create_jwt(&user.id.to_string());

            Json(UserLoginResponse {
                message: "Login successful".into(),
                status_code: 200,
                token: token.into(),
            })
        }

        None => Json(UserLoginResponse {
            message: "Invalid email or password".into(),
            status_code: 401,
            token: String::new(),
        }),
    }
}


pub async fn register_fn(
  State(pool): State<MySqlPool> ,
   Json(payload): Json<UserRegisterRequest>
) -> Json<UserLoginResponse> {
   let user = sqlx::query!("SELECT * FROM users WHERE email = ? OR name = ?", payload.email, payload.name)
   .fetch_optional(&pool)
   .await
   .expect("Failed To register user");

  match user {
     Some(_) => Json(UserLoginResponse {
        message: "Email or name already exists".into(),
        status_code: 400,
        token: String::new(),
     }),
     None => {
   

        let password_hash =  hash_password(payload.password.as_str());
       

       let user_res  = sqlx::query!(
            "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
            payload.email,
            payload.name,
            password_hash
        )
        .execute(&pool)
        .await
        .expect("Failed to insert user");

        let token = create_jwt(&user_res.last_insert_id().to_string());

        Json(UserLoginResponse {
            message: "Registration successful".into(),
            status_code: 201,
            token: token.into(),
        })
     }
  }
}

#[derive(serde::Deserialize)]
pub struct TokenRequest {
    pub token: String,
}

pub async fn get_user_details(
    State(pool): State<MySqlPool>,
    Json(payload): Json<TokenRequest>,
) -> Json<User> {

    let claims = decode_jwt(&payload.token)
        .expect("Invalid token");

    let user = sqlx::query!(
        "SELECT id, email, name, password, role, created_at, updated_at
         FROM users
         WHERE id = ?",
        claims.sub
    )
    .fetch_optional(&pool)
    .await
    .expect("Failed to fetch user")
    .expect("User not found");

    Json(User {
        id: user.id as u32,
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
        created_at: user.created_at.to_string(),
        updated_at: user.updated_at.to_string(),
    })
}


pub async fn update_fn(

  State(pool):State<MySqlPool>,
  Json(payload): Json<UserUpdateRequest>
)-> Json<UserUpdateResponse>{

        let mut updated = String::new();
       if payload.email.is_some() {
                updated.push_str("email, ");
            }
            if payload.name.is_some() {
                updated.push_str("name, ");
            }
             if updated.ends_with(", ") {
                updated.truncate(updated.len() - 2);
             }
         

   let user = sqlx::query!("SELECT * FROM users WHERE id = ? " , payload.id )
   .fetch_optional(&pool)
   .await
   .expect("An error occurred");

    match user {
       Some(user)=>{
              

               sqlx::query!(
                    "UPDATE users SET email = ?, name = ? WHERE id = ?",
                    payload.email,
                    payload.name,
                    payload.id
                )
                .execute(&pool)
                .await
                .expect("Failed to update user");
                
              return Json(UserUpdateResponse
             { message: String::from("User updated successfully")
              , status_code: 200,
              user:Some(User{
                id: user.id as u32,
                email: payload.email.clone().unwrap_or(user.email),
                name: payload.name.clone().unwrap_or(user.name),
                password: user.password,
                role: user.role,
                created_at: user.created_at.to_string(),
                updated_at: user.updated_at.to_string(),
              }),
              updated:updated
             }
             )
       },
       None => {
           return Json(UserUpdateResponse
             { message: String::from("This user dose not exist")
              , status_code: 401,
              user:None,
              updated:updated
             }
             )
       }
    }
}

pub async fn delete_fn(
    State(pool):State<MySqlPool>,
    Json(payload):Json<UserUpdateRequest>
)->Json<UserUpdateResponse>{
   
      let user = sqlx::query!("SELECT * FROM users WHERE id = ? " , payload.id )
   .fetch_optional(&pool)
   .await
   .expect("An error occurred");

   match user {
       Some(user)=>{
           sqlx::query!("DELETE FROM users WHERE id = ? ",payload.id)
           .execute(&pool)
           .await
           .expect("Failed to delete data");

          return Json(UserUpdateResponse {
             message: String::from("deleted user data successfully")
          , status_code: 200,
           user:Some(User{
                id:user.id as u32,
                email:user.email,
                name:user.name,
                password:user.password,
                role:user.role,
                created_at:user.created_at.to_string(),
                updated_at:user.updated_at.to_string()
           }), 
           updated:String::from("Deleted data") })
       },
       None => {
             return Json(UserUpdateResponse { 
            message: String::from("User not found")
          , status_code: 404,
           user:None, 
           updated:String::from("Deleted data") })
       }
   }

}