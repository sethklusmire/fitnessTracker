const router = require("express").Router();
const Path = require("path");
const db = require("../models");

router.get("/", (req, res) => {
  res.sendFile(Path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
  res.sendFile(Path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(Path.join(__dirname, "../public/stats.html"));
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findById(req.params.id)
    .then((workout) => {
      workout.exercises.push({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        distance: req.body.distance,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
      });
      return workout.save();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create({ name: req.body.name, exercises: [] })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {$addFields: {
      totalDuration: { $sum: "$exercises.duration"},
    }},
])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {$addFields: {
        totalDuration: { $sum: "$exercises.duration"},
      }},
  ])
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });






module.exports = router;
