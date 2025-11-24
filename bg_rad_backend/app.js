const express = require("express");
const cors = require("cors");

const radDataRoute = require("./rad_data_endpoint/routes/radDataRoute.js");

const app = express();
const port = 8000;

app.use(cors());

app.use("/radData/", radDataRoute);

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({error:'an error occured'});
})

app.get("/", (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(404).json({ data: "There's nothing here :(" });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


