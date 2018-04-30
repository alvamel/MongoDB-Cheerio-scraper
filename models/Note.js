var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Scherma({
    title: {
    },
    body: {
        type: String
    }
});

var notr = mongoose.model('Note', NoteSchema);

module.exports = Notes;