const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", function() {
    location.assign("./index.html");
});

setTimeout(() => {
    if(db) {
        let galleryCont = document.querySelector(".media-cont-box");
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = function() {
            if(imageRequest.result !== undefined) {
                // imageRequest.result -> returns the objects of all images in an array.
                // console.log("Images", imageRequest.result);
                let imageResult = imageRequest.result;
                imageResult.forEach((imageObj) => {
                    let url = imageObj.url;
                    // Create a image container.
                    let imageEle = document.createElement("div");
                    imageEle.setAttribute("class", "media-cont");
                    imageEle.setAttribute("id", imageObj.id);
                    // Add image to that container.
                    imageEle.innerHTML = `
                        <div class="media">
                            <img src="${url}">
                        </div>
                        <div class="delete action-btn">DELETE</div>
                        <div class="download action-btn">DOWNLOAD</div>
                    `;
                    // Append child in gallery container.
                    galleryCont.appendChild(imageEle);

                    let deleteBtn = imageEle.querySelector(".delete");
                    deleteBtn.addEventListener("click", deleteListener);

                    let downloadBtn = imageEle.querySelector(".download");
                    downloadBtn.addEventListener("click", downloadListener);
                });
            } else {
                console.log("No Image Found!");
            }
        }

        let videoDBTransaction = db.transaction("video", "readonly");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess = () => {
            if(videoRequest.result !== undefined) {
                let videoResult = videoRequest.result;
                videoResult.forEach((videoObj) => {
                    let videoEle  = document.createElement("div");
                    videoEle.setAttribute("class", "media-cont");
                    videoEle.setAttribute("id", videoObj.id);
                    let url = URL.createObjectURL(videoObj.blobData);
                    videoEle.innerHTML = `
                        <div class="media">
                            <video autoplay muted loop src="${url}">
                        </div>
                        <div class="delete action-btn">DELETE</div>
                        <div class="download action-btn">DOWNLOAD</div>
                    `;
                    // Append child in gallery container.
                    galleryCont.appendChild(videoEle);
                    
                    let deleteBtn = videoEle.querySelector(".delete");
                    deleteBtn.addEventListener("click", deleteListener);

                    let downloadBtn = videoEle.querySelector(".download");
                    downloadBtn.addEventListener("click", downloadListener);
                })
            } else {
                console.log("No Video Found!");
            }
        }
    }
}, 100);

function deleteListener(event) {
    // Get id from event.
    let id = event.target.parentElement.getAttribute("id");
    console.log(id);
    // Find id belongs to which store.
    let mediaType = id.split("-")[0];
    // Go into the db of video/image.
    // Delete it.
    if(mediaType == "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        imageStore.delete(id);
    } else { // Video
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        videoStore.delete(id);
    }
    // Delete from frontend.
    
}

function downloadListener(event) {

}
