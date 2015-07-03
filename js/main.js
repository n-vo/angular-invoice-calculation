$(document).ready(function(){
	$("#begin").on('click', function(){
		$("#my-kitchen").addClass('open');
		$("section").css({width:'82%'});
		$(this).hide();
	});
	
	$("#kitchen-main").on('click', function(){
		$("#products-in-kitchen").toggleClass("details");
	});
	
});

var myApp = angular.module('myApp', []);

myApp.factory('Kitchen', function(){
	var Kitchen = {};
	Kitchen.products = kitchenJsonObj;
	angular.forEach(Kitchen.products, function(obj) {
		obj.status = "active";
	});
	return Kitchen;
});

function KitchenCtrl ( $scope, Kitchen ){
	$scope.listPrice = 0;
	$scope.discountItems = 0;
	$scope.discountPrice = 0;
	$scope.totalPrice = 0;
	$scope.kitchen = Kitchen;	/*provide the Kitchen model into our scope*/

	$scope.parseFloat = function(value){ return parseFloat(value); }

	$scope.calcDiscount = function() {
		if ( $scope.discountItems > 2 ) {
			$scope.discountPrice = 0.1 * $scope.listPrice;
			$scope.discount = true;
		} else {
			$scope.discountPrice = 0;
		}
		
		$scope.calcTotal();
	}
	
	$scope.calcTotal = function() {
		$scope.totalPrice = $scope.listPrice - $scope.discountPrice;
	}

	/* calc total price */
	angular.forEach(Kitchen.products, function(obj) {
		if ( obj.status == "active" ) {
			$scope.listPrice += $scope.parseFloat(obj.price);
			$scope.discountItems++;
		}
		$scope.calcDiscount();
	});
	
	$scope.change = function(item){
		var status = item.status == "active" ? "inactive" : "active";
		item.status = status;
		
		if (item.status == "inactive") {
			$scope.listPrice -= $scope.parseFloat(item.price);
			$scope.discountItems--;
		} else {
			$scope.listPrice += $scope.parseFloat(item.price);
			$scope.discountItems++;
		}
		$scope.calcDiscount();
	}
	
	
		

}