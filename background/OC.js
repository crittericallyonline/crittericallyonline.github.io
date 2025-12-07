
const width = 1920;
const height = 1080;

const scx = width / 2;
const scy = height / 2;

const EYE_SPACING = 100

class Eye {
    constructor(x, height)
    {
        this.x = x;
        this.y = 0;
        this.height = height;
        this.closed = false;
        this.color = "#ff9100ff"
        this.expression = 'happi'
        this.flipped = false;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        switch (this.expression) {
            case `normal`:
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.translate(this.x, this.y)
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(0, this.height / 2);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
                break;
        
            case `closed`:
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.translate(this.x, this.y)
                ctx.beginPath();
                ctx.moveTo(-50, this.height / 4);
                ctx.lineTo(50, this.height / 4);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
                break;
        
            case `eek`:
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.translate(!this.flipped ? this.x-100 : this.x+100, this.y)
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 4);
                ctx.lineTo(!this.flipped ? this.height/2 : -this.height/2, 0);
                ctx.lineTo(0, this.height / 4);
                ctx.stroke();
                ctx.restore();
                break;

            case `happi`:
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.translate(!this.flipped ? this.x-100 : this.x+100, this.y)
                ctx.beginPath();
                ctx.moveTo(this.flipped ? -this.height/2 : this.height / 2, -this.height / 4);
                ctx.lineTo(0, -this.height/2);
                ctx.lineTo(0, this.flipped ? -this.height/2 : this.height / 2, -this.height / 4);
                ctx.stroke();
                ctx.restore();
                break;
            
            case 'angry':
            case 'devious':
                break;
        
            default:
                break;
        }
    }
}

class Mouth {
    constructor(width = 100, height = 40, y = 150)
    {
        this.showing = true; // false by default, on creation they are very shy
        this.mode = `smile`
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = y;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {

        if(!this.showing) return;

        let time = (performance.now()/500) % 1;
        switch (this.mode) {
            case `silly`:
                
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                // ctx.strokeStyle = 'red'
                ctx.moveTo(-this.width / 4, 0);
                for (let i = 0; i < 11; i++) {
                        
                    ctx.lineTo(-this.width / 4 + Math.cos(i/ Math.PI) * 50, Math.sin(i/Math.PI) * 75, -this.height);
                }
                ctx.moveTo(-this.width / 4, 0);
                ctx.lineTo(-this.width / 4, 30)
                ctx.stroke();
                ctx.restore();

            case `smile`:
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                ctx.moveTo(-this.width,-this.height);
                ctx.lineTo(-this.width,0);
                ctx.lineTo(this.width, 0);
                ctx.lineTo(this.width, -this.height);
                ctx.stroke();
                ctx.restore();
                break;

            case 'nerd':
            case 'goofy':
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                ctx.moveTo(-this.width,-this.height);
                ctx.lineTo(-this.width,0);
                ctx.lineTo(this.width, 0);
                ctx.lineTo(this.width, 0);
                ctx.lineTo(this.width, -this.height);

                // teeth
                ctx.moveTo(-this.width / 3, 0);
                ctx.lineTo(-this.width / 3, 50);
                ctx.lineTo(this.width / 3, 50);
                ctx.lineTo(this.width / 3, 0);

                // teeth-seperation
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 50);

                ctx.stroke();
                ctx.restore();
                break;
            
            case 'talking':
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                ctx.moveTo(-this.width,-this.height);
                ctx.lineTo(-this.width,0);
                ctx.lineTo(this.width, 0);
                ctx.lineTo(this.width, -this.height);
                
                if(time < 1/2)
                {
                    ctx.moveTo(-this.width / 1.25, 0);
                    ctx.lineTo(0, 50);
                    ctx.lineTo(this.width / 1.25, 0);
                }

                ctx.stroke();
                ctx.restore();
                break;
                
            case `open`:
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                ctx.moveTo(-this.width,-this.height);
                ctx.lineTo(-this.width,0);
                ctx.lineTo(this.width, 0);
                ctx.lineTo(this.width, -this.height);
                ctx.stroke();
                ctx.restore();
                break;
        
            default:
                break;
        }
    }
}

export class OC {
    constructor(owner = "owner", name = "chipbit")
    {

        this.primary = '#00f7ffff'
        this.secondary = '#00bbc2ff'

        this.owner = owner;
        this.name = name;
        this.memory = [];
        this.state = ``;
        this.updateState(`happy`)
        this.current_feeling = ``;
        this.eyes = {
            left: new Eye(-EYE_SPACING, 300),
            right: new Eye(+EYE_SPACING, 300),
        };
        this.mouth = new Mouth(200, 40, 220)
        this.eyes.right.color = '#00f7ffff'
        this.eyes.right.flipped = true;
    }

    tick()
    {
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 25;
        ctx.translate(scx, Math.cos((performance.now() / 5000) * Math.PI) * 25+scy)
        ctx.fillStyle = this.secondary
        ctx.strokeStyle = this.primary
        ctx.closePath();
        ctx.stroke();


        this.eyes.left.draw(ctx);
        this.eyes.right.draw(ctx);
        this.mouth.draw(ctx);
        
        ctx.restore();
    }

    updateState(state=``)
    {
        this.state=state;
        switch(this.state)
        {
            case `sleeping`:
                break;

            default:
                console.warn(`No case defined with state being "${state}" (updateState)`)
                break;
        }
    }

    // user defined actions
    pet()
    {
        console.log("you are petting me =]");
    }
}