// alert("Working . . .");
let recordBtn = document.querySelector(".record-circle");
let captureBtn = document.querySelector(".capture-circle");
let timerBox = document.querySelector(".timer-box p");
let video = document.querySelector(".camera-view");
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");
let filterDiv = document.querySelector(".filter-layer");
let filterColor = "transparent";
let mediaRecorder;

// This will store the video recording stream.
let chunks = [];
let constraints = {
    audio: true,
    video: true
}
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    filterDiv.style.aspectRatio = stream.getVideoTracks()[0].getSettings().aspectRatio;
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

let timerID;
function startTimer() {
    let counter = 1;
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
    timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
    clearInterval(timerID); 
    timerBox.innerHTML = "00:00:00";
}

captureBtn.addEventListener("click", function() {
    if(!isRecording) {
        captureBtn.classList.add("scale-capture");
        // Capturing image using canvas.
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = filterColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Auto Download the image.
        let image = canvas.toDataURL("image/jpeg");
        let a = document.createElement("a");
        a.href = image;
        a.download = "myPic.jpeg"
        a.click();

        setTimeout(() => {
            captureBtn.classList.remove("scale-capture");
        }, 1000);
    }
});

allFilters.forEach((currFilter) => {
    currFilter.addEventListener("click", function() {
        filterColor = getComputedStyle(currFilter).getPropertyValue("background-color");
        allFilters.forEach(filter => filter.style.border = "none");
        // Need to test.
        filterLayer.style.backgroundColor = filterColor;
    });
})