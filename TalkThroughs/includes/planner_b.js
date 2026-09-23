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
 
 plan(["son-at-school"],    // goal(s)                              
      ["son-at-home",       // currentState
       "car-needs-battery",
       "have-money",
       "have-phone-book",
       "have-wifi"]); 
 
 returns the following plan of ordered steps, each a named operator
 
 ["look-up-number", 
 "telephone-shop", 
 "tell-shop-problem", 
 "give-shop-money", 
 "shop-installs-battery", 
 "drive-son-to-school"]
 
 when the following operators have been predefined:

var OPERATORS = [
    {"name": "drive-son-to-school",
     "preconditions": ["son-at-home","car-works"],
     "additions": ["son-at-school"],
     "deletions": ["son-at-home"]
    },
    {"name": "shop-installs-battery",
     "preconditions": ["car-needs-battery",
                       "shop-knows-problem",
                       "shop-has-money"],
     "additions": ["car-works"],
     "deletions": ["car-needs-battery"]
    },
    {"name": "tell-shop-problem",
     "preconditions": ["in-communication-with-shop"],
     "additions": ["shop-knows-problem"],
     "deletions": []
    },
    {"name": "telephone-shop",
     "preconditions": ["know-phone-number"],
     "additions": ["in-communication-with-shop"],
     "deletions": []
    },
    {"name": "look-up-number",
     "preconditions": ["have-phone-book"],
     "additions": ["know-phone-number"],
     "deletions": []
    },
    {"name": "google-number",
     "preconditions": ["have-wifi"],
     "additions": ["know-phone-number"],
     "deletions": []
    },
    {"name": "give-shop-money",
     "preconditions": ["have-money"],
     "additions": ["shop-has-money"],
     "deletions": ["have-money"]
    },
    {"name": "put-it-on-the-credit-card",
     "preconditions": ["have-money"],
     "additions": ["shop-has-money"],
     "deletions": ["have-money"]
    }
];

Calling the function plan a second time with the same inputs 
will produce an identical series of operators except that 
"look-up-number" is replaced with "google-number" and 
"give-shop-money" is replaced with "put-it-on-the-credit-card".

The variable OPERATIONS_USED stores the names of previously 
used operators.

*/

/*

    James Bond Operators  
    
    Inspired by 
    
    Umbert Eco. 1979. "Narrative Structures in Fleming." In The Role 
        of the Reader: Explorations in the Semiotics of Texts.
        Bloomington, IN: Indiana University Press.
        
    Example useage:
        plan(["I"],[]);
        


var bondScheme = [
    { "A": "M moves and gives a task to Bond." },
    { "B": "Villain moves and appears to Bond." },
    { "C": "Bond moves and gives a first check to Villain or Villain gives first check to Bond." },
    { "D": "Woman moves and shows herself to Bond." },
    { "E": "Bond takes Woman." },
    { "F": "Villain captures Bond." },
    { "G": "Villain tortures Bond." },
    { "H": "Bond beats Villain." },
    { "I": "Bond, convalescing, enjoys Woman, whom he then loses." }
];

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


/*

Soap Opera Operators

The "soap opera" operators defined below were inspired 
by the the examples in this paper:

Lebowitz, Michael. "Story-telling as Planning and Learning."
    Poetics 14 (1985) 483-502.
    
Try the following call to plan with the "soap opera" operators.  

 plan([ "peyton-is-together-with-parker" ], // goal
      [ "peyton-is-single",                 // currentState
        "peyton-wants-to-be-together-with-parker",
        "peyton-has-money",
        "peyton-is-at-home",
        "parker-is-at-home",
        "dakota-is-at-home",
        "parker-is-married-to-dakota",
        "dakota-is-married-to-parker",
        "parker-    wants-to-be-together-with-dakota",
        "dakota-wants-to-be-together-with-parker",
        "dakota-and-parker-can-conceive",
        "hayden-is-single",
        "hayden-needs-money"]);
        
Try the call again with the same inputs to see a different version.
*/
var OPERATORS = [

    {"name": "sex",
     "preconditions": ["dakota-is-at-home",
                       "parker-is-at-home"],
     "additions": ["dakota-and-parker-have-sex"],
     "deletions": []
    },
    {"name": "going to the party 1",
     "preconditions": ["parker-is-at-home"],
     "additions": ["parker-is-at-the-party"],
     "deletions": ["parker-is-at-home"]
    }, 
    {"name": "going to the party 2",
     "preconditions": ["peyton-is-at-home"],
     "additions": ["peyton-is-at-the-party"],
     "deletions": ["peyton-is-at-home"]
    }, 
    {"name": "dancing and flirting",
     "preconditions": ["parker-is-at-the-party", 
                       "peyton-is-at-the-party"],
     "additions": ["parker-and-peyton-dance-and-flirt"],
     "deletions": ["peyton-is-at-the-party",
                   "parker-is-at-the-party"]
    }, 
    {"name": "falling in love",
     "preconditions": ["parker-and-peyton-dance-and-flirt"],
     "additions": ["parker-is-in-love-with-peyton",
                   "peyton-is-in-love-with-parker",
                   "parker-wants-to-be-single",
                   "parker-wants-to-be-together-with-peyton"],
     "deletions": ["parker-and-peyton-dance-and-flirt"]
    },
    {"name": "conception and parenting v1",
     "preconditions": ["dakota-and-parker-can-conceive",
                       "dakota-and-parker-have-sex"],
     "additions": ["morgan-is-born",
                   "morgan-is-at-home",
                   "dakota-loves-being-the-parent-of-morgan",
                   "parker-loves-being-the-parent-of-morgan",
                   "dakota-has-a-baby",
                   "parker-has-a-baby"],
     "deletions": ["dakota-and-parker-have-sex"]
    },
    {"name": "conception and parenting v2",
     "preconditions": ["dakota-and-parker-can-conceive",
                       "dakota-and-parker-have-sex"],
     "additions": ["morgan-is-born", 
                   "morgan-is-at-home",
                   "dakota-loves-being-the-parent-of-morgan",
                   "parker-hates-being-the-parent-of-morgan",
                   "dakota-has-a-baby",
                   "parker-has-a-baby",
                   "parker-wants-to-be-single"],
     "deletions": ["dakota-and-parker-have-sex"]
    },
    {"name": "divorce",
     "preconditions": ["parker-wants-to-be-single",
                       "dakota-wants-to-be-single"],
     "additions": ["parker-is-single",
                   "dakota-is-single"],
     "deletions": ["parker-wants-to-be-single",
                   "dakota-wants-to-be-single",
                   "parker-is-married-to-dakota", 
                   "dakota-is-married-to-parker",
                   "parker-is-at-home",
                   "dakota-is-at-home",
                   "parker-wants-to-be-together-with-dakota",
                   "dakota-wants-to-be-together-with-parker"]
    },
    {"name": "move in together",
     "preconditions": ["parker-is-single",
                       "peyton-is-single",
                       "peyton-wants-to-be-together-with-parker"],
     "additions": ["peyton-is-together-with-parker",
                   "parker-is-together-with-peyton"],
     "deletions": ["parker-is-single",
                   "peyton-is-single"]
    },
    {"name": "paid seduction",
     "preconditions": ["dakota-is-married-to-parker",
                       "dakota-wants-to-be-together-with-parker",
                       "hayden-is-single",
                       "hayden-needs-money",
                       "peyton-has-money"],
     "additions": ["hayden-has-money",
                   "dakota-wants-to-be-together-with-hayden",
                   "dakota-wants-to-be-single",
                   "parker-wants-to-be-single"],
     "deletions": ["dakota-wants-to-be-together-with-parker",
                  "parker-wants-to-be-together-with-dakota",
                  "peyton-has-money",
                  "hayden-needs-money"]
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
    display("beginning");
    for (i = 0; i < currentState.length; i++) {
        display("   " + currentState[i]);
    }
    for (i = 0; i < goals.length; i++) {
        [success, nextState, currentPlan] = achieveGoal(goals[i],
            nextState,
            currentPlan);
        if (!success) { console.log("unable to achieve goal " + goals[i]); }
    }
    if (!success) { console.log("plan not found"); }
    else {
        display("ending");
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
        display(operator.name);
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

function display(message) {
    let type;
    let sec = document.querySelector("#plan");
    if (message === "beginning" || message === "ending"){
        type = "h1";
    } else {
        type = "p";
    }
    let tag = document.createElement(type);
    tag.textContent = message;
    sec.appendChild(tag);
    console.log(message);
}