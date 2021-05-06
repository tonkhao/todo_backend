const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).send("Course not found");
  }
  res.send(course);
});

router.post("/", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name required and more that 3 chars");
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  const result = validateCourse(course);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    return res.status(404).send("Course not found");
  }
  const result = validateCourse(course);
  if (result.error) {
    return res.status(400).send(result.error);
  }
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    return res.status(404).send("Course not found");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
