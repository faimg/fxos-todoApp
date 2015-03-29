'use strict';

todoApp.controller('TodoController', function($scope, $window) {
	$scope.tasks = [];
	
	$scope.addTask = function() {
		if($scope.description) {
			
			var newTask = {
				done: false,
				description: $scope.description
			};
			
			$scope.tasks.push(newTask);
			$scope.description = "";
			$scope.save();
		}
	};
	
	$scope.remaining = function() {
		var count = 0;
		
		$scope.tasks.forEach(function(task){
			if(!task.done) {
				count++;
			}
		});
		
		return count;
	};
	
	$scope.archive = function() {
		var reaminingTasks = [];
		
		$scope.tasks.forEach(function(task){
			if(!task.done) {
				reaminingTasks.push(task);
			}
		});
		
		$scope.tasks = reaminingTasks;
		$scope.save();
	};
	
	$scope.save = function() {
		$window
			.localStorage
			.setItem('tasks', JSON.stringify($scope.tasks));
	};
	
	$scope.retrieve = function() {
		var jsonText = $window.localStorage.getItem('tasks');
		
		if(jsonText) {
			$scope.tasks = JSON.parse(jsonText);
		}
	};
	
});