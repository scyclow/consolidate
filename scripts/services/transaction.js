angular.module('consolidateApp.services.Transaction',[])
.factory('Transaction', function () {
	console.log('transaction')

	var Transaction = {
		new: function (params) {
			return {
				debtor: params.debtor.name,
				creditor: params.creditor.name,
				amount: params.amount
			}
		}
	}
	return Transaction;
})