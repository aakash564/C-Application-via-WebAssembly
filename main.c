#include <stdio.h>
#include <emscripten.h>

/**
 * C implementation of the Fibonacci sequence calculator.
 * Exposed to JavaScript via EMSCRIPTEN_KEEPALIVE.
 * @param n The index of the Fibonacci number to calculate. Limited to 0-45.
 * @return The Nth Fibonacci number, or -1 if input is out of safe range.
 */
EMSCRIPTEN_KEEPALIVE
int fibonacci(int n) {
    if (n < 0 || n > 45) { 
        // Returning -1 to signal error state back to JS host
        return -1; 
    }
    
    // Base cases
    if (n <= 1) return n;
    
    // Recursive calculation
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("C Application running via WebAssembly environment.\n");
    printf("--- Execution of main() complete. Runtime active. ---\n");
    
    // Test the C function internally before returning control to the JS event loop
    int test_n = 6;
    printf("Internal C test: fibonacci(%d) = %d\n", test_n, fibonacci(test_n));
    
    // We rely on the browser's JS environment for continuous interaction
    return 0;
}
