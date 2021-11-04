let faqContainer = document.getElementsByClassName("faq-container")[0];
let faqList = document.getElementsByClassName("faq");

let states = [];
for(let i = 0; i<faqList.length; i++)
    states.push(0);

for(let i = 0; i<faqList.length; i++) {
    let question = faqList[i].getElementsByClassName("question")[0];

    question.addEventListener("click", () => {
        let answerList = faqContainer.getElementsByClassName("answer");
        let buttonList = faqContainer.getElementsByClassName("button");

        for(let j = 0; j<faqList.length; j++) {
            if(j == i && states[j] == 0) {
                answerList[j].style.height = "auto";
                answerList[j].style.padding = "2vh";
                answerList[j].style.opacity = "1";
                buttonList[j].style.transform = "translate(0, -50%) rotate(180deg)";
                states[j] = 1;
            } else {
                answerList[j].style.height = "0";
                answerList[j].style.padding = "0";
                answerList[j].style.opacity = "0";
                buttonList[j].style.transform = "translate(0, -50%) rotate(0)";
                states[j] = 0;
            }
        }
    })
}