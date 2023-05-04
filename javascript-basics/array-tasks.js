// see https://javascript.info/array-methods#tasks


// task 1
function camelize(str) {
    let result = str.split("-").map((item, index) => {
        if (index !== 0 && item) {
            return item[0].toUpperCase() + item.slice(1).toLowerCase();
        }
        return item.toLowerCase()
    }).join('');
    return result;
}
// console.log(camelize("background------color"));
// console.log(camelize("list-style-IMaGe"));
// console.log(camelize("-----webkit-transition"));


// task 2
function filterRange(arr, min, max) {
    return arr.filter(item => item >= min && item <= max);
}
// let arr = [5, 3, 8, 1];
// let filtered = filterRange(arr, 1, 4);
// console.log("filtered array: " + filtered); // 3,1 (matching values)
// console.log("original array: " + arr); // 5,3,8,1 (not modified)


// task 3
function filterRangeInPlace(arr, min, max) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] < min || arr[i] > max) {
            arr.splice(i, 1);
        }
    }
}
// let arr = [5, 3, 8, 1];
// filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
// console.log("filtered in place: " + arr); // [3, 1]


// task 4
// let arr = [5, 2, 10, -10, 8];
// arr.sort((a, b) => b - a);
// console.log(arr); // 10, 8, 5, 2, -10


// task 5
function copySorted(arr) {
    // return Array.from(arr).sort();
    return arr.slice().sort();
}
// let arr = ["HTML", "JavaScript", "CSS"];
// let sorted = copySorted(arr);
// console.log("sorted: " + sorted); // CSS, HTML, JavaScript
// console.log("original: " + arr); // HTML, JavaScript, CSS (no changes)


// task 6, extendable calculator
// https://javascript.info/array-methods#tasks
// TODO finish tasks 6-13


// task 7, map to names
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
// let users = [ john, pete, mary ];
// let names = users.map(item => item.name);
// console.log("names: " + names); // John, Pete, Mary


// task 8, map to objects
// TODO


// task 9, sort users by age
function sortByAge(arr) {
    return arr.sort((a, b) => a.age - b.age);
}
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
// let arr = [ pete, john, mary ];
// sortByAge(arr);
// console.log(arr[0].name); // John
// console.log(arr[1].name); // Mary
// console.log(arr[2].name); // Pete


// task 10, shuffle an array
// TODO


// task 11, get average age
function getAverageAge(arr) {
    return arr.reduce((sum, item) => sum + item.age, 0) / arr.length;
}
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 29 };
// let arr = [ john, pete, mary ];
// console.log(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28


// task 12, filter unique array members
// TODO


// task 13, create keyed object from array
// TODO
