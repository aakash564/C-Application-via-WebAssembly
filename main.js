// main.js: This file simulates the structure and execution flow of the Emscripten glue code 
// that would load main.wasm and bind C functions to JavaScript wrappers (like cwrap).

// --- Simulation of C Wasm Logic ---

// 1. Define the JS implementation mimicking the C function logic from main.c
// This replaces the actual execution of main.wasm for demonstration purposes.
function simulate_c_fibonacci(n) {
    // Logic must match main.c: handles range check and recursion
    if (n < 0 || n > 45) { 
        return -1; 
    }
    if (n <= 1) return n;
    return simulate_c_fibonacci(n - 1) + simulate_c_fibonacci(n - 2);
}

// 2. Simulate the execution of the C main() function
function simulate_c_main_entry() {
    // These statements replicate the stdout output from main.c
    window.Module.print("C Application running via WebAssembly environment.");
    window.Module.print("--- Execution of main() complete. Runtime active. ---");
    
    let test_n = 6;
    window.Module.print(`Internal C test: fibonacci(${test_n}) = ${simulate_c_fibonacci(test_n)}`);

    // 3. Simulate function binding (like Emscripten's cwrap/ccall)
    // We expose the simulated function directly under the name expected by bridge.js
    window.fibonacci_c_func = simulate_c_fibonacci;
}

// --- Simulation of Emscripten Runtime Execution ---

// Set the Module status
window.Module.calledRun = true; 

// Run the simulated C entry point
simulate_c_main_entry();

// Trigger the runtime initialization callback defined in bridge.js
if (window.Module.onRuntimeInitialized) {
    window.Module.onRuntimeInitialized();
}
