const dolphins = [96,108,89]
const koalas = [88,91,110]

const average = scores => scores.reduce((a,b) => a+b,0) / scores.length 

const dolphinsAvg = average(dolphins)
const koalasAvg = average(koalas)

if (dolphinsAvg < 100 && koalasAvg < 100){
    console.log(`No team wins the trophy`)
}else{
    if(dolphinsAvg > koalasAvg)
        console.log(`Dolphins team win !!`)
    else if(dolphinsAvg < koalasAvg)
        console.log(`Koalas team win !!`)
    else 
        console.log(`Draw !!`)
}