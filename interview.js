// !pollifll for map

// const arr = [1,2,3,4,5].map((a,index,array)=> a*3)

// ! normal for loop
Array.prototype.myMap = function (callbackfn) {
  const newArr = [];
  this.forEach((item, index, array) => {
    newArr.push(callbackfn(item, index, array));
  });
  return newArr;
};

// console.log([1, 2, 3, 4, 5].myMap((n) => n * 5));

// ! reduce pollyfill
// const sum = [1, 2, 3, 4, 5].reduce((acc, curr) => acc + curr, 100);

// ! naming variable should be improved
Array.prototype.myReduce = function (callbackfn, i) {
  //
  var firstInitialValue = i;
  var n = this.length;
  var j = 0;
  var accumulator;

  // ! base conditions
  if (!n) {
    if (firstInitialValue) {
      throw Error("Won't work");
    }
  }

  //   ! if its valid
  if (firstInitialValue) {
    accumulator = firstInitialValue;
  } else {
    accumulator = this[j++];
  }
  // ! use while for loop instead for
  while (j <= this.length - 1) {
    accumulator = callbackfn(accumulator, this[j], this);
    j++;
  }
  return accumulator;
};

const a = [1, 2, 3, 4, 5].myReduce((acc, curr) => acc + curr, 1);
// console.log(a, "a");

// ! split

// ! currying
const MAX_ARGUMENTS = 6;
function sum(...args) {
  if (MAX_ARGUMENTS === args.length) {
    return args.reduce((acc, curr) => acc + curr, 0);
  } else {
    function recursiveCall(...args2) {
      args = args.concat(args2);
      if (args.length === MAX_ARGUMENTS)
        return args.reduce((acc, curr) => acc + curr, 0);
      else return recursiveCall;
    }
    return recursiveCall;
  }
}

console.log(sum(1, 2, 3)(4)(5)(5), "dd");
