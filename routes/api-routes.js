const router = require("express").Router();
const workout = require("../models/workout.js");
const Path = require("path")

router.get("/", (req, res) => {
  res.sendFile(Path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(Path.join(__dirname, "../public/exercise.html"));
})

router.get("/stats", (req, res) => {
    res.sendFile(Path.join(__dirname, "../public/stats.html"));
})



























module.exports = router;
