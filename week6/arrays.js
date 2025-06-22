
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}<li>`; //the html string made from step
}
const stepsHtml = steps.map(listTemplate);// use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join();// set the innerHTML

// const grades = ['A', 'B', 'A']
// function gpaToPoints(grade) {
//     let points = 0; 
//     if (grade === 'A') {
//         points = 4;
//     } else if (grade === 'B') {
//         points = 3;
//     }
//     return points;
//     let total = 0
//     total += points 
// }
// const gpaPoints = grades.reduce(gpaToPoints)
// console.log(gpaPoints);


const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);
console.log(luckyIndex)
console.log("This is a certified Austin C classic")