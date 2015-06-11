$(document).ready(function(){
	var user = document.getElementById('user').value;
	var password = document.getElementById('password').value;

	document.getElementById('LogIn').addEventListener("click", function(){
		if(user === "username" && password === "12345"){
			document.getElementsByTagName('nav')[0].style.display = "none";
		}
	})
});