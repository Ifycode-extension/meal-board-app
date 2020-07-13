
//First attempt at OOP with the clock

'use strict';

let date = new Date();
let currentSecond = date.getSeconds();
let currentMinute = date.getMinutes();
let currentHour = date.getHours();
let currentHour2 = date.getHours();

const periodOfTheDay = document.querySelector('.period-of-day');


/*===================================
    Configure clock to work and then
    place inside the clock object
=====================================*/

let addZero;
let toggle; 
let periodColor;

function periodcall() {
    switch(currentHour2) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:     
            toggle='a';
            break;
        default:
            toggle='p';
    }
}

periodcall(); //to avoid 'undefined' on page load


function App() {

    this.fastForwardClock = function() {

        function printTimePerSec() {
            //=======================================
            //Remove this later, not needed i think
            if(currentHour === 0) { //affects hour only
                currentHour = 12;
            }
            //=======================================
            
            if (currentMinute <= 9) {
                addZero = 0;
            }
            
            else {
                addZero = '';
            }

            if (currentSecond <= 9) {
                currentSecond = `0${currentSecond}`;
            }

        
            if(currentHour2 === 24) { 
                currentHour2 = 0;
            }

            if(currentHour >= 13) {  //>=13 not 12 so that i can have 12 for pm (noon) and am (midnight)
                currentHour = currentHour - 12;
            }

            document.querySelector('.seconds').innerHTML = `${currentSecond}`;
            document.querySelector('.minutes').innerHTML = `${addZero}${currentMinute}`;
            document.querySelector('.hours').innerHTML = `${currentHour}`;
            periodOfTheDay.innerHTML = `${toggle}m`;
            periodOfTheDay.style.color = `${periodColor}`;

            periodcall(); //call inside set interval

           
            let img = document.querySelector('img');

            if (currentHour === 10 && toggle === 'a') {
                img.src = './img/chicken-recipe.png';
            }
            else if (currentHour === 2 && toggle === 'p') {
                img.src = './img/efo-riro.png';
            }
            else if (currentHour === 8 && toggle === 'p') {
                img.src = './img/rice-recipe.png';
            }

            currentSecond++;

            if (currentSecond === 60) {
                currentSecond = 0;
                currentMinute++;
            }

            if(currentMinute === 60) {
                currentMinute = 0;
                currentHour++;  
                currentHour2++;  
            }
        }

        function removeDelay(func, interval) {
            func();
            return setInterval(func, interval);
        }

        function startImmediately2() {
            removeDelay(printTimePerSec, 1);
        }

        startImmediately2();
    };

    this.storage = function() {
        document.querySelector('.add').onclick = function(e) {
            e.preventDefault();
            let myContent = document.querySelector('#input').value;
            let myContent2 = document.querySelector('#preferred-time').value;
            let validationMessage = document.querySelector('#validation-message');
            
            if (myContent2 === 'Choose preferred time' || myContent < 1) {
                validationMessage.classList.remove('hide-validation-message');
                validationMessage.classList.add('show-validation-message');
            }else {
                validationMessage.classList.remove('show-validation-message');
                validationMessage.classList.add('hide-validation-message');
                if (myContent2 === '8am' || myContent2 === '10am') {
                    document.querySelector('.breakfast-choice').innerHTML = myContent;
                    document.querySelector('.breakfast-time').innerHTML = myContent2;
                    localStorage.setItem('breakfastChoice', myContent);
                    localStorage.setItem('breakfastTime', myContent2);
                }

                if (myContent2 === '1pm' || myContent2 === '3pm') {
                    document.querySelector('.lunch-choice').innerHTML = myContent;
                    document.querySelector('.lunch-time').innerHTML = myContent2;
                    localStorage.setItem('lunchChoice', myContent);
                    localStorage.setItem('lunchTime', myContent2);
                }

                if (myContent2 === '7pm' || myContent2 === '8pm') {
                    document.querySelector('.dinner-choice').innerHTML = myContent;
                    document.querySelector('.dinner-time').innerHTML = myContent2;
                    localStorage.setItem('dinnerChoice', myContent);
                    localStorage.setItem('dinnerTime', myContent2);
                }
            }
        }

        window.onload = function() {
            var bc = localStorage.getItem('breakfastChoice');
            document.querySelector('.breakfast-choice').innerHTML = bc;
            var bt = localStorage.getItem('breakfastTime');
            document.querySelector('.breakfast-time').innerHTML = bt;

            var lc = localStorage.getItem('lunchChoice');
            document.querySelector('.lunch-choice').innerHTML = lc;
            var lt = localStorage.getItem('lunchTime');
            document.querySelector('.lunch-time').innerHTML = lt;

            var dc = localStorage.getItem('dinnerChoice');
            document.querySelector('.dinner-choice').innerHTML = dc;
            var dt = localStorage.getItem('dinnerTime');
            document.querySelector('.dinner-time').innerHTML = dt;
        }


        document.querySelector('.clear').onclick = function(e) {
            e.preventDefault();

            let confirmClear = confirm('This will clear all info on the board. Meal info will no more appear on the board when you reload page. Are you sure you want to clear?');
            if (confirmClear === true) {
                document.querySelector('.breakfast-choice').innerHTML = '';
                document.querySelector('.breakfast-time').innerHTML = '';

                document.querySelector('.lunch-choice').innerHTML = '';
                document.querySelector('.lunch-time').innerHTML = '';

                document.querySelector('.dinner-choice').innerHTML = '';
                document.querySelector('.dinner-time').innerHTML = '';
                
                localStorage.clear();
            }
        }
    } 
}

let app = new App();
app.fastForwardClock();
app.storage();

