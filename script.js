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
    } else {
        mediaRecorder.stop();
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
