
var tt = talkthrough;
talkthrough.savename = "170a_concrete";
var templateStack = ["mirror:html"];

//files that can be included in the stack -- before and after are defined here.  mirrors are editor contents and files need to be in includes/{filename}.  Note: code will add '.txt' to filename request.

//this example will load in the order of 'includes/b4.txt', the content of mirror tab titled "Canvas", 'includes/aft.txt';

//files that should be included in the zip, include individually, relative paths
//directories will be automatically created
//examples: images, media, includes that aren't part of the above stack.

//initiate probably tie these to a parent object at these point
var audpop;
//this loads the files found in the template stack  
var setup = async function () {
    var result = await talkthrough.loadResources();


    //initiate the mirrors with some options. make some of these default!

    //this will load "includes/canvas.js" into Canvas
    var body = await tt.makeMirror("html", "concrete_body.html", { mode: "htmlmixed" });
    //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
    var CSS = await tt.makeMirror("css", "concrete_style.css", { saveAs: "concrete.css", mode: "css" });

    //var js = await tt.makeMirror("js", "script.js");

    /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
    this uses the same format as templateStack, taking strings, mirrors, and files */
    body.addFilter({ line: 6, filters: ["<style>", "mirror:css", "</style>"] });
    talkthrough.makeSaveButton();

    //this is a workaround for a strange bug that doubles content in the iframe
    //maybe this should fire if there's an event for when the mirror is fully loaded and filled?

    window.setTimeout(function () {
        //make 'Arithmetic' visible
        //tt.visible('html');
        //render the stack
        tt.updatePreview();
    }, 500);
    console.log("finished setup");

    audPop = document.getElementById("audioclip");




    // add virtual mouse at the bottom left corner
    // stays there until it is removed when editing happens
    //talkthrough.addMouse();

    //initiate popcorn object
    var aud = Popcorn("audio");
    talkthrough.aud = aud;
    var chapters = document.querySelectorAll('.chapter');
    for (var i = 0; i < chapters.length; i++) {
        chapters[i].addEventListener('click', function (event) {
            aud.play(Popcorn.util.toSeconds(event.target.dataset.start));
        });
    }

    talkthrough.visibleAt("0:00","2:03", "html");

    talkthrough.highlightLinesUn(35, 42, 11, 12);
    talkthrough.stringHighlightAt(48, "1:05", /\<p|\<\/p/g, { scroll: false });
    talkthrough.stringHighlightAt("1:06", "1:34", /\<div|\<\/div/g, { scroll: false });
    talkthrough.stringHighlightAt("1:37", "1:52", /\<span|\<\/span/g, { scroll: false });

    talkthrough.visibleAt("2:03","2:34", "css");

    talkthrough.highlightLinesUn("2:21", "2:26", 5, 88);


    talkthrough.highlightLinesUn("2:11", "2:20", 1, 3);
    talkthrough.visibleAt("2:34","3:42", "html");

    talkthrough.highlightLinesUn("3:01", "3:10", 1, 2);
    talkthrough.highlightLinesUn("3:11", "3:12", 5);
    talkthrough.highlightLinesUn("3:12", "3:14", 6, 7);
    talkthrough.highlightLinesUn("3:14", "3:17", 6);
    talkthrough.highlightLinesUn("3:17", "3:20", 7);


    talkthrough.highlightLinesUn("3:25", "3:42", 11, 12);

    //sticky
    talkthrough.visibleAt("3:42","4:36", "css");
    talkthrough.highlightLinesUn("3:49", "4:05", 5, 9);
    talkthrough.scrollPreviewAt("4:01", 2000);
    talkthrough.scrollPreviewAt("4:04", 0);


    //poem
    talkthrough.highlightLinesUn("4:08", "4:26", 11, 13);

    //back to html
    talkthrough.visibleAt("4:36","4:58", "html");

    talkthrough.highlightLinesUn("4:40", "4:57", 14, 19);


    //back to css
    talkthrough.visibleAt("4:58","6:34", "css");
    //FIX THIS
    talkthrough.scrollToAt("4:59","6:16", 39);

    talkthrough.highlightLinesUn("5:00", "5:18", 33, 35);

    talkthrough.highlightLinesUn("5:19", "5:30", 15, 17);
    talkthrough.scrollToAt("4:31", 70);
    talkthrough.highlightLinesUn("5:30", "5:54", 61, 66);

    talkthrough.replaceAt("5:55", 65, "/*  text-orientation: upright; */");
    talkthrough.replaceAt("5:59", 65, "  text-orientation: upright; ");

    talkthrough.scrollToAt("6:05", 30);

    talkthrough.highlightLinesUn("6:05", "6:16", 23, 30);
    talkthrough.scrollPreviewAt("6:05", ".turn");

    talkthrough.visibleAt("6:16","6:34", "html");

    talkthrough.highlightLinesUn("6:20", "6:33", 21, 28);
    talkthrough.visibleAt("6:34","7:17", "css");

    talkthrough.replaceAt("6:38", 27, "  border: 1px solid #333;");
    talkthrough.highlightLinesUn("6:45", "6:55", 29);


    talkthrough.visibleAt("6:58","7:17", "html");
    talkthrough.scrollPreviewAt("6:59", ".grow");

    talkthrough.highlightLinesUn("6:59", "7:10", 30, 37);
    talkthrough.scrollPreviewAt("7:12", ".block");

    talkthrough.highlightLinesUn("7:12", "7:16", 38, 43);
    talkthrough.visibleAt("7:17","7:34", "css");
    talkthrough.highlightLinesUn("7:18", "7:23", 41, 50);
    talkthrough.highlightLinesUn("7:24", "7:34", 53, 57);

    talkthrough.visibleAt("7:34","8:00", "html");
    talkthrough.highlightLinesUn("7:37", "7:39", 39);
    talkthrough.highlightLinesUn("7:39", "7:42", 41);

    talkthrough.scrollPreviewAt("7:52", ".marker");

    talkthrough.visibleAt("8:00","8:09", "css");
    talkthrough.highlightLinesUn("8:01", "8:08", 85, 88);


    talkthrough.visibleAt("8:09","8:28", "html");

    talkthrough.scrollPreviewAt("8:10", ".large > .turn");

    talkthrough.highlightLinesUn("8:10", "8:17", 46, 48);
    talkthrough.scrollPreviewAt("8:21", ".perspective");

    talkthrough.highlightLinesUn("8:21", "8:27", 50, 55);
    talkthrough.visibleAt("8:28",aud.duration(), "css");
    talkthrough.highlightLinesUn("8:29", "8:57", 82);


}
setup();

