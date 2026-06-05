use axum::{Json, extract::State};
use sqlx::MySqlPool;

use crate::{types::keys_types::{CreateKeyRequest, DeleteKeyRequest, KeyResponse}, utils::key_gen::generate_random_key};


pub async fn generate_key(
    State(pool):State<MySqlPool> , 
    Json(payload):Json<CreateKeyRequest>
)-> Json<KeyResponse> {
  
  let mut key = String::from("rj_sktoken");
   key.push_str(&generate_random_key(32));

  sqlx::query!("INSERT INTO secret_keys(user_id,name,_key,region,plan) VALUE(?,?,?,?,?)",
  payload.user_id,payload.name,key,payload.region,payload.plan)
  .execute(&pool)
  .await
  .expect("Failed to create key");

   return Json(KeyResponse{
       message:String::from("Successfully created your key"),
       status_code:200,
       token:Some(key)
   });

}

pub async fn delete_key(
     State(pool): State<MySqlPool>,
     Json(payload):Json<DeleteKeyRequest>
) -> Json<KeyResponse>{
  let key = sqlx::query!("SELECT * FROM secret_keys WHERE _key = ?",payload.token)
  .fetch_optional(&pool)
  .await
  .expect("Error Deleting data");

    match key {
         Some(key)=>{
             sqlx::query!("DELETE FROM secret_keys WHERE _key = ?",payload.token) 
             .execute(&pool)
             .await
             .expect("Error in Deleting key");
              
          return Json(KeyResponse { 
                message: String::from("This key has been deleted"),
             status_code: 401,
              token:key._key });

         },
         None => {
            
            return Json(KeyResponse { 
                message: String::from("This key cannot be found"),
             status_code: 401,
              token:None });
         }
    }
}