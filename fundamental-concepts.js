console.log("practice component")


// ! Reduce Method find sum of elements
const arr = [
    1,
    2,
    3,
    4,
    5
];

const result = arr.reduce((curr, acc) => curr + acc, 0)

console.log(result, '-result-');

// ! using Reduce we can Execute Promises in sequence.[Fix Bug]

const asyncTask = function (time, reject = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(time) }, time * 1000)
    })
}

const promiseArr = [
    asyncTask(3, false),
    asyncTask(2, false),
    asyncTask(5, false),
    asyncTask(1, false)
]

promiseArr.reduce((acc, curr) => {
    return acc.then(() => { return curr.then((value) => { console.log(value) }) })
}, Promise.resolve())

// ! Target to Finish 500Pages JS Questions
// ! React core concepts and problems
// ! DSA Aft least 2 problems per day
// ! system design and LLD and HLD

// ! Promise.all pollyfill
const handlePromiseAll = function (promiseArr) {
    const result = [];
    let promiseLength = 0;
    return new Promise((resolve, reject) => {
        promiseArr.forEach((item, index) => {
            item.then((res) => {
                result[index] = res;
                promiseLength += 1;
                if (promiseArr.length === promiseLength) {
                    resolve(result);
                }
            }).catch((err) => reject(err))
        });
    })
}

handlePromiseAll(promiseArr).then((response) => { console.log(response, 'Promise Response') }).catch((error) => { console.log("Rejected with ", error) })

// ! ---------------------

// ! promise any pollyfill

const handlePromiseAny = function (promiseArr) {
    let promiseCount = 0;

    return new Promise((resolve, reject) => {
        promiseArr.forEach((item, index) => {
            Promise.resolve(item).then(resolve).catch(() => {
                promiseCount += 1;
                if (promiseCount === promiseArr.length) {
                    reject("All promises got rejected")
                }
            })
        })
    })
}

handlePromiseAny(promiseArr).then((response) => {
    console.log(response, 'Promise Response')
}).catch((error) => {
    console.log("Rejected with ", error)
})

// ! ---------------------

// ! Promise race pollyfill
// ! Promise.race is method retruns a promise that resolves or reject the earlist item in the list of promises.
// ! WHy .then(resolve, reject) ? Write down here in next revision : Tricky interview question.
const handlePromiseRace = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach((promiseItem) => {
            Promise.resolve(promiseItem).then(resolve, reject).catch(reject)
        })
    })
}

handlePromiseRace(promiseArr).then((res) => { console.log(res, 'Promise.race') })
// ! Retry Promise N number of times.

// retry(asyncFunc, retries = 3, delay = 50, finalError = "Failed finally")
// const retry = async (asyncFunc, retries = 3, delay = 50, finalError = "Failed finally") => {
//     try {
//         console.log("Logs....")
//         await asyncFunc()
//     } catch (err) {
//         if (retries <= 0) {
//             return Promise.reject(finalError)
//         }
//         // ! wait for a while
//         return retry(asyncFunc, (retries - 1), delay, finalError)
//     }
// }

// ! Getting error ApiFunc needs to be checked.
// retry(apiFunction, 3, 50, 'Failed')
// Finished till71


const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms * 1000)
    })
}

const apiFunction = (number = 2) => {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            resolve(number)
        } else
            reject("Rejected..")
    })
}

// ! ---------------------

// ! Execute Promises with Priority
// ! Description : Given a list of promises with priority and execute them parallelly and resolve the promise of most priority. If all promises fail then reject with Custom error.
// Execute Promise according to the priority 


