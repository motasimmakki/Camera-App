const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", function() {
    location.assign("./index.html");
});

// if(db) {
//     let imageDBTransaction = db.transaction("image", "readonly");
//     let imageStore = imageDBTransaction.objectStore("image");
//     let imageRequest = imageStore.getAll();
//     imageRequest.onsuccess = function() {

//     }
// }
