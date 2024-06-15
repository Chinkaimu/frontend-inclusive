function promiseA(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}

function promiseB(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}

const promiseC = promiseA(1000).then((resultA) => promiseB(2000).then((resultB) => {return {a: resultA, b:resultB}}));

promiseC.then((result) => {console.log(result)});