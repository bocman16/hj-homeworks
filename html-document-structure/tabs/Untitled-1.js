
let array1 = [1,2,3];
let array2 = [a,b,c];
let array3 = [4,5,6];
/////////////////////////////
// for (let i = 0; i < array1.length; i++) {
//     array1[i] = array2[i];
//     array3[i] = array2[i];
// }
//////////////////////////////////////
array1.forEach(function(item, i) {
    console.log(item)
    item =  array2[i];
    array3[i] = array2[i];
    });



 /////////////////////////////////////////   ///////////////////////////////////////
// for(let item of array1){
//     item =  array2;
// }