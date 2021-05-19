
let form = document.querySelector('.formWithValidation');
let validateBtn = form.querySelector('.validateBtn');
let fields = form.querySelectorAll('.field');


let validateEmail = function() {
    let email = document.querySelector('#email');
    email = email.value;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!reg.test(email)){
        let error = generateError('Invalid email, Please Try Again')
        form[1].parentElement.insertBefore(error, fields[1]);
    } 
}

let removeValidation = function () {
    let errors = form.querySelectorAll('.error')
  
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
  }

let generateError = function (text) {
    let error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
  }

  let checkFieldsPresence = function () {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('field is blank', fields[i])
        let error = generateError('Cant be blank')
        form[i].parentElement.insertBefore(error, fields[i])
      }
    }
  }

let validate = function (){
    let fullName = document.querySelector('#fname')
    fullName = fullName.value;
        if (fullName.length > 0 && fullName.length <= 2){
            let error = generateError('Username must be atleast 2 charactrs long, Please Try Again')
            form[0].parentElement.insertBefore(error, fields[0]);
        } 

   } 

form.addEventListener('submit', function (event) {
    event.preventDefault();

    removeValidation();

    checkFieldsPresence()

    validate();
    
    validateEmail();
  })

// fetch('#')
//   .then(data => {
//       console.log(data)
//   })

  /*
Создание XMLHttpRequest-объекта
Возвращает созданный объект или null, если XMLHttpRequest не поддерживается
*/
function createRequestObject() {
    var request = null;
    try {
        request=new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e){}
    if(!request) try {
        request=new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e){}
    if(!request) try {
        request=new XMLHttpRequest();
    } catch (e){}
    return request;
}

/*
Кодирование данных (простого ассоциативного массива вида { name : value, ...} в
URL-escaped строку (кодировка UTF-8)
*/
function urlEncodeData(data) {
    var query = [];
    if (data instanceof Object) {
        for (var k in data) {
            query.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
        }
        return query.join('&');
    } else {
        return encodeURIComponent(data);
    }
}

/*
Выполнение POST-запроса 
url  - адрес запроса
data - параметры в виде простого ассоциативного массива { name : value, ...} 
callback - (не обяз.) callback-функция, которая будет вызвана после выполнения запроса и получения ответа от сервера
*/
function serverRequest(url, data, callback) {
    var request = createRequestObject();
    if(!request) return false;
    request.onreadystatechange  = function() { 
            if(request.readyState == 4 && callback) callback(request);
        };
    request.open('POST', url, true);
    if (request.setRequestHeader)
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    request.send(urlEncodeData(data));
    return true;
}