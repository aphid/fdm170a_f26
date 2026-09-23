let slider = document.querySelector("input[type=range");
slider.addEventListener("input", updateVal);

function updateVal() {
    document.querySelector("#pbrate").textContent = Math.floor(slider.value, 2) + "%";
    document.querySelector("audio").playbackRate = slider.value / 100;
}

let auds = document.querySelectorAll("audio");

//for each audio element
for (let aud of auds) {

    //for each text track attached to the element
    for (let trk of aud.textTracks) {
        //at any given active cue
        trk.oncuechange = function () {
            //do nothing if no cues or the track isn't active (via default attribute or otherwise)
            if (!this.activeCues.length || this.mode !== "showing") {
                return false;
            }

            var currentCue = this.activeCues[0].text;
            let par = aud.parentNode;
            //this targets a figcaption sibling element for text
            let fig = document.querySelector("#captions");
            fig.textContent = (currentCue);
            //this scales text to fit the element
            if (parseInt(window.getComputedStyle(fig).getPropertyValue("min-height"), 10) < fig.offsetHeight) {
                console.log("bigger", fig.offsetHeight)
                fig.style.minHeight = fig.offsetHeight + "px";
            }
        }

    }
}