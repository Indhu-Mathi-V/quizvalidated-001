const mongoose = require("mongoose")

const questionSchema = mongoose.Schema(
    {
        id: { type: Number
            , required: true 
        },
        question: { type: String,
             required: true 
            },
        options: [{ type: String,
             required: true 
            }],
        answer: { type: String,
             required: true 
            },
      },
    {
        timestamps:true
    }
)

const quizModel = mongoose.model('Question',questionSchema);
module.exports = quizModel;