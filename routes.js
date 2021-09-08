const express = require("express");
const router = express.Router({ mergeParams: true });

function returnValue(err, res, data) {
    if (err) {
        res.status(200).json({ Success: false, err });
    } else {
        res.status(200).json({ Success: true, data: data });
    }
}


// GET, POST, PUT, PATCH and DELETE


// Retrieving 
router.get("/", (req, res) => {
    const id = req.params.id;
    const Model = require(`./Customer`);
    console.log(id);
    if (id) {
        Model.find({ customer_id: id }, (err, data) => {
            console.log(data)
            returnValue(err, res, data);
        });
    } else {
        Model.find({}, (err, data) => {
            returnValue(err, res, data);
        });
    }
});

// adding or updating
router.post("/", (req, res) => {
    const id = req.params.id;
    const body = req.query
    const Model = require(`./Customer`);
    console.log(req)
    if (id) {
        Model.updateOne({ customer_id: id }, body, (err, data) => {
            returnValue(err, res, data);
        });
    } else {
        Model.updateMany({}, body, { upsert: true }, (err, data) => {
            returnValue(err, res, data);
        });
    }
});

// delete
router.delete("/", (req, res) => {
    const id = req.params.id;
    const body = req.query
    const Model = require(`./Customer`);

    if (id) {
        Model.deleteOne({ customer_id: id }, body, (err, data) => {
            returnValue(err, res, data);
        });
    } else {
        Model.deleteMany({}, (err, data) => {
            returnValue(err, res, data);
        });
    }
});


module.exports = router;
