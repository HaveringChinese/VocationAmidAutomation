const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { send } = require("process");

const app = express();

app.use(express.static("D:/Documents/Vocation Amid Automation/vaawebsite/resources/static"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/index.html"); 
   }); 

app.get("/dobedo", function(req, res) {
   res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/dobedo.html"); 
});

app.get("/login", function(req, res) {
    res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/login.html");
});

app.post("/login", function(req, res) {
    
    console.log(req.body);
    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);
    
    var result = num1 + num2;
    
    res.send("The result of the calculation is " + result);
});

app.get("/login", function(req, res) {
    res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/login.html");
});

app.get("/signup", function(req, res) {
    res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/signup.html");
});

app.post("/signup", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [ 
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
    ]
    }

    const jsonData = JSON.stringify(data);
    
    const url = "https://us5.api.mailchimp.com/3.0/lists/218a7a9b42";
    
    const options = {
        method: "POST",
        auth: "nrcvaa2021:9b9e405a40235ec8d3fccd96b00af3b8-us5"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/success.html");
            //window.open("D:/Documents/Vocation Amid Automation/vaawebsite/success.html");
        } else {
            res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/failure.html");
        }    

        response.on("data", function(data){
            console.log(JSON.parse(data));

        });
    });

    
    request.write(jsonData);
    request.end();

    console.log(firstName, lastName, email);

});

app.post("/failure", function(req, res) {
    res.redirect("/signup.html");
});


app.get("/bmicalculator", function(req, res) {
    res.sendFile("D:/Documents/Vocation Amid Automation/vaawebsite/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res) {
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var bmi = ((weight) / (height ** 2)) * 703;
    var bmiExplanation = "";
    if (bmi <= 18.5) {
        bmiExplanation = "underweight.";
    } else if (bmi > 18.5 && bmi < 25) {
        bmiExplanation = "a normal weight.";
    } else if (bmi > 25 && bmi < 30) {
        bmiExplanation = "overweight.";
    } else {
        bmiExplanation = "obese.";
    }
    res.send("Your BMI is " + bmi + ". That means you might be " + bmiExplanation);
});



app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
