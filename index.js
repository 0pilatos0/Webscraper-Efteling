const rp = require("request-promise");
const fetch = require("node-fetch");
var fs = require("fs");
const url =
  "https://www.efteling.com/nl/park/reserveer-bezoek/abonnementhouders/beschikbare-tijdsloten";

var jammer = {
  content: "ik heb gekeken maar nog geen tickets",
};
var jaah = {
  content:
    "<@669564704242532374> <@669566709539274753> <@850782537587359804> Er zijn tickets beschikbaar voor de efteling",
};
check();
function check() {
  rp(url)
    .then(function (html) {
      //success!

      fs.writeFile("index.html", html, function (err) {
        if (err) throw err;
        console.log("");
      });
      var n = html.indexOf("zondag 6 juni");
      setTimeout(() => {
        if (n > 0) {
          console.log("test");
          tellme(true);
        } else {
          tellme(false);
        }
      }, 10000);
    })
    .catch(function (err) {
      //handle error
    });
}

function tellme(args) {
  if (args == true) {
    fetch("", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jaah),
    }).then((res) => {
      console.log("Tickets gevonden Jeeeh");
    });
  } else {
    fetch("", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jammer),
    }).then((res) => {
      console.log("geen Tickets gevonden jammer");
    });
  }
  check();
}
