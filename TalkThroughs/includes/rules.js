/*
  getRuleSet(ruleSetID)

  Rule sets for use in the definition of an automaton.
  The "before" field of a rule is compared with the current
  column of the tape.  If it matches, then the last row of
  the column is rewritten with the value of the "after" field.
  Then, the last row of the column on the tape immediately to 
  the left of the current column is rewritten with value of
  the "leftColumn" field.

  Warren Sack <wsack@ucsc.edu>
  February 2009
  
*/
   


function getRuleSet(ruleSetID) {
  // rulesForAddition: definition of binary addition
  var rulesForAddition = [ 
  			   { before: [1,1,1], after: 1, leftColumn: 1 },
			   { before: [1,1,0], after: 0, leftColumn: 1 },
			   { before: [1,0,1], after: 0, leftColumn: 1 },
			   { before: [1,0,0], after: 1, leftColumn: 0 },
			   { before: [0,1,1], after: 0, leftColumn: 1 },
			   { before: [0,1,0], after: 1, leftColumn: 0 },
			   { before: [0,0,1], after: 1, leftColumn: 0 },
			   { before: [0,0,0], after: 0, leftColumn: 0 } ];
  if ( ruleSetID === 'rulesForAddition' ) { return(rulesForAddition); }
  // rulesForSubtraction: definition of binary subtraction iff the
  // first number is greater than the second number.  The rules fail 
  // if the first number is smaller than the second (i.e., when the 
  // result should be a negative number).
  var rulesForSubtraction = [ 
  				  { before: [1,1,1], after: 1, leftColumn: 1 },
			      { before: [1,1,0], after: 0, leftColumn: 0 },
			      { before: [1,0,1], after: 0, leftColumn: 0 },
			      { before: [1,0,0], after: 1, leftColumn: 0 },
			      { before: [0,1,1], after: 0, leftColumn: 1 },
			      { before: [0,1,0], after: 1, leftColumn: 1 },
			      { before: [0,0,1], after: 0, leftColumn: 1 },
			      { before: [0,0,0], after: 0, leftColumn: 0 } ];
  if ( ruleSetID === 'rulesForSubtraction' ) { return(rulesForSubtraction); }
}
