/* NOTE: If you use JS_2 the code will NOT load montage.json
   it will instead use the javascript object in this file 
*/

let vid = document.querySelector("video");
let caption = document.querySelector("#caption");

let data = [
    {
        "start": "01:05:00",
        "end": "1:05:15",
        "description": "clip 1"
    },
    {
        "start": 2500,
        "end": 2505,
        "description": "clip 2"
    },
    {
        "start": 499,
        "end": 503,
        "description": "clip 3"
    },
    {
        "start": 1595,
        "end": 1610,
        "description": "clip 4"
    }
];

//begins when video is capable of being played, only fires once
vid.addEventListener("canplay", function () {
    process(data);
}, { once: true });

async function process(data) {
    for (let item of data) {
        if (parseTime(item.start) > parseTime(item.end)) {
            throw ("negative duration!");
        }
        caption.textContent = item.description;
        vid.currentTime = parseTime(item.start);

        await passed(parseTime(item.end));
    }
    vid.pause();
    caption.textContent = "fin";
}

async function passed(time) {
    //Promises are a bit advanced, but they're very useful when working with asynchronous media
    return new Promise(function (resolve) {
        vid.addEventListener("timeupdate", function () {
            if (vid.currentTime > time) {
                resolve();
            }
        });
    });
}

function parseTime(time) {
    if (typeof time === "number") {
        return time;
    } else if (typeof time === "string") {
        var a = time.split(':'); // split it at the colons
        if (a.length === 2) {
            a = ("00:" + time).split(":");
        }
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return (seconds);
    }
    throw ("invalid or unknown time");
}
