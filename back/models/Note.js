const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    content: String,
    userId: { type: Schema.Types.ObjectId, 
              ref: 'User' 
            }
},{   
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note