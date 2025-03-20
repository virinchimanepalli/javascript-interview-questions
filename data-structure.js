console.log("Data structure..")

// !1. Flatten Array
// [[1,2],[2],[3,4,5]]
const flattenArray = (array, result = []) => {
    array.forEach(item => {
        if (Array.isArray(item)) {
            flattenArray(item, result);
        }
        else {
            result.push(item)
        }
    });
    return result;
}

console.log(flattenArray([[1, 2], 2, [3, 4, 5]]))