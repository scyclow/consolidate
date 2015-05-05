angular.module('consolidateApp.controller.balanceCtrl',[])
.controller('balanceCtrl', function ($scope, Transaction, Balance, Consolidate) {
	$scope.newTransaction = {debtor:'', creditor:'', amount:''};
	$scope.allTransactions = [];
	$scope.newTransactions = [];
	console.log('controller')

	$scope.addTransaction = function () {
		var transaction = {
			debtor: $scope.newTransaction.debtor,
			creditor: $scope.newTransaction.creditor,
			amount: $scope.newTransaction.amount
		};
		console.log('new transaction:',transaction)
		$scope.allTransactions.push(transaction);
		// console.log('transaction added:', $scope.allTransactions)
		$scope.updateAll();
		$scope.newTransaction = {debtor:'', creditor:'', amount:''};
	}

	$scope.updateAll = function () {
		console.log('updating all, calling Balance.get:')
		var balances = Balance.get($scope.allTransactions);
		console.log('total balances:', balances)
		$scope.newTransactions = Consolidate.newTransactions(balances);
		
	}

})