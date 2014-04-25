/**
 * Created with JetBrains WebStorm.
 * User: Jinay
 * Date: 2/14/14
 * Time: 1:00 AM
 * To change this template use File | Settings | File Templates.
 */

var AllFields = {
    F001 : {name: "LAND PLANNING & \n PUBLIC POLICY", ppl: 3},
    F002 : {name: "SUITABILITY & SOIL", ppl: 2},
    F003 : {name: "AGRICULTURAL PRODUCTION & HARVESTING", ppl: 7},
    F004 : {name: "TRANSPORTATION & DISTRIBUTION", ppl: 4},
    F005 : {name: "AGGREGATION", ppl: 1},
    F006 : {name: "FOOD PROCESSING & MANUFACTURING", ppl: 5},
    F007 : {name: "MARKETING & RETAIL", ppl: 6},
    F008 : {name: "CONSUMPTION", ppl: 9},
    F009 : {name: "FOOD ACCESS", ppl: 5},
    F010 : {name: "RESOURCE & WASTE RECOVERY", ppl: 5}
};

var matrix = [
    [0,0,2,3,1,2,3,3,2,1],
    [0,0,2,0,0,0,0,0,0,1],
    [2,2,1,3,1,3,3,4,2,3],
    [3,0,3,0,1,3,4,4,3,2],
    [1,0,1,1,0,1,1,1,1,1],
    [2,0,3,3,1,0,3,4,2,3],
    [3,0,3,4,1,3,1,5,3,2],
    [3,0,4,4,1,4,5,1,4,2],
    [2,0,2,3,1,2,3,4,0,2],
    [1,1,3,2,1,3,2,2,2,1]
];

var field_dataset = [
    {

        "name" : "LAND USE PLANNING",
        "header_text" : "LAND USE PLANNING DEFINES AND DESIGNATES ZONES FOR FOOD GROWING AT ALL SCALES",
        "content_text" : "There are currently 150 people and 37 projects and 5 courses that deal with this topic.",
        "children" : [{
            "name" : "",
            "id" : "A",
            "children": [
    {
        "name" : "COURSES",
        "children" : [
            {
                "name" : "HI440 AMERICAN ENVIRONMENTAL HISTORY"
            },
            {
                "name" : "HI540 AMERICAN ENVIRONMENTAL HISTORY"
            },
            {
                "name" : "HI491 SUBURBAN NATION"
            },
            {
                "name" : "HI440 DIGITAL HISTORY PRACTICUM (TANGENTIAL)"
            },
            {
                "name" : "HI599 HISTORY OF THE COAST (INDEPENDENT STUDY)"
            }
        ]
    },
    {
        "name" : "PEOPLE",
        "children" : [
            {
                "name" : "MATTHEW BOOKER"
            },
            {
                "name" : "SARAH BOWEN"
            },
            {
                "name" : "JOANNA LELEKACS"
            }
        ]
    },
    {
        "name" : "PROJECTS",
        "children" : [
            {
                "name" : "PJ001"
            },
            {
                "name" : "PJ002"
            },
            {
                "name" : "PJ003"
            }
        ]
    }
]
        }]
    },
    {
        "name" : "SUITABILITY & SOIL SCIENCE",
        "children": [
            {
                "name" : "COURSES",
                "children" : [
                    {
                        "name" : "CS230-001"
                    },
                    {
                        "name" : "CS230-601"
                    },
                    {
                        "name" : "CS430"
                    },
                    {
                        "name" : "CS492"
                    },
                    {
                        "name" : "CS495"
                    }
                ]
            },
            {
                "name" : "PEOPLE",
                "children" : [
                    {
                        "name" : "MICHELLE SCHROEDER MONROE"
                    },
                    {
                        "name" : "ALAN FRANZLUEBBERS"
                    }
                ]
            },
            {
                "name" : "PROJECTS",
                "children" : [
                    {
                        "name" : "PJ001"
                    },
                    {
                        "name" : "PJ002"
                    },
                    {
                        "name" : "PJ003"
                    }
                ]
            }
        ]
    }
];