import { Student } from "../Model/studentSchema.js";

const getAllStudent = async (req, res) => {
  try {
    const data = await Student.find();

    res.status(200).json({
      status: "Success",
      result: data.length,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await Student.create(reqBody);
    res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      messege: err,
    });
  }
};

export {
  getAllStudent,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
