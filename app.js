//1st install npm init*******
const express = require("express"); //npm install express for every project bcz we use every time
const https = require("https");
const bodyparser = require("body-parser"); //npm install body-parser every project in which we use body data

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
}); //app.get over

app.post("/", function (req, res) {
  //   var city = req.body.cityname;
  //   console.log(city);
  const querry = req.body.cityname;
  const apikey = "437822772ad547fb2c1f44eab4bb6ce8";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    querry +
    "&appid=" +
    apikey +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode); //it give the status code ex:200,404etc
    // console.log(response);//it give the https response
    //collect response data from the upi url...........
    response.on("data", function (data) {
      //   console.log(data);//hexadecimal data it given...
      //for text and row wise data we use JSON
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);
      //collected data are.........
      const temp = weatherdata.main.temp; //in object weatherdata the temp path ....
      const weatherdescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      //we can write this also res.write("...");then res.send...
      res.write(
        "<h1>The temperature in " +
          querry +
          " is " +
          "<i><b>" +
          temp +
          "</i></b>" +
          " degrees Celcius.</h1>"
      );
      res.write(
        "<h2>The Weather is currently " +
          "<i><b>" +
          weatherdescription +
          "</i></b>" +
          "</h2>"
      );
      res.write("<img src=" + imageurl + ">");
      res.send();
      //res.send can write one time not more then one.....in the file..

      //   res.send(
      //     "<h1>The temperature in Puri is " +
      //       "<i><b>" +
      //       temp +
      //       "</i></b>" +
      //       " degrees Celcius. <br> The Weather is currently " +
      //       "<i><b>" +
      //       weatherdescription +
      //       "</i></b>" +
      //       "</h1>"
      //   );

      //for create a object to single line string.......

      //   const name = {
      //     name: "sibun",
      //     roll: "016",
      //   };
      //   console.log(JSON.stringify(name));
    }); //response.on over
  }); //http.get over
}); //app.post over
//it start the java script file...
app.listen(3000, function () {
  console.log("server is running on port 3000.");
});
