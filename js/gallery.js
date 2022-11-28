import birdsData from '../js/birds.js'
import birdsData_ru from './birds-ru.js'
import birdsData_en from './birds-en.js'

document.addEventListener("DOMContentLoaded", () => {
    gallery();
});

const gallery = () => {

    /* --------------объявление переменных--------------- */
    const galleryBlock = document.querySelector(".gallery__block");
    const birdImageFirst = document.querySelector('.bird__pic');
    const birdDescription = document.querySelector('.bird__description');
    const audioPlayer = document.querySelector(".player");
    let play = document.querySelector('.player__control-play');
    const progressBar = audioPlayer.querySelector(".player__progress-bar");
    const currentTime = document.querySelector(".player__time-current");
    const totalTime = document.querySelector(".player__time-total");
    const timeline = audioPlayer.querySelector(".player__progress");
    const timelineWidth = window.getComputedStyle(timeline).width;
    const volumeSlider = document.querySelector(".player__volume-control-slider");
    const volumeButton = document.querySelector(".player__volume-btn");
    const slideNext = document.querySelector('.gallery__slider-btn_next');
    const slidePrev = document.querySelector('.gallery__slider-btn_prev');
    let isPlay = false;
    let step = 0;
    let birds;

    /* ------------объединение в один массив------------- */
    const mergeArray = (lang) => {
        let nameFiles = Object.keys({
            birdsData_en
        })[0];

        if (nameFiles.includes(lang)) {
            birds = birdsData_en.flat();
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;

        } else {
            birds = birdsData_ru.flat();
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;
        }
    }

    mergeArray(localStorage.language);


    /* ---------установление дефолтного значения--------- */

    /* -----------------кастомный плеер------------------ */
    const audioThird = new Audio();
    audioThird.src = birds[step].audio;
 
    const playAudio = () => {
        if (!isPlay) {
            isPlay = true;
            play.classList.add('player__control-pause');
            audioThird.play();
        } else {
            play.classList.remove('player__control-pause');
            audioThird.pause();
            isPlay = false;
        }
    }

    const changeAudio = () => {
        if (!isPlay) {
            play.classList.remove('player__control-pause');
            play.classList.add('player__control-play');
        } else {
            play.classList.add('player__control-pause');
            audioThird.classList.remove('player__control-play');
        }
    }

    play.addEventListener('click', function () {
        if (!isPlay) {
            playAudio();
            changeAudio();
        } else {
            playAudio();
            changeAudio();
        }
    });

    const timelineScrub = (event) => {
        const scrubTime = event.offsetX / parseInt(timelineWidth) * audioThird.duration;
        audioThird.currentTime = scrubTime;
    }
    timeline.addEventListener("click", timelineScrub);

    const setTotalTime = () => {
        const [min, sec] = (audioThird.duration / 100).toFixed(2).split(".");
        totalTime.textContent = `${min}:${sec}`;
    };

    const setCurrentTime = () => {
        const [min, sec] = (audioThird.currentTime / 100).toFixed(2).split(".");
        currentTime.textContent = `${min}:${sec}`;
    };

    const handleProgress = () => {
        const percent = (audioThird.currentTime / audioThird.duration) * 100;
        timeline.setAttribute("value", parseInt(percent));
    };

    const setSliderWidth = () => {
        progressBar.style.width = audioThird.currentTime / audioThird.duration * 100 + "%";
    };

    const setSliderPosition = (event) => {
        const percent = event.target.value;
        audioThird.currentTime = (audioThird.duration / 100) * percent;
    };

    audioThird.addEventListener("canplay", setTotalTime);

    audioThird.addEventListener("playing", () => {
        handleProgress();
        setCurrentTime();
        setSliderWidth();
    });

    audioThird.addEventListener("timeupdate", () => {
        handleProgress();
        setCurrentTime();
        setSliderWidth();
        if (audioThird.currentTime == audioThird.duration) {
            play.classList.remove('player__control-pause');
            isPlay = false;
        }
    });

    timeline.addEventListener("change", (event) => {
        setSliderWidth();
        setSliderPosition(event);
    });

    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        audioThird.volume = value / 100;
    });

    volumeButton.addEventListener('click', function () {
        if (audioThird.muted) {
            audioThird.muted = false;
            volumeButton.classList.remove("hidden");
        } else {
            audioThird.muted = true;
            volumeButton.classList.add("hidden");
        }
    }, false);

    /* -----------------рендер галереи------------------- */
    const getSlideNext = () => {
        if (step == birds.length - 1) {
            step = 0;
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;
            audioThird.src = birds[step].audio;
            console.log(`step - ${step}`);
            isPlay = false;
            progressBar.style.width = null;
            audioThird.currentTime = null;
            audioThird.pause();
            play.classList.remove('player__control-pause');
        } else {
            step++;
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;
            audioThird.src = birds[step].audio;
            console.log(`step - ${step}`);
            isPlay = false;
            progressBar.style.width = null;
            audioThird.currentTime = null;
            audioThird.pause();
            play.classList.remove('player__control-pause');
        }
    }

    function getSlidePrev() {
        if (step == 0) {
            step = birds.length - 1;
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;
            audioThird.src = birds[step].audio;
            console.log(`step - ${step}`);
            isPlay = false;
            progressBar.style.width = null;
            audioThird.currentTime = null;
            audioThird.pause();
            play.classList.remove('player__control-pause');
        } else {
            step--;
            document.querySelector('.bird__title-main').textContent = `${birds[step].name}`;
            document.querySelector('.bird__title').textContent = `${birds[step].species}`;
            document.querySelector('.bird__pic').src = `${birds[step].image}`;
            document.querySelector('.bird__description').textContent = `${birds[step].description}`;
            audioThird.src = birds[step].audio;
            console.log(`step - ${step}`);
            isPlay = false;
            progressBar.style.width = null;
            audioThird.currentTime = null;
            audioThird.pause();
            play.classList.remove('player__control-pause');
        }
    }

    slidePrev.addEventListener('click', getSlidePrev);
    slideNext.addEventListener('click', getSlideNext);


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

    const settingTranslation = {
        en: ['choose language'],
        ru: ['выбрать язык']
    }

    const chooseOption = (lang) => {
        const settingOption = document.querySelector('.header__setting-option');
        settingOption.textContent = `${settingTranslation[lang]}`;
    }
    chooseOption(localStorage.language);




    const quizInfoTranslation = {
        en: ['warm-up', 'sparrows', 'forest birds', 'singing birds', 'predator birds', 'sea birds'],
        ru: ['разминка', 'воробьиные', 'лесные тпицы', 'певчие птицы', 'хищные птицы', 'морские птицы']
    }

    const showQuizInfo = (lang) => {
        const quizInfoItem = document.querySelectorAll('.quiz-info__item');
        [...quizInfoItem].forEach((item, index) => {
            item.textContent = `${quizInfoTranslation[lang][index]} `;
        })
    }
    showQuizInfo(localStorage.language);

    language.addEventListener('change', () => {
        setLangLocalStorage();
        setLangOptions(localStorage.language);
        showHeader(localStorage.language);
        chooseOption(localStorage.language);
        mergeArray(localStorage.language);
    })
}