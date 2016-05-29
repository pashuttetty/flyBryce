$(document).ready(function () {


    $('.contactForm').validate({ // initialize the plugin
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            date: {
                required: false

            },
            message: {
                required: false
            }
        },
        messages: {
            name: "Please specify your name",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        submitHandler: function (form) { // for demo
            //******************TODO: send data to server and response back!**********************
            location.href = "flybryce.html";
            alert('Your message has been sent. thanks!'); // for demo
            return false; // for demo
        }
    });

});