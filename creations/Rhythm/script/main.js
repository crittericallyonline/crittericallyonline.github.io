"use strict";
var Settings;
(function (Settings) {
    const IDENTITY = 'rhythm/savedata/settings';
    let data = new ArrayBuffer(4);
    const U8 = new Uint8Array(data);
    const values = {
        volume: {
            master: 0,
            sfx: 0,
            background: 0,
            music: 0
        }
    };
    function write() {
        U8[0] = values.volume.master;
        U8[1] = values.volume.sfx;
        U8[2] = values.volume.music;
        U8[3] = values.volume.background;
        localStorage.setItem(IDENTITY, String.fromCodePoint(...U8));
    }
    function load() {
        const item = localStorage.getItem(IDENTITY);
        if (!item) {
            write();
            load();
            return;
        }
        item.split("").forEach((str, i) => {
            U8[i] = str.charCodeAt(0);
        });
        values.volume.master = U8[0];
        values.volume.sfx = U8[1];
        values.volume.music = U8[2];
        values.volume.background = U8[3];
    }
    Settings.load = load;
    function getValues() {
        return values;
    }
    Settings.getValues = getValues;
    document.addEventListener('DOMContentLoaded', load);
})(Settings || (Settings = {}));
