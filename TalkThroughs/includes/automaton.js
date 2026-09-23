/*
 * makeAutomaton(rules) 
 *
 * Given a set of rules, create a mobile automaton.  Initialize the
 * tape using makeTape.  Apply the rules to the tape using execute.
 * Try out a new set of rules using the test method.
 *
 * Warren Sack <wsack@ucsc.edu>
 * February 2009
 *
 */
function makeAutomaton(rules) {

  ////
  //// State
  ////
  
  // The tape is an array of arrays.  Each sub-array is a "column."
  // Each column represents a column of an arithmetic problem.
  // The third row -- i.e., the combination of the third element
  // of each column -- represents the result of combining the 
  // two rows above it.  The third row is initialized to a
  // series of zeroes.  Each row represents a binary number.
  // For example, here is the state of the tape for 1 + 5
  // (i.e., in binary 1 + 101): [[0,1,0],[0,0,0],[1,1,0]]
  // Use the makeTape(input1,input2) to create a new tape;
  // e.g., makeTape(1,5) returns the tape shown above.
  var tape = [];

  // The tapeIndex records the current column of the tape.  It
  // moves from right to left on the tape over the course of the
  // calculation.
  var tapeIndex = tape.length - 1;
  
  // The ruleIndex records the index of the rule that matches the
  // current column of the tape (or -1 if no such rule has been found).
  var ruleIndex = -1;

  ////
  //// Utilities
  ////

  //
  // decimalToBinary(n): string
  //
  function decimalToBinary(n) {
    var binaryString = '';
    if ( n === 0 ) { return('0'); }
    while ( n > 0 ) {
      binaryString = ( n % 2 ) + binaryString;
      n = n >> 1;
    }
    return(binaryString);
  }

  //
  // binaryToDecimal(binaryString): integer
  //
  function binaryToDecimal(binaryString) {
    if ( binaryString.length === 1 ) { return(parseInt(binaryString)); }
    else { 
      var current = parseInt(binaryString[0]);
      binaryString = binaryString.substr(1,binaryString.length-1);
      current = current * Math.pow(2,binaryString.length);
      return(current + binaryToDecimal(binaryString));
    }
  }

  //
  // padString(s,char,n): string
  //
  // Prefix the string s with n copies of character char.
  //
  function padString(s,char,n) {
    if ( n <= 0 ) { return(s); }
    else { return(padString(char + s,char,n-1)); }
  }
    
  //// 
  //// Evaluation
  ////

  //
  // makeTape(input1,input2): side-effects tape
  //
  // Given two base-10 integers, convert them into binary and
  // initialize the tape with their binary representations.
  //
  function makeTape(input1,input2) { 
    var binary1 = decimalToBinary(input1);
    var binary2 = decimalToBinary(input2);
    // Make binary1 and binary2 of equal length.
    if ( binary1.length > binary2.length ) { 
      binary2 = padString(binary2,'0',binary1.length - binary2.length);
    }
    else {
      binary1 = padString(binary1,'0',binary2.length - binary1.length);
    }
    // Prepend a column of zeroes to the front of the tape.
    tape = []; tape[0] = []; tape[0][0] = 0; tape[0][1] = 0; tape[0][2] = 0;
    for ( var j = 1; j <= binary1.length; j++ ) {
      tape[j] = []; 
      tape[j][0] = binary1[j-1]; 
      tape[j][1] = binary2[j-1];
      tape[j][2] = 0;
    }
  }
  
  //
  // setRuleIndex(tapeColumn): side-effects ruleIndex
  //
  // Set ruleIndex to the array index of the matching rule.
  //
  function setRuleIndex(tapeColumn) {
    var result = -1;
    for ( var i = rules.length-1; i >= 0; i-- ) {
      result = i;
      for ( var j = 0; j < 3; j++ ) {
	if ( rules[i].before[j] != tapeColumn[j] ) { result = -1; }
      }
      if ( result != -1 ) { break; }
    }
    ruleIndex = result;
  }
  
  //
  // applyRule(): side-effects tape
  //
  // Rewrite the last row of the current column and the last row of
  // column immediately to the left of the current column of the tape.
  //
  function applyRule() {
    tape[tapeIndex][2] = rules[ruleIndex].after; 
    if ( tapeIndex > 0 ) { 
      tape[tapeIndex-1][2] = rules[ruleIndex].leftColumn; 
    }
  }
  
  //
  // findAndApplyRule(): side-effects tape, ruleIndex, and tapeIndex
  //
  // Find the rule that matches the current column of the tape, 
  // apply the matching rule, and then move the current column 
  // of the tape one position to the left.
  //
  function findAndApplyRule() {
    if ( tapeIndex >= 0 ) {
      setRuleIndex(tape[tapeIndex]);
      if ( ruleIndex != -1 ) { applyRule(); }
      tapeIndex--;
    }
  }

  //
  // execute(): side-effects tape
  //
  // Repeatedly apply the rules to the tape to execute the
  // automaton defined by the rules.
  //
  function execute () {
    tapeIndex = tape.length - 1;
    while ( tapeIndex >= 0 ) { findAndApplyRule(); }
  }

  ////
  //// Accessors
  ////

  //
  // getTape(): tape
  //
  function getTape() { return(tape); }
  
  //
  // getTapeIndex(): tapeIndex
  //
  function getTapeIndex() { return(tapeIndex); }

  //
  // resetTapeIndex()
  //
  function resetTapeIndex() { tapeIndex = tape.length - 1; }
  
  //
  // getRules()
  //
  function getRules() { return(rules); }

  //
  // getRuleIndex()
  //
  function getRuleIndex() { return(ruleIndex); }

  return { 
    binaryToDecimal : binaryToDecimal,
    findAndApplyRule : findAndApplyRule,
    makeTape : makeTape,
    execute : execute,
    getTape : getTape,
    getTapeIndex : getTapeIndex,
    resetTapeIndex : resetTapeIndex,
    getRules : getRules,
    getRuleIndex : getRuleIndex
  };

}



      
    
    

  


