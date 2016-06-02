var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/voterApp');
// var voteSchema = new mongoose.Schema({ip: String});
// var choiceSchema = new mongoose.Schema({
// 	text: String,
// 	votes: voteSchema
// });

exports.voterSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true
	},
	choices: [{
		text: String, 
		votes: [{ip: String}]
	}]
});

