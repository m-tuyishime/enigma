// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod crypto;
mod global;

use global::global::*;
use crypto::crypto::*;

// allows the front-end to call the rust functions
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      extract_key,
      check_regex,
      rotate_array,
      modulo26,
      encrypt_decrypt,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}