require('dotenv').config();
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(`${process.env.MONGOURL}`, { useNewUrlParser: true, useUnifiedTopology: true })

//Create Schema 
const imageSchema = {
    label: String,
    url: String,
    date: {
        type: Date,
        default: Date.now
    }

}

const Image = mongoose.model("Image", imageSchema)

//API Endpoints
//get all images on the server
app.get("/api/get-images", async function (req, res) {
    const images = await Image.find({}).sort({ date: 'desc' }).then(res => res).catch(err => console.log(err))
    res.json(images)
})

// ADD IMAGE TO DATABASE
app.post("/api/add-image", async function (req, res) {
    const { image } = req.body;
    const newImage = new Image({
        label: image.label,
        url: image.url
    })
    await newImage.save().then(() => res.sendStatus(200))
})

//DELTE IMAGE FROM DATABASE
app.post("/api/delete-image", function (req, res) {
    const id = req.body.id;
    Image.findByIdAndRemove(id).then(res => console.log(res)).then(() => { res.sendStatus(200) })

})
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port)

console.log(`App running on ${port}`);
