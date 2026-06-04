use std::env;
use dotenvy::dotenv;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, 
    pub exp: usize, 
}


fn jwt_secret() -> Vec<u8> {
    dotenv().ok();

    env::var("JWT_SECRET")
        .expect("JWT_SECRET must be set")
        .into_bytes()
}


use jsonwebtoken::{encode, EncodingKey, Header ,decode, DecodingKey, Validation };
use chrono::{Utc, Duration};

pub fn create_jwt(user_id: &str) -> String {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .expect("valid time")
        .timestamp() as usize;

    let claims = Claims {
        sub: user_id.to_string(),
        exp: expiration,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(&jwt_secret()),
    )
    .expect("JWT creation failed")
}


// pub fn verify_jwt(token: &str) {


//     let validation = Validation::default();
//          decode::<Claims>(token, 
//          &DecodingKey::from_secret(SECRET), 
//          &validation).is_ok();

         
// }

pub fn decode_jwt(token: &str) -> Option<Claims> {
    let mut validation = Validation::default();
    validation.validate_exp = true;

    let result = decode::<Claims>(
        token,
        &DecodingKey::from_secret(&jwt_secret()),
        &validation,
    );

    match result {
        Ok(data) => Some(data.claims),
        Err(_) => None,
    }
}




