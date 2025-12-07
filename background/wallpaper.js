import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, push, ref, set, update, onChildChanged, onChildRemoved, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { create_notepad } from "./notepad.js";
const firebaseConfig = {
    apiKey: "AIzaSyCg2-wxttZ6Q9ruAJDpSJa8tZU-O73-AQo",
    authDomain: "critterically.firebaseapp.com",
    databaseURL: "https://critterically-default-rtdb.firebaseio.com",
    projectId: "critterically",
    storageBucket: "critterically.firebasestorage.app",
    messagingSenderId: "699352233264",
    appId: "1:699352233264:web:3251fc49c4295d686744f5",
    measurementId: "G-1PD9RRF4D7"
};
initializeApp(firebaseConfig);
const db = getDatabase()

const consoleWindow = document.createElement(`div`);
consoleWindow.id = 'console'
consoleWindow.classList.add('window')
consoleWindow.innerHTML = `
    <div id="head">Terminal</div>
    <div id="body"></div>
    <input id="input" placeholder="Input" autocomplete="off">
`
const openApps = ref(db, 'open')

/**
 * @param {string} str 
 */
function parseCommand(str)
{
    const words = str.split(" ");
    switch(words[0])
    {
        case 'create':
            create_notepad(() => {
                let ref = push(openApps)

                set
            })
            break;
        
        default:
            break;
    }
}

const input = consoleWindow.querySelector("#input");
const output = consoleWindow.querySelector("#body");
input.addEventListener("keypress", (ev) => {
    if(ev.key == "Enter")
    {
        output.innerHTML += `<div class="console-input">] ${input.value}</div>`
        parseCommand(input.value);
        input.value = ""
    }
})

let x = 0;
let y = 0;

function move(ev)
{
    x += ev.movementX;
    y += ev.movementY;

    consoleWindow.style.left = `${x}px`;
    consoleWindow.style.top = `${y}px`;
}

function up()
{
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
}

consoleWindow.querySelector('#head').addEventListener('mousedown', () => {
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
})

onChildAdded(openApps, (snapshot) => {
    console.log(snapshot.val())
})



document.body.appendChild(consoleWindow)