/*
TO DO: 
Change existing and add new onMouseOver =...statements so that when the
user runs their cursor over the screens, the screens interact with one another
in interesting and perhaps unexpected ways.                                     
 
Use some of the ideas in the McCloud readings to think about how the screens
might be related together.                                                      */


// How many milliseconds between frames?
var pause_between_frames = 250; 

//fscreen constructor
function Fscreen(filename, isLooping = false) {
    let tag, container;
    //if is an array of images...
    if (filename instanceof Array) {
        this.mode = "images";
        this.frames = filename;
        container = document.createElement("img");
        this.currentFrame = 0;
    //or if it's a video...
    } else if (filename.includes("mp4") || filename.includes("webm")) {
        this.mode = "video";
        container = document.createElement("video");
        container.src = filename;
        container.loop = isLooping;
        container.autoplay = true;
    }
    this.isLooping = isLooping;
    this.id = fscreens.length;
    container.id = "screen" + this.id;
    container.classList.add("fScreen");

    //script that runs when mouse enters...
    container.addEventListener("mouseenter", () => {
        this.isLooping = false;
    });

    //and when it leaves...
    container.addEventListener("mouseleave", () => {
        this.isLooping = true;

    });
    
    //and if we click...
  	container.addEventListener("click", () => {
        this.container.classList.toggle("invert"); 
      
    });

    //add container to the HTML body
    document.body.appendChild(container);
    this.container = container;
} //end Fscreen;

//wait until the page has loaded, and then start the animation
document.addEventListener("DOMContentLoaded", function () {
    animate();
});

//an empty array
var fscreens = [];

// TO DO: Replace the URLs of some of these images with images you have
//        downloaded or created.

//[0] each of these adds a new Fscreen object to the fscreens array.
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg"],
    true));

//[1]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));


//[2]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));

//[3]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));

//[4]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing2.jpg", "img/writing3.jpg"], true));

//[5]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));
//[6]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));

//[7]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));

//[8]
fscreens.push(new Fscreen(["img/writing0.jpg", "img/writing1.jpg", "img/writing2.jpg", "img/writing3.jpg", "img/writing4.jpg"],
    true));



// This is the main function that animates the frames of all of the
// screens.
async function animate() {

    //for each fscreen
    for (let fs of fscreens) {
        //if its mode is video...
        if (fs.mode === "video") {
            //if it should be playing and if it isn't playing (using video property)
            if (fs.isLooping && !fs.container.playing) {
                fs.container.play();
            }
            //if it shouldn't be playing
            if (!fs.isLooping) {
                fs.container.pause();
            }
        } else {
            //it's an image!
            //if it's looping...
            if (fs.isLooping) {
                //advance currentFrame to the next frame
                fs.currentFrame = (fs.currentFrame + 1) % fs.frames.length;
                //update the img src to the new frame;
                fs.container.src = fs.frames[fs.currentFrame];
            } //end if
        } //end else
    }//end loop

    //take a moment
    await sleep();
    //and do it again
    animate();
}

//waits, by default for pause_between_frames.
async function sleep(ms = pause_between_frames) {
    return new Promise(function (resolve) {
        window.setTimeout(function () {
            resolve();
        }, ms);
    });
}
