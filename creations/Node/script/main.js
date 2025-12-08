"use strict";
var Game;
(function (Game) {
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
                e.style.left = `${position[0]}px`;
                e.style.top = `${position[1]}px`;
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
        }
    }
    new Node("Node").position;
})(Game || (Game = {}));
