var myApp = angular.module('MyApp', [])
myApp.controller('Controller', ['$scope', '$http', function($scope, $http, $watch){
	console.log('hello from controller')
	var refresh = function(){
		$http.get('/tasklist').success(function(response){
		console.log('I got the data I requested')
		$scope.tasklist = response
		$scope.task = ''
	    })
	}
	
	refresh()

	$scope.addTask = function(){
		console.log($scope.task)
		$scope.show = true
		$scope.updated? $http.post('/tasklist', $scope.task).success(function(response){
			console.log(response)
			refresh()
		}) : $http.put('/tasklist/' + $scope.task._id, $scope.task)

		$scope.updated = true
		refresh()
	}

	$scope.removeTask = function(id){
		console.log(id)
		$http.delete('/tasklist/'+id).success(function(response){
			console.log(response)
			refresh()
		})
	}

	$scope.updated = true
	$scope.$watch('updated', function(){
 	    $scope.actionBtnText = $scope.updated ? 'New ToDo' : 'Update';
	})
	$scope.update = function(id){
		console.log(id)
		$scope.updated = false

		$http.get('/tasklist/'+id).success(function(response){
			console.log(response)
			$scope.task = response
		})
	}
	$scope.update = function(id){
		console.log(id)
		$scope.updated = false

		$http.get('/tasklist/'+id).success(function(response){
			console.log(response)
			$scope.task = response
		})
	}
	
}])
/* $http.put('/tasklist/' + $scope.task._id, $scope.task)
*/