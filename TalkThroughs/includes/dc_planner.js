/*
 
 PLANNER.JS
 
 Warren Sack <wsack@ucsc.edu>
 July 2020
 
 This is a GPS-style planner where goals and assertions 
 are atomic propositions (without variables). For more 
 details, see
 
 Newell, Alan, Simon, Herbert. 1972. 
    Human Problem Solving. New York: Prentice-Hall.
 
 Given an array of predefined operators, an array of goals, 
 and an array of assertions about the current state, the main 
 function, plan(goals,currentState), returns a list of operators 
 for achieving all of the goals, or it reports that it was unable 
 to find a plan to achieve the goals.
 
 Example usage:
 
 plan(["I"], // goals
      []);   // currentState
 
 returns the following plan of ordered steps, each a named operator
 
 [  "M moves and gives a task to Bond."
    "Villain moves and appears to Bond."
    "Villain gives first check to Bond."
    "Woman moves and shows herself to Bond."
    "Bond takes Woman."
    "Villain captures Bond."
    "Villain tortures Bond."
    "Bond beats Villain."
    "Bond, convalescing, enjoys Woman, whom he then loses." ]
 
 when the James Bond operators have been predefined (see below).
 
 These operators are inspired by 
    
 Umbert Eco. 1979. "Narrative Structures in Fleming." In The Role 
    of the Reader: Explorations in the Semiotics of Texts.
    Bloomington, IN: Indiana University Press.

Calling the function plan a second time with the same inputs 
will produce an series of operators.

The variable OPERATIONS_USED stores the names of previously 
used operators.
        
*/

var OPERATORS = [
    {
        "name": "M moves and gives a task to Bond.",
        "preconditions": [],
        "additions": ["A"],
        "deletions": []
    },
    {
        "name": "Villain moves and appears to Bond.",
        "preconditions": ["A"],
        "additions": ["B"],
        "deletions": ["A"]
    },
    {
        "name": "Bond moves and gives a first check to Villain",
        "preconditions": ["B"],
        "additions": ["C"],
        "deletions": ["B"]
    },
    {
        "name": "Villain gives first check to Bond.",
        "preconditions": ["B"],
        "additions": ["C"],
        "deletions": ["B"]
    },
    {
        "name": "Woman moves and shows herself to Bond.",
        "preconditions": ["C"],
        "additions": ["D"],
        "deletions": ["C"]
    },
    {
        "name": "Bond takes Woman.",
        "preconditions": ["D"],
        "additions": ["E"],
        "deletions": ["D"]
    },
    {
        "name": "Villain captures Bond.",
        "preconditions": ["E"],
        "additions": ["F"],
        "deletions": ["E"]
    },
    {
        "name": "Villain tortures Bond.",
        "preconditions": ["F"],
        "additions": ["G"],
        "deletions": ["F"]
    },
    {
        "name": "Bond beats Villain.",
        "preconditions": ["G"],
        "additions": ["H"],
        "deletions": ["G"]
    },
    {
        "name": "Bond, convalescing, enjoys Woman, whom he then loses.",
        "preconditions": ["H"],
        "additions": ["I"],
        "deletions": ["H"]
    }
];


//
// OPERATORS_USED: array of strings
//
// Keep track of the names of operators used in previous plans.
// Avoid using the same operators later, if possible.
//
var OPERATORS_USED = [];

//
// removeElement(string,array): array
//
// Returns a copy of the input array with 
// the element e removed.
//
function removeElement(e, a) {
    var result = [];
    for (var i = 0; i < a.length; i++) {
        if (a[i] != e) { result.push(a[i]); }
    }
    return (result);
}

//
// isMember(string,array): boolean
//
// Returns true if the element e is in the 
// input array, a.
//
function isMember(e, a) {
    for (var i = 0; i < a.length; i++) {
        if (e == a[i]) { return (true); }
    }
    return (false);
}

//
// plan(array,array): [boolean,array,array]
//
// Given a currentState and a list of goals, and 
// assuming a predefined list of OPERATORS, returns 
// true, the end state, and a plan if the goals can 
// be achieved; returns false, the currentState, and
// an invalid plan otherwise.
//
function plan(goals, currentState) {
    var nextState = [...currentState];
    currentPlan = [];
    var success = true;
    var i;
    console.log("beginning");
    for (i = 0; i < currentState.length; i++) {
        console.log("   " + currentState[i]);
    }
    for (i = 0; i < goals.length; i++) {
        [success, nextState, currentPlan] = achieveGoal(goals[i],
            nextState,
            currentPlan);
        if (!success) { console.log("unable to achieve goal " + goals[i]); }
    }
    if (!success) { console.log("plan not found"); }
    else {
        console.log("ending");
        for (i = 0; i < nextState.length; i++) {
            console.log("   " + nextState[i]);
        }
    }
    return ([success, nextState, currentPlan]);
}

//
// achieveGoal(string,array,array): [boolean,array,array]
//
// If goal is in the currentState, returns immediately;
// otherwise, operators that could achieve the goal are selected
// and each selected is attempted.
// 
// Returns an updated state and plan if an attempt succeeds;
// returns the current state and plan if all fail.
//
function achieveGoal(goal, currentState, currentPlan) {
    var nextState = [...currentState];
    var nextPlan = [...currentPlan];
    if (isMember(goal, nextState)) {
        return ([true, currentState, currentPlan]);
    }
    else {
        var selections = selectOperators(goal);
        var success = false;
        for (var i = 0; i < selections.length; i++) {
            if (!success) {
                [success, nextState, nextPlan] = applyOperator(selections[i],
                    nextState,
                    nextPlan);
            }
        }
        if (success) { return ([true, nextState, nextPlan]); }
        else { return ([false, currentState, currentPlan]); }
    }
}

//
// selectOperators(string): array
//
// Finds all operators containing the goal in the additions list.
//
function selectOperators(goal) {
    var selections = [];
    var usedSelections = [];
    var unusedSelections = [];
    var i;
    for (i = 0; i < OPERATORS.length; i++) {
        if (isMember(goal, OPERATORS[i].additions)) {
            selections.push(OPERATORS[i]);
        }
    }
    // Any operators that have been used before are
    // moved to the end of the list.
    for (i = 0; i < selections.length; i++) {
        if (isMember(selections[i].name, OPERATORS_USED)) {
            usedSelections.push(selections[i]);
        }
        else { unusedSelections.push(selections[i]); }
    }
    selections = unusedSelections.concat(usedSelections);
    return (selections);
}

//
// applyOperator(object,array,array): [boolean,array,array]
//
// Returns an updated state and plan if application succeeds:
// [true,state,plan]
// returns the current state and plan, if it fails:
// [false,state,plan]
//
function applyOperator(operator, currentState, currentPlan) {
    var nextState = [...currentState];
    var nextPlan = [...currentPlan];
    var success = true;
    var i;
    // Attempt to achieve each of the preconditions.
    for (i = 0; i < operator.preconditions.length; i++) {
        if (success) {
            [success, nextState, nextPlan] = achieveGoal(operator.preconditions[i],
                nextState,
                nextPlan);
        }
    }
    // If the preconditions are solved, execute the operator by
    // deleting its deletions and adding its additions to the state.
    if (success) {
        console.log(operator.name);
        nextPlan.push(operator.name);
        if (operator.deletions.length > 0) {
            console.log("   deleting ");
        }
        for (i = 0; i < operator.deletions.length; i++) {
            console.log("       " + operator.deletions[i]);
            nextState = removeElement(operator.deletions[i], nextState);
        }
        if (operator.additions.length > 0) {
            console.log("   adding ");
        }
        for (i = 0; i < operator.additions.length; i++) {
            console.log("       " + operator.additions[i]);
            nextState.push(operator.additions[i]);
        }
        OPERATORS_USED.push(operator.name);
        return ([true, nextState, nextPlan]);
    }
    else { return ([false, currentState, currentPlan]); }
}