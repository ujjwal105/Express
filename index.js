const express = require("express");
const app = express();
var users = [{
    name: "John"
    ,
    kidneys: [{
        Healthy: false
    },
    {
        Healthy: false
    }
    ]
}]

app.use(express.json());

app.get("/", function (req, res) {
    const johnkidneys = users[0].kidneys;
    const numberofkidneys = johnkidneys.length;
    let numberofHealthyKidneys = 0;
    for (let i = 0; i < numberofkidneys; i++) {
        if (johnkidneys[i].Healthy) {
            numberofHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKideneys = numberofkidneys - numberofHealthyKidneys;
    res.json({
        numberofkidneys,
        numberofHealthyKidneys,
        numberOfUnhealthyKideneys
    })
})

app.post("/", function(req, res) {

    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        Healthy: isHealthy
    })
    
    res.json({
        msg: "Done!"
    })
})


app.put("/",function(req,res){
    for (let i = 0; i < users[0].kidneys.length;i++){
        users[0].kidneys[i].Healthy = true;
    }
    res.json({

    })
})

// Removing all the unhealthy kidneys

app.delete("/",function(req,res){

    if(isThereatleastOneUnhealthyKidney()){
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length;i++){
           if(users[0].kidneys[i].Healthy){
            newKidneys.push({
                Healthy: true
            });
           }
        }
        users[0].kidneys = newKidneys;
        res.json({
    msg:"done"
        })
    }
    else{
        res.status(411).json({
            msg : "you have no bad kidneys"
        })
    }
})
function isThereatleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].Healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);
