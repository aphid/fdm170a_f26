var tt = talkthrough;
tt.savename = "170a_structures";

//files that can be included in the stack -- before and after are defined here.  mirrors are editor contents and files need to be in includes/{filename}.  Note: code will add '.txt' to filename request.

//out of date" this example will load in the order of 'includes/b4.txt', the content of mirror tab titled "Canvas", 'includes/aft.txt';

//files that should be included in the zip, include individually, relative paths
//directories will be automatically created
//examples: images, media, includes that aren't part of the above stack.

//initiate probably tie these to a parent object at these point
var audpop;
//this loads the files found in the template stack  

var templateStack = ["mirror:html"];

var setup = async function () {
  var result = await talkthrough.loadResources();

  //initiate the mirrors with some options. make some of these default!

  //this will load "includes/canvas.js" into Canvas
  var body = await tt.makeMirror("html", "planner.html", { mode: "htmlmixed" });
  //var bodyb = await tt.makeMirror("html_b", "planner_b.html", { mode: "htmlmixed" });
  //talkthrough.cmGroup("html", ["html", "html_b"], { saveAs: "planner.html" });


  //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
  var planner = await tt.makeMirror("planner.js", "planner.js", { mode: "javascript", saveAs: "planner.js" });
  var bondOp = await tt.makeMirror("bondOp", "bond_operators.js", { mode: "javascript", saveAs: "operation.js" });
  var soapOp = await tt.makeMirror("soapOp", "soap_operators.js", { mode: "javascript", saveAs: "operation.js" });
  var newOp = await tt.makeMirror("newOp", "new_operators.js", { mode: "javascript", saveAs: "operation.js" });

  talkthrough.cmGroup("operators", ["bondOp", "soapOp", "newOp"], { saveAs: "operation.js" });

  //var js = await tt.makeMirror("js", "script.js");

  /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
  this uses the same format as templateStack, taking strings, mirrors, and files */
  body.addFilter({ line: 7, filters: ["<script>", "mirror:planner.js", "<\/script>"] });
  body.addFilter({ line: 8, filters: ["<script>", "group:operators", "<\/script>"] });

  //bodyb.addFilter({ line: 8, filters: ["<script>", "group:js", "<\/script>"] });


  talkthrough.makeSaveButton();

  window.setTimeout(function () {
    //make 'Arithmetic' visible
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




  //0:00 intro
  talkthrough.visibleAt("0:00","1:48", "html");
  talkthrough.groupActiveAt("0:00","3:55.4", "operators", "soapOp");

  //0:29 html
  talkthrough.highlightLinesUn(29, 44, 6);
  talkthrough.highlightLinesUn(45, 48, 7, 8);

  talkthrough.highlightLinesUn(48, "1:47", 9, 25);

  //1:48 planner
  talkthrough.visibleAt("1:48","3:04", "planner.js");
  talkthrough.highlightLinesUn("1:49", "2:24", 268, 280);

  talkthrough.highlightLinesUn("2:25", "2:27", 144);
  talkthrough.highlightLinesUn("2:28", "2:30", 146);
  talkthrough.highlightLinesUn("2:31", "2:33", 156);


  //3:04 bondOp
  talkthrough.visibleAt("3:04","3:32", "bondOp");
  talkthrough.highlightLinesUn("3:08", "3:14", 16,26);

  talkthrough.highlightLinesUn("3:14", "3:32", 28,89);


  //3:32 bondOp
  talkthrough.visibleAt("3:32","3:50", "soapOp");
  talkthrough.highlightLinesUn("3:37", "3:48", 29,123);


  //3:50 html again
  talkthrough.visibleAt("3:50",aud.duration(), "html");

  talkthrough.replaceAt("3:55", 11, '        plan([ "peyton-is-together-with-parker" ], // goal');
  talkthrough.replaceAt("3:55.2", 24, '        "hayden-needs-money"]);');
  talkthrough.replaceAt("3:55.3", 10, '        //plan(["I"], []);');
  talkthrough.groupActiveAt("3:55.4",aud.duration(), "operators", "soapOp");


}









setup();