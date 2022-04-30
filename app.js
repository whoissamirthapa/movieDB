const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const cors = require("cors");

const dotenv = require('dotenv');

const userRouter = require('./router/user-router');
const favoriteRouter = require('./router/favorite-router');
const commentRouter = require('./router/comment-router');



dotenv.config({
    path: './.env',
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', ()=>{
    console.log("Database connected...");
})

mongoose.connection.on("error",(error)=>{
    console.log("Database not connected "+ error);
})

app.use(cors());
app.use(express.json());

// app.use("/", (req,res)=>{
//     res.send("hello world")
// })

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}




app.use('/api/users', userRouter);
app.use('/api/favorite-movie', favoriteRouter);
app.use('/api/comment', commentRouter);





const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`App is running at Port ${PORT}`)
})