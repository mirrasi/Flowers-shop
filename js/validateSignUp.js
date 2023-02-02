import { styleText, validateEmail } from './functionRegister.js'
const regexEmail = /^[A-Za-z0-9._%+-]+@gmail\.com$/
const regexPwd = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/

// Code Sign Up
let userList = new Array()

let buttonSignUp = document.getElementById("btnSignUp")
buttonSignUp.addEventListener("click", () => {
    let emailSignUp = document.getElementById("eSignUp").value
    let passwordSignUp = document.getElementById("pSignUp").value
    let cofirmpasswordSignUp = document.getElementById("cfpSignUp").value
    let textEmail = document.getElementById("textEmailSignUp")
    let textPWD = document.getElementById("textPwdSignUp")
    styleText(textEmail)
    styleText(textPWD)

    let user = {
        email: emailSignUp,
        password: passwordSignUp
    }

    let getLocalStorage = localStorage.getItem("userList")


    if (getLocalStorage === null || getLocalStorage.length === undefined) {
        if (emailSignUp.match(regexEmail)) {
            textEmail.innerText = ""
            if (passwordSignUp.match(regexPwd)) {
                textPWD.innerText = ""
                if (passwordSignUp !== cofirmpasswordSignUp) {
                    textPWD.innerText = "* Mật khẩu nhập không khớp"
                } else {
                    textPWD.innerText = ""
                    userList.push(JSON.stringify(user))
                    localStorage.setItem("userList", `[` + userList + `]`)
                    window.location.href = "../index.html"
                }
            } else {
                textPWD.innerText = "* Vui lòng nhập ít nhất 8 ký tự (bao gồm: chữ thường, in hoa, số)"
            }

        } else {
            textEmail.innerText = "* Email nhập không hợp lệ"
        }
    }else {
        let isValueEmail = validateEmail(emailSignUp)   // true  or false
        if (emailSignUp.match(regexEmail)) {
            textEmail.innerText = ""
            if (isValueEmail) {
                // alert("Email đã tồn tại")
                textEmail.innerText = "* Email đã tồn tại"
            } else {
                textEmail.innerText = ""
                if (passwordSignUp.match(regexPwd)) {
                    textPWD.innerText = ""
                    if (passwordSignUp !== cofirmpasswordSignUp) {
                        // alert("Mật khẩu nhập không hợp lệ")
                        textPWD.innerText = "* Mật khẩu nhập không khớp"
                    } else {
                        textPWD.innerText = ""
                        userList.push(JSON.stringify(user))
                        localStorage.setItem("userList", `[` + userList + `]`)
                        window.location.href = "../index.html"
                    }
                } else {
                    textPWD.innerText = "* Vui lòng nhập ít nhất 8 ký tự (bao gồm: chữ thường, in hoa, số)"
                }

            }
        } else {
            textEmail.innerText = "* Email nhập không hợp lệ"
        }

    }

})