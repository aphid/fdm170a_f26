let vid = document.querySelector("video");


let data = loadJson("includes/montage.json");
let com = document.querySelector("#comment");

com.textContent = data[0].description;

var loadJson = async function (url) {
    let data = await fetch(url);
    return await data.json();
};

//begins when video is capable of being played
vid.addEventListener("canplay", function () {
    process(data);
}, { once: true });



async function process(data) {
    let time = 0;
    for (let item of data) {
        com.textContent = item.description;
        time = time + (item.frames / 16);
        await passed(time);
    }
    vid.pause();
    com.textContent = "fin";
}

async function passed(time) {
    //Promises are a bit advanced, but they're very useful when working with asynchronous media
    return new Promise ( function(resolve) {
        vid.addEventListener("timeupdate", function timeup() {
            if (vid.currentTime > time) {
                resolve();
            }
        });
    });
}
