/*
 * makeDisplay(automaton,topOfDisplay,leftOfDisplay,cellWidth,borderWidth) 
 *
 * Given an automaton and a position on the page, draw the cells of the
 * mobile automaton's tape and rules.  Graphically show the execution of the
 * rules against the tape using the step method.
 *
 * Warren Sack <wsack@ucsc.edu>
 * February 2009
 *
 */

function makeDisplay(automaton,topOfDisplay,leftOfDisplay,cellWidth,borderWidth) {

  //
  // makeCellDiv(id,left,top,bit,visibility,outlineColor,backgroundColor): side-effects the DOM
  //
  // Make an HTML div with the specified id and positioned 
  // on the page at left and top.  Set the background
  // color of the div to be black if the bit is 1; 
  // otherwise, if the bit is 0, set it to white.
  //

  function makeCellDiv(id,left,top,bit,visibility,outlineColor,backgroundColor) {
    var cellDiv = document.createElement("div");
    cellDiv.id = id;
    cellDiv.style.width = cellWidth;
    cellDiv.style.height = cellWidth;
    cellDiv.style.position = "absolute";
    cellDiv.style.visibility = visibility;      
    cellDiv.style.outlineColor = outlineColor;
    cellDiv.style.outlineStyle = "solid";
    cellDiv.style.outlineWidth = "thin";
    cellDiv.style.left = intToPXString(left);
    cellDiv.style.top = intToPXString(top);
    if ( bit == 1 ) { cellDiv.style.backgroundColor = backgroundColor; }
    else { cellDiv.style.backgroundColor = "white"; }
    document.body.appendChild(cellDiv);
    return(cellDiv);
  }

  //
  // intToPXString(int): string
  //
  function intToPXString(int) { return(int + "px"); }

  //
  // pxStringToInt(pxString): integer
  //
  function pxStringToInt (pxString) { return(pxString.replace(/px/i,"")) / 1; }

  // idNumber: This variable is incremented to make each id name unique.
  var idNumber = 0;

  // 
  // makeID(): string
  //
  // Make a unique id name.
  //
  function makeID() { idNumber++; return('id_' + idNumber); }

  // 
  // makeColumn(array,left,top,visibility,outlineColor,backgroundColor): array
  //
  // Columns are used in the display of the tape and of the rules.
  //
  function makeColumn(array,left,top,visibility,outlineColor,backgroundColor) {
    var divs = [];
    for ( var j = 0; j < 3; j++ ) {
      top += cellWidth + borderWidth;
      divs.push(makeCellDiv(makeID(),left,top,array[j],visibility,outlineColor,backgroundColor));
    }
    return(divs);
  }

  // tapeDisplay is an array of arrays of divs
  var tapeDisplay = [];

  //
  // makeTapeDisplay(): side-effects tapeDisplay
  //
  // Create all of the divs for the tape.  The tapeDisplay is comprised of
  // columns, each three cells wide.
  //
  function makeTapeDisplay() {
    automaton.resetTapeIndex();
    var left = leftOfDisplay;
    var tape = automaton.getTape();
    tapeDisplay = [];
    for ( var i = 0; i < tape.length; i++ ) {
      left += cellWidth + borderWidth;
      var top = topOfDisplay;
      tapeDisplay.push(makeColumn(tape[i],left,top,"visible","black","black"));
    }
  }

  //
  // redrawTape(): side-effects the DOM
  //
  // Update the display of the tape.  Consult the values in the tape[]
  // array.  Use black for each element containing 1, and white for 0.
  //
  function redrawTape() {
    var tape = automaton.getTape();
    for ( var i = 0; i < tapeDisplay.length; i++ ) { 	
      for ( var j = 0; j < 3; j++ ) {
	if ( tape[i][j] == 1 ) { tapeDisplay[i][j].style.backgroundColor = "black"; }
	else { tapeDisplay[i][j].style.backgroundColor = "white"; }
      }
    }
  }

  //
  // makeRuleDisplay(rule,left,top): side-effects the DOM
  //
  // Make the divs for a given rule.  Also, create a "shadow" for the rule divs; i.e.,
  // a copy of the rule display that can be moved to show the rule matching against
  // the tape.
  //
  function makeRuleDisplay(rule,left,top) {
    var ruleDisplay = [];
    ruleDisplay.before = makeColumn(rule.before,left,top,"visible","black","black");
    ruleDisplay.shadow = [];
    ruleDisplay.shadow.before = makeColumn(rule.before,left,top,"hidden","gray","gray");
    top += 5 * ( cellWidth + borderWidth );
    ruleDisplay.after = makeCellDiv(makeID(),left,top,rule.after,"visible","black","black");
    ruleDisplay.shadow.after = makeCellDiv(makeID(),left,top,rule.after,"hidden","gray","gray");
    left -= cellWidth + borderWidth;
    ruleDisplay.leftColumn = makeCellDiv(makeID(),left,top,rule.leftColumn,"visible","black","black");
    ruleDisplay.shadow.leftColumn = makeCellDiv(makeID(),left,top,rule.leftColumn,"hidden","gray","gray");
    return(ruleDisplay);
  }

  //
  // setRuleShadowVisibility(ruleDisplay,visibility): side-effects the DOM
  //
  // Make all of the cells of a rule either "visible" or "hidden"
  //
  function setRuleShadowVisibility(ruleDisplay,visibility) {
    for ( var i = 0; i < 3; i++ ) {
      ruleDisplay.shadow.before[i].style.visibility = visibility;
    }
    ruleDisplay.shadow.after.style.visibility = visibility;
    ruleDisplay.shadow.leftColumn.style.visibility = visibility;
  }    

  //
  // moveRuleShadow(ruleDisplay,left,top): side-effects the DOM
  //
  // Move all of the cells of a rule shadow together so that
  // the top cell of the before portion of the rule shadow has
  // the given top and left coordinates.
  //
  function moveRuleShadow(ruleDisplay,left,top) {
    for ( var i = 0; i < 3; i++ ) {
      ruleDisplay.shadow.before[i].style.left = intToPXString(left);
      ruleDisplay.shadow.before[i].style.top = intToPXString(top);
      top += cellWidth + borderWidth;
    }
    ruleDisplay.shadow.after.style.left = intToPXString(left);
    left -= cellWidth + borderWidth;
    ruleDisplay.shadow.leftColumn.style.left = intToPXString(left);
    top += 2 * ( cellWidth + borderWidth );
    ruleDisplay.shadow.after.style.top = intToPXString(top);
    ruleDisplay.shadow.leftColumn.style.top = intToPXString(top);
  }

  //
  // animateRuleShadow(ruleDisplay,left,top,delay,increment,finalP): side-effects the DOM
  //
  // Move a rule shadow from the place of the rule to the current
  // column of the tape.  Once the before portion of the rule shadow has
  // covered the column of the tape (to show how it matches), move the
  // shadow up so that the leftColumn and after portions of the rule
  // line up with the last row of the tape.
  //
  function animateRuleShadow(ruleDisplay,left,top,delay,increment,finalP) {
    var nextStep;
    // Find the current coordinates of the rule shadow.
    var ruleShadowLeft = pxStringToInt(ruleDisplay.shadow.before[0].style.left);
    var ruleShadowTop = pxStringToInt(ruleDisplay.shadow.before[0].style.top);
    var deltaH; 
    // Determine if the rule shadow should move to the left
    // or right.
    if ( ruleShadowLeft < left ) { deltaH = increment; }
    else { deltaH = 0 - increment; }
    var distanceToLeft = Math.abs(ruleShadowLeft-left);
    // If the rule shadow has almost reached the target horizontal position,
    // assign it the exact target horizontal position.
    if ( distanceToLeft < increment ) {
      moveRuleShadow(ruleDisplay,left,ruleShadowTop);
    }
    // Otherwise, move the shadow either to the right or to the left.
    if ( distanceToLeft > increment ) {
      moveRuleShadow(ruleDisplay,ruleShadowLeft+deltaH,ruleShadowTop);
    }
    // Find the current left coordinate of the rule shadow.
    ruleShadowLeft = pxStringToInt(ruleDisplay.shadow.before[0].style.left);
    var deltaV;
    // Determine if the rule shadow should move up or down.
    if ( ruleShadowTop < top ) { deltaV = increment; }
    else { deltaV = 0 - increment; }
    var distanceToTop = Math.abs(ruleShadowTop-top);
    // If the rule shadow has almost reached the target vertical position,
    // assign it the exact target vertical position.
    if ( distanceToTop < increment ) { 
      moveRuleShadow(ruleDisplay,ruleShadowLeft,top);
    }
    // Otherwise, move the shadow either up or down.
    if ( distanceToTop > increment ) { 
      moveRuleShadow(ruleDisplay,ruleShadowLeft,ruleShadowTop+deltaV);
    }
    // If the rule shadow is at the correct horizontal and vertical
    // coordinates, then...
    if ( ( distanceToLeft <= increment ) 
	 && ( distanceToTop <= increment ) ) {
      // Check to see if the top coordinate is the final one.
      // If so, hide the shadow and redraw the tape.
      if ( finalP ) {
	setRuleShadowVisibility(ruleDisplay,"hidden");
	redrawTape();
      }
      // If not, set the final top coordinate slightly above the
      // top of the tape (so that the after and leftColumn parts of
      // the rule shadow can line up with the last row of the tape),
      // and continue the (vertical) movement of the shadow.
      else {
	top -= 2 * ( cellWidth + borderWidth );
	nextStep = function () { animateRuleShadow(ruleDisplay,left,top,delay,increment,true); };
	setTimeout(nextStep,delay);
      }
    }
    // If the rule shadow is not at the correct horizontal and vertical
    // coordinates, then keep it moving (possibily vertically and horizontally).
    else { 
      nextStep = function () { animateRuleShadow(ruleDisplay,left,top,delay,increment,finalP); };
      setTimeout(nextStep,delay);
    }
  }

  //
  // animateRuleMatch(delay): side-effects the DOM
  //
  // Record the current posiion of the rule and the distance from
  // the rule to the current column of the tape.  Divide the total
  // distance by the alloted time (i.e., by the delay) to determine
  // how many pixels the shadow needs to be moved per the smallest
  // increment of time.  Inverse the division to determine the smallest
  // increment of time (incrementalDelay).  Make the rule shadow visible,
  // move it to the current tape column, hide it again, and move it back
  // to its original position.
  //
  function animateRuleMatch(delay) {
    var ruleIndex = automaton.getRuleIndex();
    var ruleDisplay = rulesDisplay[ruleIndex];
    var ruleTop = pxStringToInt(ruleDisplay.before[0].style.top);
    var ruleLeft = pxStringToInt(ruleDisplay.before[0].style.left);
    var tapeIndex = automaton.getTapeIndex();
    var tapeColumn = tapeDisplay[tapeIndex + 1];
    var tapeTop = pxStringToInt(tapeColumn[0].style.top);
    var tapeLeft = pxStringToInt(tapeColumn[0].style.left);
    var targetTop = tapeTop - ( 2 * ( cellWidth + borderWidth ) );
    var totalManhattanDistance = Math.abs(ruleTop - targetTop) + Math.abs(ruleLeft - tapeLeft);
    if ( totalManhattanDistance < 1 ) { totalManhattanDistance = 1; }
    var increment = Math.floor( totalManhattanDistance / delay );
    if ( increment < 1 ) { increment = 1; }
    var incrementalDelay = Math.floor( delay / ( 2 * totalManhattanDistance ) );
    if ( incrementalDelay < 1 ) { incrementalDelay = 1; }
    setRuleShadowVisibility(ruleDisplay,"visible");
    animateRuleShadow(ruleDisplay,tapeLeft,tapeTop,incrementalDelay,increment,false);
    moveRuleShadow(ruleDisplay,ruleLeft,ruleTop);
  }

  // rulesDisplay: This holds a set of divs for each rule.  The set is structured
  // into three parts: before, after, and leftColumn.
  var rulesDisplay = [];
  
  //
  // makeRulesDisplay(): side-effects the DOM
  //
  // Create the divs for the rules and then display them on the 
  // page.  Each rule contains three cells for its "before" field,
  // one cell for its "after" field, and one for its "leftColumn" field.
  //
  function makeRulesDisplay() {
    var left = leftOfDisplay + ( 2 * ( cellWidth + borderWidth) );
    var top = topOfDisplay + ( 6 * ( cellWidth + borderWidth ) );
    var rules = automaton.getRules();
    rulesDisplay = [];
    for ( var i = 0; i < rules.length; i++ ) {
      rulesDisplay.push(makeRuleDisplay(rules[i],left,top));
      left += 3 * ( cellWidth + borderWidth);
    }
  }

  //
  // singleStep(): side-effects the DOM
  //
  // Show the matching of a rule to the current column of the
  // and show the rewriting of the tape according to the rule.
  //
  function singleStep(delay) {
    if ( automaton.getTapeIndex() >= 0 ) {    
      automaton.findAndApplyRule();
      animateRuleMatch(Math.round(delay/3.0),1);
    }
    // Once the tape has been traversed, stop the animation.
    else { clearInterval(stepIntervalID); }
  }

  // stepIntervalID: The interval ID for the matching and rewriting animation.
  var stepIntervalID;

  //
  // step(delay): side-effects the DOM
  //
  // Step through the matching and the rewriting of the tape
  // from the right most column to the left most column.
  //
  function step(delay) {
    var nextStep = function () { singleStep(delay); };
    stepIntervalID = setInterval(nextStep,delay);
  }

  // Create the display for the tape and the rules.
  makeTapeDisplay();
  makeRulesDisplay();

  // Return the methods for displaying an automaton.
  return({redrawTape : redrawTape,
	  step : step});

} 













