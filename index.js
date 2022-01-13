const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {origin : '*'}
  });const port = process.env.PORT || 3500;

const Stocks = require('./util/stocks')
const stock = new Stocks()

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
})

io.on('connection', (socket) => {
    console.log('connection!')
    let statShow;
    let names = stock.showList()

    socket.on('list', () => {
        console.log(names)
        clearInterval(statShow)
        io.emit('list', names);
    })

    //socket.emit('list', names)

    socket.on('live', (data) => {
        let stockData = stock.showLiveData(data);
        console.log(stockData)
        io.emit('live', stockData)
        statShow = setInterval(() => {
            stockData = stock.showLiveData(data);
            console.log(stockData);
            io.emit('live', stockData);
        }, 5000)
    })
    
    statShow = setInterval(() => {
        stockData2 = stock.showLiveData(['ABC']);
        console.log(stockData2);
        io.emit('live', stockData2);
    }, 5000)

    socket.on('history', data => {
        clearInterval(statShow);
        //console.log(data);
        console.log(data.startDate)
        stockData = stock.showHistoryData(data.names, data.startDate)
        stockData.forEach(item => console.log(item.days));
        io.emit('history', stockData)
    })

    stockData = stock.showHistoryData(['ABC'],'2022-01-08')
    socket.emit('history', stockData)

})

http.listen(port, () => {
    console.log('Socket io server running on port http://localhost:' + port)
})