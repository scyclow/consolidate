angular.module('consolidateApp.services.Consolidate',[])
.factory('Consolidate', function (Transaction, Balance) {
	console.log('Consolidate')

	var Consolidate = {
		newTransactions: function (balances) {
			var output = [];
			var oldBalances = balances;
			while (oldBalances.creditors.length !== 0) {
				oldBalances = this.sortBals(oldBalances);
				var newTransaction = this.ezMatch(oldBalances) || this.high_lowMatch(oldBalances);
				if (newTransaction.amount > 0.00) output.push(newTransaction)
				this.updateBalances(oldBalances, newTransaction);
			}
			return output;
		},

		sortBals: function (bals) {
			bals.creditors.sort(function(first, second) {
				return second.amount - first.amount;
			});
			bals.debtors.sort(function(first, second) {
				return first.amount - second.amount;
			});
			return bals;
		},

		updateBalances: function (bals, newTransaction) {
			var debtorName = newTransaction.debtor;
			var creditorName = newTransaction.creditor;
			var amountNumber = newTransaction.amount;
			var creditors = bals.creditors;
			var debtors = bals.debtors;
			for (i in creditors) {
				if (creditors[i].name === creditorName) {
					creditors[i].amount -= amountNumber;
					if (creditors[i].amount === 0) {creditors.splice(i,1)}
				}
			}
			for (i in debtors) {
				if (debtors[i].name === debtorName) {
					debtors[i].amount += amountNumber;
					if (debtors[i].amount === 0) {debtors.splice(i,1)}
				}
			}
		},

		ezMatch: function (bals) {
			var creditors = bals.creditors;
			var debtors = bals.debtors;
			for (cr_ix in creditors) {
				var creditor = creditors[cr_ix];
				for (dr_ix in debtors) {
					var debtor = debtors[dr_ix];
					if ( -debtor.amount === creditor.amount ) {
						return Transaction.new({
							debtor: debtor, 
							creditor: creditor, 
							amount: creditor.amount
						});
					}
				}
			}
			return false;
		},

		high_lowMatch: function (bals) {
			var debtor = bals.debtors[0];
			var creditor = bals.creditors[0];
			var amount = -debtor.amount > creditor.amount ? creditor.amount : -debtor.amount;
			return Transaction.new({
				debtor: debtor,
				creditor: creditor,
				amount: amount,
			});
		}
	}

	return Consolidate;
})