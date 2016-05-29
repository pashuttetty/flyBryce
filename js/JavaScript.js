$(document).ready(function () {

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    // Open (or create) the database

    var open = indexedDB.open("MyDatabase1", 1);

    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        //keypath will be used as an index column
        var store = db.createObjectStore("MyObjectStore", { keyPath: "id", autoIncrement: true });
        var index = store.createIndex("SearchIndex", ["search.originToDB", "search.destinationToDB", "serach.dateToDB", "search.adultsToDB"]);
    };
    //open db to store the data (this function is ASYNC)

    open.onsuccess = function () {

        // Start a new transaction
        //insert data into DB

        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        var index = store.index("SearchIndex");
        var randomId = Math.floor(Math.random() * 1000);
        // Add the search data to the db
        //var getLastId = MyObjectStore.length;
        store.put({ id: randomId, search: { originToDB: "origin", destinationToDB: "destination", dateToDB: "exitDate", adultsToDB: "adultCount" } });
        var getLastStoreObject = store.get(randomId);
        console.log(getLastStoreObject);
        randomId = randomId + 1;

        // Close the db when the transaction is done
        tx.oncomplete = function () {
            db.close();
        };
    }
});