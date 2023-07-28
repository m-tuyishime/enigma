// invoke tauri
const { invoke } = window.__TAURI__.tauri;

// Configuration key
let key = null;

// Starting position of the rotors
let startConfig = null;
const getStartConfig = async () => {
    if (startConfig !== null)
        return startConfig;
    const file = await fetch(srcPath + "start_config.json");
    startConfig = await file.json();
    return startConfig;
};

// Draws a row of numbers or letters
const drawRow = (arr, id, parentClass) => {
    const className = (id === "l") ? "letter" : "direction";
    arr.forEach((element, index) => {
        const $element = $('<span>', {
            class: className,
            id: id + "-" + index,
        });

        $element.text(
            (element > 0) ? "+" + element : element
        );

        $("#" + id + "-" + index).remove();
        $(parentClass).append($element);
    });
};

const encryptDecrypt = async (action) => {
    // Check if the machine is configured
    if (key === null)
        return alert("Veuillez configurer la machine avant de l'utiliser.");

    const reverseAction = (action === "encrypt") ? "decrypt" : "encrypt";
    // Check pattern of the input
    let $action = $("." + action);
    let pattern = "[A-Z]i"
    let value = $action.val();

    const isValid = await invoke("check_regex", { pattern, value });

    if (!isValid)
        return alert("La lettre a chiffrer est incorrecte. Veuillez entrer un format valid. Exemple: A");

    // Clear the other input
    $("." + reverseAction).val("");

    // Disable the other input and button
    $("." + reverseAction).attr("readonly", true);
    $("." + reverseAction + "-button").attr("disabled", true);

    // Encrypt or decrypts the letter
    const letter = value[value.length - 1];
    const newLetter = await invoke(action, { letter, key });

    // Write the new letter in the other input
    $("." + reverseAction).val(
        $("." + reverseAction).val() + newLetter
    );
};

// Rotates a rotor in the desired direction
const rotateRotor = async (rotorName, direction) => {
    const config = await getStartConfig();
    const $rotor = $("." + rotorName);
    const newRotor = [
        await invoke('rotate_array', { array: config[rotorName][0], direction }),
        await invoke('rotate_array', { array: config[rotorName][1], direction }),
    ];
    startConfig[rotorName] = newRotor;
    $rotor.fadeOut(1000);
    drawRow(newRotor[0], rotorName + "-0", "." + rotorName + " .row0");
    drawRow(newRotor[1], rotorName + "-1", "." + rotorName + " .row1");
    $rotor.fadeIn(1000);
};