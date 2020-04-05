let a = require("../lib/EMFR")

a.WriteAutomation().then(b => {

    a.ReadAutomation("../auto.js")

})