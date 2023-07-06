const express = require('express'); // using express
const socketIO = require('socket.io');
const NodeCache = require('node-cache');
const http = require('http')
const port = 3200 // setting the port
let app = express();
const cache = new NodeCache();
let server = http.createServer(app)
const ThirdPartyController = require('./thirdPartyController');
let io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
var cors = require('cors');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
app.set('socketio', io);
app.use(cors());

const cron = require('node-cron');

const job = cron.schedule('0 22 * * *', () => {
  console.log('Running cron job every day ', (new Date()).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  let marketIds = JSON.parse(localStorage.getItem("marketIds"));
  marketIds.map(id => {
    clearInterval(IntervalIds[id]);
    localStorage.removeItem(id + "market");
  })
  localStorage.removeItem("marketIds");
  localStorage.removeItem("market");
  if (IntervalIds.length) {
    IntervalIds.forEach(clearInterval);
  }
  IntervalIds = [];
  ClearAllSocketRoom()
});

job.start();

app.get("/", (req, res) => {
  res.send("call the api");
});

let IntervalIds = [];

app.get("/market/:id", (req, res) => {
  let marketId = req.params.id;
  let marketIds = JSON.parse(localStorage.getItem("marketIds"));
  if (marketIds == null || !marketIds.includes(marketId)) {
    IntervalIds.push(marketId);
    IntervalIds[marketId] = setInterval(getMarketRate, 300, marketId);
    if (marketIds == null) {
      marketIds = [];
    }
    marketIds.push(marketId);
    localStorage.setItem("marketIds", JSON.stringify(marketIds));
  }
  res.send(marketId);
});

function getMarketRate(marketId) {
  getRate(marketId).then(function (data) {
    io.to(marketId).emit("matchOdds" + marketId, data['matchOdds']);
    io.to(marketId).emit("bookmaker" + marketId, data['bookmaker']);
    io.to(marketId).emit("session" + marketId, data['session']);
  });
}

async function getRate(marketId) {
  let result = [];
  result['matchOdds'] = await ThirdPartyController.getMatchOdds(marketId);
  result['bookmaker'] = await ThirdPartyController.getBookmakerMarket(marketId);
  result['session'] = await ThirdPartyController.getSessions(marketId);
  return result;
}

app.get("/matchList", (req, res) => {
  const cachedMatchList = cache.get('matchListData');
  if (cachedMatchList) {
    // Data found in the cache, return it
    return res.send(cachedMatchList);
  }
  ThirdPartyController.getMatchList().then(function (data) {
    if(data){
      cache.set('matchListData', data, 28800);  // 8 hours of catch store
    }
    res.send(data);
  });
});

io.on('connection', (socket) => {
  socket.on('init', function (market) {
    // console.log('join user', socket.id);
    // console.log('market.id ', market.id);
    let marketId = market.id;
    socket.join(marketId);
  });

  socket.on("disconnect_market", (market) => {
    //console.log('clear market called ',market.id)
    // clearMarket(market.id);
  });

  socket.on('disconnect', async () => {
    // Remove the socket from all rooms
    socket.leaveAll();
  });

});

function ClearAllSocketRoom() {
  const rooms = io.of('/').adapter.rooms;
  for (const [roomId, room] of rooms) {
    room.forEach((socketId) => {
      io.sockets.sockets.get(socketId).leave(room);
    });
    io.of('/').adapter.rooms.delete(room);
  }
}


async function clearMarket(marketId) {
  clearInterval(IntervalIds[marketId]);
  localStorage.removeItem(marketId + "market");
  let marketIds = JSON.parse(localStorage.getItem("marketIds"));
  marketIds.splice(marketIds.indexOf(marketId), 1);
  localStorage.setItem("marketIds", JSON.stringify(marketIds));
}


server.listen(port, () => {
  console.log(`Betting app listening at Port:${port}`)
  let marketIds = JSON.parse(localStorage.getItem("marketIds"));
  if (marketIds && marketIds.length) {
    marketIds.map(marketId => {
      IntervalIds.push(marketId);
      IntervalIds[marketId] = setInterval(getMarketRate, 1000, marketId);
    })

  }
});
