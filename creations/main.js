const creations = document.getElementById('creations');

fetch("/data/creations.json")
    .then(e => e.json())
    .then(data => {
        data.forEach(item => {

            if(item.hidden)
            {
                return;
            }
            
            const e = document.createElement('div');
            e.innerHTML = 
            `
            <div class="item">
                <div class="top">
                    <img class="thumb" src="${item.thumb}" alt="Thumbnail">
                    <div class="body">
                        <h2 class="title">${item.title}</h2>
                        <p class="description">${item.description}</p>
                        <date class="date">Last Updated on ${new Date(item.lastUpdated).toLocaleDateString()}</date>
                        ${item.link ? `<a href="${item.link}">Link</a>` : ``}
                    </div>
                </div>
            </div>
            `
            creations.appendChild(e.querySelector('.item'))
        });
    })