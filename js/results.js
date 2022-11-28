const language = document.getElementById('language');

const setLangLocalStorage = () => {
    localStorage.setItem('language', language.value);
}

const getLangLocalStorage = () => {
    language.value = localStorage.getItem('language');
}

if (localStorage.language) {
    getLangLocalStorage();
} else {
    language.value = 'en';
    setLangLocalStorage();
}

window.addEventListener('beforeunload', setLangLocalStorage);


const langOptions = document.querySelectorAll('.language-option');
const settingLangOptions = {
    en: {
        lang0: 'english',
        lang1: 'russian'
    },
    ru: {
        lang0: 'английский',
        lang1: 'русский'
    }
}

const setLangOptions = lang => {
    langOptions.forEach((el, i) => {
        el.textContent = settingLangOptions[lang][`lang${i}`];
    })
}
setLangOptions(localStorage.language);

const headerTranslation = {
    en: ['home', 'results'],
    ru: ['главная', 'результаты']
}

const showHeader = (lang) => {
    const headerLinks = document.querySelectorAll('.header__link');
    [...headerLinks].forEach((item, index) => {
        item.textContent = `${headerTranslation[lang][index]} `;
    })
}
showHeader(localStorage.language);

const settingTranslation = {
    en: ['choose language'],
    ru: ['выбрать язык']
}

const chooseOption = (lang) => {
    const settingOption = document.querySelector('.header__setting-option');
    settingOption.textContent = `${settingTranslation[lang]}`;
}
chooseOption(localStorage.language);


let totalScore = JSON.parse(
    localStorage.getItem(`score`),
);

let pointsScore = totalScore.replace(/\D/g, '');
console.log(pointsScore);

const messageTranslation = {
    en: [`Congratulations! You scored ${pointsScore} points out of 30 possible.`],
    ru: [`Поздравляем! Вы набрали ${pointsScore} баллов из 30 возможных.`]
}

const messageCongratulationsTranslation = {
    en: [`Congratulations! You have scored the maximum number of points - ${pointsScore}.`],
    ru: [`Поздравляем! Вы набрали максимальное количество баллов - ${pointsScore}.`]
}

const buttonTranslation = {
    en: [`play again`],
    ru: [`играть снова`]
}

const showResults = (lang) => {
    const message = document.querySelector('.results__overlay-text');
    const messageCongratulations = document.querySelector('.results__overlay-text-congratulation');
    const buttonPlayAgain = document.querySelector('.results__button');
    if (pointsScore < 30) {
        message.classList.add('block');
        messageCongratulations.classList.remove('block');
        message.textContent = `${messageTranslation[lang]}`;
        buttonPlayAgain.classList.add('block');
        buttonPlayAgain.textContent = `${buttonTranslation[lang]}`;

    } else if (pointsScore == 30) {
        messageCongratulations.classList.add('block');
        message.classList.remove('block');
        messageCongratulations.textContent = `${messageCongratulationsTranslation[lang]}`;
        buttonPlayAgain.classList.remove('block');
    }
}
showResults(localStorage.language);


language.addEventListener('change', () => {
    setLangLocalStorage();
    setLangOptions(localStorage.language);
    showHeader(localStorage.language);
    chooseOption(localStorage.language);
    showResults(localStorage.language);
})