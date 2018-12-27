/**
 * game object for trivia game
 * @type {Object}
 */
var triviaGame = {
    // counter for something?? possibly answers counter
    counter: 0,
    // questions array
    questions:

        [
            {
                // the question
                question: "What is the capital of United Kingdom?",
                // try to avoid strongly coupled arrays... instead use objects
                // array of choices... this must be in sync with the answer array
                choices: ["Manchester", "Birmingham", "London", "Birmingham"],
                // array of answers... this must be in sync with the choices array
                answer: [0, 1, 0, 0]
            },

            {
                question: "What is the capital of United States?",
                choices: ["Washington DC", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?",
                choices: ["Tom Hanks", "Jim Carrey", "Nicholas Cage", "Robert Downey Jr."],
                answer: [0, 1, 0, 0]
            },

            {
                question: 'In which Disney film do two cats sing “The Siamese Cat Song"?',
                choices: ["Lady and the Tramp", "Fantasia", "Cats vs Dogs", "Peter Pan"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "In what city would you find the Wizard of Oz?",
                choices: ["The Diamond City", "The Emerald City", "The Sapphire City", "The Ruby City"],
                answer: [0, 1, 0, 0]
            },

            {
                question: "What is Shawshank, in the movie The Shawshank Redemption?",
                choices: ["The Prison", "A Knife", "A Person", "The Town"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "The song “Eye of the Tiger” by the band Survivor was the theme song for what movie released in 1982?",
                choices: ["Rocky I", "Rocky II", "Rocky III", "Creed"],
                answer: [0, 0, 1, 0]
            },

            {
                question: "What is the capital of United States?",
                choices: ["California", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "What is the capital of United Kingdom?",
                choices: ["Manchester", "Birmingham", "London", "Birmingham"],
                answer: [0, 1, 0, 0]
            },

            {
                question: "What is the capital of United States?",
                choices: ["California", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            }
        ],

    // counter for something ?? possibly questions counter
    globalIndex: 0,
    // number of correct answers
    correct: 0,
    // number of incorrect answers
    incorrect: 0,
    // number of null or non-answers where the clock ran out of time
    noAnswer: 0,

    //  Variable that will hold our setInterval that runs the stopwatch
    intervalId: -1,

    // prevents the clock from being sped up unnecessarily
    clockRunning: false,

    // maximum time per question
    time: 30,

    /**
     * This will populate the questions in the instructions div, replacing the contents with the question
     * @param {Event} event - The event object captured from the browser (not currently used)
     */
    populateQuestions: function (event) {
        if (this.counter == 10) {
            this.clearForm();
            this.stop();
            this.finalResults();
        }
        else {
            console.log("in Populate questions");
            question = this.questions[this.globalIndex].question;
            answer = this.questions[this.globalIndex].answer;

            var tempholder = document.getElementById("instructions");
            tempholder.textContent = question;

            var options = this.questions[this.globalIndex].choices;

            for (var i = 0; i < options.length; i++) {

                var choiceButton = $("<button>");
                choiceButton.addClass("btn btn-primary");
                choiceButton.text(options[i]);
                choiceButton.attr('id', "choice-button" + [i]);
                choiceButton.attr('value', answer[i]);
                // console.log(choiceButton);
                $("#multiple-choice").append(choiceButton);
                choiceButton.on('click', this.checkAnswers.bind(this));
            }
            this.run();
            this.globalIndex++;
        }
    },
    /**
     * This will check the answers based on the click
     * @param {Event} event - The click event object captured from the browser
     * @listens click
     */
    checkAnswers: function (event) {

        // console.log("IN THE CHECK ANSWERS FUNCTION");
        // console.log({
        //     game: this,
        //     clickedThing: event.target
        // })
        console.log($(event.target).val());

        var gifResponseWrong = $("#gif-response-wrong");
        var gifResponseRight = $("#gif-response-right");


        var clickedValue = $(event.target).val();

        if (clickedValue == 1) {
            this.correct++;
            this.counter++;
            this.stop();
            this.clearForm();
            console.log(this);
            gifResponseRight.show();
            console.log("We're right here!");

            setTimeout(function (event) {
                gifResponseRight.hide();
                this.clearForm();
                console.log("after clear form");
                this.populateQuestions(event);
            }.bind(this), 2000);

        }
        else if (clickedValue == 0) {

            this.stop();
            this.incorrect++;
            this.counter++;
            this.clearForm();

            gifResponseWrong.show();


            setTimeout(function (event) {
                gifResponseWrong.hide();
                this.clearForm();
                this.populateQuestions(event);
            }.bind(this), 2000);
        }
    },

    /**
     * This will replace anything in the instructions div. (anything in the instructions div will be replaced)
     * The score/correct/incorrect/noanswer will be shown and updated.
     * Time display will be hidden.
     */
    finalResults: function () {
        $("#instructions").text("DRUM ROLL PLEASE!.... Let's see how you did. ");
        $("#score-area").show();
        $("#correctAnswers").text(this.correct);
        $("#incorrectAnswers").text(this.incorrect);
        $("#noAnswers").text(this.noAnswer);
        $("#timeDisplay").hide();
    },

    /**
     * This will remove anything in the instructions div.
     * This will also remove anything in the multiple-choice div.
     */
    clearForm: function () {
        $("#instructions").text("");
        $("#multiple-choice").empty();
        this.time = 30;
    },

    /**
     * This will start the timer.
     */
    run: function () {

        // if the timer is not on we set it
        if (!this.clockRunning) {
            intervalId = setInterval(this.count.bind(this), 1000);
            // we keep track of the interval through this flag
            clockRunning = true;
        }

    },

    /**
     * This will stop the timer.
     */
    stop: function () {
        console.log("STOP");
        clearInterval(intervalId);
        timerOn = false;
    },


    /**
     * This will increment the timer and also detect if the time runs out. It will increment the answer counter if the time runs out.
     */
    count: function () {

        console.log("TIME TEST: " + this.time);
        var gifResponseWrong = $("#gif-respons-wrong");


        //  TODO: increment time by 1, remember we cant use "this" here.
        this.time--;

        if (this.time === 0) {

            this.stop();

            alert("Times up!");
            this.clearForm();

            console.log("IN THE NON CLICK");

            gifResponseWrong.show();


            this.noAnswer++;
            this.counter++;
            console.log(this.noAnswer);
            setTimeout(function (event) {
                gifResponseWrong.hide();
                this.clearForm();
                this.populateQuestions();
            }.bind(this), 2000);


        }

        //  TODO: Get the current time, pass that into the timeConverter function,
        //        and save the result in a variable.
        currentTime = triviaGame.timeConverter(this.time);

        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        $("#timeDisplay").text(currentTime);
    },

    /**
     * This function allows us to adjust the display of the time.
     * @param {number} t - the number of seconds
     * @return {string} A string that has both minute and seconds
     */
    timeConverter: function (t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

};

/** @type {Object} makes a copy of the original game object so that we can properly restart */
var template = $.extend(true, {}, triviaGame);

/** 
 * This is the start button function.
 */
function start() {
    $('#start-button').remove();
    console.log("IN START");
    triviaGame.clearForm();
    triviaGame.populateQuestions();

};
/** 
 * This is the restart button function.
 */
function restart() {
    //WONT RESET -------
    console.log("IN RESTART");
    $("#score-area").hide();
    $("#correctAnswers").text("");
    $("#incorrectAnswers").text("");
    $("#noAnswers").text("");
    $("#timeDisplay").show();
    triviaGame = $.extend(true, {}, template);
    start();
};

