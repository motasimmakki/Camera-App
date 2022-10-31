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
                    let url = URL.createObjectURL(videoObj.blobData);
                    videoEle.innerHTML = `
                        <div class="media">
                            <video autoplay loop src="${url}">
                        </div>
                        <div class="delete action-btn">DELETE</div>
                        <div class="download action-btn">DOWNLOAD</div>
                    `;
                    // Append child in gallery container.
                    galleryCont.appendChild(videoEle);
                })
            } else {
                console.log("No Video Found!");
            }
        }
    }
}, 100);
