"use strict";
var GameObjects;
(function (GameObjects) {
    const nodes = [];
    const globalOffset = new Int16Array(2);
    class Attachment {
        element;
        constructor(label, label_alignment) {
            this.element = document.createElement('div');
            this.element.classList.add('attachment');
            let a = [
                `<div class="bridge"></div>`,
                `<div class="label"><p>${label}</p></div>`
            ];
            if (label_alignment == 'left')
                a.reverse();
            this.element.innerHTML = a.join();
            a = null;
        }
        getBridge() {
            return this.element.querySelector('bridge');
        }
    }
    GameObjects.Attachment = Attachment;
    class Node {
        element;
        position;
        constructor(title) {
            this.element = document.createElement(`div`);
            this.element.classList.add('node');
            this.element.innerHTML =
                `
                <div class="head">
                    ${title}
                </div>
                <div class="body">
                </div>
            `;
            const position = new Uint16Array(2);
            const e = this.element;
            function style() {
                e.style.left = `${position[0] + globalOffset[0]}px`;
                e.style.top = `${position[1] + globalOffset[1]}px`;
            }
            const mm = new Int8Array(2);
            const temp = new Uint16Array(2);
            const head = this.element.querySelector('.head');
            head.addEventListener('mousedown', () => {
                function move(ev) {
                    mm[0] = ev.movementX;
                    mm[1] = ev.movementY;
                    temp[0] = position[0];
                    temp[1] = position[1];
                    position[0] += mm[0];
                    position[1] += mm[1];
                    if (temp[0] < position[0] - mm[0]) {
                        position[0] -= mm[0];
                    }
                    if (temp[1] < position[1] - mm[1]) {
                        position[1] -= mm[1];
                    }
                    const rect = e.getBoundingClientRect();
                    if (position[0] > 500 + (rect.right - rect.left) - rect.width / 2) {
                        position[0] = 500 + (rect.right - rect.left) - rect.width / 2;
                    }
                    style();
                }
                function up() {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                }
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', up);
            });
            this.position = position;
            this.position[0] = window.innerWidth / 2;
            this.position[1] = window.innerHeight / 2;
            style();
            document.body.appendChild(this.element);
            nodes.push(this);
        }
        update() {
            this.element.style.left = `${this.position[0] + globalOffset[0]}px`;
            this.element.style.top = `${this.position[1] + globalOffset[1]}px`;
        }
        append(a) {
            this.element.appendChild(a);
        }
    }
    class Worker extends Node {
        constructor() {
            super("Worker");
            this.append(new Attachment("Attachment1", "left").element);
        }
    }
    GameObjects.Worker = Worker;
    document.addEventListener('mousedown', (ev1) => {
        if (ev1.target.classList.contains('head'))
            return;
        function move(ev2) {
            globalOffset[0] += ev2.movementX;
            globalOffset[1] += ev2.movementY;
            position.innerText = `(${globalOffset[0]}, ${globalOffset[1]})`;
            nodes.forEach(node => {
                node.update();
            });
            document.body.style.backgroundPosition = `${globalOffset[0]}px ${globalOffset[1]}px`;
        }
        function up() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        }
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    });
    const position = document.createElement('p');
    position.classList.add("debug-data");
    document.body.appendChild(position);
})(GameObjects || (GameObjects = {}));
var Game;
(function (Game) {
    new GameObjects.Worker();
})(Game || (Game = {}));
document.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    if (ev.ctrlKey) {
        if (ev.deltaY > 0) {
        }
        else {
        }
    }
}, { passive: false });
