/* Master Stat Variables */

const game = {
    possession: 'none',
    direction: '',
    action: '',
    series: {
        seriesStartTime:[],
        seriesEndTime: [],
        seriesCount: [],
        phaseCount: [],
        currSeries: 0,
        currPhases: 0},
    tackles: {count: 0,time: [],quadrant: [],q1: 0,q2: 0,q3: 0,q4: 0},
    teamOne: {
        name: 'Team 1',
        color: '173, 158, 110',
        textColor: '255, 255, 255',
        borderColor: 'transparent',
        openingKick: false,
        startsLeft: false,
        score: {
            total: 0,
            tries: 0,
            cons: {made:0, missed:0},
            PGs: {made:0, missed:0},
            DGs: 0,
        },
        turnovers: 0,
        handlingErrors: 0,
        lostBreakdowns: 0,
        lineouts: {won:0, lost:0, stolen:0},
        scrums: {unplayed:0, won:0, lost:0, stolen:0},
        penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0},
        freekicks: {scrums:0, lineouts:0, other:0}
    },
    teamTwo: {
        name: 'Team 1',
        color: '16, 57, 92',
        textColor: '255, 255, 255',
        borderColor: 'transparent',
        openingKick: false,
        startsLeft: false,
        score: {
            total: 0,
            tries: 0,
            cons: {made:0, missed:0},
            PGs: {made:0, missed:0},
            DGs: 0,
        },
        turnovers: 0,
        handlingErrors: 0,
        lostBreakdowns: 0,
        lineouts: {won:0, lost:0, stolen:0},
        scrums: {unplayed:0, won:0, lost:0, stolen:0},
        penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0},
        freekicks: {scrums:0, lineouts:0, other:0}
    }
}

var firstHalf = true;

var possessionTable = document.getElementById("possession-table")
var scoreTable = document.getElementById("score-table")

/* #############################
### Game Clock Functionality ###
############################# */

var count = 0; 
var clearTime; 
var seconds = 0, minutes = 0, tenthseconds = 0; 
var clearState; 
var tnthsecs, secs, mins;

const startGame = document.getElementById("start-game")
const possessionDirection = document.getElementById("poss-direction")
const teamInfoForm = document.getElementById("team-info-form")
const stopButton = document.getElementById("stop-button")
const restartButton = document.getElementById("restart-button")
const gameClock = document.getElementById("game-clock")
const recoverBox = document.getElementById("kick-recover-container")
const lineoutContainer = document.getElementById("lineout-container")
const scrumContainer = document.getElementById("scrum-container")
const scrumInfButton = document.getElementById("scrum-inf-event")
const scrumInfSubevents = document.getElementById("scrum-inf-subevents-container")
const freekickChoice = document.getElementById('freekick-choice-container')

const teamOneInput = document.getElementById("team-one")
const teamTwoInput = document.getElementById("team-two")
const teamOneColorInput = document.getElementById("team-one-color")
const teamTwoColorInput = document.getElementById("team-two-color")

const allTeamOneToReplace = document.querySelectorAll(".teamOneInputReplacer")
const allTeamTwoToReplace = document.querySelectorAll(".teamTwoInputReplacer")
const allTeamInPossessionToReplace = document.querySelectorAll(".teamInPossessionReplacer")
const allTeamOnDefenseToReplace = document.querySelectorAll(".teamOnDefenseReplacer")

const allTeamOneColors = document.querySelectorAll(".color-team1")
const allTeamTwoColors = document.querySelectorAll(".color-team2")
const allTeamPossessionColors = document.querySelectorAll(".color-possession")
const allTeamDefenseColors = document.querySelectorAll(".color-defense")

const seriesCountTracker = document.getElementById("series-count")
const phaseCountTracker = document.getElementById("phase-count")

function textColors () {
    oneRed = game.teamOne.color.split(",")[0]
    oneGreen = game.teamOne.color.split(",")[1]
    oneBlue = game.teamOne.color.split(",")[2]
    if ((oneRed*0.299 + oneGreen*0.587 + oneBlue*0.114) < 120) {
        game.teamOne.textColor = '#FFFFFF';
        game.teamOne.borderColor = 'transparent'} 
    else {
        game.teamOne.textColor = '#000000';
        game.teamOne.borderColor = "#000000"}

    twoRed = game.teamTwo.color.split(",")[0]
    twoGreen = game.teamTwo.color.split(",")[1]
    twoBlue = game.teamTwo.color.split(",")[2]
    if ((twoRed*0.299 + twoGreen*0.587 + twoBlue*0.114) < 120) {
        game.teamTwo.textColor = '#FFFFFF';
        game.teamTwo.borderColor = 'transparent'} 
    else {
        game.teamTwo.textColor = '#000000';
        game.teamTwo.borderColor =  "#000000";}
}

function setStart () {
    if (teamInfoForm.startSide.value === 'one-starts-left')
    {game.teamOne.startsLeft = true;
    game.teamTwo.startsLeft = false;} 
    else if (teamInfoForm.startSide.value === 'two-starts-left')
    {game.teamOne.startsLeft = false;
    game.teamTwo.startsLeft = true;};
    if (teamInfoForm.kicking.value === 'one-kicks')
    {game.teamOne.openingKick = true;
    game.teamTwo.openingKick = false;} 
    else if (teamInfoForm.kicking.value === 'two-kicks')
    {game.teamOne.openingKick = false;
    game.teamTwo.openingKick = true;} 
}

function getNames () {
    game.teamOne.name = teamOneInput.value;
    game.teamTwo.name = teamTwoInput.value;
    game.teamOne.color = teamOneColorInput.value;
    game.teamTwo.color = teamTwoColorInput.value;
}

function startWatch( ) {
    if ( seconds === 60 ) { seconds = 0; minutes = minutes += 1; } 
    if ( tenthseconds === 10) { tenthseconds = 0; seconds = seconds += 1; }
    mins = ( minutes < 10 ) ? ( '0' + minutes + ':' ) : ( minutes + ':' ); 
    secs = ( seconds < 10 ) ? ( '0' + seconds + ':') : ( seconds + ':'); 
    tnthsecs = (tenthseconds < 10) ? ( '0' + tenthseconds) : (tenthseconds);
    matchTime = mins + secs + tnthsecs;
    gameClock.innerHTML = matchTime; 
    tenthseconds++; 
    clearTime = setTimeout( "startWatch( )", 100 ); 
}
function startTime() {
    tenthseconds = 0;
    seconds = 0;
    minutes = 0;
    startWatch( );      
 }

function startingSides () {
    if ( (game.teamOne.openingKick && game.teamOne.startsLeft && firstHalf) ||
    (game.teamTwo.openingKick && game.teamTwo.startsLeft && !firstHalf) ) {
        possessionDirection.innerHTML = game.teamOne.name + " will kick from the left.";}
    else if 
        ( (game.teamOne.openingKick && game.teamTwo.startsLeft && firstHalf) || 
            (game.teamTwo.openingKick && game.teamOne.startsLeft && !game.firstHalf) ) {
        possessionDirection.innerHTML = game.teamOne.name + " will kick from the right.";}
    else if 
        ( (game.teamTwo.openingKick && game.teamOne.startsLeft && firstHalf) ||
        (game.teamOne.openingKick && game.teamTwo.startsLeft && !firstHalf) ){
        possessionDirection.innerHTML = game.teamOne.name + " will receive on the left.";}
    else if 
        ( (game.teamTwo.openingKick && game.teamTwo.startsLeft && firstHalf) ||
        (game.teamOne.openingKick && game.teamOne.startsLeft && !firstHalf) ) {
        possessionDirection.innerHTML = game.teamOne.name + " will receive on the right.";};
}

function updateNames () {
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + game.teamOne.name;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + game.teamTwo.name;};
}

function updateColors () {
    for (i=0; i < allTeamOneColors.length; i++) {allTeamOneColors[i].style.backgroundColor = game.teamOne.color;};
    for (i=0; i < allTeamOneColors.length; i++) {allTeamOneColors[i].style.color = game.teamOne.textColor;};
    for (i=0; i < allTeamOneColors.length; i++) {allTeamOneColors[i].style.border = "1px solid " + game.teamOne.borderColor;};
    for (i=0; i < allTeamTwoColors.length; i++) {allTeamTwoColors[i].style.backgroundColor = game.teamTwo.color;};
    for (i=0; i < allTeamTwoColors.length; i++) {allTeamTwoColors[i].style.color = game.teamTwo.textColor;};
    for (i=0; i < allTeamTwoColors.length; i++) {allTeamTwoColors[i].style.border = "1px solid " + game.teamTwo.borderColor;};
}

function updatePossession () {
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + game.possession;};
    if (game.possession === game.teamOne.name) {
        game.action = ' attacking from '
        for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.backgroundColor = game.teamOne.color;};
        for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.color = game.teamOne.textColor;};
        for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.border = "1px solid " + game.teamOne.borderColor;};

        for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.backgroundColor = game.teamTwo.color;};
        for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.color = game.teamTwo.textColor;};
        for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.border = "1px solid " + game.teamTwo.borderColor;};

        for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + game.teamTwo.name;};
    } else if (game.possession === game.teamTwo.name) {
            game.action = ' defending on '
            for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.backgroundColor = game.teamTwo.color;};
            for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.color = game.teamTwo.textColor;};
            for (i=0; i < allTeamPossessionColors.length; i++) {allTeamPossessionColors[i].style.border = "1px solid " + game.teamTwo.borderColor;};

            for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.backgroundColor = game.teamOne.color;};
            for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.color = game.teamOne.textColor;};
            for (i=0; i < allTeamDefenseColors.length; i++) {allTeamDefenseColors[i].style.border = "1px solid " + game.teamOne.borderColor;};

            for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + game.teamOne.name;};
        }
}


function startGameFunctions () {
    textColors();
    setStart ();
    getNames();
    updateNames();
    startingSides();
    startWatch();
    updateColors();
};

function newPossessionRow () {
    var newPossessionRow = possessionTable.insertRow(1);
    var poss1 = newPossessionRow.insertCell(0);
    var poss2 = newPossessionRow.insertCell(1);
    poss1.innerHTML = mins + secs + tnthsecs;
    poss2.innerHTML = game.possession;
}

function nonePossessionRow () {
	game.possession = 'none';
	var newPossessionRow = possessionTable.insertRow(1);
    var poss1 = newPossessionRow.insertCell(0);
    var poss2 = newPossessionRow.insertCell(1);
    poss1.innerHTML = mins + secs + tnthsecs;
    poss2.innerHTML = game.possession;
}

function possessionToggle () {
    if (game.possession === game.teamOne.name){
        game.possession = game.teamTwo.name
    } else if (game.possession === game.teamTwo.name) {
        game.possession = game.teamOne.name
    } else {game.possession = 'None'};
    
}

function actionToggle () {
	if (game.action === ' defending on ') {
		game.action = ' attacking from '
	} else if (game.action === ' attacking from ') {
		game.action = ' defending on '
	} else (game.action = ' on ')
}

function startSeries () {
    game.series.seriesStartTime.push(matchTime)
    game.series.currSeries = game.series.currSeries += 1;
    game.series.currPhases = 1;
    phaseCountTracker.innerHTML = game.series.currPhases;
    seriesCountTracker.innerHTML = game.series.currSeries;
}

function newPhase () {
    game.series.currPhases = game.series.currPhases += 1;
    phaseCountTracker.innerHTML = game.series.currPhases;
    seriesCountTracker.innerHTML = game.series.currSeries;
}

function endSeries () {
    game.series.seriesEndTime.push(matchTime)
    game.series.seriesCount.push(game.series.currSeries);
    game.series.phaseCount.push(game.series.currPhases);
    phaseCountTracker.innerHTML = game.series.currPhases;
    seriesCountTracker.innerHTML = game.series.currSeries;
}

function updatePlayDescription () {
    if (game.teamOne.startsLeft && firstHalf === true) {
        game.direction = " the left.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    } else if (game.teamTwo.startsLeft && firstHalf === true) {
        game.direction = " the right.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    } else if (game.teamOne.startsLeft && firstHalf === false) {
        game.direction = " the right.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    } else if (game.teamTwo.startsLeft && firstHalf === false) {
        game.direction = " the left.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    }; }

function kickRecovered (teamRecovered) {
    recoverBox.style.display="none";
    if (teamRecovered === 'team-1-recovered') {
        possessionDirection.innerHTML = "";
        game.possession = game.teamOne.name;
        game.action = " attacking from ";
        newPossessionRow ()
        startSeries();
    } else if (teamRecovered === 'team-2-recovered') {
        possessionDirection.innerHTML = "";
        game.possession = game.teamTwo.name;
        game.action = " defending on ";
        newPossessionRow ();
        startSeries();}
        else if (teamRecovered === 'neither-recovered') {
        };
        updatePossession();
        updatePlayDescription();
       
}



function stopWatch( ) {clearTimeout(clearTime)};

stopButton.addEventListener('click',stopWatch);
restartButton.addEventListener('click', startWatch);


/* ###########################
### Halftime Functionality ###
########################### */

function handleHalftime () {
    endSeries();
    firstHalf = false;
    clearTimeout(clearTime);
    tenthseconds = 0;
    seconds = 0;
    minutes = 0;
    gameClock.innerHTML = "00:00:00"; 
    document.getElementById("current-half").innerHTML = ("Second Half");
    document.getElementById("half-time").style.display = "none";
};

/* ###############################
### Tackle Track Functionality ###
############################### */

function tackleHandler (tackleArea) {
    newPhase();
    if (firstHalf === true) {
        if (tackleArea === 'far-left') {
            game.tackles.count += 1;
            game.tackles.q1 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(1);
            document.getElementById("far-left").innerHTML = game.tackles.q1;
        } else
        if (tackleArea === 'center-left') {
            game.tackles.count += 1;
            game.tackles.q2 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(2);
            document.getElementById("center-left").innerHTML = game.tackles.q2;
        } else
        if (tackleArea === 'center-right') {
            game.tackles.count += 1;
            game.tackles.q3 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(3);
            document.getElementById("center-right").innerHTML = game.tackles.q3;
        } else
        if (tackleArea === 'far-right') {
            game.tackles.count += 1;
            game.tackles.q4 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(4);
            document.getElementById("far-right").innerHTML = game.tackles.q4;
        }
        } 
    else if (firstHalf === false) {
        if (tackleArea === 'far-left') {
            game.tackles.count += 1;
            game.tackles.q4 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(4);
            document.getElementById("far-left").innerHTML = game.tackles.q4;
        } else
        if (tackleArea === 'center-left') {
            game.tackles.count += 1;
            game.tackles.q3 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(3);
            document.getElementById("center-left").innerHTML = game.tackles.q3;
        } else
        if (tackleArea === 'center-right') {
            game.tackles.count += 1;
            game.tackles.q2 += 1;
            game.tackles.time.push(mins + secs + tnthsecs);
            game.tackles.quadrant.push(2);
            document.getElementById("center-right").innerHTML = game.tackles.q2;
        } else
        if (tackleArea === 'far-right') {
            game.tackles.count += 1;
            game.tackles.q1 += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs);
            actionAreas.tackleArea.push(1);
            document.getElementById("far-right").innerHTML = game.tackles.q1;
        } 
        } 
        }

/* #############################
### Score Update Functionality ###
############################# */

const scoreButton = document.getElementById("score-event")
const scoreTypeContainer = document.getElementById("score-type-container")
const team1ScoreBox = document.getElementById("team-1-score")
const team2ScoreBox = document.getElementById("team-2-score")
const conContainer = document.getElementById("try-converted-container")
const restartRecover = document.getElementById("kick-restart-recover-container")
var teamOneRestart = document.getElementById("team-1-restart")
var teamTwoRestart = document.getElementById("team-2-restart")
var neitherRestart = document.getElementById("neither-restart")
var lastScore = 'none';

function refreshScores () {
    team1ScoreBox.innerHTML = game.teamOne.score.total;
    team2ScoreBox.innerHTML = game.teamTwo.score.total;
}

function tryScoreRow () {
	var newScoreRow = scoreTable.insertRow(1);
    var score1 = newScoreRow.insertCell(0);
    var score2 = newScoreRow.insertCell(1);
    var score3 = newScoreRow.insertCell(2);
    score1.innerHTML = mins + secs + tnthsecs;
    score2.innerHTML = lastScore;
    score3.innerHTML = "Try";    
}

function conScoreRow () {
	var newScoreRow = scoreTable.insertRow(1);
    var score1 = newScoreRow.insertCell(0);
    var score2 = newScoreRow.insertCell(1);
    var score3 = newScoreRow.insertCell(2);
    score1.innerHTML = mins + secs + tnthsecs;
    score2.innerHTML = lastScore;
    score3.innerHTML = "Conversion";    
}

function DGScoreRow () {
	var newScoreRow = scoreTable.insertRow(1);
    var score1 = newScoreRow.insertCell(0);
    var score2 = newScoreRow.insertCell(1);
    var score3 = newScoreRow.insertCell(2);
    score1.innerHTML = mins + secs + tnthsecs;
    score2.innerHTML = lastScore;
    score3.innerHTML = "Drop-goal";    
}

function PGScoreRow () {
	var newScoreRow = scoreTable.insertRow(1);
    var score1 = newScoreRow.insertCell(0);
    var score2 = newScoreRow.insertCell(1);
    var score3 = newScoreRow.insertCell(2);
    score1.innerHTML = mins + secs + tnthsecs;
    score2.innerHTML = lastScore;
    score3.innerHTML = "Penalty-goal"; 
}

function scoreHandler(scoreType) {
    endSeries();
    if (scoreType === 'try-scored' && game.possession === game.teamOne.name){
        game.teamOne.score.tries = game.teamOne.score.tries += 1;
        game.teamOne.score.total = game.teamOne.score.total += 5;
        refreshScores () ;
        lastScore = game.teamOne.name;

        tryScoreRow ();  

    } else if (scoreType === 'dropgoal-scored' && game.possession === game.teamOne.name) {
        game.teamOne.score.DGs = game.teamOne.score.DGs += 1;
        game.teamOne.score.total = game.teamOne.score.total += 3;
        refreshScores () ;
        lastScore = game.teamOne.name;
        if (game.possession != 'none') {nonePossessionRow();}
        DGScoreRow ();

    } else if (scoreType === 'try-scored' && game.possession === game.teamTwo.name) {
        game.teamTwo.score.tries = game.teamTwo.score.tries += 1;
        game.teamTwo.score.total = game.teamTwo.score.total += 5;
        refreshScores () ;
        lastScore = game.teamTwo.name;
        tryScoreRow ();

    } else if (scoreType === 'dropgoal-scored' && game.possession === game.teamTwo.name) {
        game.teamTwo.score.DGs = game.teamTwo.score.DGs += 1;
        game.teamTwo.score.total = game.teamTwo.score.total += 3;
        refreshScores () ;
        lastScore = game.teamTwo.name;
        
        if (game.possession != 'none') {nonePossessionRow();}
        DGScoreRow ();

    }
    else if (scoreType === 'cancel-score-type') {
        scoreTypeContainer.style.display="none";
    };
    updatePlayDescription();
    updatePossession()
}

function conversionHandler (conversionSuccessful) {
    if (conversionSuccessful === 'try-converted' && lastScore === game.teamOne.name) {
        game.teamOne.score.cons.made = game.teamOne.score.cons.made += 1;
        game.teamOne.score.total = game.teamOne.score.total += 2;
        refreshScores () ;
        conScoreRow();
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === game.teamOne.name) {
        conContainer.style.display="none";
        game.teamOne.score.cons.missed = game.teamOne.score.cons.missed += 1;
        refreshScores () ;
    }
    else if (conversionSuccessful === 'try-converted' && lastScore === game.teamTwo.name) {
        conContainer.style.display="none";
        game.teamTwo.score.cons.made = game.teamTwo.score.cons.made += 1;
        game.teamTwo.score.total = game.teamTwo.score.total + 2;
        refreshScores () ;
        conScoreRow();
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === game.teamTwo.name) {
        conContainer.style.display="none";
        game.teamTwo.score.cons.missed = game.teamTwo.score.cons.missed += 1;
        refreshScores () ;
    }
}

function restartHandler (getsRestart) {
    if (getsRestart === 'team-1-restart') {
        possessionDirection.innerHTML = ""
        game.possession = game.teamOne.name;
        game.action = " attacking from ";
        newPossessionRow();
        startSeries();
    } else if (getsRestart === 'team-2-restart') {
        possessionDirection.innerHTML = ""
        game.possession = game.teamTwo.name;
        game.action = " defending on ";
        newPossessionRow();
        startSeries();
    } else if (getsRestart === 'neither-restart') {
        nonePossessionRow ();
    };
    updatePossession();
    updatePlayDescription();
}

/* ##############################
### Main Events Functionality ###
############################## */

const turnoverButton = document.getElementById("turnover-event")
const turnoverSubevents = document.getElementById("turnover-subevents-container")

function handleTurnover () {
    turnoverSubevents.style.display = "flex";
    turnoverSubevents.style.flexWrap = "wrap";
    turnoverSubevents.style.justifyContent = "space-around";
}

turnoverButton.addEventListener('click',handleTurnover)

function turnoverHandler (turnoverType) {
    endSeries();
    startSeries();
        if (game.possession === game.teamOne.name && turnoverType === 'turnover-dropped') {
            game.teamOne.handlingErrors = game.teamOne.handlingErrors += 1
            game.teamOne.turnovers = game.teamOne.turnovers += 1
        } else if (game.possession === game.teamOne.name && turnoverType === 'turnover-breakdown') {
            game.teamOne.lostBreakdowns = game.teamOne.lostBreakdowns += 1
            game.teamOne.turnovers = game.teamOne.turnovers += 1
        } else if (game.possession === game.teamOne.name && turnoverType === 'turnover-intercept') {
            game.teamOne.turnovers = game.teamOne.turnovers += 1
        } 
        
        else if (game.possession === game.teamTwo.name && turnoverType === 'turnover-dropped') {
            game.teamTwo.handlingErrors = game.teamTwo.handlingErrors += 1
            game.teamTwo.turnovers = game.teamTwo.turnovers += 1
        } else if (game.possession === game.teamTwo.name && turnoverType === 'turnover-breakdown') {
            game.teamTwo.lostBreakdowns = game.teamTwo.lostBreakdowns += 1
            game.teamTwo.turnovers = game.teamTwo.turnovers += 1
        } else if (game.possession === game.teamTwo.name && turnoverType === 'turnover-intercept') {
            game.teamTwo.turnovers = game.teamTwo.turnovers += 1
        };

            possessionToggle ();
            newPossessionRow();
            updatePossession();
            updatePlayDescription();
    } 



const outofplayButton = document.getElementById("outofplay-event")
const outofplaySubevents = document.getElementById("ball-outofplay-subevents-container")

var putOutOfPlay = '';

function lineoutHandler (lineoutWinner) {
    if (lineoutWinner === '1-wins-lineout') {
        startSeries();
        if (putOutOfPlay === game.teamTwo.name) {
            game.teamOne.lineouts.won = game.teamOne.lineouts.won += 1;
            updatePossession();
            newPossessionRow();
            updatePlayDescription();
        } else if (putOutOfPlay === game.teamOne.name) {
            game.possession = game.teamOne.name;
            updatePossession();
            newPossessionRow();
            updatePlayDescription();
            game.lineouts.stolen = game.lineouts.stolen += 1;
            game.teamTwo.lineouts.lost = game.teamTwo.lineouts.lost += 1;
        } 
    } else if (lineoutWinner === '2-wins-lineout') {
        startSeries();
        if (putOutOfPlay === game.teamOne.name) {
            game.teamTwo.lineouts.won = game.teamTwo.lineouts.won += 1;
            updatePossession();
            newPossessionRow();
            updatePlayDescription();
        } else if (putOutOfPlay === game.teamTwo.name) {
            game.possession = game.teamTwo.name;
            updatePossession();
            newPossessionRow();
            updatePlayDescription();
            game.teamTwo.lineouts.stolen = game.teamTwo.lineouts.stolen += 1;
            game.teamOne.lineouts.lost = game.teamOne.lineouts.lost += 1;
            
        }
    } else if (lineoutWinner === 'Neither') {
    }
}

function outOfPlayHandler (outOfPlayType) {
    endSeries();
    if (outOfPlayType === "in-touch-offense" || outOfPlayType === 'kicked-touch') { 
        putOutOfPlay = game.possession;
        if (game.possession != 'none') {nonePossessionRow();};
    } else
    if (outOfPlayType === 'in-touch-defense') {
        if (game.possession === game.teamOne.name) {putOutOfPlay = game.teamTwo.name};
        if (game.possession === game.teamTwo.name) {putOutOfPlay = game.teamOne.name};
        if (game.possession != 'none') {nonePossessionRow();}
    } else if (outOfPlayType === 'mark-called') {
        possessionToggle() ;
        updatePossession();
        newPossessionRow() ;
        actionToggle ();
        updatePlayDescription ();
    } else if (outOfPlayType === 'twenty-two') {
        possessionToggle() ;
        updatePossession();
        newPossessionRow() ;
        updatePlayDescription();
    } else if (outOfPlayType === 'scrum-five') {
        if (game.possession != 'none') {nonePossessionRow();}
    }
}

function markChoiceHandler (markChoice) {
    if (markChoice === 'mark-quick-tap') {
    } else if (markChoice === 'mark-to-touch') {
        putOutOfPlay = game.possession;
    } else if (markChoice === 'mark-kicked-in') {
    }
}
var lastInfringement = '';

function handlePenaltyType (penaltyType) {
    endSeries();
    if (penaltyType === 'pen-ruck-one') {
        game.teamOne.penalties.rucks = game.teamOne.penalties.rucks += 1;
        lastInfringement = game.teamOne.name;
    }
    else if (penaltyType === 'pen-ruck-two') {
        game.teamTwo.penalties.rucks = game.teamTwo.penalties.ruck += 1;
        lastInfringement = game.teamTwo.name;
    }
    else if (penaltyType === 'pen-offsides-one') {
        game.teamOne.penalties.offsides = game.teamOne.penalties.offsides += 1;
        lastInfringement = game.teamOne.name;
    }
    else if (penaltyType === 'pen-offsides-two') {
        game.teamTwo.penalties.offsides = game.teamTwo.penalties.offsides += 1;
        lastInfringement = game.teamTwo.name;
    }
    else if (penaltyType === 'pen-dangerous-one') {
        game.teamOne.penalties.dangerous = game.teamOne.penalties.dangerous += 1;
        lastInfringement = game.teamOne.name;
    }
    else if (penaltyType === 'pen-dangerous-two') {
        game.teamTwo.penalties.dangerous= game.teamTwo.penalties.dangerous += 1;
        lastInfringement = game.teamTwo.name;
    }
    else if (penaltyType === 'pen-other-one') {
        game.teamOne.penalties.other = game.teamOne.penalties.other += 1;
        lastInfringement = game.teamOne.name;
    }
    else if (penaltyType === 'pen-other-two') {
        game.teamTwo.penalties.other = game.teamTwo.penalties.other += 1;
        lastInfringement = game.teamTwo.name;
    }
}

function penaltyChoiceHandler(pkChoice) {
    if (pkChoice === 'pk-quick-tap') {
        startSeries();
        if (lastInfringement === game.teamOne.name) {
            game.possession = game.teamTwo.name;
            updatePossession ();
            newPossessionRow ();
            updatePlayDescription ();
        } else if (lastInfringement === game.teamTwo.name) {
            game.possession = game.teamOne.name;
            updatePossession ();
            newPossessionRow ();
            updatePlayDescription ();}
    }
    else if (pkChoice === 'pk-at-goal') {
        if (game.possession != 'none') {nonePossessionRow();}
    }
    else if (pkChoice === 'pk-to-touch') {
        if (game.possession != 'none') {nonePossessionRow();}
    }
    else if (pkChoice === 'pk-kicked-in') {
    }
    else if (pkChoice === 'pk-scrum') {
        if (game.possession != 'none') {nonePossessionRow();}
    }
}

function pgHandler (pgResult) {
    
    if (pgResult === 'pg-successful') {
        if (lastInfringement === game.teamTwo.name) {
            game.teamOne.score.PGs = game.teamOne.score.PGs += 1;
            game.teamOne.score.total = game.teamOne.score.total += 3;
            refreshScores ();
            PGScoreRow();
            if (game.possession != 'none') {nonePossessionRow();};
        } else if (game.possession === game.teamOne.name) {
            game.teamTwo.score.PGs = game.teamTwo.score.PGs += 1;
            game.teamTwo.score.total = game.teamTwo.score.total += 3;
            refreshScores () ;
            PGScoreRow ();
            if (game.possession != 'none') {nonePossessionRow();};
        }
    } else if (pgResult === 'pg-to-twenty-two') {
        if (lastInfringement === game.teamTwo.name) {
            game.teamOne.scorePGs.missed = game.teamOne.score.PGs.missed += 1;
        }
        else if (lastInfringement === game.teamOne.name) {
            game.teamTwo.score.PGs.missed = game.teamTwo.score.PGs.missed += 1;
        };
    } else if (pgResult === 'pg-one-recovers') {
        startSeries();
        game.possession = game.teamOne.name;
        game.action = 
        updatePossession();
        newPossessionRow ();
        if (lastInfringement === game.teamTwo.name) {
            game.teamOne.score.PGs.missed = game.teamOne.score.PGs.missed += 1;
        } else if (lastInfringement === game.teamOne.name) {
            game.teamTwo.score.PGs.missed = game.teamTwo.score.PGs.missed += 1;
        }
    }
    else if (pgResult === 'pg-two-recovers') {
        startSeries();
        game.possession = game.teamTwo.name;
        game.action = ' defending on '
        updatePossession();
        newPossessionRow();
        if (lastInfringement === game.teamTwo.name) {
            game.teamOne.score.PGs.missed = game.teamOne.score.PGs.missed += 1;
        } else if (lastInfringement === game.teamOne.name) {
            game.teamTwo.score.PGs.missed = game.teamTwo.score.PGs.missed += 1;
        }
    }
    
}

function scrumCauseHandler (scrumCause) {
    if (game.possession != 'none') {nonePossessionRow();} else {endSeries();}
    if (scrumCause === 'scrum-knock-one'){
        lastInfringement = game.teamOne.name;
        game.teamOne.handlingErrors = game.teamOne.handlingErrors += 1;
        game.teamOne.turnovers = game.teamOne.turnovers += 1;
        game.action = " defending on ";
    } else 
    if (scrumCause === 'scrum-knock-two'){
        lastInfringement = game.teamTwo.name;
        game.teamTwo.handlingErrors = game.teamTwo.handlingErrors += 1;
        game.teamTwo.turnovers = game.teamTwo.turnovers += 1;
        game.action = " attacking from ";
    } else 
    if (scrumCause === 'scrum-forward-pass') {
        lastInfringement = game.possession;
        if (lastInfringement === game.teamOne.name) {
            game.teamOne.handlingErrors = game.teamOne.handlingErrors += 1;
            game.teamOne.turnovers = game.teamOne.turnovers += 1;
            game.action = " defending on ";
        } else 
        if (lastInfringement === game.teamTwo.name) {
            game.teamTwo.handlingErrors = game.teamTwo.handlingErrors += 1;
            game.teamTwo.turnovers = game.teamTwo.turnovers += 1;
            game.action = " attacking on ";
        }
    } else
    if (scrumCause === 'scrum-offsides-one') {
        lastInfringement = game.teamOne.name;
        game.teamOne.turnovers = game.teamOne.turnovers += 1;
        game.action = " defending on ";
    } else
    if (scrumCause === 'scrum-offsides-two') {
        lastInfringement = game.teamTwo.name;
        game.teamTwo.turnovers = game.teamTwo.turnovers += 1;
        game.action = " attacking from ";
    } else
    if (scrumCause === 'scrum-unplayable-attack') {
        if (game.possession === game.teamOne.name) {
            lastInfringement = game.teamTwo.name;
            game.action = " attacking from "
        } else if (game.possession === game.teamTwo.name) {
            lastInfringement = game.teamOne.name
            game.action = " defending on "
        }
    } else
    if (scrumCause === 'scrum-unplayable-defense') {
        if (game.possession === game.teamOne.name) {
            lastInfringement = game.teamOne.name;
            game.action = " defending from "
        } else if (game.possession === game.teamTwo.name) {
            lastInfringement = game.teamTwo.name
            game.action = " attacking on "
        }
    } else
    if (scrumCause === 'scrum-other-one') {
        lastInfringement = game.teamOne.name;
        game.action = " defending from ";
    } else
    if (scrumCause === 'scrum-other-two') {
        lastInfringement = game.teamTwo.name;
        game.action = " attacking on ";
    }
    updatePlayDescription ();
}

function scrumHandler (scrumWinner) {
    if (scrumWinner === '1-wins-scrum') {
        startSeries();
        game.possession = game.teamOne.name;
        updatePossession();
        newPossessionRow ();
        game.action = " attacking from "
        updatePlayDescription ();
        if (lastInfringement === game.teamTwo.name) { // scrum to team one
            game.teamOne.scrums.won = game.teamOne.scrums.won += 1;
        } else if (lastInfringement === game.teamOne.name) {
            game.teamOne.scrums.stolen = game.teamOne.scrums.stolen += 1;
            game.teamTwo.scrums.lost = game.teamTwo.scrums.lost += 1;
        }
    } else if (scrumWinner === '2-wins-scrum') {
        startSeries();
        game.possession = game.teamTwo.name;
        updatePossession();
        newPossessionRow ();
        game.action = " defending on "
        updatePlayDescription ();

        if (lastInfringement === game.teamOne.name) { // scrum to team two
            game.teamTwo.scrums.won = game.teamTwo.scrums.won += 1;
        } else if (lastInfringement === game.teamTwo.name) {
            game.teamTwo.scrums.stolen = game.teamTwo.scrums.stolen += 1;
            game.teamOne.scrums.lost = game.teamOne.scrums.lost += 1;
        }
    }
    else if (scrumWinner === 'neither-wins-scrum') {
        if (lastInfringement === game.teamOne.name) {
            game.teamTwo.scrums.unplayed = game.teamTwo.scrums.unplayed += 1
        } else if (lastInfringement === game.teamTwo.name) {
            game.teamOne.scrums.unplayed = game.teamOne.scrums.unplayed += 1
        }
    }
}

function failedScrumHandler (fscrumResult) {
    if (fscrumResult === 'fscrum-reset') {
    } else 
    if (fscrumResult === 'fscrum-pk-one') {
        lastInfringement = game.teamOne.name;
        game.teamOne.penalties.scrums = game.teamOne.penalties.scrums += 1;
    } else 
    if (fscrumResult === 'fscrum-pk-two') {
        lastInfringement = game.teamTwo.name;
        game.teamTwo.penalties.scrums = game.teamTwo.penalties.scrums += 1;
    } else 
    if (fscrumResult === 'fscrum-fk-one') {
        lastInfringement = game.teamOne.name;
        game.teamOne.freekicks.scrums = game.teamOne.freekicks.scrums += 1;
    } else 
    if (fscrumResult === 'fscrum-fk-two') {
        lastInfringement = game.teamTwo.name;
        game.teamTwo.freekicks.scrums = game.teamTwo.freekicks.scrums += 1;
    } 
}

function failedLineoutHandler (fscrumResult) {
    if (fscrumResult === 'flineout-reset') {
    } else 
    if (fscrumResult === 'flineout-not-straight') {
        if (lastInfringement === game.teamOne.name) // team two was original thrower
        {game.teamTwo.turnovers = game.teamTwo.turnovers += 1; // team two has turned it over
            lastInfringement = game.teamTwo.name} // team one will now through
        else if (lastInfringement === game.teamTwo.name)
        {game.teamOne.turnovers = game.teamOne.turnovers += 1;
            lastInfringement = game.teamOne.name}
        }
    if (fscrumResult === 'flineout-pk-one') {
        lastInfringement = game.teamOne.name;
        game.teamOne.penalties.scrums = game.teamOne.penalties.scrums += 1;
    } else 
    if (fscrumResult === 'flineout-pk-two') {
        lastInfringement = game.teamTwo.name;
        game.teamTwo.penalties.scrums = game.teamTwo.penalties.scrums += 1;
    } else 
    if (fscrumResult === 'flineout-fk-one') {
        lastInfringement = game.teamOne.name;
        game.teamOne.freekicks.scrums = game.teamOne.freekicks.scrums += 1;
    } else 
    if (fscrumResult === 'flineout-fk-two') {
        lastInfringement = game.teamTwo.name;
        game.teamTwo.freekicks.scrums = game.teamTwo.freekicks.scrums += 1;
    } 
}

function freekickChoiceHandler (fkChoice) {
    if (fkChoice === 'fk-quick-tap') {
        startSeries();
        if (lastInfringement === game.teamOne.name) {
            game.possession = game.teamTwo.name;
            updatePossession ();
            newPossessionRow ();
            updatePlayDescription ();
        } else if (lastInfringement === game.teamTwo.name) {
            game.possession = game.teamOne.name;
            updatePossession ();
            newPossessionRow ();
            updatePlayDescription ();}
        }
    else if (fkChoice === 'fk-to-touch') {
        if (lastInfringement === game.teamOne.name)
        {putOutOfPlay = game.teamTwo.name}
        else if (lastInfringement === game.teamTwo.name)
        {putOutOfPlay = game.teamOne.name}
    }
    else if (fkChoice === 'fk-kicked-in') {
    }
    else if (fkChoice === 'fk-scrum') {
    }
}