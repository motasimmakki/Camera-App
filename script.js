// alert("Working . . .");
let recordBtn = document.querySelector(".record-circle");
let captureBtn = document.querySelector(".capture-circle");
let timerBox = document.querySelector(".timer-box p");
let video = document.querySelector("video");
let mediaRecorder;

// This will store the video recording stream.
let chunks = [];
let constraints = {
    audio: true,
    video: true
}
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("start", () => {
        console.log("Start Recording. . .");
    })
    mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    })
    mediaRecorder.addEventListener("stop", () => {
        console.log("Stopped Recording!");
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        console.log(videoURL);
        // Getting recorded video.
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "myVideo.mp4";
        a.click();

    })
})

let isRecording = false;
recordBtn.addEventListener("click", function() {
    if(!isRecording) {
        mediaRecorder.start();
        recordBtn.classList.add("scale-record");
        timerBox.style.visibility = "visible";
        startTimer()
    } else {
        mediaRecorder.stop();
        recordBtn.classList.remove("scale-record");
        timerBox.style.visibility = "hidden";
        stopTimer();
    }
    isRecording = !isRecording;
});

function startTimer() {
    function displayTimer() {
        let totalSeconds = counter;

        let hours = parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;
        let mins = parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;
        let secs = totalSeconds;

        hours = (hours < 10)? `0${hours}`: hours;
        mins = (mins < 10)? `0${mins}`: mins;
        secs = (secs < 10)? `0${secs}`: secs;

        timerBox.innerText = `${hours}:${mins}:${secs}`;
        counter += 1;
    };
    setInterval(displayTimer, 1000);
    counter = 1;
}

function stopTimer() {
    
}

captureBtn.addEventListener("click", function() {
    if(!isRecording) {
        captureBtn.classList.add("scale-capture");
        setTimeout(() => {
            captureBtn.classList.remove("scale-capture");
        }, 1000);
    }
});
