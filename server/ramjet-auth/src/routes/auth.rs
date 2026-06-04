use std::ptr::null;

use axum::{extract::State, Json};
use sqlx::MySqlPool;

use argon2::{
    Argon2, PasswordHash, PasswordVerifier, password_hash::{
        rand_core::OsRng,
        SaltString,
        PasswordHasher,
    },
};

use crate::{types::user_type::{
    User, UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserUpdateRequest, UserUpdateResponse
}, utils::jwt::{create_jwt, decode_jwt}};

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
            
            let parsed_hash =
                PasswordHash::new(user.password.as_str())
                    .expect("Invalid password hash");

            let is_valid = Argon2::default()
                .verify_password(
                    payload.password.as_bytes(),
                    &parsed_hash,
                )
                .is_ok();

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
      let salt = SaltString::generate(&mut OsRng);

        let password_hash = Argon2::default()
        .hash_password(payload.password.as_bytes(), &salt)
        .unwrap()
        .to_string();
       

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
   let user = sqlx::query!("SELECT * FROM users WHERE id = ? " , payload.id )
   .fetch_optional(&pool)
   .await
   .expect("An error occured");
    
    match user {
       Some(user)=>{
            
       },
       None => {
           return Json(UserUpdateResponse
             { message: String::from("This user dose not exist")
              , status_code: 401,
              user:User{
                id:122,
                password:String::new(),
                name:String::new(),
                email:String::new(),
                created_at:String::new(),
                updated_at:String::new(),
                role:String::new()
              }
             }
             )
       }
    }
}