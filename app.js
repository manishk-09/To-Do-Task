const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
const progressText = document.getElementById('progress-text');
const progressRing = document.querySelector('.progress-ring-progress');

// circumference of circle with r=22
const circumference = 2 * Math.PI * 22;
progressRing.style.strokeDasharray = circumference;
progressRing.style.strokeDashoffset = circumference;


function addTask(){
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateProgress()
    
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgress()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgress()
    }
}, false);

// save task in local storage
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
// load task from local storage
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
    updateProgress()
}
showTask();


// calculate progress
function updateProgress(){
    let tasks = listContainer.getElementsByTagName("li");
    let total = tasks.length;
    let completed = 0;

    for(let i=0; i<total; i++){
        if(tasks[i].classList.contains("checked")){
            completed++;
        }
    }

    let percent = total === 0 ? 0 : Math.round((completed/total)*100);

    // update text
    progressText.innerText = percent + "%";

    // update animated ring
    const offset = circumference - (percent / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;

}

// add task when i click enter button
inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
})
