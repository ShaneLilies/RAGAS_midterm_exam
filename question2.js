// define sumArray function with parameter array
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

// Example usage
console.log(sumArray([1, 2, 3, 4, 5])); 