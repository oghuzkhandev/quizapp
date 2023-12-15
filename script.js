function Question(questionDescription, answerOptions, trueAnswer) {
    this.questionDescription = questionDescription;
    this.answerOptions = answerOptions;
    this.trueAnswer = trueAnswer;
}

const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

Question.prototype.checkAnswer = function(answer) {
    return answer === this.trueAnswer;
}

let Questions = [
    new Question("1- Who Took Sasuke's place in Naruto Shippuden?", { a: "Sai", b: "Jiraiya", c: "Tsunade" , d: "Orochimaru" }, "a"),
    new Question("2- What was Naruto's final mode called?", { a: "Kurama Mode", b: "Sage Mode", c: "Kyuubi Chakra Mode", d: "Sage of Six Paths" }, "a"),
    new Question("3- Who is Ashuras Revival?", { a: "Sasuke", b: "Itachi", c: "Madara", d:"Naruto" }, "d"),
    new Question("4- Who has the Strongest Mangekyou Sharingan?", { a: "Itachi", b: "Obito", c: "Shisui", d: "Momoshiki Otsusuki", e: "Shin Uchiha" }, "c"),
    new Question("5- Who is the founder of Akatsuki ", {a: "Pain ", b: "Madara ", c: " Yahiko" , d: "Nagato"}, "c")
];

function Quiz(Questions) {
    this.Questions = Questions;
    this.questionIndex = 0;
    this.trueAnswersIndex = 0;
}

Quiz.prototype.bringQuestions = function() {
    return this.Questions[this.questionIndex];
}

const quiz = new Quiz(Questions);

document.querySelector(".btn_quit").addEventListener("click", function(){
    window.location.reload();
});

document.querySelector(".btn_again").addEventListener("click", function(){
    quiz.questionIndex = 0;
    quiz.trueAnswersIndex = 0;
    document.querySelector(".score_box").classList.remove("active");
    document.querySelector(".btn_start").click();
})

document.querySelector(".btn_start").addEventListener("click", function() {
    document.querySelector(".quiz_box").classList.add("active");
    showQuestions(quiz.bringQuestions());
    showNumbers(quiz.questionIndex+1, quiz.Questions.length);
})

document.querySelector(".next_btn").addEventListener("click", function() {
    if (quiz.Questions.length != quiz.questionIndex + 1) {
        quiz.questionIndex += 1;
        showQuestions(quiz.bringQuestions());
        showNumbers(quiz.questionIndex+1, quiz.Questions.length);
    } else {
        console.log("quiz bitti");
        document.querySelector(".quiz_box").classList.remove("active");
        document.querySelector(".btn_start").classList.add("deactive");
        document.querySelector(".score_box").classList.add("active");
        showScore(quiz.Questions.length, quiz.trueAnswersIndex);
        totalPoints(quiz.trueAnswersIndex);
    }
});

const option = option_list.querySelectorAll(".option");
console.log(option);

function showQuestions(Question) {
    let question = `<span>${Question.questionDescription}</span>`;
    let options = '';

    for(let answer in Question.answerOptions) {
        options += 
            `
                <div class="option"> 
                    <span><b>${answer}</b>: ${Question.answerOptions[answer]}</span>
                </div>
            `;
    }

    const option_list = document.querySelector(".option_list");
    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(option){
    let answer = option.querySelector("span b").textContent;
    let Question = quiz.bringQuestions();

    if(Question.checkAnswer(answer)){
        quiz.trueAnswersIndex += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    }
    else{
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for(let i=0; i< document.querySelector(".option_list").children.length; i++){
        document.querySelector(".option_list").children[i].classList.add("disabled");
    }
}

function showNumbers (questionNumber, totalQuestion){
    let tag = `<span class="badge bg-danger"> ${questionNumber}/${totalQuestion}</span>`;
    document.querySelector(".num").innerHTML = tag;
}

function showScore (totalQuestion, trueAnswersIndex){
    let tag = `<p> You Answered ${trueAnswersIndex} Questions Correct of Total ${totalQuestion} Questions </p>`;
    document.querySelector(".scoreinfo").innerHTML = tag;
}

function totalPoints (trueAnswersIndex){
    let score = 20;
    let tag = `<span> You Got ${trueAnswersIndex*score}/100 Points Congratulations </span>`;
    document.querySelector(".totalscore").innerHTML = tag;
}
