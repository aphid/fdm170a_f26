var ruleSet = getRuleSet('rulesForAddition');
var automaton = makeAutomaton(ruleSet);
automaton.makeTape(6,3); // These two numbers are the input parameters.
var display = makeDisplay(automaton,30,0,20,4);
display.step(6000); // Decrease this number to speed up the display.

