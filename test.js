var t = function test(callbac, b){
console.log(1);
callbac(12);
console.log(b);
};

t(function(add){
    console.log(11);
    console.log(add);
},2);
