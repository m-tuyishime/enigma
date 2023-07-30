// invoke tauri
const { invoke } = window.__TAURI__.tauri;

// Configuration key
let key = null;

let rotationCount = 0;

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
    let $action = $("." + action);
    let value = $action.val();

    // Encrypt or decrypts the letter
    const letter = value[value.length - 1];
    const [newLetter, path] = await invoke("encrypt_decrypt", { letter, config: startConfig });

    // Adds the new letter to the other action's input
    $("." + reverseAction).val(
        $("." + reverseAction).val() + newLetter
    );

    // Iluminate the path
    $("#refl-" + path.refl).addClass("red");
    $("#r2-0-" + path.r2[0]).addClass("red");
    $("#r2-1-" + path.r2[1]).addClass("blue");
    $("#r1-0-" + path.r1[0]).addClass("red");
    $("#r1-1-" + path.r1[1]).addClass("blue");
    $("#r0-0-" + path.r0[0]).addClass("red");
    $("#r0-1-" + path.r0[1]).addClass("blue");
    $("#l-" + path.l[0]).addClass("red");
    $("#l-" + path.l[1]).addClass("blue");
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