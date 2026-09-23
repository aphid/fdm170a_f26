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