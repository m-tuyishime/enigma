pub mod global {
    // validates a string against a regex pattern
    #[tauri::command]
    pub fn check_regex(pattern: &str, value: &str) -> bool {
        let re = regex::Regex::new(pattern).unwrap();
        re.is_match(value)
    }

    // formats user key input
    // takes a string in the format of "(R3, G, +7)(R1, D, -6)(R2, D, +5)" and returns an array
    // in the format "[[2, 0, 7], [0, 1, -6], [1, 1, 5]]"
    #[tauri::command]
    pub fn extract_key(key: &str) -> Vec<Vec<i8>> {
        let mut result = Vec::new();
        let parts = key.split(")(").collect::<Vec<&str>>();

        for part in parts {
            let mut temp = Vec::new();
            let part = part.replace("(", "").replace(")", "");
            let inner_parts = part.split(", ").collect::<Vec<&str>>();

            temp.push(inner_parts[0].replace("R", "").parse::<i8>().unwrap() - 1);
            if inner_parts[1] == "G" {
                temp.push(-1);
            } else {
                temp.push(1);
            }

            let third_value = if inner_parts[2].starts_with("+") {
                inner_parts[2][1..].to_string()
            } else {
                inner_parts[2].to_string()
            };

            temp.push(third_value.parse::<i8>().unwrap());
            result.push(temp);
        }

        result
    }

    // rotates an array by a given amount
    #[tauri::command]
    pub fn rotate_array(array: Vec<i8>, direction: i8) -> Vec<i8> {
        let mut new_array = vec![0; array.len()];
        for (i, x) in array.iter().enumerate() {
            new_array[modulo26(i as i8 + direction) as usize] = *x;
        }
        new_array
    }

    // returns the modulo of a number, but always positive
    #[tauri::command]
        pub fn modulo26(x: i8) -> u8 {
        (((x % 26) + 26) % 26).try_into().unwrap()
    }
}