// To keep track of the previous value of the input
let previousValue = "";
// To keep track of if the next step button was clicked
let nextClicked = true;

$(() => {
    $(".encrypt, .decrypt").on("input", async event => {
        const $input = $(event.target);
        const value = $input.val();
        const action = $input.attr("class");
        const reverseAction = (action === "encrypt") ? "decrypt" : "encrypt";
        const $reverseInput = $("." + reverseAction);
        let letter = value[value.length - 1];
        // Capitalize the letter if it is not null
        letter = (letter) ? letter.toUpperCase() : letter;
        let isValid = false;

        // If the input is not empty
        if (value.length !== 0) {
            // Check if the letter is valid
            isValid = await invoke("check_regex", { value: letter, pattern: "[a-zA-Z]" });

            if (previousValue.length === 0) {
                // Clear the other action's input and disable it
                $reverseInput.val("");
                $reverseInput.attr("disabled", true);

                // Disable the other action's button
                $("." + reverseAction + "-button").attr("disabled", true);
            }
        } else {
            // Enable the other action's button
            $reverseInput.attr("disabled", false);

            // Enable the other action's button
            $("." + reverseAction + "-button").attr("disabled", false);
        }

        // If the value has grown and the next step button was clicked
        if (value.length === previousValue.length + 1 && nextClicked && isValid) {
            // Add the new letter to the previous value
            previousValue += letter;
            nextClicked = false;
        }

        if (
            // If the value has shrunk and the next step button was not clicked
            value.length === previousValue.length - 1 && !nextClicked
            // If the value has not yet been encrypted/decrypted
            && previousValue.length !== $("." + reverseAction).val().length
        ) {
            // Remove the last letter from the previous value
            previousValue = previousValue.slice(0, -1);
            nextClicked = true;
        }

        // Output the previous value in the input text area
        $input.val(previousValue);
    });
});