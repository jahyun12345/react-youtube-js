const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    posterId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'    
    },
    responseId: {
        type: Schema.Types.ObjectId,
        ref: 'User'    
    },
    content: {
        type: String 
    }
}, { timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }