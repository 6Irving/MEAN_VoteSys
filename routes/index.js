var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/voterapp');
var voterSchema = require('../models/voter.js').voterSchema;
var Voter = mongoose.model('Voter', voterSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoteSystem' });
});
router.get('/voters', function(req, res, next) {
	/*optional stuff to do after success */
	Voter.find({}, function(error, voters){
		res.json(voters);
	})
});

router.get('/voters/:id', function(req, res, next){
	var voterId = req.params.id;
	Voter.findOne({id: voterId})
	  .exec(function(err, voter){
		if(voter){
			var userVoted = false,
				userChoice,
				totalVotes = 0;
			for(c in voter.choices){
				var  choice = voter.choices[c];
				for(v in choice.votes){
					var vote = choice.votes[v];
					totalVotes ++;
					if(vote.ip === (req.header('x-forwarded-for')||req.ip)){
						userVoted = true;
						userChoice = {_id: choice._id, text: choice.text};
					}
				}
			}
			voter.userVoted = userVoted;
			voter.userChoice = userChoice;
			voter.totalVotes = totalVotes;
			res.json(voter);
		}else{
			res.json({error:true});
		}
	});
});

router.post('/voters', function(req, res, next){
	var reqBody = req.body,
		choices = reqBody.choices.filter(function(v){return v.text !='';}),
		// choices = reqBody.choices,
		voterObj = {id: new ObjectID(), question: reqBody.question, choices: choices};
	var voter = new Voter(voterObj);
	voter.save(function(err, doc){
		if(err){
			console.log(err);
		}else{
			res.json(doc);
		}
	});
});

module.exports = router;
