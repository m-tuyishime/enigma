$(() => {
    // Configure button
    $(".configure").click(async () => {
        // Check pattern
        let $key = $(".key");
        let pattern = $key.attr("pattern");
        let value = $key.val();

        const isValid = await invoke("check_regex", { pattern, value });

        if (!isValid)
            return alert("La cle est incorrecte. Veuillez entrer un format valid. Exemple: (R3, G, 7)(R1, D, -6)(R2, D, 5)");

        $key.attr("disabled", true);
        $(".configure").attr("disabled", true);

        key = await invoke("extract_key", { key: value });

        // sets the desired starting position of the rotors
        key.forEach(element => {
            const rotorName = "r" + element[0];
            const direction = element[2];

            rotateRotor(rotorName, direction);
        });
    });

    // Encrypt button
    $(".encrypt-button").click(async () => {
        await encryptDecrypt("encrypt");
    });

    // Decrypt button
    $(".decrypt-button").click(async () => {
        await encryptDecrypt("decrypt");
    });

    // Reset button
    $(".reset").click(() => {
        location.reload();
    });

    // Next step button
    $(".next").click(async () => {
        // Check if the machine is configured
        if (key === null)
            return alert("Veuillez configurer la machine avant de l'utiliser.");

        if ($(".encrypt").val() === "" || $(".decrypt").val() === "" || nextClicked)
            return alert("Veuillez d'abord chiffrer ou déchiffrer une lettre.");

        // Clears last path
        $(".red").removeClass("red");
        $(".blue").removeClass("blue");

        // sets the state of the next button to true to allow for more input
        // (check src\scripts\input.js)
        nextClicked = true;

        // Check if the rotor has done a full rotation
        // (check src\scripts\global.js)
        if (rotationCount === 26) {
            rotationCount = 0;
            key = [key[1], key[2], key[0]];
        }

        // Rotates the rotors
        rotateRotor("r" + key[0][0], key[0][1]);
        rotationCount++;
    });
});