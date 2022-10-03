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
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const postRoutes = require("./routes/posts")
const networkRoutes = require('./routes/networks')
const commentRoutes = require("./routes/comments")
// const notificationRoutes = require("./routes/notifications")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport)



// const initializePassport = require("./config/passport")
// initializePassport(passport)
// const modelPassport = require("./config/test")
// const stylistPassport = require("./config/stylist-passport")
// modelPassport(passport)
// stylistPassport(stylistPass)

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



// setting up nodemailer for sending email to users
// let mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: process.env.MAIL_ADDRESS,
//       pass: process.env.MAIL_KEY,
//   }
// });

// let mailDetails = {
//   from: 'xyz@gmail.com',
//   to: 'abc@gmail.com',
//   subject: 'Test mail',
//   text: 'Node.js testing mail for GeeksforGeeks'
// };

// mailTransporter.sendMail(mailDetails, function(err, data) {
//   if(err) {
//       console.log('Error Occurs');
//   } else {
//       console.log('Email sent successfully');
//   }
// });

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes)
app.use("/post", postRoutes)
app.use('/network', networkRoutes)
app.use("/comment", commentRoutes);
// app.use("/notifications", notificationRoutes);
// app.use('/:id', networkRoutes)


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!")
})
