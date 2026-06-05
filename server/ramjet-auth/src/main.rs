use axum::{ Router, routing::{ post}};

use crate::routes::{auth::{delete_fn, get_user_details, login_fn, register_fn, update_fn}, keys::{delete_key, generate_key, update_key}};
use sqlx::MySqlPool;
mod routes;
mod types;
mod utils;
use std::env;
use dotenvy::dotenv;



#[tokio::main]
async fn main() {
dotenv().ok();
  let database_url = env::var("DATABASE_URL")
  .expect("This Key is required");

  let pool = MySqlPool::connect(&database_url)
  .await
  .unwrap();
  

let app = Router::new()
.route("/auth/login", post(login_fn))
.route("/auth/register", post(register_fn))
.route("/auth/profile", post(get_user_details))
.route("/auth/update", post(update_fn))
.route("/auth/delete", post(delete_fn))
.route("/keys/generate", post(generate_key))
.route("/keys/delete", post(delete_key))
.route("/keys/update", post(update_key))
.with_state(pool);


  let listener = tokio::net::TcpListener::bind("0.0.0.0:5140")
    .await
    .unwrap();

      println!(
        "Server is running on http://{}",
         String::from("localhost:5140")
    );

    axum::serve(listener, app)
    .await
    .unwrap();
   



}


