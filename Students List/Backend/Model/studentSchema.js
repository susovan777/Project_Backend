import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  // 1. Identification and Name
  studentId: {
    type: String,
    required: [true, "A student must have a unique ID."],
    unique: true, // Ensures no two students share the same ID
    trim: true,
    uppercase: true, // Useful for standardizing internal IDs (e.g., "S12345")
  },
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
  },

  // 2. Academic Information
  major: {
    type: String,
    required: [true, "Major is required."],
    enum: {
      values: [
        "Computer Science",
        "Electrical Engineering",
        "Business",
        "Arts",
        "Mathematics",
      ],
      message: "Major must be one of the specified types.",
    },
  },
  enrollmentYear: {
    type: Number,
    required: [true, "Enrollment year is required."],
    min: [2000, "Year must be after 2000."],
    max: [new Date().getFullYear(), "Year cannot be in the future."],
  },
  gpa: {
    type: Number,
    min: [0.0, "GPA cannot be negative."],
    max: [5.0, "GPA cannot exceed 5.0."],
    default: 0.0,
    // Setter to round GPA to two decimal places
    set: (val) => Math.round(val * 100) / 100,
  },

  // 3. Contact Information (Optional)
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    // Basic email validation using a regex (or a dedicated validator package)
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    trim: true,
  },

  // 4. Metadata
  createdAt: {
    type: Date,
    default: Date.now,
    select: false, // Hides this field by default when querying
  },
});

// Create and export the Mongoose Model
const Student = mongoose.model("Student", studentSchema);

export { Student };
