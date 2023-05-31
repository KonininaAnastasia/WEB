const update = document.getElementById("update");

let content;
async function getDocs() {
    let response = await fetch('http://127.0.0.1:8000/api3/models');
    content = await response.json();
    let list = document.getElementById('doc');
    if(content.length){
        for (let arrayKey in content) {
            list.innerHTML+=
                `<tr class="row">
             <td>${content[arrayKey].name_model}</td>
             <td><button class="show" name="${content[arrayKey]._id}">Посмотреть</button></td>
             <td><button class="delete" id="${content[arrayKey]._id}">Удалить</button></td>
             </tr>`
        }}else{list.innerHTML=`<tr><td>Моделей нет</td></tr>`;
    }
}
getDocs();

function updTable(){
        let list = document.getElementById('doc');
        list.outerHTML = '<table id="doc"></table>';
        getDocs();
}
update.addEventListener("click", updTable);

let Api;
let input;
async function sendName(){
    input = document.querySelector('input').value;
    let name_user = {
        name: input
    }
    if(input){
        let response = await fetch('http://127.0.0.1:8000/api3/login', {method: 'POST',headers:{"Content-type":"application/json"}, body: JSON.stringify(name_user)});
        document.getElementById("addButton").removeAttribute("disabled");
        Api = await response.text();
        if(checkName === input){
            document.getElementById("editButton").removeAttribute("disabled");
        }
    }
}

document.getElementById("table").addEventListener('click',function(event) {
    let target = event.target;
    if (target.className !== 'delete') return;
    let id = event.target.id;

    if (Api) {fetch(`http://127.0.0.1:8000/api3/models/${id}`, {method: 'DELETE', headers: {"api-key":`${Api}`}}).then(updTable)}
    else {alert("Введите имя..")};
    //console.log(Api);
})


let name = undefined;
let checkName;
document.getElementById("table").addEventListener('click',function(event) {
    let flex_div;
    let target = event.target;
    if (target.className !== 'show') return;
    if(event.target.name === name){
        flex_div = document.getElementById("flex-div");
        flex_div.outerHTML = '<table id="flex-div"></table>';
        name = undefined;
    }else{
        for (let arrayKey in content) {
            if (content[arrayKey]._id === event.target.name){
                name = event.target.name;
                checkName = content[arrayKey].name
                flex_div = document.getElementById("flex-div");
                flex_div.outerHTML = `<div id="flex-div"><table>
                <caption>Модель ${content[arrayKey].name_model}</caption> 
                <tr><td>Имя:</td><td>${content[arrayKey].name}</td></tr>
                <tr><td>Имя модели:</td><td>${content[arrayKey].name_model}</td></tr>
                <tr><td>Тип:</td><td id="typTable" >${content[arrayKey].type}</td></tr>
                <tr><td>Цвет:</td><td id="colTable">${content[arrayKey].color}</tdid></tr>
                <tr><td>Размер:</td><td id="sizTable">${content[arrayKey].size}</tdid></tr>
                <tr><td>Описание:</td><td>${content[arrayKey].descriptions}</td></tr> 
                <tr><td>Комментарии:</td><td>${content[arrayKey].comments}</td></tr>
                <tr><td>Время создания:</td><td>${content[arrayKey].time_create}</td></tr>
                <tr><td><button id="editButton" name="${name}" disabled>Редактировать модель</button></td></tr></table>
                <div id="can-wrap"></div></div>`
            };
            console.log(checkName);
            console.log(input);
        }
        if(checkName === input){
            document.getElementById("editButton").removeAttribute("disabled");
        }
    }
})

document.getElementById("addButton").addEventListener('click',()=>{
    let add = document.getElementById("addModel");
         add.innerHTML+=`<div id="formdiv">
    <form id="form">
    <p>Добавление модели</p><div>
    <ul>
    <li><select id="selectType">
    <option value="cube">Куб</option>
    <option value="sphere">Сфера</option>
    <option value="pyramid">Пирамида</option>
    </select></li>
    <li><input id="color" type="color" value="#bb8fd4"></li>
    <li><input type="number" id="size" min="1" max="10" placeholder="Размер модели" required></li>
    <li><input id="name_model" type="text" placeholder="Имя модели" required></li>
    <li><input id="descriptions" placeholder="Описание" required></input></li>
    <li><input id="comments" placeholder="Комментарий" required></input></li>
    </ul>
    <span><button id="submit">Отправить модель</button>
    </form></div>
    <div id="hCan"></div>
    </div>`
    document.getElementById("addButton").setAttribute('disabled', "")
    document.getElementById("form").scrollIntoView({block: "center", behavior: "smooth"})
})

document.getElementById("addModel").addEventListener('click',async (event)=>{
    if(event.target.id !== "submit") {return 0;}
    else{
        let typeGeometry = document.getElementById("selectType").value;
        let colorGeometry = document.getElementById("color").value;
        let nameGeometry = document.getElementById("name_model").value;
        let descriptionsGeometry = document.getElementById("descriptions").value;
        let commentsGeometry = document.getElementById("comments").value;
        let sizeGeometry = document.getElementById("size").value;
        let newModel = {
            name:input,
            name_model:nameGeometry,
            type:typeGeometry,
            color:colorGeometry,
            size:sizeGeometry,
            descriptions:descriptionsGeometry,
            comments:commentsGeometry

         }
         await fetch('http://127.0.0.1:8000/api3/models', {method: 'POST', headers: {"api-key": `${Api}`, "Content-type": "application/json"},
                body: JSON.stringify(newModel)
            });
            this.outerHTML = "<div id=\"addModel\"></div>";
            document.getElementById("submit").type = "submit";

    }
})


document.getElementById("table").addEventListener('click', async function(event) {

        if(event.target.id==="editButton") {
            for (let arrayKey in content) {
                if (content[arrayKey]._id === event.target.name){
                    let flex_div = document.getElementById("flex-div");
                    flex_div.outerHTML =`<div id="flex-div">
                    <form>
                    <ul id="change"></ul>
                    </form>
                     <div id="can-wrap1"></div><div>`
                    let change= document.getElementById("change");
                    if(content[arrayKey].type==="cube"){
                        change.innerHTML +=`
                    <li><select id="typTable1">
                    <option value="cube">Куб</option>
                    <option value="sphere">Сфера</option>
                    <option value="pyramid">Пирамида</option>
                    </select></li>`
                    }else if(content[arrayKey].type==="sphere"){
                        change.innerHTML +=`
                    <li><select id="typTable1">
                    <option value="sphere">Сфера</option>
                    <option value="cube">Куб</option>
                    <option value="pyramid">Пирамида</option>
                    </select></li>`
                    }else{
                        change.innerHTML +=`
                    <li><select id="typTable1">
                    <option value="pyramid">Пирамида</option>
                    <option value="cube">Куб</option>
                    <option value="sphere">Сфера</option>
                    </select></li>`
                    }
                    change.innerHTML += `
                    <li><input id="colTable1" value="${content[arrayKey].color}" type="color"></li>
                    <li><input type="number" id="sizTable1" min=1 max=10 value="${content[arrayKey].size}" required></li>
                    <li><input id="name_model1" type="text" value="${content[arrayKey].name_model}" required></li>
                    <li><input id="descriptions1" placeholder="Описание" value="${content[arrayKey].descriptions}"</input></li>
                    <li><input  id="comments1" placeholder="Комментарий" value="${content[arrayKey].comments}"</input></li>
                    <li><button id="submit1" name="${content[arrayKey]._id}">Сохранить</button></li>`
                }}
                

    }}
)

document.getElementById("table").addEventListener('click', async ()=>{
document.getElementById("submit1").addEventListener('click', async function(event) {

        let updModel = {
            name_model:document.getElementById("name_model1").value,
            type:document.getElementById("typTable1").value,
            color:document.getElementById("colTable1").value,
            size:document.getElementById("sizTable1").value,
            descriptions:document.getElementById("descriptions1").value,
            comments:document.getElementById("comments1").value
        }
        await fetch(`http://127.0.0.1:8000/api3/models/${event.target.name}`, {method: 'PUT', headers: {"api-key": `${Api}`, "Content-type": "application/json"},
            body: JSON.stringify(updModel)
        })
})})