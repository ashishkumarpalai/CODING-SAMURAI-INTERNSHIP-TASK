// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select calculator keys and display element
    let keys = document.querySelectorAll("#keyboard > div");
    let display = document.getElementById("display");
    let input = "";
    // Add click event listeners to calculator keys
    keys.forEach((key) => {
        key.addEventListener("click", function () {
            const keyValue = key.innerText;
            if (keyValue === "C") {
                // Clear input and display
                input = "";
                display.value = "";
            } else if (keyValue === "=") {
                try {
                    // Evaluate the input expression
                    const result = eval(input);
                    if (isNaN(result) || !isFinite(result)) {
                        display.value = "Infinity";
                    } else {
                        // Display the result and update input
                        display.value = result;
                        input = result.toString();
                    }
                } catch (error) {
                    display.value = "Error";
                }
            } else {
                // Append the key's value to the input
                input += keyValue;
                display.value = input;
            }
        });
    });
});
