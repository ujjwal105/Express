const express = require("express")
const app = express()


const user = [{
    name: "John",
    kidneys: [{
        Healthy: false
    }, {
        Healthy: false
    }]

}]

app.use(express.json());

app.get("/", function (req, res) {
    const johnkidneys = user[0].kidneys
    numOfKidneys = johnkidneys.length
    let numOfHeakthyKidneys = 0;
    for (let i = 0; i < numOfKidneys; i++) {
        if (johnkidneys[i].Healthy == true) {
            numOfHeakthyKidneys++
        }
    }
    let numberofUnhealthyKidneys = numOfKidneys - numOfHeakthyKidneys

    res.json({
        numOfKidneys,
        numberofUnhealthyKidneys,
        numOfHeakthyKidneys
    })
})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy
    user[0].kidneys.push({
        Healthy: isHealthy
    })

    res.send({
        msg: "Done"
    })


})

app.put("/", function (req, res) {
    if (isthereatLeastOneUnhealthyKidney()) {
        for (let i = 0; i < user[0].kidneys.length; i++) {
            user[0].kidneys[i].Healthy = true;
        }


        res.json({
            msg: "Done"
        })
    }
    else {
        res.status(411).json({
            msg: "You don't have unhealthy kidney"
        })
    }
})
app.delete("/", function (req, res) {

    if (isthereatLeastOneUnhealthyKidney()) {
        const newKidney = []
        for (let i = 0; i < user[0].kidneys.length; i++) {
            if (user[0].kidneys[i].Healthy) {
                newKidney.push({
                    healthy: true
                })
            }
        }
        user[0].kidneys = newKidney
        res.json({
            msg: "Done"
        })
    }
    else {
        res.status(411).send({
            msg: "Yo have no bad kidneys"
        })
    }
})
function isthereatLeastOneUnhealthyKidney() {

    let atleastOneUnhealthyKidney = false

    for (let i = 0; i < user[0].kidneys.length; i++) {
        if (!user[0].kidneys[i].Healthy) {
            atleastOneUnhealthyKidney = true
        }

    }
    return atleastOneUnhealthyKidney;

}
app.listen(3000);
