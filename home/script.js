const dimentiaCube = document.getElementById("dimentia-cube")

function loop()
{
    requestAnimationFrame(loop)
    const speed = 100
    const time = (performance.now()/1000)*speed

    dimentiaCube.style.transform = `
        rotateX(${time}deg)
        rotateZ(${time}deg)
    `
    updateFish()
}

/**
 * @type {{e: HTMLDivElement, x: number, y: number, xv: number, yv: number}[]}
 */
const fishElements = []

function updateFish()
{
    fishElements.forEach(fish => {
        const rect = fish.e.getBoundingClientRect();
        const body = document.body.getBoundingClientRect();
        
        fish.xv += Math.random() * 2 - 1

        fish.yv += Math.random() * 2 - 1

        fish.x += fish.xv;
        fish.y += fish.yv;

        fish.xv *= 0.98;
        fish.yv *= 0.98;


        if(rect.y > body.bottom - rect.height)
        {
            fish.y = 0
        }
        if(rect.y < 0)
        {
            fish.y = body.bottom - rect.height
        }

        if(rect.x > body.right - rect.width)
        {
            fish.x = 0
        }
        if(rect.x < 0)
        {
            fish.x = body.right - rect.width
        }

        fish.e.style.left = `${fish.x}px`;
        fish.e.style.top = `${fish.y}px`;

    });
}

function spawnFish(amt)
{
    for (let i = 0; i < amt; i++) {
        const f = document.createElement(`div`);
        f.classList.add('fish-element')

        document.body.appendChild(f);
        fishElements.push({
            e: f,
            x: window.innerWidth * Math.random(),
            y: window.innerHeight * Math.random(),
            xv: 0,
            yv: 0
        });
    }
}

spawnFish(32)

loop();