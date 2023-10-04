// Import required libraries and modules
const express = require("express")

require("dotenv").config()
const { connection } = require("./configs/db")
const{articleRouter}=require("./routes/article.routes")
const{contactRouter}=require("./routes/contact.routes")

const cors=require("cors")

// Create an Express application
const app = express()

app.use(express.json())
app.use(cors())

// Define a basic route for the root endpoint
app.get("/", async (req, res) => {
    try {
        // await res.send("wellcome to Blog app backend")
        await res.send(`<h1 style="text-align: center; color: blue;">wellcome to Blog app backend Coading samurai intern Assignment</h1>`)
        console.log("Wellcome blog app backend app")
    } catch (error) {
        res.send({"error":error.message})
    }   
})

// Use the articleRouter for article details
app.use("/blog",articleRouter)


// message send 
app.use("/contact",contactRouter)

// Start the server, listen to the specified port
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("DataBase is connected")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port${process.env.port}`)
})