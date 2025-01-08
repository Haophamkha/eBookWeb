//Data 1 
console.log(`Data 1 : `)
const markMass1 = 78 
const markHeight1 = 1.69 

const johnMass1 = 92 
const johnHeight1 = 1.95 

const markBMI1 = markMass1 / (markHeight1 ** 2)
const johnBMI1 = johnMass1 / (johnHeight1 ** 2)

const markHigherBMI1 = markBMI1 > johnBMI1

if(markHigherBMI1){
    console.log(`Mark's BMI is higher than John's!`)
} else {
    console.log(`John's BMI is higher than Mark's!`)
}

//Data 2
console.log(`Data 2 : `)
const markMass2 = 95
const markHeight2 = 1.88 

const johnMass2 = 85
const johnHeight2 = 1.76 

const markBMI2 = markMass2 / (markHeight2 ** 2)
const johnBMI2 = johnMass2 / (johnHeight2 ** 2)

const markHigherBMI2 = markBMI2 > johnBMI2

if(markHigherBMI2){
    console.log(`Mark's BMI is higher than John's!`)
} else {
    console.log(`John's BMI is higher than Mark's!`)
}