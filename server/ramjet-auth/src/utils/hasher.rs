use argon2::{
    Argon2, PasswordHash, PasswordVerifier, password_hash::{
        rand_core::OsRng,
        SaltString,
        PasswordHasher,
    },
};


pub fn hash_password(password: &str) -> String {
   let salt = SaltString::generate(&mut OsRng);

  return Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .unwrap()
        .to_string();

}

pub fn verify_password(password: &str, hash: &str) -> bool {

             let parsed_hash =
                PasswordHash::new(hash)
                    .expect("Invalid password hash");

                return  Argon2::default()
                .verify_password(
                 password.as_bytes(),
                    &parsed_hash,
                )
                .is_ok();

}