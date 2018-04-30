var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleShema = Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.Objects,
        ref: 'Note'
    }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Articles;