angular.module('consolidateApp.services.Balance',[])
.factory('Balance', function (Transaction) {
	console.log('balance')

	var Balance = {
		get: function (transactionList){
			// var funcs = ['balance', 'prepare', 'split']
			// output = transactionList;
			// for (f in funcs) {
			// 	var func = funcs[f]
			// 	output = this[func](output)
			// }
			// return output

			var balanced = this.balance(transactionList)
			var prepped = this.prepare(balanced);
			var split = this.split(prepped);
			return split;
		},

		balance: function (transactionList) {
			var balanced = {};
			for (i in transactionList) {
				var debtor = transactionList[i].debtor;
				var creditor = transactionList[i].creditor;
				var amount = transactionList[i].amount;
				if (!!balanced[debtor]) {
					balanced[debtor] -= +amount
				} else {
					balanced[debtor] = -amount
				}
				if (!!balanced[creditor]) {
					balanced[creditor] += +amount
				} else {
					balanced[creditor] = +amount
				}
			}
			return balanced;
		},

		prepare: function (balances){
			var prepped = [];
			for (name in balances) {
				prepped.push({name: name, amount: balances[name]})
			}
			return prepped;
		},

		split: function (balances){
			var split = {};
			split.creditors = balances.filter(function(bal) {
				return bal.amount >= 0;
			});
			split.debtors = balances.filter(function(bal) {
				return bal.amount <= 0;
			});
			return split;
		}
	}
	return Balance;
});