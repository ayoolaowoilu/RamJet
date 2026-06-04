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
    pub password:Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserUpdateResponse{
    pub message:String,
    pub status_code:u16,
    pub user:User,
}



