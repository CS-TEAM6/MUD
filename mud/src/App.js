import React from 'react';
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
      data: JSON.stringify(data)
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

function App() {
  console.log(token)
  return (
    
    <div className="App">
      <div className="Map">
        Map
        <button onClick={init}>Init
        </button>
      </div>

      <div className="Info">  
        <div className="Character_stats">
        </div>
        <div className="Inventory">

        </div>
      </div>
    </div>
  );
}

export default App;

//API calls
async function init() {
  var init = (await playerCD('adv/init/', 'get'))
  console.log(init)
  return init
}

async function status() {
  var status = (await playerCD('adv/status/', 'post'))
  return status
}

async function move(direction) {
  var move = (await playerCD('adv/move/', 'post', 'direction'))
  return move
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


//Map


//Play