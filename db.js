let openRequest = indexedDB.open("myDatabase");
let db;
openRequest.addEventListener("success", function() {
    // console.log("Connection Successful!");
    db = openRequest.result;
});

openRequest.addEventListener("upgradeneeded", function() {
    // triggers if the client had no database.
    // ...perform initialization.
    // console.log("Initialized Db or Upgraded!");
    db = openRequest.result;

    db.createObjectStore("video", {keyPath: "id"});
    db.createObjectStore("image", {keyPath: "id"});
});

openRequest.addEventListener("error", () => {
    // console.log("Error", openRequest.error);
});