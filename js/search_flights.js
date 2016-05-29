
$(document).ready(function () {

    
    $("#goToHistoryBTN").click(function () {
        $(".plainPic").css("display", "none");
        readAll(function (flights) {
            debugger;
            if (flights.length>0) {
                displayFlights(flights);
            }
            else {
                alert("You have to be logged in to save your serach history");
            }
            
        });
    });
    
    $("#searchFlightsBtn").click(function () {
        $(".plainPic").css("display", "none");
        var origin = $("#origin").val();
        //console.log(origin);
        var destination = $("#destination").val();
        //console.log(destination);
        var exitDate = $("#exitDate").val();
        //console.log(exitDate);
        var adultCount = $("#adultCount").val();

        var FlightRequest = {
            "request": {
                "slice": [
                  {
                      "origin": origin,
                      "destination": destination,
                      "date": exitDate
                  }
                ],
                "passengers": {
                    "adultCount": adultCount,
                    "infantInLapCount": 0,
                    "infantInSeatCount": 0,
                    "childCount": 0,
                    "seniorCount": 0
                },
                "solutions": 20,
                "refundable": false
            }
        };

        $.ajax({
            type: "POST",
            //Set up your request URL and API Key.
            //AIzaSyApOclixfqjI9z67cr-0eq4uSTH6eGFWvg
            url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBEsjPTfneZZdC_tfnXFX2Qiia5Pz8sykM",
            //AIzaSyCq9qK3WSPXlUs_t1RB8Iyc6yvCBxRtcPs",
            //AIzaSyCZki7UJykU1mhV8SUdybfHR70tDxDLPzY",
            //AIzaSyBEsjPTfneZZdC_tfnXFX2Qiia5Pz8sykM",
            //AIzaSyApOclixfqjI9z67cr-0eq4uSTH6eGFWvg",
            //AIzaSyC2C9juQKcJon39zbT5JwsC3G1uuuRxx90",
            contentType: 'application/json', // Set Content-type: application/json
            dataType: 'json',
            // The query we want from Google QPX, This will be the variable we created in the beginning
            data: JSON.stringify(FlightRequest),
            success: function (data) {
                console.log((data));

                addToDB(data.trips.tripOption);

                displayFlights(data.trips.tripOption);
                

            },
            error: function (data) {
                //Error Handling for our request
                console.log("error");
            }

        });
    });

});

function displayFlights(flights) {
    $("#search_results").css("display", "block");
    //Once we get the result you can either send it to console or use it anywhere you like.

    for (var i = 0; i < flights.length; i++) {

        if (flights[i].slice[0].segment.length < 2) {
            //debugger;
            var currFinalDestination = flights[i].slice[0].segment[0].leg[0].destination;
            var currConnectionFrom = null;
        }
        else {
            var currConnectionFrom = flights[i].slice[0].segment[0].leg[0].destination;
            var currFinalDestination = flights[i].slice[0].segment[1].leg[0].destination;
        }
        
        

        //var destinationDivId = 'destinationDivId' + i;
        //var destinationDivToAppend = '<div id="'+destinationDivId+'" class="destination"></div>';

        var destinationDivId = 'destinationDivId' + i;
        var destinationDivToAppend = '<div id="' + destinationDivId + '" class="destination"></div>';
        //debugger;

        var flightDateDivId = 'flightDateDivId' + i;
        var flightDateDivToAppend = '<div id= "' + flightDateDivId + '" class="flight_date"></div>';

        var flightDate = flights[i].slice[0].segment[0].leg[0].departureTime;


        var carrierDivId = 'carrierDivId' + i;
        var carrierDivToAppend = '<div id="' + carrierDivId + '" class="carrier"></div>';

        var carrier = flights[i].pricing[0].fare[0].carrier;


        var totalDurationDivId = 'totalDurationDivId' + i;
        var totalDurationDivToAppend = '<div id="' + totalDurationDivId + '" class="total_duration"></div>';

        var totalDuration = flights[i].slice[0].duration;


        var totalPriceDivId = 'totalPriceDivId' + i;
        var totalPriceDivToAppend = '<div id="' + totalPriceDivId + '" class="totalPrice"></div>';

        var saleTotal = flights[i].saleTotal;


        var divsOfSingleTripOptions = destinationDivToAppend + flightDateDivToAppend + carrierDivToAppend + totalDurationDivToAppend + totalPriceDivToAppend;

        var singleTripOptionId = 'singleTripOptionId' + i;

        $("#search_results").append('<div id="' + singleTripOptionId + '" class="single_trip_option">' + divsOfSingleTripOptions + '</div>');
        if (currConnectionFrom == null) {
            $("#" + destinationDivId).html("<h4>Flight to: " + currFinalDestination);
            $("#" + destinationDivId).css("display", "block");
        }
        else {
            $("#" + destinationDivId).html("<h4>Flight to: " + currFinalDestination + " via " + currConnectionFrom + "<h4>");
            $("#" + destinationDivId).css("display", "block");
        }
       
       

        $("#" + flightDateDivId).html("Departure time: " + flightDate);
        $("#" + flightDateDivId).css("display", "block");

        $("#" + carrierDivId).html("<h6>Carrier " + carrier + "<h6>");
        $("#" + carrierDivId).css("display", "block");

        $("#" + totalDurationDivId).html("Total flight duration: " + totalDuration + " minutes");
        $("#" + totalDurationDivId).css("display", "block");

        $("#" + totalPriceDivId).html("<h4>Total cost: " + saleTotal + "<h4>");
        $("#" + totalPriceDivId).css("display", "block");
    }

    $(".single_trip_option").css("display", "block");
    $(".single_trip_option").css("float", "left");
    $("#search_results").append();
    //debugger;
}

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var dbForUser = localStorage.getItem("username");
var request = window.indexedDB.open(dbForUser, 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("dbForUser", { keyPath: "id" });
}


function readAll(callback) {
    var results = [];

    var objectStore = db.transaction("dbForUser").objectStore("dbForUser");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            results.push(cursor.value);
            cursor.continue();
        }

        else {
            callback(results);
        }
    };
}

function add(flight) {
    var request = db.transaction(["dbForUser"], "readwrite")
    .objectStore("dbForUser")
    .add(flight);

    request.onsuccess = function (event) {
        console.log("added")
    };

    request.onerror = function (event) {
        console.log("error inserting: "  + event)
    }
}

function addToDB(dbForUser) {
    dbForUser.forEach(add);
}