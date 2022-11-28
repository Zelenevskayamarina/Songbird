// document.addEventListener('DOMContentLoaded', () => {    
// });
import birdsData from '../js/birds.js'
import birdsData_ru from './birds-ru.js'
import birdsData_en from './birds-en.js'



/* --------------объявление переменных--------------- */
// let score = null;
let choice;
let stage = 0;
let isPlay = false;
let isPlaySecond = false;
let points = 5;
let arrayBirds = [];
let arrayPoints1 = [1, 1, 1, 1, 1];
let arrayPoints2 = [1, 1, 1, 1, 1];
let arrayPoints3 = [1, 1, 1, 1, 1];
let arrayPoints4 = [1, 1, 1, 1, 1];
let arrayPoints5 = [1, 1, 1, 1, 1];
let arrayPoints6 = [1, 1, 1, 1, 1];
let array;

const quizContainer = document.querySelector('.quiz__container');
const quizInfoSecond = document.querySelector('.second');
const quizInfoThird = document.querySelector('.third');
const quizInfoFourth = document.querySelector('.fourth');
const quizInfoFifth = document.querySelector('.fifth');
const quizInfoSixth = document.querySelector('.sixth');
const quizInfoHidden = document.querySelector('.none');
const score = document.querySelector('.quiz-info__score');
const answer = document.querySelector('.quiz-answer');
const answerList = document.querySelector('.quiz-answer__list');
const answerItem = document.querySelectorAll('.quiz-answer__item');
const description = document.querySelector('.quiz-description');
const birdContainer = document.querySelector('.bird__container-second');
const birdDescription = document.querySelector('.bird__description-second');
const birdImageFirst = document.querySelector('.bird__pic');
const birdTitleFirst = document.querySelector('.bird__title');
const birdText = document.querySelector('.bird__text');
const btnNextStage = document.querySelector('.quiz-button');
const audioCorrectAnswer = new Audio();
const audioWrongAnswer = new Audio();
audioCorrectAnswer.src = 'assets/music/correct-answer.wav';
audioWrongAnswer.src = 'assets/music/wrong-answer.wav';
let isCounterCorrectPlayAudio = 0;
let birds;


/* --------------------первый плеер------------------ */
const audioPlayer = document.querySelector('.player');
let play = document.querySelector('.player__control-play');
const progressBar = audioPlayer.querySelector('.player__progress-bar');
const currentTime = document.querySelector('.player__time-current');
const totalTime = document.querySelector('.player__time-total');
const timeline = audioPlayer.querySelector('.player__progress');
const timelineWidth = window.getComputedStyle(timeline).width;
const volumeSlider = document.querySelector('.player__volume-control-slider');
const volumeButton = document.querySelector('.player__volume-btn');

/* --------------------второй плеер------------------ */
const audioPlayerSecond = document.querySelector('.player-second');
let playSecond = document.querySelector('.player__control-play-second');
const progressBarSecond = audioPlayerSecond.querySelector('.player__progress-bar-second');
const currentTimeSecond = document.querySelector('.player__time-current-second');
const totalTimeSecond = document.querySelector('.player__time-total-second');
const timelineSecond = audioPlayerSecond.querySelector('.player__progress-second');
const timelineWidthSecond = window.getComputedStyle(timelineSecond).width;
const volumeSliderSecond = document.querySelector('.player__volume-control-slider-second');
const volumeButtonSecond = document.querySelector('.player__volume-btn-second');

/* ----рендер блока с вариантами ответа (блок 3)----- */
const renderAnswerList = (stage, lang) => {

    let nameFiles = Object.keys({
        birdsData_en
    })[0];

    if (nameFiles.includes(lang)) {
        if (stage <= 5) {
            for (let i = 0; i < birdsData_en[stage].length; i++) {
                answerItem[i].textContent = '';
                answerItem[i].textContent = `${birdsData_en[stage][i].name}`;
            }
        }
    } else {
        if (stage <= 5) {
            for (let i = 0; i < birdsData_ru[stage].length; i++) {
                answerItem[i].textContent = '';
                answerItem[i].textContent = `${birdsData_ru[stage][i].name}`;
            }
        }
    }
}

/* -------------получить рандомный индекс------------ */
const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

const getRandomBird = (stage, lang) => {
    let nameFiles = Object.keys({
        birdsData_en
    })[0];

    if (nameFiles.includes(lang)) {
        if (stage <= 5) {
            for (let i = 0; i < birdsData_en[stage].length; i++) {
                arrayBirds.push(i);
            }
        }
    } else {
        if (stage <= 5) {
            for (let i = 0; i < birdsData_ru[stage].length; i++) {
                arrayBirds.push(i);
            }
        }
    }

    renderAnswerList(stage, localStorage.language);
    shuffle(arrayBirds);
}

getRandomBird(stage, localStorage.language);

console.log(`${stage} этап - ${birdsData[stage][arrayBirds[0]].name}`);
console.log(`${stage} этап - ${birdsData[stage][arrayBirds[0]].id}`);

/* ----------сброс всех стилей и параметров---------- */
const resetStyles = () => {

    document.querySelector('.bird__pic').src = '../assets/images/quiz/bird-plug.jpg';
    document.querySelector('.bird__title').textContent = 'x x x';
    document.querySelector('.bird__pic-second').src = '';
    document.querySelector('.bird__title-main-second').textContent = '';
    document.querySelector('.bird__title-second').textContent = '';

    answerItem.textContent = '';
    answerList.style.pointerEvents = 'none';
    answerList.classList.remove('opacity');
    answerItem.forEach((item) => {
        if (item.classList.contains('correct')) {
            item.classList.remove('correct');
        }
        if (item.classList.contains('wrong')) {
            item.classList.remove('wrong');
        }
    });
    btnNextStage.classList.remove('quiz-button_active');
    play.disabled = false;
    audioPlayer.style.opacity = '1';
    isCounterCorrectPlayAudio = 0;
    birdText.style.opacity = '1';
    birdContainer.style.opacity = '0';

}

/* -------------------первый плеер------------------- */
const audioFirst = new Audio();
audioFirst.src = birdsData[stage][arrayBirds[0]].audio;

const playAudio = () => {
    if (!isPlay) {
        isPlay = true;
        play.classList.add('player__control-pause');
        audioFirst.play();
        answerList.style.pointerEvents = 'auto';
    } else {
        play.classList.remove('player__control-pause');
        audioFirst.pause();
        isPlay = false;
    }
}

const changeAudio = () => {
    if (!isPlay) {
        play.classList.remove('player__control-pause');
        play.classList.add('player__control-play');
    } else {
        play.classList.add('player__control-pause');
        audioFirst.classList.remove('player__control-play');
    }
}

play.addEventListener('click', function () {
    if (!isPlay) {
        playAudio();
        changeAudio();
        answerList.classList.add('opacity');
    } else {
        playAudio();
        changeAudio();
        answerList.classList.remove('opacity');
    }
});

const timelineScrub = (event) => {
    const scrubTime = event.offsetX / parseInt(timelineWidth) * audioFirst.duration;
    audioFirst.currentTime = scrubTime;
}
timeline.addEventListener('click', timelineScrub);

const setTotalTime = () => {
    const [min, sec] = (audioFirst.duration / 100).toFixed(2).split('.');
    totalTime.textContent = `${min}:${sec}`;
};

const setCurrentTime = () => {
    const [min, sec] = (audioFirst.currentTime / 100).toFixed(2).split('.');
    currentTime.textContent = `${min}:${sec}`;
};

const handleProgress = () => {
    const percent = (audioFirst.currentTime / audioFirst.duration) * 100;
    timeline.setAttribute('value', parseInt(percent));
};

const setSliderWidth = () => {
    progressBar.style.width = audioFirst.currentTime / audioFirst.duration * 100 + '%';
};

const setSliderPosition = (event) => {
    const percent = event.target.value;
    audioFirst.currentTime = (audioFirst.duration / 100) * percent;
};

audioFirst.addEventListener('canplay', setTotalTime);

audioFirst.addEventListener('playing', () => {
    handleProgress();
    setCurrentTime();
    setSliderWidth();
});

audioFirst.addEventListener('timeupdate', () => {
    handleProgress();
    setCurrentTime();
    setSliderWidth();
    if (audioFirst.currentTime == audioFirst.duration) {
        play.classList.remove('player__control-pause');
        isPlay = false;
    }
});

timeline.addEventListener('change', (event) => {
    setSliderWidth();
    setSliderPosition(event);
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audioFirst.volume = value / 100;
});

volumeButton.addEventListener('click', function () {
    if (audioFirst.muted) {
        audioFirst.muted = false;
        volumeButton.classList.remove('hidden');
    } else {
        audioFirst.muted = true;
        volumeButton.classList.add('hidden');
    }
}, false);

/* -------------------второй плеер------------------- */
const audioSecond = new Audio();
audioSecond.src = birdsData_ru[stage][arrayBirds[0]].audio;

const playAudioSecond = () => {
    if (!isPlaySecond) {
        isPlaySecond = true;
        playSecond.classList.add('player__control-pause');
        audioSecond.play();
    } else {
        playSecond.classList.remove('player__control-pause');
        audioSecond.pause();
        isPlaySecond = false;
    }
}

const changeAudioSecond = () => {
    if (!isPlaySecond) {
        playSecond.classList.remove('player__control-pause');
        playSecond.classList.add('player__control-play');
    } else {
        playSecond.classList.add('player__control-pause');
        audioSecond.classList.remove('player__control-play');
    }
}

playSecond.addEventListener('click', function () {
    if (!isPlaySecond) {
        playAudioSecond();
        changeAudioSecond();
    } else {
        playAudioSecond();
        changeAudioSecond();
    }
});

const timelineScrubSecond = (event) => {
    const scrubTimeSecond = event.offsetX / parseInt(timelineWidthSecond) * audioSecond.duration;
    audioSecond.currentTime = scrubTimeSecond;
}
timelineSecond.addEventListener('click', timelineScrubSecond);

const setTotalTimeSecond = () => {
    const [minSecond, secSecond] = (audioSecond.duration / 100).toFixed(2).split('.');
    totalTimeSecond.textContent = `${minSecond}:${secSecond}`;
};

const setCurrentTimeSecond = () => {
    const [minSecond, secSecond] = (audioSecond.currentTime / 100).toFixed(2).split('.');
    currentTimeSecond.textContent = `${minSecond}:${secSecond}`;
};

const handleProgressSecond = () => {
    const percentSecond = (audioSecond.currentTime / audioSecond.duration) * 100;
    timelineSecond.setAttribute('value', parseInt(percentSecond));
};

const setSliderWidthSecond = () => {
    progressBarSecond.style.width = audioSecond.currentTime / audioSecond.duration * 100 + '%';
};

const setSliderPositionSecond = (event) => {
    const percentSecond = event.target.value;
    audioSecond.currentTime = (audioSecond.duration / 100) * percentSecond;
};

audioSecond.addEventListener('canplay', setTotalTimeSecond);

audioSecond.addEventListener('playing', () => {
    handleProgressSecond();
    setCurrentTimeSecond();
    setSliderWidthSecond();
});

audioSecond.addEventListener('timeupdate', () => {
    handleProgressSecond();
    setCurrentTimeSecond();
    setSliderWidthSecond();
    if (audioSecond.currentTime == audioSecond.duration) {
        playSecond.classList.remove('player__control-pause');
        isPlaySecond = false;
    }
});

timelineSecond.addEventListener('change', (event) => {
    setSliderWidthSecond();
    setSliderPositionSecond(event);
});

volumeSliderSecond.addEventListener('input', (e) => {
    const valueSecond = e.target.value;
    audioSecond.volume = valueSecond / 100;
});

volumeButtonSecond.addEventListener('click', function () {
    if (audioSecond.muted) {
        audioSecond.muted = false;
        volumeButtonSecond.classList.remove('hidden');
    } else {
        audioSecond.muted = true;
        volumeButtonSecond.classList.add('hidden');
    }
}, false);

/* -----рендер блока с описанием птицы (блок 4)------ */

const changeBird = (lang) => {

    let nameFiles = Object.keys({
        birdsData_en
    })[0];

    if (choice == birdsData[stage][arrayBirds[0]].id) {
        console.log(`index ${birdsData[stage][arrayBirds[0]].id} = choice ${choice}`);

        if (nameFiles.includes(lang)) {
            birdTitleFirst.textContent = `${birdsData_en[stage][arrayBirds[0]].name}`;
        } else {
            birdTitleFirst.textContent = `${birdsData_ru[stage][arrayBirds[0]].name}`;
        }

        birdImageFirst.src = `${birdsData[stage][arrayBirds[0]].image}`;
        btnNextStage.classList.add('quiz-button_active');
        audioFirst.pause();
        progressBar.style.width = null;
        audioFirst.currentTime = null;
        play.classList.remove('player__control-pause');
        play.disabled = true;
        audioPlayer.style.opacity = '0.3';
        isCounterCorrectPlayAudio++;
        
        audioSecond.pause();
        progressBarSecond.style.width = null;
        audioSecond.currentTime = null;
        playSecond.classList.remove('player__control-pause');

        if (isCounterCorrectPlayAudio <= 1) {
            event.target.classList.add('correct');
            audioCorrectAnswer.play();


            if (nameFiles.includes(lang)) {
                if (stage == 0) {
                    score.textContent = `Score: ${arrayPoints1.length}`;
                } else if (stage == 1) {
                    score.textContent = `Score: ${arrayPoints1.length + arrayPoints2.length}`;
                } else if (stage == 2) {
                    score.textContent = `Score: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length}`;
                } else if (stage == 3) {
                    score.textContent = `Score: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length}`;
                } else if (stage == 4) {
                    score.textContent = `Score: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length + arrayPoints5.length}`;
                } else if (stage == 5) {
                    score.textContent = `Score: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length + arrayPoints5.length + arrayPoints6.length}`;
                    localStorage.setItem('score', JSON.stringify(score.textContent));
                }
            } else {
                if (stage == 0) {
                    score.textContent = `Счет: ${arrayPoints1.length}`;
                } else if (stage == 1) {
                    score.textContent = `Счет: ${arrayPoints1.length + arrayPoints2.length}`;
                } else if (stage == 2) {
                    score.textContent = `Счет: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length}`;
                } else if (stage == 3) {
                    score.textContent = `Счет: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length}`;
                } else if (stage == 4) {
                    score.textContent = `Счет: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length + arrayPoints5.length}`;
                } else if (stage == 5) {
                    score.textContent = `Счет: ${arrayPoints1.length + arrayPoints2.length + arrayPoints3.length + arrayPoints4.length + arrayPoints5.length + arrayPoints6.length}`;
                    localStorage.setItem('score', JSON.stringify(score.textContent));
                }
            }
        }

    } else {
        if (event.target.classList.contains('quiz-answer__item')) {
            if (stage == 0) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints1.pop();
                }
            } else if (stage == 1) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints2.pop();
                }
            } else if (stage == 2) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints3.pop();
                }
            } else if (stage == 3) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints4.pop();
                }
            } else if (stage == 4) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints5.pop();
                }
            } else if (stage == 5) {
                if (isCounterCorrectPlayAudio >= 1) {
                    return;
                }
                if (event.target.classList.contains('wrong')) {
                    return;
                } else {
                    event.target.classList.add('wrong');
                    audioWrongAnswer.play();
                    points--;
                    arrayPoints6.pop();
                }
            }
        }
    }
}

const choiceBird = (e) => {
    for (let i = 0; i < answerItem.length; i++) {
        if (answerItem[i] === e.target) {
            choice = i;
            renderDescriptionList(choice, localStorage.language)

        }
    }  
    audioSecond.src = birdsData[stage][choice].audio;
    progressBarSecond.style.width = null;
    audioSecond.currentTime = null;
    playSecond.classList.remove('player__control-pause');
    changeBird(localStorage.language);
}


answerList.addEventListener('click', choiceBird);

/* -----рендер блока с описанием птицы (блок 4)------ */
const renderDescriptionList = (choice, lang) => {
    birdText.style.opacity = '0';
    birdContainer.style.opacity = '1';
    document.querySelector('.bird__pic-second').src = `${birdsData_ru[stage][choice].image}`;

    let nameFiles = Object.keys({
        birdsData_en
    })[0];

    if (nameFiles.includes(lang)) {
        document.querySelector('.bird__title-main-second').textContent = `${birdsData_en[stage][choice].name}`;
        document.querySelector('.bird__title-second').textContent = `${birdsData_en[stage][choice].species}`;
        document.querySelector('.bird__description-second').textContent = `${birdsData_en[stage][choice].description}`;
    } else {
        document.querySelector('.bird__title-main-second').textContent = `${birdsData_ru[stage][choice].name}`;
        document.querySelector('.bird__title-second').textContent = `${birdsData_ru[stage][choice].species}`;
        document.querySelector('.bird__description-second').textContent = `${birdsData_ru[stage][choice].description}`;
    }
}

/* ------------прейти на следующий этап ------------- */
const goNextStage = () => {
    if (stage < 5) {
        resetStyles();
        stage++;
        getRandomBird(stage);
        console.log(`${stage} этап - ${birdsData[stage][arrayBirds[0]].name}`);
        console.log(`${stage} этап - ${birdsData[stage][arrayBirds[0]].id}`);
        audioFirst.src = birdsData[stage][arrayBirds[0]].audio;
        playAudio();
        playAudioSecond();
        audioSecond.src = birdsData[stage][arrayBirds[0]].audio;

        if (stage == 1) {
            quizInfoSecond.classList.add('opacity');
        } else if (stage == 2) {
            quizInfoThird.classList.add('opacity');
        } else if (stage == 3) {
            quizInfoFourth.classList.add('opacity');
        } else if (stage == 4) {
            quizInfoFifth.classList.add('opacity');
        } else if (stage == 5) {
            quizInfoSixth.classList.add('opacity');
        }
    } else {
        window.location.href = '../results.html';
    }
}
btnNextStage.addEventListener('click', goNextStage);

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
    en: ['home', 'quiz', 'results', 'gallery'],
    ru: ['главная', 'викторина', 'результаты', 'галерея']
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

const scoreTranslation = {
    en: ['Score: 0'],
    ru: ['Счет: 0']
}

const showQuizScore = (lang) => {
    const ScoreQuiz = document.querySelector('.quiz-info__score');
    ScoreQuiz.textContent = `${scoreTranslation[lang]}`;
}
showQuizScore(localStorage.language);

const quizButtonTranslation = {
    en: ['next level'],
    ru: ['следующий уровень']
}

const showQuizButton = (lang) => {
    const quizButton = document.querySelector('.quiz-button');
    quizButton.textContent = `${quizButtonTranslation[lang]}`;
}
showQuizButton(localStorage.language);

const invitationButtonTranslation = {
    en: ['Listen to the player. Select a bird from the list'],
    ru: ['Послушайте плеер. Выберите птицу из списка']
}

const showQuizInvitation = (lang) => {
    const invitationButton = document.querySelector('.invitation__text');
    invitationButton.textContent = `${invitationButtonTranslation[lang]}`;
}
showQuizInvitation(localStorage.language);


language.addEventListener('change', () => {
    setLangLocalStorage();
    setLangOptions(localStorage.language);
    showHeader(localStorage.language);
    chooseOption(localStorage.language);
    showQuizInfo(localStorage.language);;
    renderAnswerList(stage, localStorage.language);
    getRandomBird(stage, localStorage.language);
    changeBird(localStorage.language);
    showQuizButton(localStorage.language);
    showQuizInvitation(localStorage.language);
    showQuizScore(localStorage.language);
})