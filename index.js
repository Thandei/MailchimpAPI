const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res) {

    const FirstName = req.body.Name;
    const Lastname = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: FirstName,
                LNAME: Lastname
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/203b17e17a"
    const options = {
        method: "POST",
        auth: "ufuqi06:54b8d07f9c6b3fca16fdf28d9f0e8f7a-us7"
    };
    const request = https.request(url, options, function(response) {

        if (res.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000, function() {
    console.log("app listening on port 3000");
});

// API Key 54b8d07f9c6b3fca16fdf28d9f0e8f7a-us7
// List id 203b17e17a