/*

    James Bond Operators  
    
    Inspired by 
    
    Umbert Eco. 1979. "Narrative Structures in Fleming." In The Role 
        of the Reader: Explorations in the Semiotics of Texts.
        Bloomington, IN: Indiana University Press.
        
    Example useage:
        plan(["I"],[]);
        
*/

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