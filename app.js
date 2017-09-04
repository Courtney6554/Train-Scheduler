
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCm9bcx6X-EAbDe8GMkgGSvg3NrpC6_8Z8",
    authDomain: "train-scheduler-aug-2017.firebaseapp.com",
    databaseURL: "https://train-scheduler-aug-2017.firebaseio.com",
    projectId: "train-scheduler-aug-2017",
    storageBucket: "train-scheduler-aug-2017.appspot.com",
    messagingSenderId: "764422929939"

  };

  firebase.initializeApp(config);

  var database = firebase.database();	


$("#add-train").on("click", function(event){
  event.preventDefault();

		var trainName = $("#name-input").val().trim();
		var destination = $("#destination-input").val().trim();
		var firstTrain = moment($("#first-train-input").val().trim(), "HHmm").format("X");
		var frequencyInput = $("#frequency-input").val().trim();

		console.log(moment(firstTrain).format("HHmm"));

		var newTrain = {
			name: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequencyInput
		}

		database.ref().push(newTrain);
		  console.log(newTrain.name);
		  console.log(newTrain.destination);
		  console.log(newTrain.firstTrain);
		  console.log(newTrain.frequency);

		$("#name-input").val("");
		$("#destination-input").val("");
		$("#first-train-input").val("");
		$("#frequency-input").val("");

});

	database.ref().on("child_added", function(childSnapshot, prevChildKey){
		console.log(childSnapshot.val());

		var fName = childSnapshot.val().name;
		var fDestination = childSnapshot.val().destination;
		var fFrequency = childSnapshot.val().frequency;
		var fFirstTrain = childSnapshot.val().firstTrain;
		var fFrequency = childSnapshot.val().frequency;

		var formatStart = moment.unix(fFirstTrain).format("HHmm");
		
		var diffTime = moment().diff(moment.unix(fFirstTrain, "X"), "minutes");
		var timeRemainder = moment().diff(moment.unix(fFirstTrain), "minutes") % fFrequency ;
		var minutes = fFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("HHmm"); 
		
		// Test for correct times and info
		console.log(fFirstTrain);
		console.log(minutes);
		console.log(moment(fFirstTrain, "X").format("HHmm"));
		console.log(moment().format("HHmm"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		$("#train-data-table").append("<tr><td>" + fName + 
			"</td><td>"+ fDestination + 
			"</td><td>every " + fFrequency + " mins" +
			"</td><td>" + (moment(fFirstTrain, "X").format("HHmm")) + 
			"</td><td>" + nextTrainArrival + 
			"</td><td>" + minutes + " min</td></tr>");

	});

