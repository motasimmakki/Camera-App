const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", function() {
    location.assign("./index.html");
});

setTimeout(() => {
    if(db) {
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = function() {
            if(imageRequest.result !== undefined) {
                // imageRequest.result -> returns the objects of all images in an array.
                console.log("Images", imageRequest.result);
                let imageResult = imageRequest.result;
                let galleryCont = document.querySelector(".media-cont-box");
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
    }
}, 100);
