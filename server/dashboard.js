let setApp = app => {
    app.ws('/updates', (ws, request) => {
        ws.send(JSON.stringify({slots: stubSlots, events: stubEvents}));
    });

    app.post('/submit', (request, response) => {

    });
};

const getRandomArbitrary = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const nameArray = ["Darwin", "Paris", "Jackie", "Dominick", "Abel", "Nelson", "Jeff", "Ivan", "Gene", "Bill", "William", "Myron", "Clayton", "Bryant", "Johnie", "Graig", "Elliott", "Dante", "Benjamin", "Brant", "Bertram", "Morgan", "Johnny", "Jonathan", "Wilfred", "Robert", "Robin", "Mohammed", "Joey", "Bradly", "Denver", "Elden", "Ryan", "Leigh", "Jc", "Asa", "Hayden", "Darrell", "Von", "Gary", "Augustus", "Alphonso", "Logan", "Leon", "Marquis", "Miguel", "Ignacio", "Don", "Derrick", "Jarod"]
const getRandomName = () => nameArray[getRandomInt(0,nameArray.length-1)]

const stubSlots = new Array(15).fill().map(
  (e,i) => getStubSlotUpdate()
)

function getStubSlotUpdate(index) {
  return {
    index: index || getRandomInt(0,24),
    highestBid: getRandomArbitrary(1, 1000),
    name: getRandomName()
  }
}


const stubEvents = new Array(29).fill().map(
  (e,i) => getStubEventUpdates()
)

function getStubEventUpdates() {
  return {
    "bidder": getRandomName(),
    "bid": getRandomArbitrary(1, 100),
    "slot": getRandomInt(1,25)
  }
}

let getRandomUpdates = () => {
  let numUpdates = getRandomInt(1,5);
  return JSON.stringify({
    slots: new Array(numUpdates).fill().map((e,i) => getStubSlotUpdate(i)),
    events: new Array(numUpdates).fill().map((e,i) => getStubEventUpdates(i))
  })
}


module.exports = {
  getStubSlotUpdate: getStubSlotUpdate,
  getStubEventUpdates: getStubEventUpdates,
  getRandomUpdates: getRandomUpdates,
  setApp: setApp
};