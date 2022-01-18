class StockClass {
    constructor() {
        this.stocks = [
            { name: 'ABC', value: 6450.3 },
            { name: 'XYZ', value: 2524.2 },
            { name: '123', value: 555.45 }
        ]
    }

    showList() {
        let names = []
        for (let stock of this.stocks)
            names.push(stock.name)
        return (names)
    }

    showLiveData(stockNames) {
        //console.log(stockNames)
        let stocks = [];
        for (let name of stockNames) {
            let day = new Date()
            let stock = this.stocks.find(item => item.name === name)
            let open = stock.value - Math.floor(Math.random() * 25);
            let close = stock.value + Math.floor(Math.random() * 25);
            let high = stock.value + Math.floor(Math.random() * 100);
            let low = stock.value - Math.floor(Math.random() * 100);

            stocks.push({ name: stock.name, data: [{ day: day, open: open, close: close, high: high, low: low }] })
        }
        return stocks;
    }

    showHistoryData(stockNames, startDate, endDate, interval) {
        let stocks = [];
        //console.log(interval)
        let today = new Date()
        let startDateDate = Date.parse(startDate)
        let endDateDate = Date.parse(endDate)
        let dayDiff
        for (let name of stockNames) {


            let stock = this.stocks.find(item => item.name === name)
            let days = [];
            let dayCounter = 0;
            let hourCounter = 0;
            let minuteCounter = 0;

            switch (interval) {
                case '5m':
                    console.log('5min', dayDiff);
                    dayDiff = Math.floor((endDateDate - startDateDate) / 300000) + 1;

                    while (dayCounter <= dayDiff) {
                        let dayRun = new Date()
                        dayRun.setDate(today.getDate() - dayCounter)
                        let open = stock.value - Math.floor(Math.random() * 25);
                        let close = stock.value + Math.floor(Math.random() * 25);
                        let high = stock.value + Math.floor(Math.random() * 100);
                        let low = stock.value - Math.floor(Math.random() * 100);
                        days.push({ day: dayRun, open: open, close: close, high: high, low: low })
                        dayCounter++;
                    }
                    stocks.push({ name: stock.name, days })
                    break;

                case '15m':
                    dayDiff = Math.floor((endDateDate - startDateDate) / 900000) + 1;
                    console.log('15min', dayDiff);
                    stock = this.stocks.find(item => item.name === name)
                    days = [];
                    dayCounter = 0;
                    while (dayCounter <= dayDiff) {
                        let dayRun = new Date()
                        dayRun.setDate(today.getDate() - dayCounter)
                        let open = stock.value - Math.floor(Math.random() * 25);
                        let close = stock.value + Math.floor(Math.random() * 25);
                        let high = stock.value + Math.floor(Math.random() * 100);
                        let low = stock.value - Math.floor(Math.random() * 100);
                        days.push({ day: dayRun, open: open, close: close, high: high, low: low })
                        dayCounter++;
                    }
                    stocks.push({ name: stock.name, days })
                    break;

                case '1h':
                    dayDiff = Math.floor((endDateDate - startDateDate) / 3600000) + 1;
                    console.log('1h', dayDiff);
                    stock = this.stocks.find(item => item.name === name)
                    days = [];
                    dayCounter = 0;
                    while (dayCounter <= dayDiff) {
                        let dayRun = new Date()
                        dayRun.setDate(today.getDate() - dayCounter)
                        let open = stock.value - Math.floor(Math.random() * 25);
                        let close = stock.value + Math.floor(Math.random() * 25);
                        let high = stock.value + Math.floor(Math.random() * 100);
                        let low = stock.value - Math.floor(Math.random() * 100);
                        days.push({ day: dayRun, open: open, close: close, high: high, low: low })
                        dayCounter++;
                    }
                    stocks.push({ name: stock.name, days })
                    break;

                case '1d':
                    dayDiff = Math.floor((endDateDate - startDateDate) / 86400000) + 1;
                    console.log('1d', dayDiff)
                    stock = this.stocks.find(item => item.name === name)
                    days = [];
                    dayCounter = 0;
                    while (dayCounter <= dayDiff) {
                        let dayRun = new Date()
                        dayRun.setDate(today.getDate() - dayCounter)
                        let open = stock.value - Math.floor(Math.random() * 25);
                        let close = stock.value + Math.floor(Math.random() * 25);
                        let high = stock.value + Math.floor(Math.random() * 100);
                        let low = stock.value - Math.floor(Math.random() * 100);
                        days.push({ day: dayRun, open: open, close: close, high: high, low: low })
                        dayCounter++;
                    }
                    stocks.push({ name: stock.name, days })
                    break;

                default:
                    console.log(interval)
            }



        }
        return stocks;
    }
}

module.exports = StockClass;