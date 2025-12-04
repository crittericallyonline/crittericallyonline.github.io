
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
canvas.width = 1920
canvas.height = 1080;
const width = 1920;
const height = 1080;

const scx = width / 2;
const scy = height / 2;

const ctx = canvas.getContext('2d');

const mouse = {
    pos: {x: 0, y: 0},
    vel: {x: 0, y: 0},
    down: false,
}

class RadonOverlord {
    /**
     * @description the cutie pie
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor() {
        this.asleep = false;
        this.happiness = 50;
        this.depressed = false;
        this.blushLevel = 0.5;
        this.scared = false;
        this.touched = false;
        this.petting = false;

        this.mouth = {
            open: false,
            frowing: false,
            slight_frown: false,
            talking: false,
            talking_speed: 3.5, // ms
            drooling: false,
            showing: true,
            smiling: true,
            tung_sticking: true,
            smile_points: 4,

            offset: {
                x: 0,
                y: 200
            },
            width: scx / 4, // px
        }
        this.eyes = {
            spacing: 150, //px
            height: 250, //px
            crying: false,
            left: {
                open: false,
                wide: false,
            },
            right: {
                open: false,
                wide: false,
            },
            lookAt: {
                x: scx,
                y: scy,
                intrested: false,
            }
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint(ctx)
    {
        
        ctx.save();

        ctx.translate(0, Math.sin(performance.now() / 1000) * 10)

        ctx.lineCap = `round`
        ctx.strokeStyle = 'rgb(255, 174, 0)';
        ctx.shadowColor = '#ff008091'
        ctx.lineWidth = 10
        ctx.shadowBlur = 23.25;

        ctx.beginPath();
        if(this.eyes.lookAt.intrested < 0.5)
        {

            ctx.moveTo(scx - this.eyes.spacing, scy - this.eyes.height / 2)
            ctx.lineTo(scx - this.eyes.spacing, scy + this.eyes.height / 2)

            ctx.moveTo(scx + this.eyes.spacing, scy - this.eyes.height /2)
            ctx.lineTo(scx + this.eyes.spacing, scy + this.eyes.height / 2)
        }
        ctx.stroke();

        if(this.mouth.showing)
        {
            let done = false;

            if(this.mouth.smiling && !done)
            {
                done = true;
                ctx.beginPath();
                ctx.moveTo(scx+this.mouth.width, scy+this.mouth.offset.y - 40)
                ctx.lineTo(scx+this.mouth.width, scy+this.mouth.offset.y)
                
                ctx.lineTo(scx-this.mouth.width, scy+this.mouth.offset.y)
            
                ctx.lineTo(scx-this.mouth.width, scy+this.mouth.offset.y - 40)
                ctx.stroke();
            }

            if(this.mouth.frowing && !done)
            {
                ctx.beginPath();
                ctx.moveTo(scx+this.mouth.width, scy+this.mouth.offset.y + 40)
                ctx.lineTo(scx+this.mouth.width, scy+this.mouth.offset.y)
                
                ctx.lineTo(scx-this.mouth.width, scy+this.mouth.offset.y)
            
                ctx.lineTo(scx-this.mouth.width, scy+this.mouth.offset.y + 40)
                ctx.stroke();
            }

            if(this.mouth.talking)
            {
                this.mouth.tung_sticking = false;
                ctx.beginPath();
                ctx.moveTo(scx+this.mouth.width, scy+this.mouth.offset.y)
                if(performance.now() % (1000 / this.mouth.talking_speed) < (500  / this.mouth.talking_speed))
                {
                    ctx.lineTo(scx, scy+this.mouth.offset.y + 20)
                } else {
                    ctx.lineTo(scx, scy+this.mouth.offset.y + 40)
                }
                ctx.lineTo(scx-this.mouth.width, scy+this.mouth.offset.y)
                ctx.stroke();
            } else if(this.mouth.tung_sticking)
            {
                ctx.beginPath();
                ctx.moveTo(scx-this.mouth.width+ 50, scy+this.mouth.offset.y)
                for (let i = 0; i < 11; i++) {
                    ctx.lineTo(scx-this.mouth.width + 100 + Math.cos(i / Math.PI) * 50, scy+this.mouth.offset.y + Math.sin(i / Math.PI) * 50 )
                }
                ctx.moveTo(scx-this.mouth.width+100, scy+this.mouth.offset.y)
                ctx.lineTo(scx-this.mouth.width + 100, scy+this.mouth.offset.y + 25)
                ctx.stroke();
            }
        }
        ctx.restore();
    }
}

const radon = new RadonOverlord();

function updateLoop()
{
    ctx.clearRect(0, 0, 1920, 1080);
    radon.paint(ctx);
    ctx.save();
    ctx.fillStyle = 'white'
    ctx.fillText(`STATISTICS: ${JSON.stringify(mouse)}`, 0, 10)
    ctx.restore();
}

setInterval(updateLoop, 1000/30);

document.addEventListener("mousemove", (ev) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#ff7300ff';
        ctx.lineWidth += Math.sqrt(ev.movementX ** 2 + ev.movementY ** 2) * 2;
    ctx.moveTo(mouse.pos.x, mouse.pos.y)
    ctx.lineTo(ev.x, ev.y)
    ctx.lineCap = "round"
    ctx.stroke();
    ctx.fill()
    ctx.restore();

    mouse.pos.x = ev.x;
    mouse.pos.y = ev.y;
})

document.addEventListener("mousedown", (ev) => {
    mouse.down = true
})

document.addEventListener('mouseup', (ev) => {
    mouse.down = false
})