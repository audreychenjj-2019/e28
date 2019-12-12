// /src/Portfolio.js
export default class Portfolio {
	/**
	 *
	 */
	constructor() {
		// Extract JSON portfolio string from local storage
		let portfolio = localStorage.getItem("portfolio");

		// Parse JSON portfolio String to `items` object
		this.items = portfolio ? JSON.parse(portfolio) : [];
	}

	/**
	 * Getter method for items
	 */
	getHoldings() {
		return this.items;
	}

	/**
	 * Returns how many total shares are in the portfolio
	 */
	count() {
		let sum = 0;
		for (let key of Object.keys(this.items)) {
			sum += this.items[key].shares;
		}
		return sum;
	}

	/**
	 * Updates portfolio in localstorage
	 */
	update() {
		localStorage.setItem("portfolio", JSON.stringify(this.items));
	}

	/**
	 * Add a new item of the given symbol
	 */
	add(newRow) {
		// First see if company is already present
		let item = this.getItem(newRow.symbol);

		if (item) {
			// Company is in portfolio already; increment quantity by 1
			item.cost =
				(item.shares * item.cost + newRow.shares * newRow.cost) /
				(item.shares + newRow.shares);
			item.shares += newRow.shares;
		} else {
			// Company not in portfolio, add as new item
			this.items.push({
				symbol: newRow.symbol,
				shares: newRow.shares,
				cost: newRow.cost
			});
		}

		this.update();
	}

	/**
	 * Remove an item from items via symbol
	 */
	remove(symbol) {
		let item = this.getItem(symbol);

		let itemIndex = this.items.indexOf(item);

		if (item) {
			this.items.splice(itemIndex, 1);
			this.update();
		}
	}

	removeAll() {
		this.items = [];
		this.update();
	}

	/**
	 * Get an item from items via symbol
	 * Returns null if company does not exist in items
	 */
	getItem(symbol) {
		return this.items.find(item => item.symbol === symbol) || null;
	}
}
