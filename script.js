// alert("Working . . .");
const recordBtn = document.querySelector(".record-circle");
const captureBtn = document.querySelector(".capture-circle");
const timerBox = document.querySelector(".timer-box p");
const video = document.querySelector(".camera-view");
const filterLayer = document.querySelector(".filter-layer");
const allFilters = document.querySelectorAll(".filter");
const filterCont = document.querySelector(".filter-layer");
const galleryBtn = document.querySelector(".fa-photo-film");
const uid = new ShortUniqueId();
let filterColor = "transparent";
let mediaRecorder;
let transaction;

// This will store the video recording stream.
let chunks = [];
let constraints = {
    audio: true,
    video: true
}
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    filterCont.style.aspectRatio = stream.getVideoTracks()[0].getSettings().aspectRatio;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener("start", () => {
        // console.log("Start Recording. . .");
    })
    mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    })
    mediaRecorder.addEventListener("stop", () => {
        // console.log("Stopped Recording!");
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        // console.log(videoURL);
        // Getting recorded video.
        // let a = document.createElement("a");
        // a.href = videoURL;
        // a.download = "myVideo.mp4";
        // a.click();
        if(db) {
            // console.log("working. . .");
            let videoID = uid();
            transaction = db.transaction("video", "readwrite");
            let videoStore = transaction.objectStore("video");
            let videoEntry = {
                id: `vid-${videoID}`,
                blobData: blob
            }
            let addRequest = videoStore.add(videoEntry);
            addRequest.onsuccess = function() {
                // console.log("Video entry added to the video store!", addRequest.result);
            }
            addRequest.onerror = function() {
                // console.log("Video entry NOT added to the video store!", addRequest.error);
            }
        }
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
        let imageURL = canvas.toDataURL("image/jpeg");
        // let a = document.createElement("a");
        // a.href = imageURL;
        // a.download = "myPic.jpeg"
        // a.click();
        if(db) {
            // console.log("working. . .");
            let imageID = uid();
            transaction = db.transaction("image", "readwrite");
            let imageStore = transaction.objectStore("image");
            let imageEntry = {
                id: `img-${imageID}`,
                url: imageURL
            }
            let addRequest = imageStore.add(imageEntry);
            addRequest.onsuccess = function() {
                // console.log("Image entry added to the image store!", addRequest.result);
            }
            addRequest.onerror = function() {
                // console.log("Image entry NOT added to the video store!", addRequest.error);
            }
        }

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
        currFilter.style.border = "2px solid red";
    });
})

galleryBtn.addEventListener("click", function() {
    location.assign("./gallery.html");
})