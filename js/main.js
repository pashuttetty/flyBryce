function isUserLoggedIn() {
    var isLoggedIn;
    if (localStorage.getItem("username") != null) {
        //user exists
        var username = localStorage.getItem("username");
        $("#loginBTN").html("Hello " + username);
    }
}
$(document).ready(function () {
    
    var isMenuDisplayed = false;
    isUserLoggedIn();

    $("#doLoginBtn").click(function () {
        var userName = $("#username").val();
        var password = $("#password").val();
        localStorage.setItem('username', userName);
        localStorage.setItem('password', password);
        alert("Hello, " + userName + "!");
        $("#myModal").dismiss;
        $("#loginBTN").html("Hello " + userName);
        isLoggedIn = true;
        $("#search_results").css("display", "none");
    });

	$(".img-container").mouseenter(function(){
		console.log("mouse entered");
	    //var currCon=this;
		$($(this).children()[0]).css("display","block");
		var city = $(this).children()[1].name;
		console.log(city);
		$($(this).children()[0]).append("<h1>"+city+"</h1>");
		var currCurtain = $($(this).children()[0]);

		
		var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7a4b260992851e694df7258f380397be";
		$.getJSON(url, function (data) {
			console.log(data);
			debugger;
			var weatherDescription = data.weather[0].main;
			
			
			var currTmpInFar = data.main.temp;
			var currTmpInCel = parseInt((currTmpInFar - 32) * (5 / 9));
			//currCurtain.append("<p>"+currTmpInCel+"</p>");
			currCurtain.append("<h3>"+weatherDescription+"</h3><h4>"+currTmpInCel+"</h4>");
			var icon = data.weather[0].icon;
			var iconURL = "http://openweathermap.org/img/w/"+icon+".png";
			
			
			//console.log(iconURL);
			currCurtain.append('<img src="'+iconURL+'"/>');
			
		});
	});
	
	$(".img-container").mouseleave(function(){
		
		console.log("mouse leave"),
		$($(this).children()[0]).empty(),
		$(".curtain").css("display","none");
	});
	
	$(".hamburger").click(function(){
		if(!isMenuDisplayed){
			$(".headline").animate({marginTop: "85px"},10);
			$(".menu-div").css("display","block");
			
			isMenuDisplayed=true;
		}
		else{
			$(".headline").animate({marginTop: "20px"});
			$(".menu-div").css("display","none");
			isMenuDisplayed=false;	
		}
		
	});
	$(".menu-div div").mouseenter(function(){
		console.log("mouse is over the menu div div");
		$(this).stop().animate({fontSize:"20px"});
		$(this).css("background-color","#E8EAEB");
		$(this).css("color", "#529AB3");
        
		
		
	});
	$(".menu-div div").mouseleave(function(){
		console.log("mouse is over the menu div div");
		$(this).stop().animate({fontSize:"16px"});
		$(this).css("background-color","white");
		$(this).css("color","black");
		
	});

	//$(".facebook").click(function () {
	//    window.fbAsyncInit = function () {
	//        FB.init({
	//            appId: '536311783238542',
	//            xfbml: true,
	//            version: 'v2.6'
	//        });
	//    };

	//    (function (d, s, id) {
	//        var js, fjs = d.getElementsByTagName(s)[0];
	//        if (d.getElementById(id)) { return; }
	//        js = d.createElement(s); js.id = id;
	//        js.src = "//connect.facebook.net/en_US/sdk.js";
	//        fjs.parentNode.insertBefore(js, fjs);
	//    }(document, 'script', 'facebook-jssdk'));
	//});

	
});