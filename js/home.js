// document.addEventListener('DOMContentLoaded', () => {
// }

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

const settingTranslation = {
    en: ['choose language'],
    ru: ['выбрать язык']
}

const chooseOption = (lang) => {
    const settingOption = document.querySelector('.header__setting-option');
    settingOption.textContent = `${settingTranslation[lang]}`;
}
chooseOption(localStorage.language);

const headerTranslation = {
    en: ['home', 'quiz', 'gallery'],
    ru: ['главная', 'викторина', 'галерея']
}

const showHeader = (lang) => {
    const headerLinks = document.querySelectorAll('.header__link');
    [...headerLinks].forEach((item, index) => {
        item.textContent = `${headerTranslation[lang][index]} `;
    })
}
showHeader(localStorage.language);


const homeTranslation = {
    en: ['home', 'quiz', 'gallery'],
    ru: ['главная', 'викторина', 'галерея']
}

const showLinksHomePage = (lang) => {
    const homeLinks = document.querySelectorAll('.home__overlay-link');
    [...homeLinks].forEach((item, index) => {
        item.textContent = `${homeTranslation[lang][index]} `;
    })
}
showLinksHomePage(localStorage.language);


language.addEventListener('change', () => {
    setLangLocalStorage();
    setLangOptions(localStorage.language);
    showHeader(localStorage.language);
    showLinksHomePage(localStorage.language);
    chooseOption(localStorage.language);
})