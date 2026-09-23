var tt = talkthrough;
tt.savename = "170a_multiscreen";

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

  //initiate the mirrors with some options. make some of these default!

  //this will load "includes/canvas.js" into Canvas
  var body = await tt.makeMirror("html", "multiscreen.html", { mode: "htmlmixed" });
  //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
  var CSS = await tt.makeMirror("css", "multiscreen.css", { saveAs: "filmtable.css", mode: "css" });
  var js = await tt.makeMirror("js", "multiscreen.js", { mode: "javascript" });
  var js2 = await tt.makeMirror("js2", "multiscreen2.js", { mode: "javascript" });
  //this defines a group of subtabs called 'js' which contains mirrors (strings match first argument to above)
  talkthrough.cmGroup("js", ["js", "js2"], { saveAs: "multiscreen.js" });

  /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
  this uses the same format as templateStack, taking strings, mirrors, and files */
  body.addFilter({ line: 4, filters: ["<style>", "mirror:css", "</style>"] });
  body.addFilter({ line: 8, filters: ["<script>", "group:js", "<\/script>"] });

  //generates save button
  talkthrough.makeSaveButton();

  //audio element
  audPop = document.getElementById("audioclip");

  //initiate popcorn object, associate with tt object
  var aud = Popcorn("audio");
  talkthrough.aud = aud;


  //0:00 intro

  //show tab start, end, tabname
  talkthrough.visibleAt("0:00", "3:04","html");
  //picks which member of group is active, start, end, groupname, member [confusing example sorry]
  talkthrough.groupActiveAt(0, "20:30", "js", "js");


  //2:36 HTML
  //highlights and unhighlights, start/end(time) and startline endline
  talkthrough.highlightLinesUn("2:40", "3:03", 7, 9);

  //3:04 css
  talkthrough.visibleAt("3:04","5:01", "css");
  talkthrough.highlightLinesUn("3:10", "3:36", 1, 3);
  talkthrough.highlightLinesUn("3:37", "4:03", 5, 7);
  talkthrough.highlightLinesUn("4:03", "4:30", 9, 11);
  talkthrough.highlightLinesUn("4:30", "5:00", 13, 15);

  //4:57 js

  talkthrough.visibleAt("5:01","20:30", "js");
  talkthrough.highlightLinesUn("5:15", "5:24", 12);
  talkthrough.highlightLinesUn("5:25", "5:58", 15, 56);
  talkthrough.highlightLinesUn("5:59", "6:02", 59, 61);
  talkthrough.highlightLinesUn("6:02", "6:07", 70);
  talkthrough.highlightLinesUn("6:07", "6:26", 103, 138);

  //line by line 6:26
  talkthrough.highlightLinesUn("6:26", "6:39", 12);
  talkthrough.highlightLinesUn("6:39", "7:22", 15);
  talkthrough.highlightLinesUn("7:26", "9:41", 18, 22);
  talkthrough.highlightLinesUn("9:42", "10:33", 23,30);

  talkthrough.highlightLinesUn("10:34", "10:48", 31);
  talkthrough.highlightLinesUn("10:48", "11:10", 32);
  talkthrough.highlightLinesUn("11:11", "11:42", 33);
  talkthrough.highlightLinesUn("11:42", "12:08", 34);
  talkthrough.highlightLinesUn("12:14", "12:32", 36, 51);
  talkthrough.highlightLinesUn("12:32", "14:37", 37, 39);
  talkthrough.highlightLinesUn("14:38", "14:46", 42, 45);
  talkthrough.highlightLinesUn("14:47", "15:28", 48, 51);
  talkthrough.highlightLinesUn("15:32", "15:53", 54);
  talkthrough.highlightLinesUn("15:53", "16:06", 55);

  talkthrough.highlightLinesUn("16:06", "16:28", 59, 61);
  talkthrough.highlightLinesUn("16:29", "16:37", 64);

  talkthrough.highlightLinesUn("16:37", "17:34", 70, 71);
  talkthrough.highlightLinesUn("17:34", "17:40", 87);
  talkthrough.highlightLinesUn("17:40", "17:50", 108, 138);
  talkthrough.highlightLinesUn("17:50", "17:57", 111);
  talkthrough.highlightLinesUn("17:58", "18:15", 113, 121);
  talkthrough.highlightLinesUn("18:16", "19:06", 122, 131);
  talkthrough.highlightLinesUn("19:21", "19:25", 135);
  talkthrough.highlightLinesUn("19:25", "19:40", 137);
  talkthrough.highlightLinesUn("19:41", "20:10", 141, 147)

  //20:30  JS2
  talkthrough.groupActiveAt("20:30", aud.duration(), "js", "js2");
  talkthrough.visibleAt("20:30",aud.duration(), "js2");

  talkthrough.highlightLinesUn("20:50", "21:06", 71,78);
  talkthrough.highlightLinesUn("21:06", "21:10", 69);
  talkthrough.highlightLinesUn("21:11", "21:42", 71,78);

  talkthrough.highlightLinesUn("22:42", "22:50", 124);

  //replace text in line, starttime, linenum, string
  talkthrough.replaceAt("22:50", 124, 'document.querySelector("#screen4").classList.add("blur");');

  //todo: hover or click class with filter css on it?



  // add virtual mouse at the bottom left corner
  // stays there until it is removed when editing happens
  //talkthrough.addMouse();

}
setup();
