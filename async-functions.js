console.log("Async functions");


// ! Async Function in Series & Parallel.
// 1. Async Func in series means it will until each promise gets resolved in a order.
// For Eg: If an Array of [10,20,30,40] then each o/p will in a same order in one by one the promise gets resolved.
// you can use Reduce or Recurrsive api calls waits untill the other promise gets to resolve.

// 2. Async Func in parallel means it doesnt wait for any promise to get resolved, first resolved gets first in order.
// For Eg:   If an Array of [10,20,30,40], then based on time it gets resolved will be in the first. it can be [20,30,10,40].
// you can use Foreach where resolve promise when ever gets in the loop.


// ! Async Func In parallel & Parallel - Implement a func that takes list of async functions as inputs and execute inputs in parallel and call callback function after every promise exuction.

// !Note: 
// ! 1. Here forEach will not wait for anyone so even if i use await it run in parallel.
// ! 2. If you use for all loop it will wait untill the promise gets executed.

const asyncTask = (num) => {
    return new Promise((resolve) => setTimeout(() => { resolve(num) }, num * 1000))
}

const handleAsyncParallel = (tasks, cb) => {
    const output = [];
    tasks.forEach(async promise => {
        const result = await promise
        // output.push(result);
        console.log(result, 'result')
    });
    console.log(output)

}

handleAsyncParallel([asyncTask(3), asyncTask(1), asyncTask(2)], callback = () => {
    console.log("Callback called")
});

// ! Implement Map series async Function.
// Description: Implement a map series async function that is similar to Array.Map but here it will return promise that resolves on the list async iteratable promises and rejects 


const mapSeries = (arr, func) => {
    return new Promise((resolve, reject) => {
        const output = [];

        const finalResult = arr.reduce((acc, curr) => {
            return acc.then((value) => {
                func(curr, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve([...value, result])
                    }
                })
            })
        }, Promise.resolve())

        finalResult.then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error)
        })
    })
}

const result = mapSeries([1, 2, 3, 4, 5], function (num, callback) {
    setTimeout(() => {
        num = num * 2;
        console.log(num, 'num');
        if (num === 12) {
            callback(true);
        }
        else {
            callback(null, num);
        }
    }, 1000)
});


result.then((res) => {
    console.log(res, 'result')
}).catch((err) => { console.log(err) })