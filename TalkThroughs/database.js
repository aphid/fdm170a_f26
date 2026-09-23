var tt = talkthrough;
tt.savename = "170a_database_cinema";



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
  var body = await tt.makeMirror("html", "dbcinema.html", { mode: "htmlmixed" });
  //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
  var CSS = await tt.makeMirror("css", "dbcinema.css", { saveAs: "database.css", mode: "css" });
  var js = await tt.makeMirror("planner", "dc_planner.js", { saveAs: "dc_planner.js", mode: "javascript" });
  var js = await tt.makeMirror("montage", "dc_montage.js", { saveAs: "dc_montage.js", mode: "javascript" });

  //var js = await tt.makeMirror("js", "script.js");

  /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
  this uses the same format as templateStack, taking strings, mirrors, and files */
  body.addFilter({ line: 6, filters: ["<style>", "mirror:css", "</style>"] });
  body.addFilter({ line: 12, filters: ["<script>", "mirror:planner", "<\/script>"] });
  body.addFilter({ line: 13, filters: ["<script>", "mirror:montage", "<\/script>"] });



  talkthrough.makeSaveButton();

  window.setTimeout(function () {
    //make 'Arithmetic' visible
    tt.visible('html');
    //render the stack
    tt.updatePreview();
  }, 500);

  audPop = document.getElementById("audioclip")

  // add virtual mouse at the bottom left corner
  // stays there until it is removed when editing happens
  //talkthrough.addMouse();

  //initiate popcorn object
  var aud = Popcorn("audio");
  talkthrough.aud = aud;


  talkthrough.visibleAt("0:00", 52, "html");
  talkthrough.highlightLinesUn(35, 42, 1, 7);
  talkthrough.highlightLinesUn(40, 42, 10);
  talkthrough.highlightLinesUn(43, 46, 11);
  talkthrough.highlightLinesUn(47, 50, 12, 13);

  talkthrough.visibleAt("0:52", "1:17", "css");
  talkthrough.highlightLinesUn(51, 57, 1, 5);
  talkthrough.highlightLinesUn(58, "1:06", 7, 14);
  talkthrough.highlightLinesUn("1:08", "1:13", 16, 27);
  talkthrough.visibleAt("1:17", "1:49", "planner");
  talkthrough.highlightLinesUn("1:26", "1:47", 54, 115);

  talkthrough.visibleAt("1:49", aud.duration(), "montage");
  talkthrough.highlightLinesUn("1:52", "1:57", 1, 2);
  talkthrough.highlightLinesUn("1:58", "2:30", 4, 89);

  talkthrough.highlightLinesUn("2:30", "2:33", 96, 105);
  talkthrough.highlightLinesUn("2:35", "2:44", 98);
  talkthrough.highlightLinesUn("3:02", "3:04", 119);
  talkthrough.highlightLinesUn("3:04", "3:06", 149);
  talkthrough.highlightLinesUn("3:07", "3:12", 165);
  talkthrough.highlightLinesUn("3:13", "3:21", 176);


}
setup();