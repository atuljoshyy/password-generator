//DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const successMsgEl = document.getElementById('success-msg-container');
const containerEl = document.getElementById('container');
const bodyEl = document.querySelector('body');
const themeToggleBtn = document.getElementById('theme-toggle');
const resultContainerEl = document.querySelector('.result-container')



generateEl.addEventListener('click', () => {
    const length = parseInt(lengthEl.value)
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    window.setTimeout(function () {
        successMsgEl.classList.remove('visible');
         
    }, 1200);

    successMsgEl.classList.add('visible');

})

themeToggleBtn.addEventListener('click', () => {
    bodyEl.classList.toggle('dark-body')
    containerEl.classList.toggle('dark-container')
    lengthEl.classList.toggle('dark-length-input')
    resultContainerEl.classList.toggle('dark-result-container')
    clipboardEl.classList.toggle('dark-btn')
    uppercaseEl.classList.toggle('dark-switch-input')
    generateEl.classList.toggle('dark-btn')
    // successMsgEl.classList.toggle('dark-success-msg')

    if (themeToggleBtn.checked) {
        console.log('dark mode activated');
    } else {
        console.log('light mode activated');
    }
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return '';
    }

    for (var i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]();

        })
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;


}




const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}



// Random Generators
function getRandomLower() {
    //String.fromCharCode() method converts Unicode values to characters
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}
