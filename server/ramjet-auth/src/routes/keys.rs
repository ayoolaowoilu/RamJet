use axum::{Json, extract::State};
use sqlx::MySqlPool

use crate::types::keys_types::CreateKeyRequest;


pub async fn generate_key(
    State(pool):State<MySqlPool> , 
    Json(payload):Json<CreateKeyRequest>
){
   
}