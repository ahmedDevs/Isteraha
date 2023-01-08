const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override")
const flash = require("express-flash")
const logger = require("morgan")
const nodemailer = require("nodemailer")
// const { flash } = require('express-flash-message')
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const postRoutes = require("./routes/posts")
const networkRoutes = require('./routes/networks')
const commentRoutes = require("./routes/comments")
const notificationRoutes = require("./routes/notifications")
const settingsRoutes = require("./routes/settings")
const inviteRoutes = require("./routes/invitations")
const messageRoutes = require("./routes/messages")


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport)



//Connect To Database
connectDB()

//Using EJS for views
app.set("view engine", "ejs")

//Static Folder
app.use(express.static("public"))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())
// app.use(flash({ sessionKeyName: 'flashMessage' }));



//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes)
app.use("/post", postRoutes)
app.use('/network', networkRoutes)
app.use("/comment", commentRoutes)
app.use("/notification", notificationRoutes)
app.use("/settings", settingsRoutes)
app.use("/invite", inviteRoutes)
app.use("/message", messageRoutes)



//Server Running
// app.listen(process.env.PORT || 2121, () => {
//   console.log("Server is running, you better catch it!")
// })

//Connect to the database before listening
connectDB().then(() => {
  app.listen(process.env.PORT || 2121, () => {
      console.log("listening for requests");
  })
})
