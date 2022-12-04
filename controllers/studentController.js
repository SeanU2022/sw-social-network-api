// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
// const { Student, Course } = require('../models');
const { Student, Course } = require('../models');

// TODO: Create an aggregate function to get the number of students overall
const headCount = async () =>
  Student.aggregate()
    // Your code here SDW
    .count('studentCount')
    .then((numberOfStudents) => numberOfStudents);
    // .then((numberOfStudents) => numberOfStudents[0]);
    // .then((numberOfStudents) => numberOfStudents[0]["studentCount"]);

// Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator
const grade = async (studentId) =>
  Student.aggregate([
    // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
    {
      // Your code here 
      // SDW always 
      $match: { _id: ObjectId(studentId) }
    },
    {
      // unwind is for a nested array
      // unwind https://stackoverflow.com/a/16448763
      $unwind: '$assignments',
    },
    // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
      $group: {
        _id: ObjectId(studentId),
        overallGrade: {
          $avg: '$assignments.score'
        }
      }
    },
  ])
  // SDW code
    .then(result => result[0]["overallGrade"]);

module.exports = {
  // Get all students
  getStudents(req, res) {
    Student.find()
      .limit(5)                     // add limit 5 for testing
      .then(async (students) => {
        const studentObj = {
          students,
          headCount: await headCount(),
        };
        return res.json(studentObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getSingleStudent(req, res) {
    Student.findOne({ _id: req.params.studentId })
      .select('-__v')
      .lean()
      .then(async (student) =>
        !student
          ? res.status(404).json({ message: 'No student with that ID' })
          : res.json({
              student,
              grade: await grade(req.params.studentId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createStudent(req, res) {
    Student.create(req.body)
      .then((student) => res.json(student))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteStudent(req, res) {
    Student.findOneAndRemove({ _id: req.params.studentId })
      .then((student) =>
        !student
          ? res.status(404).json({ message: 'No such student exists' })
          : Course.findOneAndUpdate(
              { students: req.params.studentId },
              { $pull: { students: req.params.studentId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Student deleted, but no courses found',
            })
          : res.json({ message: 'Student successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeAssignment(req, res) { 
    console.log('You are DELETING/removing an assignment');
    // use "assignmentId": "6385b4507960692129b3cef5",  NOT _id !!!
    console.log(req.params.assignmentId);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};

