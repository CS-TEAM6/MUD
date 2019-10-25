import React, {Component} from 'react';
import './CSS/App.css';
import { Promise } from 'q';
require('dotenv').config();
const axios = require('axios');
const token = process.env.REACT_APP_TOKEN;

// Main axios call to api, using async and await to act as cooldown
async function playerCD(endpoint, method, data){
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
      room: {},
      inventory: {}
    }

    this.goNorth = this.goNorth.bind(this)
    this.goSouth = this.goSouth.bind(this)
    this.goEast = this.goEast.bind(this)
    this.goWest = this.goWest.bind(this)
  }
  
  async componentDidMount() {
    var room = init()
    room.then(res => {
      this.setState({room: res}) 
    })

    await cooldown(1.5 * 1000)

    var inventory = status()
    inventory.then(res => {
      this.setState({inventory: res}) 
    })

  }

  async goNorth() {
    if (this.state.room.terrain == "MOUNTAIN")
      var info = fly({"direction": "n"})
    else
      var info = move({"direction": "n"})
    info.then(res => {
      this.setState({room: res})
    })
  }

  async goEast() {
    if (this.state.room.terrain == "MOUNTAIN")
      var info = fly({"direction": "e"})
    else
      var info = move({"direction": "e"})
    info.then(res => {
      this.setState({room: res}) 
    })
  }

  async goSouth() {
    if (this.state.room.terrain == "MOUNTAIN")
      var info = fly({"direction": "s"})
    else
      var info = move({"direction": "s"})
    
    info.then(res => {
      this.setState({room: res}) 
    })
  }

  async goWest() {
    if (this.state.room.terrain == "MOUNTAIN")
      var info = fly({"direction": "w"})
    else
      var info = move({"direction": "w"})
    info.then(res => {
      this.setState({room: res}) 
    })
  }

  async lookat() {
    var info = examine({"name": "tiny treasure"})
    info.then(res => {
      //this.setState({room: res}) 
    })
  }

  async item() {
    var info = take({"name": "tiny treasure"})
    // info.then(res => {
    //   this.setState({inventory: res}) 
    // })
  }

  render() {
    return(
      <div className="App">
      <div className="Map">
        
      </div>

      <div className="Controls">
        <button onClick={this.goNorth} >N</button>
        <button onClick={this.goEast} >E</button>
        <button onClick={this.goSouth} >S</button>
        <button onClick={this.goWest} >W</button> <br/>  
        <button onClick={this.lookat} >Examine</button> 
        <button onClick={this.item}>Take</button> <br/>
      </div>

      <div className="Info">  
        <div className="Character_location">
          Current Room: {this.state.room.room_id}, {this.state.room.title} <br/>
          Room Description: {this.state.room.description}  <br/>
          Terrain: {this.state.room.terrain} <br/>
          Exits: {this.state.room.exits} <br/>
          Action: {this.state.room.messages} <br/>
          Location: {this.state.room.coordinates} <br/>
          Treasures: {this.state.room.items}
        </div>
        <div className="Inventory">
          Player: {this.state.inventory.name} <br/>
          Speed: {this.state.inventory.speed}  <br/>
          Strength: {this.state.inventory.strength} <br/>
          Gold: {this.state.inventory.gold} <br/>
          Bag: {this.state.inventory.inventory}
        </div>
      </div>
    </div>
    )
  }
}

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
  return move
}

async function fly(direction) {
  var fly = (await playerCD('adv/fly/', 'post', direction))
  return fly
}

async function examine(item) {
  var examine = (await playerCD('adv/examine', 'post', item))
  return examine
}

async function take(item) {
  var take = (await playerCD('adv/take/', 'post', item))
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