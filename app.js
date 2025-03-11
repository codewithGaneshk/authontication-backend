const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
require("dotenv/config")


const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Home")
})  
app.use("/api/user",userRoute)

app.listen(process.env.PORT)

async function db() {
    try {
        const data = await mongoose.connect(process.env.DB)
        console.log(data.default.STATES.connected);
    } catch (error) {
        console.log(Error.message);
    }
}
db()

