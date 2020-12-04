
function getPercentage(questionNum,answer){
    let data = JSON.parse($("#surveysData").text());
    let surveysCount = data.length; 
    var res = 0;
    switch(questionNum){
        case 1:
            res = data.filter(x=> x.question1 == answer).length;
            break;
        case 2:
            res = data.filter(x=> x.question2 == answer).length;
            break;
        case 3:
            res = data.filter(x=> x.question3 == answer).length;
            break;
        case 4:
            res = data.filter(x=> x.question4 == answer).length;
            break;
        case 5:
            res = data.filter(x=> x.question5 == answer).length;
            break;
        default:
            res = 0;            
    }
    return res * 100 / surveysCount;
}

function Pq1(){
    let question1 = document.getElementById("question1_y").checked;
    let id1 = document.getElementById("id1");
    let q1_total = 0;
    let q1_yes = 0;
    let q1_no = 0; 

    if(question1){
        q1_total += 1;
        q1_yes += 1;
        id1.innerHTML =(getPercentage(1,"Y") + "% answered the same as you");
    } 
    else{
        q1_total += 1;
        q1_no += 1;
        id1.innerHTML=(getPercentage(1,"N") + "% answered the same as you");
    }
}
function Pq2(){
    let question2 = document.getElementById("question2_y").checked;
    let id2 = document.getElementById("id2");
    let q2_total = 0;
    let q2_yes = 0;
    let q2_no = 0; 

    if(question2){
        q2_total += 1;
        q2_yes += 1;
        id2.innerHTML =(getPercentage(2,"Y") + "% answered the same as you");
    } 
    else{
        q2_total += 1;
        q2_no += 1;
        id2.innerHTML=(getPercentage(2,"N") + "% answered the same as you");
    }
}
function Pq3(){
    let question3 = document.getElementById("question3_y").checked;
    let id3 = document.getElementById("id3");
    let q3_total = 0;
    let q3_yes = 0;
    let q3_no = 0; 

    if(question3){
        q3_total += 1;
        q3_yes += 1;
        id3.innerHTML =(getPercentage(3,"Y") + "% answered the same as you");
    } 
    else{
        q3_total += 1;
        q3_no += 1;
        id3.innerHTML=(getPercentage(3,"N") + "% answered the same as you");
    }
}
function Pq4(){
    let question4 = document.getElementById("question4_y").checked; 
    let id4 = document.getElementById("id4");
    let q4_total = 0;
    let q4_yes = 0;
    let q4_no = 0; 

    if(question4){
        q4_total += 1;
        q4_yes += 1;
        id4.innerHTML =(getPercentage(4,"Y") + "% answered the same as you");
    } 
    else{
        q4_total += 1;
        q4_no += 1;
        id4.innerHTML=(getPercentage(4,"N") + "% answered the same as you");
    }
}
function Pq5(){
    let question5 = document.getElementById("question5_y").checked; 
    let id5 = document.getElementById("id5");
    let q5_total = 0;
    let q5_yes = 0;
    let q5_no = 0; 

    if(question5){
        q5_total += 1;
        q5_yes += 1;
        id5.innerHTML =(getPercentage(5,"Y") + "% answered the same as you");
    } 
    else{
        q5_total += 1;
        q5_no += 1;
        id5.innerHTML=(getPercentage(5,"N") + "% answered the same as you");
    }
}
//added
function formSurveyOnSubmit(){

    let res = "Thank you,\n\n";
    for(let qNum = 1; qNum <=5;qNum++)
    {
        let answer = "N";
        if(document.getElementById("question"+qNum+"_y").checked)
        {
            answer = "Y";
        }

        res += "Question "+qNum+": "+getPercentage(qNum,answer).toFixed(2) + "% answered the same as you\n";
    }
    alert(res);
}
document.getElementById("formSurvey").addEventListener("submit", formSurveyOnSubmit); //added
    // document.getElementById("question1_y").addEventListener("click", Pq1, false);
    // document.getElementById("question1_n").addEventListener("click", Pq1, false);

    // document.getElementById("question2_y").addEventListener("click", Pq2, false);
    // document.getElementById("question2_n").addEventListener("click", Pq2, false);

    // document.getElementById("question3_y").addEventListener("click", Pq3, false);
    // document.getElementById("question3_n").addEventListener("click", Pq3, false);

    // document.getElementById("question4_y").addEventListener("click", Pq4, false);
    // document.getElementById("question4_n").addEventListener("click", Pq4, false);

    // document.getElementById("question5_y").addEventListener("click", Pq5, false);
    // document.getElementById("question5_n").addEventListener("click", Pq5, false);
    
    