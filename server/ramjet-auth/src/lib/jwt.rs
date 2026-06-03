use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, 
    pub exp: usize, 
}

const SECRET: &[u8] = b"my_secret_key_123";

use jsonwebtoken::{encode, EncodingKey, Header};
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
        &EncodingKey::from_secret(SECRET),
    )
    .expect("JWT creation failed")
}


pub fn verify_jwt(token: &str) -> bool {
    use jsonwebtoken::{decode, DecodingKey, Validation};

    let validation = Validation::default();
    decode::<Claims>(token, &DecodingKey::from_secret(SECRET), &validation).is_ok()
}


