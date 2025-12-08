namespace Settings {
    const IDENTITY = 'rhythm/savedata/settings';
    let data = new ArrayBuffer(4); // alloc(4kb)
    const U8 = new Uint8Array(data);

    const values = {
        volume: {
            master: 0,
            sfx: 0,
            background: 0, // possibly an unused property
            music: 0
        }
    }
    
    export function write()
    {
        // move all data into the array before saving to disk.
        // WHEN LOADING PLEASE DO NOT ORDER THIS ANY DIFFERENT.
        U8[0] = values.volume.master
        U8[1] = values.volume.sfx
        U8[2] = values.volume.music
        U8[3] = values.volume.background

        // save to disk.
        localStorage.setItem(IDENTITY, String.fromCodePoint(...U8));
    }

    // we are kinda in a rush rn, gotta push changes before class begins. -- 8/12/2025
    export function load()
    {
        const item = localStorage.getItem(IDENTITY);
        if(!item) {
            write();
            load();
            return;
        }

        item.split("").forEach((str, i) => {
            U8[i] = str.charCodeAt(0)
        })


        values.volume.master = U8[0];
        values.volume.sfx = U8[1];
        values.volume.music = U8[2];
        values.volume.background = U8[3];
    }

    export function getValues()
    {
        return values;
    }

    // load when the user loads the document
    document.addEventListener('DOMContentLoaded', load);
}