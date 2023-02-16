let zadanie = prompt("Выбери задание:");
switch(zadanie){

    case '1':

    console.log("1 задание");

    let v_kmch = prompt("Километры в час");
    let v_mc = prompt("Метры в секунду");

    console.log(`${v_kmch} км/ч соответствует ${v_kmch/3.6} м/с`);
    console.log(`${v_mc} м/с соответствует ${v_mc*3.6} км/ч`);

    break;

    case '2':

    console.log("2 задание");

    let a = prompt("Сторона 1");
    let b = prompt("Сторона 2");
    let c = prompt("Сторона 3");

    if (a+b<c && a+c<b && b+c<a) {
        console.log("треугольник не существует");
    } else {
        let p = (a+b+c)/2;
        let s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
        console.log("треугольник существует");
        console.log(`периметр = ${p*2}`);
        console.log(`площадь = ${s}`);
        console.log(`соотношение = ${p*2/s}`);
    }

    break;

    case '3':

    console.log("3 задание");

    let num = prompt("Введите число");

    while (isNaN(num))
    {
        num = prompt("Введите число");
    }

    for (let i=0;i<=num;i++){
        if (i==0){
            console.log(`${i} buzz`); 
        } else if (i%2===0 && i%5!==0){
            console.log(`${i} buzz`); 
        } else if(i%2!==0 && i%5!==0){
            console.log(`${i} fizz`); 
        } else if(i%2!==0 && i%5===0){
            console.log(`${i} fizz buzz`);
        } else if(i%2===0 && i%5!==0){
            console.log(`${i} fizz`);
        } else if(i%2===0 && i%5===0){
            console.log(`${i} fizz buzz`);
        }
    }

    break;

    case '4':

    console.log('4 Задание');

    let str;
    for (let i=1; i<13; i++){
    if(i%2===0) str="#";
    else str="*";
    console.log(`${str.repeat(i)}`);
    }
    console.log('||');

    break;

    case '5':

    console.log("5 задание");

    let number = prompt("Введите число");

    let zagadka = 7;

    while (number!=zagadka){
        if (number>zagadka){
            console.log(`ваше число больше`);
        }
        if (number<zagadka){
            console.log(`ваше число меньше`);
        }
        number = prompt("Введите число");
    }

    console.log(`Угадано`);

    break;

    case '6':

    console.log("6 задание");

    let n = prompt("Введите n");
    let x = prompt("Введите x");
    let y = prompt("Введите y");

    if (n%x===0 && n%y===0){
        console.log(`n = ${n}, x = ${x}, y = ${y} => true`);
    } else {
        console.log(`n = ${n}, x = ${x}, y = ${y} => false`);
    }

    break;

    case '7':

    console.log("7 задание");

    let month = prompt("Введите число месяца");

    if (month==1 || month==2 || month==3){
        console.log(`месяц ${month} => 1 квартал`);
    }
    if (month==4 || month==5 || month==6){
        console.log(`месяц ${month} => 2 квартал`);
    }
    if (month==7 || month==8 || month==9){
        console.log(`месяц ${month} => 3 квартал`);
    }
    if (month==10 || month==11 || month==12){
        console.log(`месяц ${month} => 4 квартал`);
    }

    break;

}