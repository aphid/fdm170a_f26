var tt = talkthrough;
talkthrough.savename = "170a_resequencing";
//files that can be included in the stack -- before and after are defined here.  mirrors are editor contents and files need to be in includes/{filename}.  Note: code will add '.txt' to filename request.

//this example will load in the order of 'includes/b4.txt', the content of mirror tab titled "Canvas", 'includes/aft.txt';
var templateStack = ["mirror:html"];


//initiate probably tie these to a parent object at these point
var audpop;
//this loads the files found in the template stack  
var setup = async function () {
  var result = await talkthrough.loadResources();
  console.log(result);


  //initiate the mirrors with some options. make some of these default!

  //this will load "includes/canvas.js" into Canvas
  var body = await tt.makeMirror("html", "tables_body.html", { mode: "htmlmixed" });
  //saveAs will save the mirror to an external file with the path designated, creating folders as needed.      
  var CSS = await tt.makeMirror("css", "tables_style.css", { saveAs: "resequencing.css", mode: "css" });

  var js = await tt.makeMirror("js", "resequencing.js", {saveAs: "resequencing.js"});

  //files that should be included in the zip, include individually, relative paths
  //directories will be automatically created
  //examples: images, media, includes that aren't part of the above stack.
  tt.saveFiles(["img/cyano_horse1.png", "img/cyano_horse2.png"]);

  /* this will replace a line in a mirror (in this case, the link tag in the body) with the contents of the array
  this uses the same format as templateStack, taking strings, mirrors, and files */
  body.addFilter({ line: 6, filters: ["<style>", "mirror:css", "</style>"] });
  body.addFilter({ line: 28, filters: ["<script>", "mirror:js", "</script>"] });

  talkthrough.makeSaveButton();

  //this is a workaround for a strange bug that doubles content in the iframe
  //maybe this should fire if there's an event for when the mirror is fully loaded and filled?

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
  var chapters = document.querySelectorAll('.chapter');
  for (var i = 0; i < chapters.length; i++) {
    chapters[i].addEventListener('click', function (event) {
      aud.play(Popcorn.util.toSeconds(event.target.dataset.start));
    });
  }
  talkthrough.visibleAt(0,"3:05", "html");


  talkthrough.glowAt(33, ".outer");
  talkthrough.glowAt(37, "#preview");
  talkthrough.glowAt(46, "#index", "green", 4000);
  talkthrough.glowAt(59, "#but_save", "green", 4000);
  talkthrough.glowAt("1:15", "#checkbox", "green", 4000);
  talkthrough.glowAt("1:20", "#but_save", "green", 15000);

  //fold head & bod
  talkthrough.foldAt("2:27", 4).foldAt("2:27", 9);

  talkthrough.highlightLinesUn("2:32", "2:35", 1);
  talkthrough.highlightLinesUn("2:37", "2:40", 2);


  //unfold head
  talkthrough.foldAt("2:41", 4);

  talkthrough.highlightLinesUn("2:41", "2:43", 4);
  talkthrough.highlightLinesUn("2:43", "2:51", 5);
  talkthrough.highlightLinesUn("2:52", "2:57", 6);

  talkthrough.visibleAt("3:05","3:15", "css");
  talkthrough.visibleAt("3:15","3:28", "js");
  talkthrough.visibleAt("3:28","7:25", "html");
  talkthrough.unfoldAll("3:28");

  talkthrough.foldAt("3:33", 4);
  talkthrough.highlightLinesUn("3:33", "3:36", 9);


  talkthrough.highlightLinesUn("3:42", "4:06", 10);
  //scrollTo 12
  talkthrough.highlightLinesUn("4:06", "4:17", 12);
  //tds
  talkthrough.highlightLinesUn("4:17", "4:19", 14, 16);
  talkthrough.highlightLinesUn("4:19", "4:21", 18, 20);
  talkthrough.highlightLinesUn("4:21", "4:23", 22, 24);
  talkthrough.highlightLinesUn("4:23", "4:33", 14, 24);

  //img
  talkthrough.highlightLinesUn("4:46", "5:23", 15);
  talkthrough.glowAt("5:23", "#but_save", "green", 7000);


  //line by line
  talkthrough.highlightLinesUn("5:45", "5:47", 10);
  talkthrough.highlightLinesUn("5:47", "5:49", 12);
  talkthrough.highlightLinesUn("5:49", "5:53", 14, 24);

  talkthrough.highlightLinesUn("5:55", "5:56", 15);
  talkthrough.highlightLinesUn("5:56", "5:58", 19);
  talkthrough.highlightLinesUn("5:58", "6:00", 23);
  talkthrough.highlightLinesUn("6:00", "6:02", 25);

  //talkthrough.visibleAt()

  let nextRow = `    <tr>
  <td>
    <img src="img/cyano_horse1.png">
  </td>

  <td></td>

  <td>
    <img src="img/cyano_horse1.png">
  </td>
</tr>`;
  //scrollto
  rowNext = false;
  rowLast = false;
  if (!rowNext) {
    talkthrough.insertAt("6:09", 25, nextRow);
    rowNext = true;
  }

  talkthrough.highlightLinesUn("6:09", "6:14", 27, 37);


  let lastRow = `    <tr>
  <td colspan="2">
    <img class="wide" src="img/cyano_horse1.png">
  </td>

  <td class="square"></td>
</tr>`;

  if (!rowLast) {
    talkthrough.insertAt("6:20", 37, lastRow);
    rowLast = true;
  }
  talkthrough.highlightLinesUn("6:20", "6:26", 39, 45);
  talkthrough.highlightLinesUn("6:26", "6:35", 40);
  talkthrough.highlightLinesUn("6:35", "6:42", 41);
  talkthrough.highlightLinesUn("6:42", "6:46", 44);
  talkthrough.highlightLinesUn("6:49", "7:11", 41);

  talkthrough.highlightLinesUn("7:16", "7:23", 44);

  //switch to css tab
  talkthrough.visibleAt("7:25",aud.duration(), "css");
  talkthrough.highlightLinesUn("7:36", "7:43", 1, 3);
  talkthrough.highlightLinesUn("7:43", "7:50", 2);

  //color shifts
  talkthrough.replaceAt("7:50", 2, "  background: blue;");
  talkthrough.highlightLinesUn("7:50", "7:52", 2);

  talkthrough.replaceAt("7:52", 2, "  background: papayaWhip;");
  talkthrough.highlightLinesUn("7:52", "7:55", 2);

  talkthrough.replaceAt("7:55", 2, "  background: black;");

  //tr td styling
  talkthrough.highlightLinesUn("7:59", "8:02", 5, 7);
  talkthrough.highlightLinesUn("8:02", "8:04", 5, 11);
  talkthrough.highlightLinesUn("8:05", "8:24", 6);
  talkthrough.highlightLinesUn("8:27", "8:57", 10);

  //vw
  talkthrough.highlightLinesUn("8:59", "9:23", 14);

  talkthrough.highlightLinesUn("9:23", "9:27", 17, 19);
  talkthrough.highlightLinesUn("9:27", "10:02", 18);

  talkthrough.highlightLinesUn("10:02", "10:02", 21, 24);
  talkthrough.highlightLinesUn("10:04", "10:30", 22);
  talkthrough.highlightLinesUn("10:30", "10:56", 23);

}

setup();
