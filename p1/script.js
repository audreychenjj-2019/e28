let app = new Vue({
    el: '#app',
    data: {
        playerName: '',
        gameMode: 'start',
        submitted: false,
        level: '',
        correct: false,
        feedbackClass: '',
        valid: true,
        feedback: '',
        solution: null,
        guess: '',
        guesses: [],
        imageSrc: '',
        imageAlt: '',
    },
    methods: {
        // solutionGenerator: function () {
        //     this.solution = Math.floor(Math.random() * 10) + 1
        // },
        startGame: function () {
            this.gameMode = 'play';
            this.loadGame();
        },

        solutionGenerator: function () {
            if (this.level == 'easy') {
                this.solution = Math.floor(Math.random() * 10) + 1;
            }
            else if (this.level == 'moderate') {
                this.solution = Math.floor(Math.random() * 25) + 1;
            }
            else if (this.level == 'difficult') {
                this.solution = Math.floor(Math.random() * 50) + 1;
            }
            else {
                this.solution = null;
            }
        },

        submitGuess: function () {
            this.submitted = true;
            this.valid = true;
            this.guesses.push(this.guess);

            if (typeof (this.guess) != 'number') {
                this.feedbackClass = 'validationError';
                this.valid = false;
                this.submitted = false;
                this.feedback = 'Enter a valid number';
            } else if (this.guess > this.solution) {
                this.feedbackClass = 'error';
                this.feedback = 'Too high. Try again.';
                this.correct = false;
                this.imageSrc = 'images/sad.jpg';
                this.imageAlt = 'Frowny face';
            } else if (this.guess < this.solution) {
                this.feedbackClass = 'error';
                this.feedback = 'Too low. Try again.';
                this.correct = false;
                this.imageSrc = 'images/sad.jpg';
                this.imageAlt = 'Frowny face';
            } else {
                this.feedbackClass = '';
                this.feedback = 'You got it!';
                this.correct = true;
                this.imageSrc = 'images/happy.jpg';
                this.imageAlt = 'Happy smiley face';
            }
        },

        loadGame: function () {
            this.feedback = '';
            this.guess = '';
            this.guesses = [];
            this.solutionGenerator();
        }
    },

});
