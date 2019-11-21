
export default class Portfolio {

    constructor() {

        let portfolio = localStorage.getItem('portfolio');


        this.holdings = (portfolio) ? JSON.parse(portfolio) : [];
    }

    getHoldings() {
        return this.holdings;
    }

    getItem(symbol1) {

        let m = this.holdings.find(({ symbol }) => symbol === symbol1) || null;

        return m;
    }

    count() {
        return this.holdings.length;

    }

    update(holdings) {
        this.holdings = holdings;
        this.updateToStorage();
    }

    updateToStorage() {
        localStorage.setItem('portfolio', JSON.stringify(this.holdings))
    }

    add() {



        this.updateToStorage();
    }


    remove(symbol) {
        let holding = this.getItem(symbol);

        if (holding) {
            let holdingIndex = this.holdings.indexOf(holding);
            this.holdings.splice(holdingIndex, 1);
            this.updateToStorage();
        }
    }


}