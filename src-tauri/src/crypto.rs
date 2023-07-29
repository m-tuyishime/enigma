pub mod crypto {
    use crate::global::global::modulo26;

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Config {
        refl: [i8; 26],
        l: [char; 26],
        r0: [[i8; 26]; 2],
        r1: [[i8; 26]; 2],
        r2: [[i8; 26]; 2],
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Path {
        refl: u8,
        l: [u8; 2],
        r0: [u8; 2],
        r1: [u8; 2],
        r2: [u8; 2],
    }

    #[tauri::command]
    pub fn encrypt_decrypt(letter: char, config: Config) -> (char, Path) {
        let mut path = Path {
            refl: 0,
            l: [0, 0],
            r0: [0, 0],
            r1: [0, 0],
            r2: [0, 0],
        };

        // turn letter to uppercase and get index
        let letter = letter.to_ascii_uppercase();
        let mut letter_index: i8 = config.l.iter().position(|&l| l == letter).unwrap() as i8;
        path.l[0] = letter_index as u8;

        let mut r0_index: i8 = letter_index;
        path.r0[0] = path.l[0];

        let mut r1_index: i8 = (path.r0[0] as isize + config.r0[0][path.r0[0] as usize] as isize) as i8;
        path.r1[0] = modulo26(r1_index);

        let mut r2_index: i8 = (path.r1[0] as isize + config.r1[0][path.r1[0] as usize] as isize) as i8;
        path.r2[0] = modulo26(r2_index);

        let refl_index: i8 = (path.r2[0] as isize + config.r2[0][path.r2[0] as usize] as isize) as i8;
        path.refl = modulo26(refl_index);

        r2_index = (path.refl as isize + config.refl[path.refl as usize] as isize) as i8;
        path.r2[1] = modulo26(r2_index);

        r1_index = (path.r2[1] as isize + config.r2[1][path.r2[1] as usize] as isize) as i8;
        path.r1[1] = modulo26(r1_index);

        r0_index = (path.r1[1] as isize + config.r1[1][path.r1[1] as usize] as isize) as i8;
        path.r0[1] = modulo26(r0_index);

        letter_index = (path.r0[1] as isize + config.r0[1][path.r0[1] as usize] as isize) as i8;
        path.l[1] = modulo26(letter_index);

        (config.l[path.l[1] as usize] as u8 as char, path)
    }
}
