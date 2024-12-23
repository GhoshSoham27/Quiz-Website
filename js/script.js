$(document).ready(function () {
    // Variables
    let timeValue = 15;
    let que_count = 0;
    let que_numb = 1;
    let userScore = 0;
    let counter;
    let counterLine;
    let widthValue = 0;

    // Start Button
    $(".start_btn button").on("click", function () {
        $(".info_box").addClass("activeInfo");
    });

    // Exit Quiz Button
    $(".info_box .buttons .quit").on("click", function () {
        $(".info_box").removeClass("activeInfo");
    });

    // Continue Quiz Button
    $(".info_box .buttons .restart").on("click", function () {
        $(".info_box").removeClass("activeInfo");
        $(".quiz_box").addClass("activeQuiz");
        showQuestions(0);
        queCounter(1);
        startTimer(15);
        startTimerLine(0);
    });

    // Restart Quiz Button
    $(".result_box .buttons .restart").on("click", function () {
        $(".quiz_box").addClass("activeQuiz");
        $(".result_box").removeClass("activeResult");
        timeValue = 15;
        que_count = 0;
        que_numb = 1;
        userScore = 0;
        widthValue = 0;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        $(".timer .time_left_txt").text("Time Left");
        $(".next_btn").removeClass("show");
    });

    // Quit Quiz Button
    $(".result_box .buttons .quit").on("click", function () {
        location.reload();
    });

    // Next Button
    $(".next_btn").on("click", function () {
        if (que_count < questions.length - 1) {
            que_count++;
            que_numb++;
            showQuestions(que_count);
            queCounter(que_numb);
            clearInterval(counter);
            clearInterval(counterLine);
            startTimer(timeValue);
            startTimerLine(widthValue);
            $(".timer .time_left_txt").text("Time Left");
            $(".next_btn").removeClass("show");
        } else {
            clearInterval(counter);
            clearInterval(counterLine);
            showResult();
        }
    });

    // Show Questions
    function showQuestions(index) {
        let que_tag =
            '<span>' +
            questions[index].numb +
            ". " +
            questions[index].question +
            "</span>";
        let option_tag =
            '<div class="option"><span>' +
            questions[index].options[0] +
            "</span></div>" +
            '<div class="option"><span>' +
            questions[index].options[1] +
            "</span></div>" +
            '<div class="option"><span>' +
            questions[index].options[2] +
            "</span></div>" +
            '<div class="option"><span>' +
            questions[index].options[3] +
            "</span></div>";
        $(".que_text").html(que_tag);
        $(".option_list").html(option_tag);

        $(".option").on("click", function () {
            optionSelected($(this));
        });
    }

    // Option Selected
    function optionSelected(answer) {
        clearInterval(counter);
        clearInterval(counterLine);
        let userAns = answer.text();
        let correcAns = questions[que_count].answer;

        if (userAns == correcAns) {
            userScore++;
            answer.addClass("correct");
            answer.append('<div class="icon tick"><i class="fas fa-check"></i></div>');
        } else {
            answer.addClass("incorrect");
            answer.append('<div class="icon cross"><i class="fas fa-times"></i></div>');
            $(".option_list .option").each(function () {
                if ($(this).text() == correcAns) {
                    $(this).addClass("correct");
                    $(this).append(
                        '<div class="icon tick"><i class="fas fa-check"></i></div>'
                    );
                }
            });
        }
        $(".option_list .option").addClass("disabled");
        $(".next_btn").addClass("show");
    }

    // Show Result
    function showResult() {
        $(".info_box").removeClass("activeInfo");
        $(".quiz_box").removeClass("activeQuiz");
        $(".result_box").addClass("activeResult");
        let scoreTag;
        if (userScore >= 5) {
            scoreTag =
                '<span>and congrats! 🎉, You got <p>' +
                userScore +
                "</p> out of <p>" +
                questions.length +
                "</p></span>";
        } else if (userScore > 2) {
            scoreTag =
                '<span>and nice 😎, You got <p>' +
                userScore +
                "</p> out of <p>" +
                questions.length +
                "</p></span>";
        } else {
            scoreTag =
                '<span>and sorry 😐, You got only <p>' +
                userScore +
                "</p> out of <p>" +
                questions.length +
                "</p></span>";
        }
        $(".score_text").html(scoreTag);
    }

    // Timer
    function startTimer(time) {
        counter = setInterval(function () {
            $(".timer .timer_sec").text(time);
            time--;
            if (time < 10) {
                $(".timer .timer_sec").text("0" + time);
            }
            if (time < 0) {
                clearInterval(counter);
                $(".timer .time_left_txt").text("Time Off");
                let correcAns = questions[que_count].answer;
                $(".option_list .option").each(function () {
                    if ($(this).text() == correcAns) {
                        $(this).addClass("correct");
                        $(this).append(
                            '<div class="icon tick"><i class="fas fa-check"></i></div>'
                        );
                    }
                });
                $(".option_list .option").addClass("disabled");
                $(".next_btn").addClass("show");
            }
        }, 1000);
    }

    // Timer Line
    function startTimerLine(time) {
        counterLine = setInterval(function () {
            time += 1;
            $(".time_line").css("width", time + "px");
            if (time > 549) {
                clearInterval(counterLine);
            }
        }, 29);
    }

    // Question Counter
    function queCounter(index) {
        let totalQueCounTag =
            '<span><p>' +
            index +
            "</p> of <p>" +
            questions.length +
            "</p> Questions</span>";
        $(".total_que").html(totalQueCounTag);
    }
});
