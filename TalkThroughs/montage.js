
var tt = talkthrough;
tt.savename = "170a_montage";

//files that can be included in the stack -- before and after are defined here.  mirrors are editor contents and files need to be in includes/{filename}.  Note: code will add '.txt' to filename request.

//this example will load in the order of 'includes/b4.txt', the content of mirror tab titled "Canvas", 'includes/aft.txt';
var templateStack = ["mirror:html"];

//files that should be included in the zip, include individually, relative paths
//directories will be automatically created
//examples: images, media, includes that aren't part of the above stack.
//tt.saveFiles(["img/cyano_horse1.png", "img/cyano_horse2.png"]);

//initiate probably tie these to a parent object at these point
var audpop;
//this loads the files found in the template stack  
var setup = async function () {
    var result = await talkthrough.loadResources();
    console.log(result);


    //initiate the mirrors with some options. make some of these default!

    //this will load "includes/canvas.js" into Canvas
    var body = await tt.makeMirror("html", "montage_body.html", { mode: "htmlmixed" });
    talkthrough.getMirror("html").setOption("lineWrapping", true);
    //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
    var CSS = await tt.makeMirror("css", "montage_style.css", { saveAs: "includes/montage.css", mode: "css" });

    var js = await tt.makeMirror("js_1", "montage.js", { saveAs: "includes/montage.js", mode: "javascript" });
    var js2 = await tt.makeMirror("js_2", "montage_2.js", { saveAs: "includes/montage.js", mode: "javascript" });

    var montagejson = await tt.makeMirror("json", "montage.json", { saveAs: "includes/montage.json", mode: "javascript", json: true })

    /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
    this uses the same format as templateStack, taking strings, mirrors, and files */
    body.addFilter({ line: 6, filters: ["<style>", "mirror:css", "<\/style>"] });
    body.addFilter({ line: 13, filters: ["<script>", "group:js", "<\/script>"] });
    js.addFilter({ line: 10, filters: ["let data = JSON.parse(`", "mirror:json", "`);"] })
    talkthrough.cmGroup("js", ["js_1", "js_2"], { saveAs: "includes/montage.js" });


    talkthrough.makeSaveButton();



    //this is a workaround for a strange bug that doubles content in the iframe
    //maybe this should fire if there's an event for when the mirror is fully loaded and filled?

    window.setTimeout(function () {
        tt.visible('html');
        //render the stack
        tt.updatePreview();
    }, 500);


    audPop = document.getElementById("audioclip");





    // add virtual mouse at the bottom left corner
    // stays there until it is removed when editing happens
    //talkthrough.addMouse();

    //initiate popcorn object
    var aud = Popcorn("audio");
    talkthrough.aud = aud;



    //THE HTML
    talkthrough.groupActiveAt(0, "19:22", "js", "js_1");

    talkthrough.visibleAt("0:00", "3:34", "html");

    talkthrough.highlightLinesUn(60, 64, 1, 7);
    talkthrough.highlightLinesUn("1:05", "1:27", 10);
    talkthrough.highlightLinesUn("1:29", "3:14", 11, 12);

    //THE CSS
    talkthrough.visibleAt("3:34", "4:54", "css");
    talkthrough.highlightLinesUn("3:35", "3:46", 1, 5);
    talkthrough.highlightLinesUn("3:46", "4:00", 7, 11);

    talkthrough.highlightLinesUn("4:00", "4:42", 13, 25);

    //THE JSON
    talkthrough.visibleAt("4:54", "10:29", "json");
    talkthrough.highlightLinesUn("7:53", "7:53.5", 2, 6);
    talkthrough.highlightLinesUn("7:53.5", "7:54", 7, 11);
    talkthrough.highlightLinesUn("7:54", "7:54.5", 12, 16);
    talkthrough.highlightLinesUn("7:54.5", "7:55", 17, 21);
    talkthrough.stringHighlightAt("8:00", "8:06", /\[|\]/, { scroll: false });
    talkthrough.stringHighlightAt("8:07", "8:12", /\},/, { scroll: false });
    talkthrough.stringHighlightAt("8:20", "8:24", /\}|\{/, { scroll: false });
    talkthrough.highlightLinesUn("8:26", "9:08", 2, 6);

    talkthrough.highlightLinesUn("9:10", "9:22", 8);

    talkthrough.highlightLinesUn("9:34", "9:37", 21);
    talkthrough.replaceAt("9:38", 21, "    },");
    talkthrough.replaceAt("9:56", 21, "    }");

    //THE JS
    //talkthrough.visibleAt("9:00",aud.duration(), "js");
    talkthrough.visibleAt("10:29", "19:18", "js_1");

    //fast
    talkthrough.highlightLinesUn("10:46", "10:54", 1, 2);
    talkthrough.highlightLinesUn("10:54", "10:57", 5, 8);
    talkthrough.highlightLinesUn("10:58", "11:05", 11, 13);
    talkthrough.highlightLinesUn("11:06", "11:52", 15, 28); //process
    talkthrough.highlightLinesUn("11:54", "12:03", 30, 39);
    talkthrough.highlightLinesUn("12:03", "12:12", 41, 54);

    //slower 

    talkthrough.highlightLinesUn("12:13", "13:08", 1, 2);

    talkthrough.highlightLinesUn("13:10", "14:06", 5, 8);
    talkthrough.highlightLinesUn("14:23", "15:56", 11, 13);  // canplay
    talkthrough.highlightLinesUn("15:56", "15:58", 15, 28); //process
    talkthrough.highlightLinesUn("15:58", "16:02", 16);
    talkthrough.highlightLinesUn("16:02", "16:20", 17, 28);
    talkthrough.highlightLinesUn("16:20", "16:27", 18, 20);
    talkthrough.highlightLinesUn("16:28", "16:50", 21);
    talkthrough.highlightLinesUn("16:51", "17:04", 22);
    talkthrough.highlightLinesUn("17:05", "17:15", 24);
    talkthrough.highlightLinesUn("17:18", "17:21", 26, 27);
    talkthrough.highlightLinesUn("17:21", "18:26", 30, 39);

    talkthrough.highlightLinesUn("18:26", "18:32", 41, 54);

    talkthrough.highlightLinesUn("18:33", "18:39", 42, 43);
    talkthrough.highlightLinesUn("18:39", "18:44", 44, 52);
    talkthrough.highlightLinesUn("18:44", "18:53", 45, 48);
    talkthrough.highlightLinesUn("18:54", "19:02", 50, 51);

    talkthrough.highlightLinesUn("19:03", "19:09", 53);
    talkthrough.visibleAt("19:18", aud.duration(), "js_2");
    talkthrough.groupActiveAt("19:22", aud.duration(), "js", "js_2");
    talkthrough.highlightLinesUn("19:27", "19:50", 8,29);

    /*
    talkthrough.stringHighlightAt(48, "1:05", /\<p|\<\/p/g, {scroll: false});
    talkthrough.stringHighlightAt("1:06", "1:34", /\<div|\<\/div/g, {scroll: false});
    talkthrough.stringHighlightAt("1:37", "1:52", /\<span|\<\/span/g, {scroll: false});

    talkthrough.visibleAt("2:03", "css");
    */
};
setup();
