angular.module('voterControllers', ['voterServices'])
	.controller('voterListCtrl', function($scope, voter){
		$scope.voters = voter.query({voterId: ''});
	})
	.controller('voterItemCtrl', function($scope, $routeParams, voter){
		$scope.voter = voter.get({voterId: $routeParams.voterId});
		$scope.voting = function(){
      
    };
	})
	.controller('voterNewCtrl', function($scope, $http, $location, voter){
		 $scope.voter = {
            question: '',
            choices: [ { text: '' }, { text: '' }, { text: '' }]
          };  
          $scope.addChoice = function() {
            $scope.voter.choices.push({ text: '' });
          };
          $scope.createVoter = function() {
            var voter = $scope.voter;
            if(voter.question.length > 0) {
              var choiceCount = 0;
              for(var i = 0, ln = voter.choices.length; i < ln; i++) {
                var choice = voter.choices[i];        
                if(choice.text.length > 0) {
                  choiceCount++
                }
              }    
              if(choiceCount > 1) {
                $http.post('/voters', $scope.voter)
                  .success(function(){
                    $location.path('/voters');
                  })
                  .error(function(err){
                    alert('Could not create voter');
                    console.log(err);
                  });
                // var newVoter = new voter(voter);       
                // newVoter.save(function(p, resp) {
                //   if(!p.error) { 
                //     $location.path('/voters');
                //   } else {
                //     alert('Could not create voter');
                //   }
                // });
              } else {
                alert('You must enter at least two choices');
              }
            } else {
              alert('You must enter a question');
            }
          };
	});
// var voter = require('../models/db.js');

// function voterListCtrl($scope, voter){
// 	$scope.voters = voter.query();
// }
// function voterItemCtrl($scope, $routeParams, voter){
// 	$scope.voter = voter.get({voterId: $routeParams.voterId});
// 	$scope.voting = function(){};
// }
// function voterCreateCtrl($scope, $location, voter){
// 	$scope.voter = {
// 		question: '',
// 		choices: [{text:''},{text:''},{text:''}]
// 	};
// 	$scope.addChoice = function(){
// 		$scope.voter.choices.push({text:''});
// 	};
// 	$scope.createVoter = function(){
// 		var voter = $scope.voter;
// 		if(voter.question.length > 0){
// 			var choiceCount = 0;
// 			for(var i=0,ln=voter.choices.length;i<ln;i++){
// 				var choice = voter.choices[i];
// 				if(choice.text.length > 0){
// 					choiceCount ++;
// 				}
// 			}
// 			if(voter.choices.length > 1){
// 				var newVoter = new voter(voter);
// 				newVoter.save(function(p, resp){
// 					if(!p.error){
// 						$location.path('voter');
// 					}else{
// 						alert('Could not create voter!');
// 					}
// 				});
// 			}else{
// 				alert('You must enter at least two choices!');
// 			}
// 		}
// 	};
// }
