use axum::{ Router, routing::{ post}};

use crate::routes::auth::{login_fn, register_fn};
use sqlx::MySqlPool;
mod routes;
mod types;
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
.route("/login", post(login_fn))
.route("/register", post(register_fn,))
.with_state(pool);

  let listener = tokio::net::TcpListener::bind("0.0.0.0:5140")
    .await
    .unwrap();

    axum::serve(listener, app)
    .await
    .unwrap();
   
    println!(
        "Server is running on http://{}",
         String::from("localhost:5140")
    );


}


