import React, {Component} from 'react';
import './CSS/App.css';
import { Promise } from 'q';
import { createConnection } from 'net';
require('dotenv').config();
const axios = require('axios');
const token = process.env.REACT_APP_TOKEN;

// Main axios call to api, using async and await to act as cooldown
async function playerCD(endpoint, method, data){
  console.log("playerCD:" + data)
  try {
    let res = await axios({
      baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/',
      headers: {
          Authorization: `Token ${token}`,
          'content-Type': 'application/json'
      },
      method: `${method}`,
      url: `${endpoint}`,
      data: data
    })
    res = await res.data
    await cooldown(res.cooldown * 1000)
    return res
  } catch (err) {
      console.error(err)
  }
}

function cooldown(cd) {
  return new Promise(resolve => setTimeout(resolve, cd))
}

class App extends Component{
  constructor() {
    super()
    this.state = {
      init: {}
    }
  }
  
  componentDidMount() {
    var room = init()
    room.then(res => {
      console.log(res)
      this.setState({init: res}) 
    })

    var invetory = status()
    invetory.then(res => {
      console.log(res)
      this.setState({init: res}) 
    })

  }

  goNorth() {
    move({"direction": "n"})
  }

  goSouth() {
    move({"direction": "s"})
  }

  render() {
    return(
      <div className="App">
      <div className="Map">
      </div>

      <div className="Controls">
        <button onClick={this.goNorth} >N</button>
        <button onClick={this.goSouth} >S</button>
      </div>

      <div className="Info">  
        <div className="Character_location">
          <span className="">Current Room: {this.state.init.room_id}, {this.state.init.title}</span> <br/>
          <span>Room Description: {this.state.init.description} </span> <br/>
          <span>Exits: {this.state.init.exits}</span> <br/>
          <span>Location: {this.state.init.coordinates}</span>
        </div>
        <div className="Inventory">

        </div>
      </div>
    </div>
    )
  }
}

// function App() {
//     return (
    
//     <div className="App">
//       <div className="Map">
//         <button onClick={init}>Init
//         </button>
//         <div>{init.room_id}</div>
//         <button onClick={status}>Stat
//         </button>
//         {/* <form>
//           direction: <input type="text" name="direction"/><br/>
//           room: <input type="text" name="room"/><br/>
//           <input type="submit" value="Move" onClick="move('')"/>
//           <input type="submit" value="Wise Move" />
//         </form> */}
//       </div>

//       <div className="Info">  
//         <div className="Character_stats">
//         </div>
//         <div className="Inventory">

//         </div>
//       </div>
//     </div>
//   );
// }

export default App;

//API calls
async function init() {
  var init = (await playerCD('adv/init/', 'get'))
  return init
}

async function status() {
  var status = (await playerCD('adv/status/', 'post'))
  return status
}

async function move(direction) {
  var move = (await playerCD('adv/move/', 'post', direction))
  init()
  return move, init
}

async function movewise(direction) {
  var movewise = (await playerCD('adv/move/', 'post', 'direction'))
  return movewise
}

async function take(item) {
  var take = (await playerCD('adv/take/', 'post', 'item'))
  return take
}

async function drop(item) {
  var drop = (await playerCD('adv/drop/', 'post', 'item'))
  return drop
}

async function sell(item) {
  var sell = (await playerCD('adv/sell/', 'post', 'item'))
  return sell
}

async function wear(item) {
  var wear = (await playerCD('adv/wear/', 'post', 'item'))
  return wear
}

async function change_name(name) {
  var change_name = (await playerCD('adv/change_name/', 'post', 'name'))
  return change_name
}

async function pray() {
  var pray = (await playerCD('adv/pray/', 'post'))
  return pray
}

async function carry(item) {
  var carry = (await playerCD('adv/carry/', 'post', 'parameter'))
  return carry
}

async function receive() {
  var receive = (await playerCD('adv/receive/', 'post'))
  return receive
}

async function transmogrify(item) {
  var transmogrify = (await playerCD('adv/transmogrify/', 'post', 'item'))
  return transmogrify
}

//Map print and player location



//Play