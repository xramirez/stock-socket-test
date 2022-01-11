const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(httpServer, {
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

    socket.on('list', function() {
        let names = stock.showList()
        console.log(names)
        clearInterval(statShow)
        io.emit('list', names);
    })

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

    socket.on('history', data => {
        clearInterval(statShow);
        //console.log(data);
        console.log(data.startDate)
        stockData = stock.showHistoryData(data.names, data.startDate)
        stockData.forEach(item => console.log(item.days));
        io.emit('history', stockData)
    })
})

http.listen(port, () => {
    console.log('Socket io server running on port http://localhost:' + port)
})