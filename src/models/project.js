const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0, //? 0 -> Ongoing, 1 -> Completed
    //! Didn't use boolean for room for further states
  },
  description: {
    type: [String],
    /**
     * ? Index 0 -> Short Description
     * ? Index 1...n -> Long Description
     */
  },
  members: {
    type: [

      {
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        }
      }

    ]
  },
  techStack: {
    type: [String],
    //!Big words in tech stack like JavaScript should be spaced like Java Script or Mongo DB for word break
  },
  link: {
    type: String
  }

});

const Project = mongoose.model('project', projectSchema);

export default Project;