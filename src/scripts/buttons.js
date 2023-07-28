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
})