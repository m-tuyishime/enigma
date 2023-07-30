# Enigma Machine Encryption

This project is an implementation of a variant of the Enigma machine encryption used by the German army during World War II, as a part of a cybersecurity class.
The machine is composed of three rotors and a reflector. Each rotor is represented by a 2D array of 26 columns. When a letter is entered, the rotors are traversed from bottom to top until reaching the reflector, and then from top to bottom to find the corresponding encrypted letter.

## Machine Operation

- **Forward Phase**: During the forward phase, the input letter is mapped through the rotors based on the positions in the first line of each rotor. The resulting output of each rotor is used to determine the input column for the next rotor. Finally, the reflector maps the input column to the next rotor's input column for the backward phase.
- **Backward Phase**: The same principle as the forward phase is applied, but using the positions in the second line of each rotor to determine the output column.

## Key and Rotors Configuration

The machine's configuration is determined by a key, which specifies the initial positions and rotation directions of each rotor. The key is represented by three triplets following the format `(Rotor, RotationDirection, InitialPosition)`. For example, `(R3, G, +7)` means that rotor R3 rotates to the left with an initial position 7 steps from the base position.

## User Interface

The user interface is inspired by Figure 2 of the project's instructions and consists of the following components:

- **Rotors Configuration**: Displays the configuration of the three rotors and the reflector.
- **Machine Configuration**: User inputs the key and clicks the "Configure" button to update the machine's configuration.
- **Encryption**: User inputs a letter to be encrypted and clicks the "Encrypter" button to view the encrypted text and the forward and backward paths.
- **Next Step**: User clicks the "Étape Suivante" button to rotate a rotor according to the machine's configuration before adding the next letter.
- **Decryption**: Similar to encryption, but the user inputs a letter to be decrypted, clicks the "Decrypter" button, and the result is displayed in the encryption textbox.

## Building and Running the App

To build the app, open your terminal and run the following commands:

```
npm install
npm run tauri build

```

This command will embed your web assets into a single binary with your Rust code. The binary will be located in `src-tauri/target/release/enigma.exe` and installers will be located in `src-tauri/target/release/bundle/`.

Note: The first time you run the command, it will take some time to collect the Rust crates and build everything.

\*Note: This README.md provides a brief overview of the Enigma machine encryption project. For detailed instructions and user interface examples, please refer to the project's instructions (in French).
