// alert("Working . . .");
let recordBtn = document.querySelector(".record-circle");
let captureBtn = document.querySelector(".capture-circle");
let timerBox = document.querySelector(".timer-box p");

let isRecording = false;
recordBtn.addEventListener("click", function() {
    if(!isRecording) {
        recordBtn.classList.add("scale-record");
        timerBox.style.visibility = "visible";
    } else {
        recordBtn.classList.remove("scale-record");
        timerBox.style.visibility = "hidden";
    }
    isRecording = !isRecording;
});

captureBtn.addEventListener("click", function() {
    if(!isRecording) {
        captureBtn.classList.add("scale-capture");
        setTimeout(() => {
            captureBtn.classList.remove("scale-capture");
        }, 1000);
    }
});
