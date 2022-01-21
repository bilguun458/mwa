const randomPromise = new Promise((resolve, reject) => {
    const randNum = Math.random() + 0.5;
    setTimeout(() => {
        if (randNum > 0.5) resolve(randNum);
        else reject("Too low");
    }, 1000);
})

const succRandomPromise = new Promise((resolve, reject) => {
    const randNum = Math.random() + 0.5;
    setTimeout(() => {
        if (randNum > 0.5) resolve(randNum);
        else reject("Too low");
    }, 1000);
})

const failRandomPromise = new Promise((resolve, reject) => {
    const randNum = Math.random() - 0.5;
    setTimeout(() => {
        if (randNum > 0.5) resolve(randNum);
        else reject("Too low");
    }, 3000);
})

// run 1 promise---
// randomPromise
// .then(function (res) {
//     console.log("res: ", res);
// }).catch(function (err) {
//     console.log("err: ", err);
// });


// Promise  all : if 1 of them fail all fail ----
// Promise.all([randomPromise, succRandomPromise, failRandomPromise])
//     .then(function (res) {
//         console.log("All res: ", res);
//     }).catch(function (err) {
//         console.log("All err: ", err);
//     });
// Promise race will only first success, or fail | then ignore ret but run it all


// run them sequentually----
// chaoin them, or make them synchronous
function resolvePromiseOneSec() {
    return new Promise(resolve => setTimeout(() => resolve("done 3s"), 3000))
}
function resolvePromiseTwoSec() {
    return new Promise(resolve => setTimeout(() => resolve("done 5s"), 5000))
}
async function mySynchFunction() {
    console.log("Start");
    const promise1 = await resolvePromiseOneSec();
    console.log(promise1);
    const promise2 = await resolvePromiseTwoSec();
    console.log(promise2);
    console.log("End");
}
mySynchFunction()