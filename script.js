// DOM => Document Object Model

const test = {
    demarrage_quizz: null,
    quizz: null,
    fin_quizz: null,
    btn_bienvenu: null,
    reponse: null,
    fin_btn: null,
    cont_rep: null
};

let questionIndex = 0;

const questions = [{
        question: 'Ingénieur est un métier: ',
        reponse: [{
            title: 'Harry Potter',
            majeur: 'Information_Technology'
        }, {
            title: 'Drago Malefoy',
            majeur: 'Securite_et_reseaux'
        }, {
            title: 'Ollivander',
            majeur: 'Systeme_embarques'
        }, {
            title: 'Cédric Diggory',
            majeur: 'Data_Science'
        }]
    },
    {
        question: 'Quel est ton temps moyen de bonne concentration ?',
        reponse: [{
            title: 'Hermione Granger',
            majeur: 'Information_Technology'
        }, {
            title: 'Bellatrix Lestrange',
            majeur: 'Securite_et_reseaux'
        }, {
            title: 'Luna Lovegood',
            majeur: 'Systeme_embarques'
        }, {
            title: 'Nymphadora Tonks',
            majeur: 'Data_Science'
        }]
    },
    {
        question: 'Que penses tu du travail d’un ingénieur ? ?',
        reponse: [{
            title: 'Traiter l`information?',
            majeur: 'Data_Science'
        }, {
            title: 'Phénix',
            majeur: 'Information_Technology'
        }, {
            title: 'Pisser du code',
            majeur: 'Systeme_embarques'
        }, {
            title: 'Dragon',
            majeur:'Securite_et_reseaux'
        }]
    }
];

const recordedAnswers = [];


const init = () => {
    console.log('Page has loaded');

    test.welcomeScreen = document.querySelector('.welcome-screen');
    test.questionScreen = document.querySelector('.question-screen');
    test.endScreen = document.querySelector('.end-screen');
    test.btn_bienvenu = test.welcomeScreen.querySelector('button');
    test.fin_btn = test.endScreen.querySelector('button');
    test.cont_rep = test.questionScreen.querySelector('ul');

    test.btn_bienvenu.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    test.fin_btn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    test.cont_rep.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const majeur = target.getAttribute('data-majeur');
        recordedAnswers.push(majeur);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const majeur = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('majeur', majeur);

    const ChoixMajeur = {
        Securite_et_reseaux: 'Securite et reseaux',
        Data_Science: 'Data Science',
        Systeme_embarques: 'Systèmes embarqués',
        Information_Technology: 'Information Technology'
    };

    test.endScreen.querySelector('span').textContent = ChoixMajeur[majeur];
};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = test.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.reponse.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-majeur', answer.majeur);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    test.cont_rep.textContent = '';
    test.cont_rep.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    test.welcomeScreen.style.display = 'none';
    test.questionScreen.style.display = 'none';
    test.endScreen.style.display = 'none';

    const screen = test[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);
