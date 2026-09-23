var tt = talkthrough;
tt.savename = "170a_drawings";

//files that can be included in the stack -- before and after are defined here.  mirrors are editor contents and files need to be in includes/{filename}.  Note: code will add '.txt' to filename request.

//out of date" this example will load in the order of 'includes/b4.txt', the content of mirror tab titled "Canvas", 'includes/aft.txt';
var templateStack = ["mirror:html"];

//files that should be included in the zip, include individually, relative paths
//directories will be automatically created
//examples: images, media, includes that aren't part of the above stack.

//initiate probably tie these to a parent object at these point
var audpop;
//this loads the files found in the template stack  
var setup = async function () {
  var result = await talkthrough.loadResources();
  console.log(result);


  //initiate the mirrors with some options. make some of these default!

  //this will load "includes/canvas.js" into Canvas
  var body = await tt.makeMirror("html", "canvas.html", { mode: "htmlmixed", saveAs: "canvas.html" });
  //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
  var CSS = await tt.makeMirror("css", "canvas.css", { saveAs: "canvas.css", mode: "css" });
  var line = await tt.makeMirror("basics", "basics.js", { mode: "javascript" });
  var line = await tt.makeMirror("line", "drawing_a_line.js", { mode: "javascript" });
  var jsa = await tt.makeMirror("wd16a", "canvas_a.js",);

  var js1 = await tt.makeMirror("wd16b", "canvas_b.js");
  var js2 = await tt.makeMirror("wd16c", "canvas_c.js");

  //var js = await tt.makeMirror("js", "script.js");

  /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
  this uses the same format as templateStack, taking strings, mirrors, and files */
  body.addFilter({ line: 5, filters: ["<style>", "mirror:css", "</style>"] });


  talkthrough.makeSaveButton();
  talkthrough.cmGroup("js", ["basics", "line", "wd16a", "wd16b", "wd16c"], { saveAs: "canvas.js" });
  //this is a workaround for a strange bug that doubles content in the iframe
  //maybe this should fire if there's an event for when the mirror is fully loaded and filled?
  body.addFilter({ line: 14, filters: ["<script>", "group:js", "<\/script>"] });


  window.setTimeout(function () {
    //make 'Arithmetic' visible
    tt.visible('html', false);
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


  /* NEW FEATURE */
  talkthrough.visibleAt("0:00","4:56", "html");
  talkthrough.groupActiveAt("0:00", "6:01","js", "wd16c");

  talkthrough.glowAt(17, ".buttonGroup", "rgba(0,0,255,0.5)", 10000)
  talkthrough.glowAt(35, "input", "green", 10000)
  talkthrough.groupActiveAt(51,54, "js", "wd16b");
  talkthrough.groupActiveAt(54,59, "js", "wd16a");
  talkthrough.groupActiveAt(59,"6:01", "js", "wd16c");

  /* 1:14 What is a canvas element? */


  talkthrough.highlightLinesUn("3:18", "3:25", 1, 6)
  talkthrough.highlightLinesUn("3:25", "3:41", 10, 13)
  talkthrough.highlightLinesUn("3:42", "4:07", 11, 12)
  talkthrough.highlightLinesUn("4:09", "4:38", 10)

  talkthrough.highlightLinesUn("4:56", "4:38", 10)
  
  talkthrough.visibleAt("4:56","6:01", "css");

  talkthrough.highlightLinesUn("4:58", "5:00", 2)

  talkthrough.highlightLinesUn("5:01", "5:54", 5, 10)

  talkthrough.highlightLinesUn("5:55", "5:57", 12, 15)

  /* basics */
  talkthrough.visibleAt("6:01","14:52", "basics");
  talkthrough.groupActiveAt("6:01","14:52", "js", "basics");
  talkthrough.highlightLinesUn("6:01", "6:12");

  talkthrough.highlightLinesUn("6:13", "6:23", 1);
  talkthrough.highlightLinesUn("6:23", "7:20", 3);

  talkthrough.highlightLinesUn("7:20", "7:41", 5);
  talkthrough.highlightLinesUn("8:09", "8:41", 7);
  talkthrough.highlightLinesUn("8:51", "9:28", 9);

  talkthrough.highlightLinesUn("8:29", "9:14", 14);

  talkthrough.highlightLinesUn("10:32", "10:36", 13);
  talkthrough.replaceAt("10:37", 13, "//ctx.beginPath();");
  talkthrough.replaceAt("10:47", 13, "ctx.beginPath();");
  talkthrough.highlightLinesUn("11:02", "11:20", 18);

  talkthrough.highlightLinesUn("11:38", "11:40", 26);
  talkthrough.highlightLinesUn("11:40", "11:45", 27);
  talkthrough.highlightLinesUn("11:46", "11:51", 28);

  talkthrough.highlightLinesUn("11:53", "12:13", 30, 31);

  /* LINES */
  talkthrough.foldAt("14:52", 19);

  talkthrough.visibleAt("14:52","21:16", "line");
  talkthrough.groupActiveAt("14:52","21:16", "js", "line");

  talkthrough.highlightLinesUn("15:20", "15:24", 1, 3);
  talkthrough.highlightLinesUn("15:24", "15:39", 6, 9);
  talkthrough.highlightLinesUn("15:56", "16:12", 10);
  talkthrough.highlightLinesUn("16:14", "16:19", 11);
  talkthrough.highlightLinesUn("16:20", "16:35", 12, 13);
  talkthrough.highlightLinesUn("16:36", "16:53", 15);

  talkthrough.foldAt("17:10", 19);

  talkthrough.highlightLinesUn("17:10", "16:53", 19);
  talkthrough.highlightLinesUn("17:41", "16:58", 19, 25);

  //functions
  talkthrough.replaceAt("18:00", 26, "");
  talkthrough.replaceAt("18:00", 28, "/*");
  talkthrough.highlightLinesUn("18:01", "18:29", 27);


  talkthrough.replaceAt("19:19", 28, "");
  talkthrough.replaceAt("19:19", 32, "/*");

  //loops
  talkthrough.highlightLinesUn("19:19", "20:11", 29);
  talkthrough.highlightLinesUn("20:15", "20:16", 30);


  talkthrough.replaceAt("21:16", 32, "");
  talkthrough.replaceAt("21:16", 42, "");
  talkthrough.highlightLinesUn("21:17", "21:29", 33, 37);
  talkthrough.highlightLinesUn("21:30", "22:03", 34);
  //rando
  talkthrough.highlightLinesUn("22:03", "22:05", 39, 41);
  talkthrough.highlightLinesUn("22:06", "22:23", 34);
  talkthrough.highlightLinesUn("22:24", "22:30", 35);
  talkthrough.highlightLinesUn("22:31", "23:05", 36);

  //wd16a 23:16

  talkthrough.visibleAt("23:16","27:32", "wd16a");
  talkthrough.groupActiveAt("23:16","27:32", "js", "wd16a");
  talkthrough.highlightLinesUn("24:00", "24:09", 1, 9);

  talkthrough.highlightLinesUn("24:10", "24:14", 10);
  //vert
  talkthrough.highlightLinesUn("24:23", "24:47", 12, 16);
  talkthrough.highlightLinesUn("24:48", "25:41", 18, 24);
  //horiz
  talkthrough.highlightLinesUn("25:46", "26:01", 27, 31);
  //DIAG
  talkthrough.highlightLinesUn("26:02", "26:28", 35, 37);
  talkthrough.highlightLinesUn("26:29", "27:20", 39, 44);

  //wd16b 27:32


  talkthrough.visibleAt("27:32","30:59", "wd16b");
  talkthrough.groupActiveAt("27:32","30:59", "js", "wd16b");

  talkthrough.highlightLinesUn("27:57", "28:03", 1, 12);

  talkthrough.highlightLinesUn("28:08", "28:19", 15, 31);
  talkthrough.highlightLinesUn("28:20", "28:46", 16, 17);
  talkthrough.highlightLinesUn("28:47", "28:49", 19, 22);

  talkthrough.highlightLinesUn("28:50", "29:26", 25, 28);

  talkthrough.highlightLinesUn("29:28", "29:45", 32, 47);

  talkthrough.highlightLinesUn("29:48", "30:28", 50, 77);
  talkthrough.highlightLinesUn("30:49", "30:55", 78, 80);



  //last drawing...
  talkthrough.visibleAt("30:59",aud.duration(), "wd16c");
  talkthrough.groupActiveAt("30:59",aud.duration(), "js", "wd16c");
  talkthrough.highlightLinesUn("31:07", "31:12", 1, 11);
  talkthrough.highlightLinesUn("31:13", "31:19", 14);
  talkthrough.highlightLinesUn("31:27", "31:52", 48,57);
  talkthrough.highlightLinesUn("31:53", "31:59", 40,41);
  talkthrough.highlightLinesUn("32:00", "32:17", 50,51);
  talkthrough.highlightLinesUn("32:18", "32:55", 52,56);
  
  talkthrough.replaceAt("32:57", 49, "    let density = 120;");
  talkthrough.replaceAt("33:00", 49, "    let density = 2000;");
  talkthrough.replaceAt("33:04", 49, "    let density = 200;");
  talkthrough.replaceAt("33:06", 49, "    let density = 80;");
  
  talkthrough.highlightLinesUn("33:10", "33:44", 61,66);

  talkthrough.highlightLinesUn("33:45", "33:54", 16,21)
  talkthrough.highlightLinesUn("33:54", "34:00", 24,29)

  talkthrough.highlightLinesUn("34:01", "34:23", 37,43)


}
setup();
