let vid = document.querySelector("video");
let caption = document.querySelector("#caption");


let loadJson = async function (url) {
    let data = await fetch(url);
    return await data.json();
};

//begins when video is capable of being played, only fires once
vid.addEventListener("canplay", function () {
    process();
}, { once: true });

async function process() {
    let data = await loadJson("includes/montage.json");
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
