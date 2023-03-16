const modal = document.getElementById("myModal");
const button1 = document.getElementById("open_modal");
const span = document.getElementsByClassName("close")[0];
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const password = document.getElementById("password");
const error = document.querySelector("error");
const form = document.querySelector("form");
const email = document.getElementById("email");


button1.onclick = function(){
    modal.style.display = "block";
}

span.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display= "none";
    }
}

function onFormSubmit(event){
    const form = event.currentTarget;
    event.preventDefault();
    const inputs = form.querySelectorAll("input[required]");

    const formData = new FormData(form);
    console.table({
        "Пароль": formData.get("password"),
        "Email": formData.get("email")
    })
    form.reset();
    modal.style.display = "none";
}

button2.addEventListener('pointerdown', ()=>{
    password.setAttribute('type', 'text');
})
button2.addEventListener('pointerup', ()=>{
    password.setAttribute('type', 'password');

})


function onInputBlur(event) {

    const input = event.currentTarget;
    const validState = input.validity;

    let errorMessage = "";

    if (validState.tooShort) {
        errorMessage = `Минимальная длина ${input.minLength} символов`;
    }
    else if (validState.typeMismatch) {
        errorMessage = "Неправильный формат ввода почты пример: example@mail.ru";
    }
    else if (validState.valid) {
        errorMessage = "";
    }

    const wrapper = input.closest("li");
    const errorMsgElem = wrapper.querySelector(".error");

    errorMsgElem.textContent = errorMessage;
}

email.addEventListener("blur", onInputBlur);
password.addEventListener("blur", onInputBlur);
form.addEventListener("submit", onFormSubmit);