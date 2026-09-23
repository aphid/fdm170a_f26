let vid = document.querySelector("video");
let caption = document.querySelector("#caption");

let CLIPS = [
    {
        "name": "prologue clip",
        "description": "",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:00:00",
        "end": "00:00:30"
    },
    {
        "name": "A1 clip",
        "description": "M moves and gives a task to Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:18:46",
        "end": "00:19:07"
    },
    {
        "name": "A2 clip",
        "description": "M moves and gives a task to Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Dr.No.mp4",
        "start": "00:11:29",
        "end": "00:12:23"
    },
    {
        "name": "B clip",
        "description": "Villain moves and appears to Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:25:21",
        "end": "00:25:41"
    },
    {
        "name": "C1 clip",
        "description": "Bond moves and gives a first check to Villain",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:30:41",
        "end": "00:31:20"
    },
    {
        "name": "C2 clip",
        "description": "Villain gives first check to Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:32:20",
        "end": "00:32:49"
    },
    {
        "name": "D clip",
        "description": "Woman moves and shows herself to Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:37:05",
        "end": "00:37:45"
    },
    {
        "name": "E clip",
        "description": "Bond takes Woman.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:37:59",
        "end": "00:38:37"
    },
    {
        "name": "F clip",
        "description": "Villain captures Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:46:35",
        "end": "00:47:10"
    },
    {
        "name": "G clip",
        "description": "Villain tortures Bond.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "00:50:18",
        "end": "00:51:58"
    },
    {
        "name": "H clip",
        "description": "Bond beats Villain.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "1:46:08",
        "end": "1:47:20"
    },
    {
        "name": "I clip",
        "description": "Bond, convalescing, enjoys Woman, whom he then loses.",
        "src": "https://people.ucsc.edu/~aphid/170a_films/Goldfinger.mp4",
        "start": "01:47:40",
        "end": "01:48:40"
    },
];

let CLIPS_USED = [];

vid.src = CLIPS[0].src;
caption.textContent = CLIPS[0].description;

function playClips() {
    var success, state, operatorNames;
    [success, state, operatorNames] = plan(["I"], []); // Change this line for your operators.
    if (success) {
        var clips = selectClips(operatorNames);
        clips.unshift(CLIPS[0]);
        clips.map(function (c) { console.log(c.name); });
        process(clips);
    }
}

// begins when video is capable of being played, only fires once
vid.addEventListener("canplay", playClips(), { once: true });

// when the window outside of the video is double clicked, 
// replan and play a new sequence of clips 
window.addEventListener("dblclick", function () {
    vid.pause();
    playClips();
}, false);

// Given a sequence of operators, select a sequence of clips
// to represent them.
function selectClips(operatorNames) {
    var clips = [];
    var i, j, selections, usedSelections, unusedSelections;
    for (i = 0; i < operatorNames.length; i++) {
        selections = [];
        usedSelections = [];
        unusedSelections = [];
        // Select all clips where the description matches the
        // operator name.
        for (j = 0; j < CLIPS.length; j++) {
            if (operatorNames[i] == CLIPS[j].description) {
                selections.push(CLIPS[j]);
            }
        }
        // Any clips that have been used before are moved to the
        // end of the list.
        for (j = 0; j < selections.length; j++) {
            if (isMember(selections[j].name, CLIPS_USED)) {
                usedSelections.push(selections[j]);
            }
            else { unusedSelections.push(selections[j]); }
        }
        selections = unusedSelections.concat(usedSelections);
        // The first clip on the list is added to the results.
        clips.push(selections[0]);
        CLIPS_USED.push(selections[0].name);
    }
    return (clips);
}

async function process(clips) {
    for (let item of clips) {
        if (parseTime(item.start) > parseTime(item.end)) {
            throw ("negative duration!");
        }
        vid.pause(); // Pause the video before switching the source.
        vid.src = item.src;
        vid.play();
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
