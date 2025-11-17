// bridge.js: Handles the environment setup (Module definition, console redirection) and JS interaction logic.

window.Module = {}; // Global Emscripten Module object placeholder

// Setup console redirection to the DOM element
window.Module.print = (function() {
    const element = document.getElementById('output');
    return function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        element.textContent += '> ' + text + '\n';
        element.scrollTop = element.scrollHeight; // Auto scroll
        console.log('[C Stdout]', text);
    };
})();

window.Module.printErr = function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    window.Module.print('ERR: ' + text);
    console.error('[C Stderr]', text);
};

window.Module.onRuntimeInitialized = function() {
    window.Module.print('WebAssembly Runtime Initialization Finished.');
    // At this point, main.js should have defined window.fibonacci_c_func
};

window.fibonacci_c_func = null; // Reference to the C function wrapper

// Function triggered by the HTML button to interact with the C Wasm function
function calculateFib() {
    const n = parseInt(document.getElementById('input_n').value);
    const resultElement = document.getElementById('result');

    if (!window.fibonacci_c_func) {
        resultElement.textContent = "C function reference not available. Check console.";
        window.Module.printErr("Attempted call before C function binding was established.");
        return;
    }
    
    if (isNaN(n) || n < 0 || n > 45) {
        resultElement.textContent = "Invalid input N (0-45).";
        return;
    }

    try {
        // Call the C function wrapped by Wasm/Emscripten glue (simulated in main.js)
        const result = window.fibonacci_c_func(n); 
        
        if (result === -1) {
            resultElement.textContent = "Error: Input out of range (C validation failed).";
            window.Module.print(`[JS Interaction] C function validation failed for N=${n}.`);
        } else {
            resultElement.textContent = result;
            window.Module.print(`[JS Interaction] Called fibonacci(${n}). Result: ${result}`);
        }
    } catch (e) {
        resultElement.textContent = "Runtime Error during C function call.";
        window.Module.printErr("Error: " + e.message);
    }
}
