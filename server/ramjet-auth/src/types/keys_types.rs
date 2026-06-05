use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateKeyRequest {
     pub user_id : u32,
     pub region : String,
     pub name : String,
     pub plan : String,
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct KeyResponse {
    pub message:String,
    pub status_code:u16,
    pub token:Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DeleteKeyRequest {
      pub user_id : u32,
      pub token : String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UpdateKeyStats {
     pub user_id : u32,
     pub token : String,
     pub plan : Option<String>,
     pub update_type : String
}
