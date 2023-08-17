// This script enhances code blocks on an HTML page by adding a copy button to each code block.
// It uses FontAwesome icons for visual representation and the ClipboardJS library for clipboard interactions.


const isClassExisted = (element, className) => {
    return element.classList.contains(className)
}

const addClass = (element, className) => {
    const classList = element.classList;
    if (!isClassExisted(element, className)) {
        classList.add(className)
    }
}

const removeClass = (element, className) => {
    const classList = element.classList;
    if (isClassExisted(element, className)) {
        classList.remove(className)
    }
}


// Wait for the DOM to be fully loaded before executing the following code.
document.addEventListener('DOMContentLoaded', function () {
    const DELAY_BEFORE_EXECUTION = 1000; // 1 second delay to ensure all elements are loaded.

    // Delay execution to allow all elements to be properly loaded and ready.
    setTimeout(() => {
        // Select all pre elements with class "highlight" to target code blocks.
        const codeBlocks = document.querySelectorAll('.highlight pre');

        // Initialize the ClipboardJS library using the ".copy-btn" class selector.
        const clipboard = new ClipboardJS('.copy-btn');

        // Define constants for FontAwesome icon classes, button class, and icon change delay.
        const FA_SOLID_CLASS = 'fas';
        const FA_COPY_ICON_CLASS = 'fa-copy';
        const FA_COPIED_ICON_CLASS = 'fa-check';
        const COPIED_CLASS = "copied";
        const COPY_BUTTON_CLASS = 'copy-btn';

        // Iterate through each code block element.
        codeBlocks.forEach(function (block) {
            // Create a copy button by appending a div element with the appropriate class.
            const btn = document.createElement('div');
            btn.className = COPY_BUTTON_CLASS;

            // Create an icon element using FontAwesome for the button.
            const icon = document.createElement('i');
            addClass(icon, FA_SOLID_CLASS);
            addClass(icon, FA_COPY_ICON_CLASS);
            btn.appendChild(icon);

            // Extract the text content of the code within the <code> element.
            const innerText = block.querySelector("code").innerText;

            // Set the data attribute with the code content for clipboard copying.
            btn.setAttribute('data-clipboard-text', innerText);

            // Prepend the copy button to the beginning of the code block.
            block.prepend(btn);
        });

        // Handle successful clipboard copying.
        clipboard.on('success', function (e) {
            // Temporarily switch the icon to a clipboard icon for visual feedback.
            const icon = e.trigger.querySelector('i');
            const btn = e.trigger;

            removeClass(icon, FA_COPY_ICON_CLASS);
            addClass(icon, FA_COPIED_ICON_CLASS);
            addClass(btn, COPIED_CLASS);

            // Revert the icon to the copy icon after a short delay.
            setTimeout(function () {
                removeClass(icon, FA_COPIED_ICON_CLASS);
                removeClass(btn, COPIED_CLASS);
                addClass(icon, FA_COPY_ICON_CLASS);
            }, DELAY_BEFORE_EXECUTION);

            // Clear the user's selection (highlighting) to provide feedback.
            e.clearSelection();
        });

        // Handle any errors that occur during clipboard copying.
        clipboard.on('error', function (e) {
            // Display an error message, such as in a console.
            console.error("Failed to copy.");
        });
    }, DELAY_BEFORE_EXECUTION);
});
