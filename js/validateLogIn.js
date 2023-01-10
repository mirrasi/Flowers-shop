import { styleText, validateEmail, validatePassword } from './functionRegister.js'

// Code Log In

let buttonLogIn = document.getElementById("btnLogin")

buttonLogIn.addEventListener("click", () => {
    let eLogIn = document.getElementById("eLogin").value
    let pLogin = document.getElementById("pLogin").value
    let text = document.getElementById("textLogin") 
    styleText(text)
    let getLocalStorage = localStorage.getItem("userList")

    if (getLocalStorage === null || getLocalStorage.length === undefined) {
        text.innerText = "* Tài khoản không tồn tại"
    } else {
        text.innerText = ""
        let isValueEmail = validateEmail(eLogIn)
        let isValuePwd = validatePassword(pLogin)


        if(isValueEmail && isValuePwd){
            window.location.href = "../index.html"
        } else{
            // alert("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu")
            text.innerText = "* Vui lòng kiểm tra lại email hoặc mật khẩu"
        }
    }
})