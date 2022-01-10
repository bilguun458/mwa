console.log("1: start app");

const laterNetwork = setTimeout(function () {
    console.log("2: timeout");
}, 3000);

console.log("3: end");