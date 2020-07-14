/* Master Stat Variables */
const actionAreas = {
    tackleTime: [],
    tackleArea: [],
    farLeft:0,
    centerLeft:0,
    centerRight:0,
    farRight:0
}

const teamOne = {
    name: 'Team 1',
    startsLeft: false,
    direction: ' the left.',
    inPossession: false,
    action: '',
    tries: 0,
    cons: {made:0, missed: 0},
    PGs: {made:0, missed:0},
    DGs: 0,
    score: 0,
    turnovers: 0,
    handlingErrors: 0,
    lostBreakdowns: 0,
    lineouts: {won:0, lost:0, stolen:0},
    scrums: {won:0, lost:0, stolen:0},
    penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0}
}

const teamTwo = {
    name: 'Team 2',
    startsLeft: false,
    direction: ' the right.',
    inPossession: false,
    action: '',
    tries: 0,
    cons: {made:0, missed: 0},
    PGs: {made:0, missed:0},
    DGs: 0,
    score: 0,
    turnovers: 0,
    handlingErrors: 0,
    lostBreakdowns: 0,
    lineouts: {won:0, lost:0, stolen:0},
    scrums: {won:0, lost:0, stolen:0},
    penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0}
}

var teamInPossession;
var teamOnDefense;

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

const possessionDirection = document.getElementById("poss-direction")
const teamInfoForm = document.getElementById("team-info-form")
const stopButton = document.getElementById("stop-button")
const restartButton = document.getElementById("restart-button")
const gameClock = document.getElementById("game-clock")
const startBox = document.getElementById("match-start-container")
const teamOneInput = document.getElementById("team-one")
const teamTwoInput = document.getElementById("team-two")
const recoverBox = document.getElementById("kick-recover-container")
const startsLeft = teamInfoForm.startSide.value
const kicking = teamInfoForm.kicking.value
const lineoutContainer = document.getElementById("lineout-container")
const scrumContainer = document.getElementById("scrum-container")
const scrumInfButton = document.getElementById("scrum-inf-event")
const scrumInfSubevents = document.getElementById("scrum-inf-subevents-container")
const freekickChoice = document.getElementById('freekick-choice-container')


const allTeamOneToReplace = document.getElementsByClassName("teamOneInputReplacer")
const allTeamTwoToReplace = document.getElementsByClassName("teamTwoInputReplacer")

function startWatch( ) {
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOne.name;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwo.name;};
    /* when seconds hits 60, change it to 0 instead and increase minutes by 1 */
    if ( seconds === 60 ) { seconds = 0; minutes = minutes + 1; } 
    /* when tenth of seconds hits 10, change it to 0 instead and increase seconds by 1 */
    if ( tenthseconds === 10) { tenthseconds = 0; seconds = seconds + 1; }
    /* put zeros in front of single-digit values for formatting */ 
    mins = ( minutes < 10 ) ? ( '0' + minutes + ':' ) : ( minutes + ':' ); 
    secs = ( seconds < 10 ) ? ( '0' + seconds + ':') : ( seconds + ':'); 
    tnthsecs = (tenthseconds < 10) ? ( '0' + tenthseconds) : (tenthseconds);
    /* display the stopwatch in the desired element*/
    gameClock.innerHTML = mins + secs + tnthsecs; 
    /* increase tenth of seconds value by 1 */ 
    tenthseconds++; 
    /* setTimeout() makes the function run every one-tenth of a second */
    clearTime = setTimeout( "startWatch( )", 100 ); 
}
function startTime(event) {
    event.preventDefault(); 
    teamOne.name = teamOneInput.value
    teamTwo.name = teamTwoInput.value
     if (tenthseconds === 0 && seconds === 0 && minutes === 0 ) { 
        
        startWatch( );
        startBox.style.display = "none";
        recoverBox.style.display = "block";
        const kicking = teamInfoForm.kicking.value;
        const startsLeft = teamInfoForm.startSide.value;
        if (kicking === 'one-kicks' && startsLeft === 'one-starts-left') {
            possessionDirection.innerHTML = teamOne.name + " will kick from the left.";}
        else if 
            (kicking === 'one-kicks' && startsLeft === 'two-starts-left') {
            possessionDirection.innerHTML = teamOne.name + " will kick from the right.";}
        else if 
            (kicking === 'two-kicks' && startsLeft === 'one-starts-left') {
            possessionDirection.innerHTML = teamOne.name + " will receive on the left.";}
        else if 
            (kicking === 'two-kicks' && startsLeft === 'two-starts-left') {
            possessionDirection.innerHTML = teamOne.name + " will receive on the right.";};
        
 }
        else { startWatch () }
             
            for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOne.name;};
            for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwo.name;};
}

function handleForm (event) { event.preventDefault() ; }

var allTeamInPossessionToReplace = document.getElementsByClassName("teamInPossessionReplacer")
var allTeamOnDefenseToReplace = document.getElementsByClassName("teamOnDefenseReplacer")

teamInfoForm.addEventListener('submit',function(event){event.preventDefault()});

function updateNames () {
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOne.name;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwo.name;};
}

function updatePossession () {
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession.value;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense.value;};
}

// teamInfoForm.addEventListener('submit', updateNames)
teamInfoForm.addEventListener('submit', startTime);
// teamInfoForm.addEventListener('submit',startTime);

function kickRecovered (teamRecovered) {
    recoverBox.style.display="none";
    if (teamRecovered === 'team-1-recovered') {
        possessionDirection.innerHTML = "";
        teamOne.inPossession = true;
        teamInPossession=teamOne.name;
        teamOnDefense=teamTwo.name;
        teamOne.action = " attacking from ";
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamOne.name;
    if (startsLeft === 'one-starts-left' && firstHalf === true) {
        teamOne.direction = " the left.";
        possessionDirection.innerHTML = teamOne.name+ teamOne.action + teamOne.direction;
    } else if (startsLeft === 'two-starts-left' && firstHalf === true) {
        teamOne.direction = " the right.";
        possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
    };
    } else if (teamRecovered === 'team-2-recovered') {
        possessionDirection.innerHTML = "";
        teamInPossession=teamTwo.name;
        teamOnDefense=teamOne.name;
        teamOne.inPossession = false;
        teamOne.action = " defending on ";
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamTwo.name;
        if (startsLeft === 'one-starts-left' && firstHalf === true) {
            teamOne.direction = " the left.";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            } else if (startsLeft === 'two-starts-left' && firstHalf === true) {
                teamOne.direction = " the right.";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        };} else if (teamRecovered === 'neither-recovered') {
    recoverBox.style.display="none";
}
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
}

function stopWatch( ) {clearTimeout(clearTime)};

stopButton.addEventListener('click',stopWatch);
restartButton.addEventListener('click', startTime)

/* ###############################
### Tackle Track Functionality ###
############################### */

function tackleHandler (tackleArea) {
    if (firstHalf === true) {
        if (tackleArea === 'far-left') {
            actionAreas.farLeft = actionAreas.farLeft += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs);
            actionAreas.tackleArea.push(tackleArea);
            document.getElementById("far-left").innerHTML = actionAreas.farLeft;
        } else
        if (tackleArea === 'center-left') {
            actionAreas.centerLeft = actionAreas.centerLeft += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs);
            actionAreas.tackleArea.push(tackleArea);
            document.getElementById("center-left").innerHTML = actionAreas.centerLeft;
        } else
        if (tackleArea === 'far-right') {
            actionAreas.farRight = actionAreas.farRight += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs);
            actionAreas.tackleArea.push(tackleArea);
            document.getElementById("far-right").innerHTML = actionAreas.farRight;
        } else
        if (tackleArea === 'center-right') {
            actionAreas.centerRight = actionAreas.centerRight += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs);
            actionAreas.tackleArea.push(tackleArea);
            document.getElementById("center-right").innerHTML = actionAreas.centerRight;
        }
        
        
        
        
        } 
    else if (firstHalf === false) {
        if (tackleArea === 'far-left') {
            actionAreas.farRight = actionAreas.farRight += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs)
            actionAreas.tackleArea.push('far-right')
        } else
        if (tackleArea === 'center-left') {
            actionAreas.centerRight = actionAreas.centerRight += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs)
            actionAreas.tackleArea.push('center-right')
        } else
        if (tackleArea === 'far-right') {
            actionAreas.farLeft = actionAreas.farLeft += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs)
            actionAreas.tackleArea.push('far-left')
        } else
        if (tackleArea === 'center-right') {
            actionAreas.centerLeft = actionAreas.centerLeft += 1;
            actionAreas.tackleTime.push(mins + secs + tnthsecs)
            actionAreas.tackleArea.push('center-left')
        }
        document.getElementById("far-left").innerHTML = actionAreas.farRight;
        document.getElementById("center-left").innerHTML = actionAreas.centerRight;
        document.getElementById("center-right").innerHTML = actionAreas.centerLeft;
        document.getElementById("far-right").innerHTML = actionAreas.farLeft;
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
const teamOneRestart = document.getElementById("team-1-restart")
const teamTwoRestart = document.getElementById("team-2-restart")
const neitherRestart = document.getElementById("neither-restart")
var lastScore = 'none';

function handleScoreButton () {
    scoreTypeContainer.style.display = "flex";
    scoreTypeContainer.style.flexWrap = "wrap";
    scoreTypeContainer.style.justifyContent = "space-around";
    var newPossessionRow = possessionTable.insertRow(1);
    var poss1 = newPossessionRow.insertCell(0);
    var poss2 = newPossessionRow.insertCell(1);
    poss1.innerHTML = mins + secs + tnthsecs;
    poss2.innerHTML = "None";
}

function scoreHandler(scoreType) {
    if (scoreType === 'try-scored' && teamOne.inPossession === true){
        scoreTypeContainer.style.display = "none";
        teamOne.tries = teamOne.tries += 1;
        teamOne.score = teamOne.score += 5;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        conContainer.style.display="block";
        lastScore = "teamOne";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamOne.name;
        score3.innerHTML = "Try";        

    } else if (scoreType === 'dropgoal-scored' && teamOne.inPossession === true) {
        scoreTypeContainer.style.display = "none";
        recoverBox.style.display = "block";
        teamOne.DGs = teamOne.DGs += 1;
        teamOne.score = teamOne.score += 3;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        lastScore = "teamOne";
        
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = "None";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamOne.name;
        score3.innerHTML = "Drop Goal";
    } else if (scoreType === 'try-scored' && teamOne.inPossession === false) {
        scoreTypeContainer.style.display = "none";
        teamTwo.tries = teamTwo.tries += 1;
        teamTwo.score = teamTwo.score += 5;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        conContainer.style.display="block";
        lastScore = "teamTwo";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamTwo.name;
        score3.innerHTML = "Try";

        conContainer.style.display = "block";

    } else if (scoreType === 'dropgoal-scored' && teamOne.inPossession === false) {
        scoreTypeContainer.style.display = "none";
        recoverBox.style.display = "block";
        teamTwo.DGs = teamTwo.DGs += 1;
        teamTwo.score = teamTwo.score += 3;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        lastScore = "teamTwo";
        
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = "None";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamTwo.name;
        score3.innerHTML = "Drop Goal";
    }
    else if (scoreType === 'cancel-score-type') {
        scoreTypeContainer.style.display="none";
    }
}

function conversionHandler (conversionSuccessful) {
    if (conversionSuccessful === 'try-converted' && lastScore === 'teamOne') {
        teamOne.cons.made = teamOne.cons.made += 1;
        teamOne.score = teamOne.score += 2;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        restartRecover.style.display="flex";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamOne.name;
        score3.innerHTML = "Conversion";
        conContainer.style.display="none";
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === 'teamOne') {
        conContainer.style.display="none";
        teamOne.cons.missed = teamOne.cons.missed += 1;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        restartRecover.style.display="flex";
    }
    else if (conversionSuccessful === 'try-converted' && lastScore === 'teamTwo') {
        conContainer.style.display="none";
        teamTwo.cons.made = teamTwo.cons.made += 1;
        teamTwo.score = teamTwo.score += 2;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        restartRecover.style.display="flex";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamTwo.name;
        score3.innerHTML = "Conversion";
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === 'teamTwo') {
        conContainer.style.display="none";
        teamTwo.cons.missed = teamTwo.cons.missed += 1;
        team1ScoreBox.innerHTML = teamOne.score;
        team2ScoreBox.innerHTML = teamTwo.score;
        restartRecover.style.display="flex";
    }
    conContainer.style.display="none";
}

function restartHandler (getsRestart) {
    if (getsRestart === 'team-1-restart') {
        possessionDirection.innerHTML = ""
        restartRecover.style.display="none";
        teamOne.inPossession = true;
        teamOne.action = " attacking from ";
        teamTwo.inPossession = false;
        teamInPossession=teamOne.name;
        teamOnDefense=teamTwo.name;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamOne.name;
        possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;

    } else if (getsRestart === 'team-2-restart') {
        possessionDirection.innerHTML = ""
        restartRecover.style.display="none";
        teamOne.inPossession = false;
        teamOne.action = " defending on ";
        teamTwo.inPossession = true;
        teamInPossession=teamTwo.name;
        teamOnDefense=teamOne.name;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamTwo.name;
        possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
    } else if (getsRestart === 'neither-restart') {
        restartRecover.style.display="none";
    } else if (getsRestart === 'cancel-restart') {
        restartRecover.style.display="none";
    } 
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
}

scoreButton.addEventListener('click',handleScoreButton)

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
    if (turnoverType === 'cancel-turnover') {
        turnoverSubevents.style.display="none";
    }
    else 
        {if (teamOne.inPossession === true && turnoverType === 'turnover-dropped') {
            teamOne.handlingErrors = teamOne.handlingErrors += 1
            teamOne.turnovers = teamOne.turnovers += 1
        } else if (teamOne.inPossession === true && turnoverType === 'turnover-breakdown') {
            teamOne.lostBreakdowns = teamOne.lostBreakdowns += 1
            teamOne.turnovers = teamOne.turnovers += 1
        } else if (teamOne.inPossession === true && turnoverType === 'turnover-intercept') {
            teamOne.turnovers = teamOne.turnovers += 1
        } else if (teamOne.inPossession === false && turnoverType === 'turnover-dropped') {
            teamTwo.handlingErrors = teamTwo.handlingErrors += 1
            teamTwo.turnovers = teamTwo.turnovers += 1
        } else if (teamOne.inPossession === false && turnoverType === 'turnover-breakdown') {
            teamTwo.lostBreakdowns = teamTwo.lostBreakdowns += 1
            teamTwo.turnovers = teamTwo.turnovers += 1
        } else if (teamOne.inPossession === false && turnoverType === 'turnover-intercept') {
            teamTwo.turnovers = teamTwo.turnovers += 1
        }
        if (teamOne.inPossession === true) { 
            teamOne.inPossession = false;
            teamInPossession = teamTwo.name;
            teamOnDefense = teamOne.name;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamInPossession;
            
            teamOne.action = " defending on ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            turnoverSubevents.style.display = "none";
        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            teamInPossession = teamOne.name;
            teamOnDefense = teamTwo.name;
            teamOne.action = " attacking from ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            turnoverSubevents.style.display = "none";
        }};
    
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
    }



const outofplayButton = document.getElementById("outofplay-event")
const outofplaySubevents = document.getElementById("ball-outofplay-subevents-container")

function handleOutOfPlay () {
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
    outofplaySubevents.style.display = "flex";
    outofplaySubevents.style.flexWrap = "wrap";
    outofplaySubevents.style.justifyContent = "space-around";
}

outofplayButton.addEventListener('click', handleOutOfPlay)

function lineoutHandler (lineoutWinner) {
    if (lineoutWinner === '1-wins-lineout') {
        if (teamOne.inPossession === true) {
            teamOne.lineouts.won = teamOne.lineouts.won += 1;
        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            teamInPossession = teamOne.name;
            teamOnDefense = teamTwo.name;
            teamOne.action = " attacking from ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            teamOne.lineouts.stolen = teamOne.lineouts.stolen += 1;
            teamTwo.lineouts.lost = teamTwo.lineouts.lost += 1;
        } lineoutContainer.style.display = "none";
    } else if (lineoutWinner === '2-wins-lineout') {
        if (teamOne.inPossession === false) {
            teamTwo.lineouts.won = teamTwo.lineouts.won += 1;
        } else if (teamOne.inPossession === true) {
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            teamInPossession = teamTwo.name;
            teamOnDefense = teamOne.name;
            teamOne.action = " defending on ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            teamTwo.lineouts.stolen = teamTwo.lineouts.stolen += 1;
            teamOne.lineouts.lost = teamOne.lineouts.lost += 1;
            
        } lineoutContainer.style.display = "none";
    } else if (lineoutWinner === 'cancel-lineout') {
    lineoutContainer.style.display = "none";
    }
}

function outOfPlayHandler (outOfPlayType) {
    if (outOfPlayType === 'cancel-out-of-play') {
        outofplaySubevents.style.display = "none";
    }
    if (outOfPlayType === "in-touch-offense" || outOfPlayType === 'kicked-touch' || outOfPlayType === 'in-touch-defense') {
        if (teamOne.inPossession === true) { teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            teamInPossession = teamTwo.name;
            teamOnDefense = teamOne.name;
            teamOne.action = " defending on ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            lineoutContainer.style.display = "block";
            outofplaySubevents.style.display="none";

        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            teamInPossession = teamOne.name;
            teamOnDefense = teamTwo.name;
            teamOne.action = " attacking from ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            lineoutContainer.style.display = "block";
            outofplaySubevents.style.display="none";

        };
    } else if (outOfPlayType === 'mark-called') {
            if (teamOne.inPossession === true) { teamOne.inPossession = false;
                var newPossessionRow = possessionTable.insertRow(1);
                var poss1 = newPossessionRow.insertCell(0);
                var poss2 = newPossessionRow.insertCell(1);
                poss1.innerHTML = mins + secs + tnthsecs;
                poss2.innerHTML = teamTwo.name;
                teamInPossession = teamTwo.name;
                teamOnDefense = teamOne.name;
                teamOne.action = " defending on ";
                possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
    
            } else if (teamOne.inPossession === false) {
                teamOne.inPossession = true;
                var newPossessionRow = possessionTable.insertRow(1);
                var poss1 = newPossessionRow.insertCell(0);
                var poss2 = newPossessionRow.insertCell(1);
                poss1.innerHTML = mins + secs + tnthsecs;
                poss2.innerHTML = teamOne.name;
                teamInPossession = teamOne.name;
                teamOnDefense = teamTwo.name;
                teamOne.action = " attacking from ";
                possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            } 
        document.getElementById("mark-choice-container").style.display = "block";
        outofplaySubevents.style.display="none";
    } else if (outOfPlayType === 'twenty-two') {
        if (teamOne.inPossession === true) { teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            teamInPossession = teamTwo.name;
            teamOnDefense = teamOne.name;
            teamOne.action = " defending on ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;

        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            teamInPossession = teamOne.name;
            teamOnDefense = teamTwo.name;
            teamOne.action = " attacking from ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        } 
        document.getElementById('kick-restart-recover-container').style.display = "block";
        outofplaySubevents.style.display="none";
    } else if (outOfPlayType === 'scrum-five') {
        scrumContainer.style.display="block";
        outofplaySubevents.style.display="none";
    }
}

function markChoiceHandler (markChoice) {
    if (markChoice === 'mark-quick-tap') {
        document.getElementById("mark-choice-container").style.display = "none";
    } else if (markChoice === 'mark-to-touch') {
        document.getElementById("mark-choice-container").style.display = "none";
        lineoutContainer.style.display = "block";
    } else if (markChoice === 'mark-kicked-in') {
        document.getElementById("mark-choice-container").style.display = "none";
        document.getElementById('kick-restart-recover-container').style.display = "block";
    }
}

const penaltyButton = document.getElementById("penalty-event")
const penaltySubevents = document.getElementById("penalty-subevents-container")
const penaltyChoice = document.getElementById("penalty-choice-container")
const penaltyGoal = document.getElementById("kick-at-goal-container")

function handlePenalty () {
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
    penaltySubevents.style.display = "flex";
    penaltySubevents.style.flexWrap = "wrap";
    penaltySubevents.style.justifyContent = "space-around";
}

penaltyButton.addEventListener('click', handlePenalty)
var lastPenalty = '';

function handlePenaltyType (penaltyType) {
    if (penaltyType === 'pen-ruck-one') {
        teamOne.penalties.ruck = teamOne.penalties.ruck += 1;
        lastPenalty = teamOne.name;
    }
    else if (penaltyType === 'pen-ruck-two') {
        teamTwo.penalties.ruck = teamTwo.penalties.ruck += 1;
        lastPenalty = teamTwo.name;
    }
    else if (penaltyType === 'pen-offsides-one') {
        teamOne.penalties.offsides = teamOne.penalties.offsides += 1;
        lastPenalty = teamOne.name;
    }
    else if (penaltyType === 'pen-offsides-two') {
        teamTwo.penalties.offsides = teamTwo.penalties.offsides += 1;
        lastPenalty = teamTwo.name;
    }
    else if (penaltyType === 'pen-dangerous-one') {
        teamOne.penalties.dangerous = teamOne.penalties.dangerous += 1;
        lastPenalty = teamOne.name;
    }
    else if (penaltyType === 'pen-dangerous-two') {
        teamTwo.penalties.dangerous= teamTwo.penalties.dangerous += 1;
        lastPenalty = teamTwo.name;
    }
    else if (penaltyType === 'pen-other-one') {
        teamOne.penalties.other = teamOne.penalties.other += 1;
        lastPenalty = teamOne.name;
    }
    else if (penaltyType === 'pen-other-two') {
        teamTwo.penalties.other = teamTwo.penalties.other += 1;
        lastPenalty = teamTwo.name;
    }
    document.getElementById("penalty-choice-container").style.display = "block";
    // document.getElementById("penalty-choice-container").style.flexWrap = "wrap";
    // document.getElementById("penalty-choice-container").style.justifyContent = "space-around";
    penaltySubevents.style.display = "none";
}

function pgHandler (pgResult) {
    if (pgResult === 'pg-successful') {
        // Add 'none' row to possession table
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = "None";
        if (teamOne.inPossession === true) {
            teamOne.PGs = teamOne.PGs += 1;
            teamOne.score = teamOne.score += 3;
            team1ScoreBox.innerHTML = teamOne.score;
            team2ScoreBox.innerHTML = teamTwo.score;
            restartRecover.style.display="flex";

            var newScoreRow = scoreTable.insertRow(1);
            var score1 = newScoreRow.insertCell(0);
            var score2 = newScoreRow.insertCell(1);
            var score3 = newScoreRow.insertCell(2);
            score1.innerHTML = mins + secs + tnthsecs;
            score2.innerHTML = teamOne.name;
            score3.innerHTML = "Penalty Goal";
            penaltyGoal.style.display = "none";
        } else if (teamOne.inPossession === false) {
            teamTwo.PGs = teamTwo.PGs += 1;
            teamTwo.score = teamTwo.score += 3;
            team1ScoreBox.innerHTML = teamOne.score;
            team2ScoreBox.innerHTML = teamTwo.score;
            restartRecover.style.display="flex";

            var newScoreRow = scoreTable.insertRow(1);
            var score1 = newScoreRow.insertCell(0);
            var score2 = newScoreRow.insertCell(1);
            var score3 = newScoreRow.insertCell(2);
            score1.innerHTML = mins + secs + tnthsecs;
            score2.innerHTML = teamTwo.name;
            score3.innerHTML = "Penalty Goal";
            penaltyGoal.style.display = "none";
        }
    } else if (pgResult === 'pg-to-twenty-two') {
        if (teamOne.inPossession === true) {
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.PGs.missed = teamOne.PGs.missed += 1;
            restartRecover.style.display = "flex";
            penaltyGoal.style.display = "none";
        }
        else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamTwo.PGs.missed = teamOne.PGs.missed += 1;
            restartRecover.style.display = "flex";
            penaltyGoal.style.display = "none";
        };
    } else if (pgResult === 'pg-one-recovers') {
        if (teamOne.inPossession === true) {
            teamOne.PGs.missed = teamOne.PGs.missed + 1;
        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            teamTwo.PGs.missed = teamTwo.PGs.missed + 1;
        }
        penaltyGoal.style.display = "none";
    }
    else if (pgResult === 'pg-two-recovers') {
        if (teamOne.inPossession === true) {
            teamOne.inPossession = false;
            teamOne.PGs.missed = teamOne.PGs.missed + 1;
        } else if (teamOne.inPossession === false) {
            teamTwo.PGs.missed = teamTwo.PGs.missed + 1;
        }
        penaltyGoal.style.display = "none";
    } else {penaltyGoal.style.display = "none";}
    
}

function penaltyChoiceHandler(pkChoice) {
    if (pkChoice === 'pk-quick-tap') {
        if (lastPenalty === teamOne.name) {
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        } else if (lastPenalty === teamTwoname) {
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        }
        penaltyChoice.style.display = "none";
    }
    else if (pkChoice === 'pk-at-goal') {
        penaltyChoice.style.display = "none";
        penaltyGoal.style.display = "block";
    }
    else if (pkChoice === 'pk-to-touch') {
        penaltyChoice.style.display = "none";
        lineoutContainer.style.display = "block";
    }
    else if (pkChoice === 'pk-kicked-in') {
        penaltyChoice.style.display = "none";
        restartRecover.style.display="flex";
    }
    else if (pkChoice === 'pk-scrum') {
        penaltyChoice.style.display = "none";
        scrumContainer.style.display = "block";
    }
}

function scrumHandler (scrumWinner) {
    if (scrumWinner === '1-wins-scrum') {
        if (teamOne.inPossession === true) {
            teamOne.scrums.won = teamOne.scrums.won += 1;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
        } else if (teamOne.inPossession === false) {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            teamInPossession = teamOne.name;
            teamOnDefense = teamTwo.name;
            teamOne.action = " attacking from ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            teamOne.scrums.stolen = teamOne.scrums.stolen += 1;
            teamTwo.scrums.lost = teamTwo.scrums.lost += 1;
        }
    } else if (scrumWinner === '2-wins-scrum') {
        if (teamOne.inPossession === false) {
            teamTwo.scrums.won = teamTwo.scrums.won += 1;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
        } else if (teamOne.inPossession === true) {
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            teamInPossession = teamTwo.name;
            teamOnDefense = teamOne.name;
            teamOne.action = " defending on ";
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
            teamTwo.scrums.stolen = teamTwo.scrums.stolen += 1;
            teamOne.scrums.lost = teamOne.scrums.lost += 1;
        }
    }
    else if (scrumWinner === 'neither-wins-scrum') {
        document.getElementById("failed-scrum-container").style.display = "flex";
    }

    scrumContainer.style.display = "none";
}

function handleScrumButton () {
    scrumInfSubevents.style.display = "block";
}

scrumContainer
scrumInfButton.addEventListener('click',handleScrumButton)

function scrumCauseHandler (scrumCause) {
    scrumContainer.style.display = "block";
    if (scrumCause === 'scrum-knock-one'){
        teamOne.handlingErrors = teamOne.handlingErrors += 1;
        teamOne.turnovers = teamOne.turnovers += 1;
        if (teamOne.inPossession === true) {
        teamOne.inPossession = false;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = "None";
        teamOne.action = " defending on " ;
        teamTwo.inPossession = true;
        } else {
        }
    } else 
    if (scrumCause === 'scrum-knock-two'){
        teamTwo.handlingErrors = teamTwo.handlingErrors += 1;
        teamTwo.turnovers = teamTwo.turnovers += 1;
        if (teamOne.inPossession === true) {
        } else {
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " attacking from ";
            teamTwo.inPossession = false;
        }
    } else 
    if (scrumCause === 'scrum-forward-pass') {
        if (teamOne.inPossession === true) {
            teamOne.handlingErrors = teamOne.handlingErrors += 1;
            teamOne.turnovers = teamOne.turnovers += 1;
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " defending on ";
            teamTwo.inPossession = true;
        } else 
        if (teamOne.inPossession === false) {
            teamTwo.handlingErrors = teamTwo.handlingErrors += 1;
            teamTwo.turnovers = teamTwo.turnovers += 1;
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " attacking from ";
            teamTwo.inPossession = false;
        }
    } else
    if (scrumCause === 'scrum-offsides-one') {
        if (teamOne.inPossession === true) {
            teamOne.turnovers = teamOne.turnovers += 1;
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " defending on ";
            teamTwo.inPossession = true;
        } else {
        }
    } else
    if (scrumCause === 'scrum-offsides-two') {
        if (teamOne.inPossession === true) {
        } else {
            teamTwo.turnovers = teamTwo.turnovers += 1;
            teamTwo.inPossession = false;
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " attacking from ";
        }
    } else
    if (scrumCause === 'scrum-unplayable-attack') {
        if (teamOne.inPossession === true) {
        } else {}
    } else
    if (scrumCause === 'scrum-unplayable-defense') {
        if (teamOne.inPossession === true) {
            teamOne.turnovers = teamOne.turnovers += 1;
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " defending on ";
            teamTwo.inPossession = true;
        } else {
            teamTwo.turnovers = teamTwo.turnovers += 1;
            teamTwo.inPossession = false;
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " attacking from ";
        }
    } else
    if (scrumCause === 'scrum-other-one') {
        if (teamOne.inPossession === true) {}
        else {
            teamTwo.turnovers = teamTwo.turnovers += 1;
            teamTwo.inPossession = false;
            teamOne.inPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " attacking from ";
     }
    } else
    if (scrumCause === 'scrum-other-two') {
        if (teamOne.inPossession === true) {
            teamOne.turnovers = teamOne.turnovers += 1;
            teamOne.inPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOne.action = " defending on ";
            teamTwo.inPossession = true;
        } else {}
    }
    possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
    scrumInfSubevents.style.display = "none";
}

const fscrumContainer = document.getElementById("failed-scrum-container")

function failedScrumHandler (fscrumResult) {
    
    if (fscrumResult === 'fscrum-reset') {
        scrumContainer.style.display = "flex";
        fscrumContainer.style.display="none";
    } else 
    if (fscrumResult === 'fscrum-pk-one') {
        lastPenalty = teamOne.name;
        teamOne.penalties.scrums = teamOne.penalties.scrums += 1;
        penaltyChoice.style.display = "flex";
        fscrumContainer.style.display="none";
    } else 
    if (fscrumResult === 'fscrum-pk-two') {
        lastPenalty = teamTwo.name;
        teamOne.penalties.scrums = teamOne.penalties.scrums += 1;
        penaltyChoice.style.display = "flex";
        fscrumContainer.style.display="none";
    } else 
    if (fscrumResult === 'fscrum-fk-one') {
        lastPenalty = teamOne.name;
        freekickChoice.style.display = "flex";
        fscrumContainer.style.display="none";
    } else 
    if (fscrumResult === 'fscrum-fk-two') {
        lastPenalty = teamTwo.name;
        freekickChoice.style.display = "flex";
        fscrumContainer.style.display="none";
    } 
}

function freekickChoiceHandler (fkChoice) {
    if (fkChoice === 'fk-quick-tap') {
        if (lastPenalty === teamOne.name) {
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwo.name;
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        } else if (lastPenalty === teamTwoname) {
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOne.name;
            possessionDirection.innerHTML = teamOne.name + teamOne.action + teamOne.direction;
        }
        freekickChoice.style.display = "none";
    }
    else if (fkChoice === 'fk-to-touch') {
        freekickChoice.style.display = "none";
        lineoutContainer.style.display = "block";
    }
    else if (fkChoice === 'fk-kicked-in') {
        freekickChoice.style.display = "none";
        restartRecover.style.display="flex";
    }
    else if (fkChoice === 'fk-scrum') {
        freekickChoice.style.display = "none";
        scrumContainer.style.display = "block";
    }
}