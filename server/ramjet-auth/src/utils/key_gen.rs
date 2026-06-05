
use rand::rngs::OsRng;
use rand::RngCore;
use hex::encode;

pub fn generate_random_key(len: usize) -> String {
    let mut rng = OsRng;
    let mut key = vec![0u8; len];
    rng.fill_bytes(&mut key);
    return encode(key);
}

