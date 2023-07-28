// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn check_regex(pattern: &str, value: &str) -> bool {
  let re = regex::Regex::new(pattern).unwrap();
  re.is_match(value)
}


// takes a string in the format of "(R3, G, +7)(R1, D, -6)(R2, D, +5)" and returns an array
// in the format "[[2, 0, 7], [0, 1, -6], [1, 1, 5]]"
#[tauri::command]
fn extract_key(key: &str) -> Vec<Vec<i32>> {
  let mut result = Vec::new();
  let parts = key.split(")(").collect::<Vec<&str>>();

  for part in parts {
      let mut temp = Vec::new();
      let part = part.replace("(", "").replace(")", "");
      let inner_parts = part.split(", ").collect::<Vec<&str>>();

      temp.push(inner_parts[0].replace("R", "").parse::<i32>().unwrap() - 1);
      if inner_parts[1] == "G" {
          temp.push(0);
      } else {
          temp.push(1);
      }

      let third_value = if inner_parts[2].starts_with("+") {
          inner_parts[2][1..].to_string()
      } else {
          inner_parts[2].to_string()
      };

      temp.push(third_value.parse::<i32>().unwrap());
      result.push(temp);
  }

  result
}

// rotates an array by a given amount
#[tauri::command]
fn rotate_array(array: Vec<i32>, direction: isize) -> Vec<i32> {
  let mut new_array = vec![0; array.len()];
  for (i, x) in array.iter().enumerate() {
    new_array[modulo26(i as isize + direction)] = *x;
  }
  new_array
}

// returns the modulo of a number, but always positive
#[tauri::command]
fn modulo26(x: isize) -> usize {
  (((x % 26) + 26) % 26).try_into().unwrap()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      extract_key,
      check_regex,
      rotate_array,
      modulo26
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}