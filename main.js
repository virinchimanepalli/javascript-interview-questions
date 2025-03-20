// // 1. Q1 Memoized Functions
// // Write a function that can memoize (remember) the output for any function if we pass same arguments.

// // ! memorize function
// const add = (a, b) => {
//   return a + b;
// };

// const multiply = (a, b) => {
//   return a - b;
// };

// const getUniqueKey = (funcName, args) => {
//   console.log(args);
//   return `${funcName}-${args.join(",")}`;
// };

// function memorization(func) {
//   const cache = {};
//   console.log(cache, "memory cache");
//   return function () {
//     console.log([...arguments], arguments, "ff");
//     const key = getUniqueKey(func.name, [...arguments]);
//     if (cache[key]) {
//       console.log("present in cache...");
//       console.log(cache);
//       return cache[key];
//     } else {
//       const result = func(...arguments);
//       const key = getUniqueKey(func.name, [...arguments]);
//       console.log("its new function", func.name, "and arguments");
//       cache[key] = result;
//       return result;
//     }
//   };
// }

// const memoAdd = memorization(add);
// const memoMult = memorization(multiply);

// memoAdd(1, 3);
// memoAdd(1, 3);

const add = (a, b) => {
  return a + b;
};

const getUniqueString = (name, argus) => {
  return `${name}-${argus.join("-")}`;
};

function memorization(func) {
  const cache = {};
  return function () {
    // ! unique atring
    const key = getUniqueString(func.name, [...arguments]);

    if (cache[key]) {
      // console.log("NO NEED TO RUN FUNC");
      return cache[key];
    } else {
      // ! resting arr arguments to the arrrr
      const result = func(...arguments);
      // console.log("RESULT");
      cache[key] = result;
      return result;
    }
  };
}
// ! insert the function you want
const memorizeAdd = memorization(add);

// ! send params to the memorized function
// console.log(memorizeAdd(1, 2));
// console.log(memorizeAdd(1, 2));

// -----------------------------------------------------------------------------------------------
// ! Promise .all pollyfill

const fakePromise = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(time);
    }, time * 1000);
  });
};

const taskArrays = [fakePromise(1), fakePromise(1), fakePromise(2)];

const newPromiseAll = (promiseArr) => {
  return new Promise((resolve, reject) => {
    let newArr = [];

    promiseArr.forEach((promise, index) => {
      promise
        .then((item) => {
          if (promiseArr.length - 1 === index) {
            resolve(newArr);
          } else {
            newArr[index] = item;
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

// newPromiseAll(taskArrays)
//   .then((item) => {})
//   .catch((err) => console.log(err, "errorro"));

Promise.any(taskArrays).then((res) => {});

const newPromiseAny = (promiseArr) => {
  return new Promise((resolve, reject) => {
    const newPromiseArr = [];
    promiseArr.forEach((promise, index) => {
      // promise is a PROMISE  and so use Promise tp resolve it
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          if (newPromiseArr.length - 1 === index) {
            reject("ected");
          } else {
            newPromiseAny[index] = err;
          }
        });
    });
  });
};

// newPromiseAny(taskArrays).then((item) => {
//   console.log(item, "teiodd");
// });

// -----------------------------------------------------------------------------------------------
//  3. Polyfill of Array.map()

// [1,2,3,4].map((res,index,array)=>{return res})

// ! don't use arrow functions for pollyfills bsce they dont have this
Array.prototype.myMap = function (callbackfn) {
  const output = [];
  for (let i = 0; i <= this.length - 1; i++) {
    output.push(callbackfn(this[i], i, this));
  }
  return output;
};

// console.log([1, 2, 3].myMap((res) => res * 3));

// Polyfill of Array.filter()
Array.prototype.myFilter = function (callbackfn) {
  const output = [];
  for (let i = 0; i <= this.length; i++) {
    if (callbackfn(this[i], i, this)) {
      output.push(callbackfn(this[i], i, this));
    }
  }
  return output;
};

// console.log(
//   [1, 23, 4, 5, 6, 7, 8, 9].myFilter((item) => {
//     if (item === 5) {
//       return item;
//     }
//   }),
//   "login"
// );

// ! write a pollyfill for reduce
// ! it returns only one value.

const sum = [1, 2, 3, 4, 5].reduce((acc, curr) => {
  return acc + curr;
}, 10);

Array.prototype.myReduce = function (callbackfn, initialValue) {
  var accumulator;
  var array = this;
  var i = 0;
  var len = this.length;

  if (len === 0) {
    if (initialValue) {
      return initialValue;
    } else {
      throw Error("You dont have intial number");
    }
  }

  // ! check if initial value is undefined , if yes assign it to the initial value, else have it
  if (initialValue) {
    accumulator = initialValue;
  } else {
    accumulator = array[i++];
  }

  // ! Q return summation of the result
  while (i <= array.length - 1) {
    accumulator = callbackfn(accumulator, array[i], i, array);
    i++;
  }
  return accumulator;
};

// const sume = [].myReduce((acc, curr) => {
//   return acc + curr;
// });

// console.log(sume, "sum-reduce");
// -----------------------------------------------------------------------------------------------

// ! Write a polyfill for String.split("")

const split = (str, determinator) => {
  console.log(str, determinator, "string--");
  const splitArr = [];

  const handlesplit = (newString, index) => {
    if (index === subsnewStringtring.length) {
      return splitArr;
    }
    const indexOf = newString.indexOf(determinator);
    if (indexOf > 0) {
      splitArr.push(newString.substring(0, indexOf));
      handlesplit(
        newString.substring(indexOf, indexOf + determinator),
        indexOf + determinator
      );
    } else {
      splitArr.push(newStr);
    }
    handlesplit(str, "e");
  };
  return splitArr;
};

// console.log(split("dejnfj", "j"));

// Polyfill of Split

const splitFunc = (string, delimiter) => {
  const res = [];
  if (delimiter === "") return Array.from(string);
  const startSplit = (str, i) => {
    if (i >= string.length) return;
    const index = str.indexOf(delimiter);
    if (index >= 0) {
      res.push(str.substring(0, index));
      startSplit(
        str.substring(index + delimiter.length),
        index + delimiter.length
      );
    } else {
      res.push(str);
    }
  };
  startSplit(string, 0);
  return res;
};

// -----------------------------------------------------------------------------------------------
// ! nested objects
const nestedObj = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

const flattenObject = (obj, parent) => {
  // !flatten object
  const newFlattenObj = {};

  // ! recrussive function
  const generateFlattenObj = (obj, parent) => {
    for (let key in obj) {
      const newParent = parent + key;
      const value = obj[key];
      if (typeof value === "object") {
        generateFlattenObj(value, newParent + ".");
        //
      } else {
        newFlattenObj[newParent] = value;
      }
    }
  };

  generateFlattenObj(obj, parent);
  return newFlattenObj;
};

console.log(flattenObject(nestedObj, ""), "flatten object");
