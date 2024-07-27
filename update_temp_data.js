function removeElementsByClass(className) {
    // Get all elements with the specified class
    const elements = document.querySelectorAll(`.${className}`);
    
    // Iterate over each element and remove it
    elements.forEach(element => {
        element.remove();
    });
}