use axum::{extract::State, Json};
use sqlx::MySqlPool;

use argon2::{
    Argon2, PasswordHash, PasswordVerifier, password_hash::{
        rand_core::OsRng,
        SaltString,
        PasswordHasher,
    },
};

use crate::{lib::jwt::create_jwt, types::user_type::{
    UserLoginRequest,
    UserLoginResponse, UserRegisterRequest,
}};

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
       

        sqlx::query!(
            "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
            payload.email,
            payload.name,
            password_hash
        )
        .execute(&pool)
        .await
        .expect("Failed to insert user");

        let token = create_jwt(&user.id.to_string());

        Json(UserLoginResponse {
            message: "Registration successful".into(),
            status_code: 201,
            token: token.into(),
        })
     }
  }
}