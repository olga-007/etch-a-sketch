/* eslint-disable no-console */
// see https://javascript.info/array-methods#tasks

function task1() {
    function camelize(str) {
        const result = str.split('-').map((item, index) => {
            if (index !== 0 && item) {
                return item[0].toUpperCase() + item.slice(1).toLowerCase();
            }
            return item.toLowerCase();
        }).join('');
        return result;
    }
    console.log(camelize('background------color'));
    console.log(camelize('list-style-IMaGe'));
    console.log(camelize('-----webkit-transition'));
}

function task2() {
    function filterRange(arr, min, max) {
        return arr.filter((item) => item >= min && item <= max);
    }
    const arr = [5, 3, 8, 1];
    const filtered = filterRange(arr, 1, 4);
    console.log(`filtered array: ${filtered}`); // 3,1 (matching values)
    console.log(`original array: ${arr}`); // 5,3,8,1 (not modified)
}

function task3() {
    function filterRangeInPlace(arr, min, max) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < min || arr[i] > max) {
                arr.splice(i, 1);
            }
        }
    }
    const arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
    console.log(`filtered in place: ${arr}`); // [3, 1]
}

function task4() {
    const arr = [5, 2, 10, -10, 8];
    arr.sort((a, b) => b - a);
    console.log(arr); // 10, 8, 5, 2, -10
}

function task5() {
    function copySorted(arr) {
        // return Array.from(arr).sort();
        return arr.slice().sort();
    }
    const arr = ['HTML', 'JavaScript', 'CSS'];
    const sorted = copySorted(arr);
    console.log(`sorted: ${sorted}`); // CSS, HTML, JavaScript
    console.log(`original: ${arr}`); // HTML, JavaScript, CSS (no changes)
}

// TASK 6, Extendable calculator
// TODO: implement

// Map to names
function task7() {
    const john = { name: 'John', age: 25 };
    const pete = { name: 'Pete', age: 30 };
    const mary = { name: 'Mary', age: 28 };
    const users = [john, pete, mary];
    const names = users.map(item => item.name);
    console.log(`names: ${names}`); // John, Pete, Mary
}

// TASK 8, Map to objects
// TODO: implement

// Sort users by age
function task9() {
    function sortByAge(arr) {
        return arr.sort((a, b) => a.age - b.age);
    }
    const john = { name: 'John', age: 25 };
    const pete = { name: 'Pete', age: 30 };
    const mary = { name: 'Mary', age: 28 };
    const arr = [pete, john, mary];
    sortByAge(arr);
    console.log(arr[0].name); // John
    console.log(arr[1].name); // Mary
    console.log(arr[2].name); // Pete
}

// TASK 10, Shuffle an array
// TODO: implement

// Get average age
function task11() {
    function getAverageAge(arr) {
        return arr.reduce((sum, item) => sum + item.age, 0) / arr.length;
    }
    const john = { name: 'John', age: 25 };
    const pete = { name: 'Pete', age: 30 };
    const mary = { name: 'Mary', age: 29 };
    const arr = [john, pete, mary];
    console.log(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
}

// TASK 12, Filter unique array members
// TODO: implement

// TASK 13, Create keyed object from array
// TODO: implement
