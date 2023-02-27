let zadanie = prompt("Выбери задание:");
switch(zadanie){

    case '1':

    console.log("1 задание");

    let v = prompt("Введите скорость:");

    function convertSpeed(a, i){
        if (i=='toMS')
        return console.log(`${a} км/ч -> ${a/3.6} м/с`)
        else if (i=='toKMH') 
        return console.log(`${a} м/с -> ${a*3.6} км/ч`);
    }

    convertSpeed(v,'toMS');
    convertSpeed(v,'toKMH');


    break;

    case '2':

console.log("2 задание");

let num = prompt("Введите число");

while (!isNaN(num))
{

    function absValue(a){
        if (a<0)
        return console.log(`absValue(${a}) -> ${-a}`)
        else if (a>=0)
        return console.log(`absValue(${a}) -> ${a}`);
    }

    absValue(num);

    num = prompt("Введите число");
}

    break;

    case '3':

    let student = {group: 201, last_name: "Иванов", first_name: "Иван"};

    console.log(`Список свойств:`);
    for (something in student)
    console.log(something);

    console.log(`Студент ${student.first_name} ${student.last_name} учится в ${student.group} группе`);

    break;

    case '4':

    let minimum = prompt('Введите min');
    let maximum = prompt('Введите max');

    function randomeNumber(min,max){
        return Math.floor(Math.random()*(max-min+1) + +min);
    }
    
    console.log(`randomeNumber(${maximum},${minimum}) -> ${randomeNumber(minimum,maximum)}`);

    break;

    case '5':

    let mass1 = [1,2,3,4];
    let d = prompt("Введите размерность массива от 1 до 4");
    let mass = [];

    function sampleArray(result,count){
        for(let i=0;i<count;i++){
            mass[i]=result[randomeNumber(0,4)];
        }
        return mass;
    }
    console.log(`sampleArray([${mass1}], ${d}) -> [${sampleArray(mass1, d)}]`);

    
    break;

}    