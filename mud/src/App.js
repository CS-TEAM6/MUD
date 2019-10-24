import React, {Component} from 'react';
import './CSS/App.css';
import { Promise } from 'q';
import { createConnection } from 'net';
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
      invetory: {}
    }

    this.goNorth = this.goNorth.bind(this)
    this.goSouth = this.goSouth.bind(this)
    this.goEast = this.goEast.bind(this)
    this.goWest = this.goWest.bind(this)
  }
  
  componentDidMount() {
    var room = init()
    room.then(res => {
      console.log(res)
      this.setState({room: res}) 
    })

    // var invetory = status()
    // invetory.then(res => {
    //   console.log(res)
    //   this.setState({invetory: res}) 
    // })

  }

  updateRoom(info) {
    this.setState({room: info})
  }

  goNorth() {
    var info = move({"direction": "n"})
    info.then(res => {
      console.log(res)
      this.setState({room: res}) 
    })
  }

  goEast() {
    var info = move({"direction": "e"})
    info.then(res => {
      console.log(res)
      this.setState({room: res}) 
    })
  }

  goSouth() {
    var info = move({"direction": "s"})
    info.then(res => {
      console.log(res)
      this.setState({room: res}) 
    })
  }

  goWest() {
    var info = move({"direction": "w"})
    info.then(res => {
      console.log(res)
      this.setState({room: res}) 
    })
  }

  lookat() {
    var info = examine({"name": "well"})
    info.then(res => {
      console.log(res)
      //this.setState({room: res}) 
    })
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
        <button onClick={this.goWest} >W</button>
        Action Cooldown: {this.state.room.cooldown}

        <button onClick={this.lookat} >examine</button>
      </div>

      <div className="Info">  
        <div className="Character_location">
          <span className="">Current Room: {this.state.room.room_id}, {this.state.room.title}</span> <br/>
          <span>Room Description: {this.state.room.description} </span> <br/>
          <span>Exits: {this.state.room.exits}</span> <br/>
          <span>Location: {this.state.room.coordinates}</span>
        </div>
        <div className="Inventory">

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

async function movewise(direction) {
  var movewise = (await playerCD('adv/move/', 'post', 'direction'))
  return movewise
}

async function examine(item) {
  var examine = (await playerCD('adv/examine', 'post', item))
  return examine
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