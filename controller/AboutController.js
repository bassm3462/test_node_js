const { response } = require("express");
const AboutC = require("../model/About");
const SetAbout = async (req, res) => {
    const { About } = req.body;
    if (!About) {
        return res.status(401).json({ msg: "Please enter the content" });
    }
    const newAbout = new AboutC({
        About,
    });
    await newAbout
        .save()
        .then((response) => {
            res.status(200).json({ message: "Added successfully", response });
        })
        .catch((err) => {
            res.status(400).json({ err, message: "erroroorooro" });
        });
};
const getAbout = async (req, res) => {
    await AboutC.findOne({})
        .then((response) => {
            if (response == null) {
                return res.status(500).json({ error: true });
            } else {
                return res.status(200).send({ response, success: "true" });
            }
        })
        .catch((err) => {
            err;
        });
};
const EditAboutbByID = async (req, res) => {
    console.log("hello")
    const id = req.params.id;
    console.log(id)
    const { About } = req.body;
    console.log(About);
    await AboutC.findByIdAndUpdate(id, { About }, { new: true })
        .then((response) => {
            if (!response) {
                return res.status(404).json({ message: "not found" });
            }
            return res.status(200).json({ message: "updated Successfully", response });
        })
        .catch((err) => {
            return res.status(500).json({ message: "server error" });
        });
};
const DeleteAboutById = async (req, res) => {
    const i = req.params.id;
    await Image.findByIdAndRemove(id).then(response => {
        if (!response) { return res.status(400).json({ message: 'No such id' }) }
        { return res.status(200).json({ message: `Deleted successfully` }) }
    }).catch(error => {
        return res.status(400).json({ error, message: "delete error" })
    })
}
module.exports = { SetAbout, getAbout, EditAboutbByID, DeleteAboutById };
