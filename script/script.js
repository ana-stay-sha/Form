"use strict";

const form = document.querySelector('.formWithValidation');
const validateBtn = form.querySelector('.form__submit-btn');
const fields = form.querySelectorAll('.contact-us__input');
const fullName = document.getElementById('#fullname');
const errorMessage = document.querySelectorAll('.error-message');
const checkboxe = document.querySelector('.custom-checkbox');


const generateError = function (text) {
    errorMessage.data = text;
    return errorMessage
  }

  const checkFieldsPresence = function () {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        const error = generateError('Cant be blank');
        errorMessage[i].innerHTML = error.data;
        fields[i].style.borderColor = 'red';
      }
        else{
        errorMessage[i].innerHTML = '';
        fields[i].style.borderColor = '#999999';
      }
    }


  }

const validateName = function (){
    const regName = /^[A-z\u00C0-\u00ff\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/;
    let fullName = document.querySelector('#fullname')
    fullName = fullName.value;
        if (fullName.length > 0 && fullName.length <= 2){
            const error = generateError('Username must be atleast 2 charactrs long, Please Try Again')
            errorMessage[0].innerHTML = error.data;
        } 
        else if (fullName.length > 0 && !regName.test(fullName)){
            const error = generateError('Use only Latin characters, Please Try Again')
            errorMessage[0].innerHTML = error.data;
        }
} 

const validateEmail = function() {
    let email = document.querySelector('#email');
    email = email.value;
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length != 0 && !reg.test(email)){
        const error = generateError('Invalid email, Please Try Again');
        errorMessage[1].innerHTML = error.data;
    } 
}

const checkCheckBoxes = function(){
    if (checkboxe.checked == false){
        const error = generateError('You must agree to the terms first');
        errorMessage[4].innerHTML = error.data;
    }
    else{
        errorMessage[4].innerHTML = '';
      }
}

const serialize = function(data){
    let obj = {};
    for (let [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

const sendRequest = function(method, url, body = null){
    const headers = {
        'Content-Type' : 'application/json'
    }
    return fetch (url, {
        method: method,
        body: JSON.stringify(body),
        headers : headers
    }).then( response => {
        if (response.ok){
            return response.json() 
        }

        return response.json().then(error => {
            const e = new Error('Something went wrong')
            e.data = error
            throw e
        })
    })
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    checkFieldsPresence()

    validateName();

    validateEmail();

    checkCheckBoxes();

    const data = new FormData(form);
    const body = serialize(data);

    sendRequest('POST', requestUrl, body)
        .then(data => {
            let textValue = 'You are sending data: \n';
            for (let property in data) {
                if (data[property] == ''){
                    return false
                }
                else{
                    textValue += `${property}: ${data[property]} \n`
                }
                
            }
            confirm(textValue)
            form.reset();
        })
        .catch(err => console.log(err))

  })

const requestUrl = 'https://jsonplaceholder.typicode.com/users';