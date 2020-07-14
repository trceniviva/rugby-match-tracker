/* Master Stat Variables */



var teamOneTries = 0;
var teamOneCons = 0;
var teamOneConsMissed = 0;
var teamOnePGs = 0;
var teamOnePGsMissed = 0;
var teamOneDGs = 0;
var teamOneScore = 0;
var teamOneTurnovers = 0;
var teamOneHandlingErrors = 0;
var teamOneLostBreakdowns = 0;
var teamOneLineoutsFor = 0;
var teamOneLineoutsWon = 0;
var teamOneLineoutsLost = 0;
var teamOneLineoutsStolen = 0;
var teamOnePenalties = 0;
var teamOneRuckPens = 0;
var teamOneOffsidesPens = 0;
var teamOneDangerousPens = 0;
var teamOneOtherPens = 0;

var teamTwoTries = 0;
var teamTwoCons = 0;
var teamTwoConsMissed = 0;
var teamTwoPGs = 0;
var teamTwoPGsMissed = 0;
var teamTwoDGs = 0;
var teamTwoScore = 0;
var teamTwoTurnovers = 0;
var teamTwoHandlingErrors = 0;
var teamTwoLostBreakdowns = 0;
var teamTwoLineoutsFor = 0;
var teamTwoLineoutsWon = 0;
var teamTwoLineoutsLost = 0;
var teamTwoLineoutsStolen = 0;
var teamTwoPenalties = 0;
var teamTwoPenalties = 0;
var teamTwoRuckPens = 0;
var teamTwoOffsidesPens = 0;
var teamTwoDangerousPens = 0;
var teamTwoOtherPens = 0;

var teamOneInPossession = true;
var teamOneAction;
var teamOneDirection;
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

const allTeamOneToReplace = document.getElementsByClassName("teamOneInputReplacer")
const allTeamTwoToReplace = document.getElementsByClassName("teamTwoInputReplacer")

function startWatch( ) {
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOneInput.value;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwoInput.value;};
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
function startTime() { 
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOneInput.value;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwoInput.value;};
     if (tenthseconds === 0 && seconds === 0 && minutes === 0 ) { 
        
        startWatch( );
        startBox.style.display = "none";
        recoverBox.style.display = "block";
        const kicking = teamInfoForm.kicking.value;
        const startsLeft = teamInfoForm.startSide.value;
        if (kicking === 'one-kicks' && startsLeft === 'one-starts-left') {
            possessionDirection.innerHTML = teamOneInput.value + " will kick from the left.";}
        else if 
            (kicking === 'one-kicks' && startsLeft === 'two-starts-left') {
            possessionDirection.innerHTML = teamOneInput.value + " will kick from the right.";}
        else if 
            (kicking === 'two-kicks' && startsLeft === 'one-starts-left') {
            possessionDirection.innerHTML = teamOneInput.value + " will receive on the left.";}
        else if 
            (kicking === 'two-kicks' && startsLeft === 'two-starts-left') {
            possessionDirection.innerHTML = teamOneInput.value + " will receive on the right.";};
        
 }
 else { startWatch () }
     } 

function handleForm (event) { event.preventDefault() ; }

var allTeamInPossessionToReplace = document.getElementsByClassName("teamInPossessionReplacer")
var allTeamOnDefenseToReplace = document.getElementsByClassName("teamOnDefenseReplacer")

teamInfoForm.addEventListener('submit',function(event){event.preventDefault()});

function updateNames () {
    for (i=0; i < allTeamOneToReplace.length; i++) {allTeamOneToReplace[i].innerHTML = " " + teamOneInput.value;};
    for (i=0; i < allTeamTwoToReplace.length; i++) {allTeamTwoToReplace[i].innerHTML = " " + teamTwoInput.value;};
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
        possessionDirection.innerHTML = ""
    teamInPossession=teamOneInput.value;
    teamOnDefense=teamTwoInput.value;
    teamOneInPossession = true;
    teamOneAction = " attacking from ";
    var newPossessionRow = possessionTable.insertRow(1);
    var poss1 = newPossessionRow.insertCell(0);
    var poss2 = newPossessionRow.insertCell(1);
    poss1.innerHTML = mins + secs + tnthsecs;
    poss2.innerHTML = teamOneInput.value;
    if (startsLeft === 'one-starts-left' && firstHalf === true) {
        teamOneDirection = " the left.";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
    } else if (startsLeft === 'two-starts-left' && firstHalf === true) {
        teamOneDirection = " the right.";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
    };
    } else if (teamRecovered === 'team-2-recovered') {possessionDirection.innerHTML = ""
    teamInPossession=teamTwoInput.value;
    teamOnDefense=teamOneInput.value;
    teamOneInPossession = false;
    teamOneAction = " defending on ";
    var newPossessionRow = possessionTable.insertRow(1);
    var poss1 = newPossessionRow.insertCell(0);
    var poss2 = newPossessionRow.insertCell(1);
    poss1.innerHTML = mins + secs + tnthsecs;
    poss2.innerHTML = teamTwoInput.value;
    if (startsLeft === 'one-starts-left' && firstHalf === true) {
        teamOneDirection = " the left.";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
        } else if (startsLeft === 'two-starts-left' && firstHalf === true) {
            teamOneDirection = " the right.";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
        };} else if (teamRecovered === 'neither-recovered') {
    recoverBox.style.display="none";
}
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + teamInPossession;};
    for (i=0; i < allTeamOnDefenseToReplace.length; i++) {allTeamOnDefenseToReplace[i].innerHTML = " " + teamOnDefense;};
}

function stopWatch( ) {clearTimeout(clearTime)};

stopButton.addEventListener('click',stopWatch);
restartButton.addEventListener('click', startTime)

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
var lastScore;

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
    if (scoreType === 'try-scored' && teamOneInPossession === true){
        scoreTypeContainer.style.display = "none";
        teamOneTries = teamOneTries + 1;
        teamOneScore = teamOneScore + 5;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        conContainer.style.display="block";
        lastScore = "teamOne";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamOneInput.value;
        score3.innerHTML = "Try";        

    } else if (scoreType === 'dropgoal-scored' && teamOneInPossession === true) {
        scoreTypeContainer.style.display = "none";
        recoverBox.style.display = "block";
        teamOneDGs = teamOneDGs + 1;
        teamOneScore = teamOneScore + 3;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
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
        score2.innerHTML = teamOneInput.value;
        score3.innerHTML = "Drop Goal";
    } else if (scoreType === 'try-scored' && teamOneInPossession === false) {
        scoreTypeContainer.style.display = "none";
        teamTwoTries = teamTwoTries + 1;
        teamTwoScore = teamTwoScore + 5;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        conContainer.style.display="block";
        lastScore = "teamTwo";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamTwoInput.value;
        score3.innerHTML = "Try";

        conContainer.style.display = "block";

    } else if (scoreType === 'dropgoal-scored' && teamOneInPossession === false) {
        scoreTypeContainer.style.display = "none";
        recoverBox.style.display = "block";
        teamTwoDGs = teamTwoDGs + 1;
        teamTwoScore = teamTwoScore + 3;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
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
        score2.innerHTML = teamTwoInput.value;
        score3.innerHTML = "Drop Goal";
    }
}

function conversionHandler (conversionSuccessful) {
    if (conversionSuccessful === 'try-converted' && lastScore === 'teamOne') {
        conContainer.style.display="none";
        teamOneCons = teamOneCons + 1;
        teamOneScore = teamOneScore + 2;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        restartRecover.style.display="flex";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamOneInput.value;
        score3.innerHTML = "Conversion";
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === 'teamOne') {
        conContainer.style.display="none";
        teamOneConsMissed = teamOneConsMissed + 1;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        restartRecover.style.display="flex";
    }
    else if (conversionSuccessful === 'try-converted' && lastScore === 'teamTwo') {
        conContainer.style.display="none";
        teamTwoCons = teamTwoCons + 1;
        teamTwoScore = teamTwoScore + 2;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        restartRecover.style.display="flex";

        var newScoreRow = scoreTable.insertRow(1);
        var score1 = newScoreRow.insertCell(0);
        var score2 = newScoreRow.insertCell(1);
        var score3 = newScoreRow.insertCell(2);
        score1.innerHTML = mins + secs + tnthsecs;
        score2.innerHTML = teamTwoInput.value;
        score3.innerHTML = "Conversion";
    }
    else if (conversionSuccessful === 'con-missed' && lastScore === 'teamTwo') {
        conContainer.style.display="none";
        teamTwoConsMissed = teamTwoConsMissed + 1;
        team1ScoreBox.innerHTML = teamOneScore;
        team2ScoreBox.innerHTML = teamTwoScore;
        restartRecover.style.display="flex";
    }
    conContainer.style.display="none";
}

function restartHandler (getsRestart) {
    updatePossession;
    if (getsRestart === 'team-1-restart') {
        possessionDirection.innerHTML = ""
        restartRecover.style.display="none";
        teamOneInPossession = true;
        teamInPossession=teamOneInput.value;
        teamOnDefense=teamTwoInput.value;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamOneInput.value;

    } else if (getsRestart === 'team-2-restart') {
        possessionDirection.innerHTML = ""
        restartRecover.style.display="none";
        teamOneInPossession = false;
        teamInPossession=teamTwoInput.value;
        teamOnDefense=teamOneInput.value;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamTwoInput.value;
    } else if (getsRestart === 'neither-restart') {
        restartRecover.style.display="none";
    }
    possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
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
    if (teamOneInPossession === true && turnoverType === 'turnover-dropped') {
        teamOneHandlingErrors = teamOneHandlingErrors + 1
        teamOneTurnovers = teamOneTurnovers + 1
    } else if (teamOneInPossession === true && turnoverType === 'turnover-breakdown') {
        teamOneLostBreakdowns = teamOneLostBreakdowns + 1
        teamOneTurnovers = teamOneTurnovers + 1
    } else if (teamOneInPossession === true && turnoverType === 'turnover-intercept') {
        teamOneTurnovers = teamOneTurnovers + 1
    } else if (teamOneInPossession === false && turnoverType === 'turnover-dropped') {
        teamTwoHandlingErrors = teamTwoHandlingErrors + 1
        teamTwoTurnovers = teamTwoTurnovers + 1
    } else if (teamOneInPossession === false && turnoverType === 'turnover-breakdown') {
        teamTwoLostBreakdowns = teamTwoLostBreakdowns + 1
        teamTwoTurnovers = teamTwoTurnovers + 1
    } else if (teamOneInPossession === false && turnoverType === 'turnover-intercept') {
        teamTwoTurnovers = teamTwoTurnovers + 1
    }
    if (teamOneInPossession === true) { teamOneInPossession = false;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamTwoInput.value;
        teamInPossession = teamTwoInput.value;
        teamOnDefense = teamOneInput.value;
        teamOneAction = " defending on ";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
    } else if (teamOneInPossession === false) {
        teamOneInPossession = true;
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = teamOneInput.value;
        teamInPossession = teamOneInput.value;
        teamOnDefense = teamTwoInput.value;
        teamOneAction = " attacking from ";
        possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
    };
    turnoverSubevents.style.display = "none";
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
        if (teamOneInPossession === true) {
            teamOneLineoutsWon = teamOneLineoutsWon + 1;
        } else if (teamOneInPossession === false) {
            teamOneInPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOneInput.value;
            teamInPossession = teamOneInput.value;
            teamOnDefense = teamTwoInput.value;
            teamOneAction = " attacking from ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
            teamOneLineoutsStolen = teamOneLineoutsStolen + 1;
            teamTwoLineoutsLost = teamTwoLineoutsLost + 1;
        }
    } else if (lineoutWinner === '2-wins-lineout') {
        if (teamOneInPossession === false) {
            teamTwoLineoutsWon = teamTwoLineoutsWon + 1;
        } else if (teamOneInPossession === true) {
            teamOneInPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwoInput.value;
            teamInPossession = teamTwoInput.value;
            teamOnDefense = teamOneInput.value;
            teamOneAction = " defending on ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
            teamTwoLineoutsStolen = teamTwoLineoutsStolen + 1;
            teamOneLineoutsLost = teamOneLineoutsLost + 1;
        }
    }
    document.getElementById("lineout-container").style.display = "none";
}

function outOfPlayHandler (outOfPlayType) {
    // updatePossession;
    if (outOfPlayType === "in-touch-offense" || outOfPlayType === 'kicked-touch' || outOfPlayType === 'in-touch-defense') {
        if (teamOneInPossession === true) { teamOneInPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwoInput.value;
            teamInPossession = teamTwoInput.value;
            teamOnDefense = teamOneInput.value;
            teamOneAction = " defending on ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
            lineoutContainer.style.display = "block";

            teamTwoLineoutsFor = teamTwoLineoutsFor + 1;

        } else if (teamOneInPossession === false) {
            teamOneInPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOneInput.value;
            teamInPossession = teamOneInput.value;
            teamOnDefense = teamTwoInput.value;
            teamOneAction = " attacking from ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
            lineoutContainer.style.display = "block";

            teamOneLineoutsFor = teamOneLineoutsFor + 1;

        };
    } else if (outOfPlayType === 'mark-called') {
            if (teamOneInPossession === true) { teamOneInPossession = false;
                var newPossessionRow = possessionTable.insertRow(1);
                var poss1 = newPossessionRow.insertCell(0);
                var poss2 = newPossessionRow.insertCell(1);
                poss1.innerHTML = mins + secs + tnthsecs;
                poss2.innerHTML = teamTwoInput.value;
                teamInPossession = teamTwoInput.value;
                teamOnDefense = teamOneInput.value;
                teamOneAction = " defending on ";
                possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
    
            } else if (teamOneInPossession === false) {
                teamOneInPossession = true;
                var newPossessionRow = possessionTable.insertRow(1);
                var poss1 = newPossessionRow.insertCell(0);
                var poss2 = newPossessionRow.insertCell(1);
                poss1.innerHTML = mins + secs + tnthsecs;
                poss2.innerHTML = teamOneInput.value;
                teamInPossession = teamOneInput.value;
                teamOnDefense = teamTwoInput.value;
                teamOneAction = " attacking from ";
                possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
            } 
        document.getElementById("mark-choice-container").style.display = "block";
    } else if (outOfPlayType === 'twenty-two') {
        if (teamOneInPossession === true) { teamOneInPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamTwoInput.value;
            teamInPossession = teamTwoInput.value;
            teamOnDefense = teamOneInput.value;
            teamOneAction = " defending on ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;

        } else if (teamOneInPossession === false) {
            teamOneInPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = teamOneInput.value;
            teamInPossession = teamOneInput.value;
            teamOnDefense = teamTwoInput.value;
            teamOneAction = " attacking from ";
            possessionDirection.innerHTML = teamOneInput.value + teamOneAction + teamOneDirection;
        } 
        document.getElementById('kick-restart-recover-container').style.display = "block";
    } else if (outOfPlayType === 'scrum-five') {
        scrumContainer.style.display="block";
    }
    
    outofplaySubevents.style.display="none";
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


function handlePenaltyType (penaltyType) {
    if (penaltyType === 'pen-ruck-one') {
        teamOnePenalties = teamOnePenalties + 1;
        teamOneRuckPens = teamOneRuckPens + 1;
    }
    else if (penaltyType === 'pen-ruck-two') {
        teamTwoPenalties = teamTwoPenalties + 1;
        teamTwoRuckPens = teamTwoRuckPens + 1;
    }
    else if (penaltyType === 'pen-offsides-one') {
        teamOnePenalties = teamOnePenalties + 1;
        teamOneOffsidesPens = teamOneOffsidesPens + 1;
    }
    else if (penaltyType === 'pen-offsides-two') {
        teamTwoPenalties = teamTwoPenalties + 1;
        teamTwoOffsidesPens = teamTwoOffsidesPens + 1;
    }
    else if (penaltyType === 'pen-dangerous-one') {
        teamOnePenalties = teamOnePenalties + 1;
        teamOneDangerousPens = teamOneDangerousPens + 1;
    }
    else if (penaltyType === 'pen-dangerous-two') {
        teamTwoPenalties = teamTwoPenalties + 1;
        teamTwoDangerousPens = teamTwoDangerousPens + 1;
    }
    else if (penaltyType === 'pen-other-one') {
        teamOnePenalties = teamOnePenalties + 1;
        teamOneOtherPens = teamOneOtherPens + 1;
    }
    else if (penaltyType === 'pen-other-two') {
        teamTwoPenalties = teamTwoPenalties + 1;
        teamTwoOtherPens = teamTwoOtherPens + 1;
    }
    document.getElementById("penalty-choice-container").style.display = "block";
    // document.getElementById("penalty-choice-container").style.flexWrap = "wrap";
    // document.getElementById("penalty-choice-container").style.justifyContent = "space-around";
    penaltySubevents.style.display = "none";
    document.get
}

function pgHandler (pgResult) {
    if (pgResult === 'pg-successful') {
        // Add 'none' row to possession table
        var newPossessionRow = possessionTable.insertRow(1);
        var poss1 = newPossessionRow.insertCell(0);
        var poss2 = newPossessionRow.insertCell(1);
        poss1.innerHTML = mins + secs + tnthsecs;
        poss2.innerHTML = "None";
        if (teamOneInPossession === true) {
            teamOnePGs = teamOnePGs + 1;
            teamOneScore = teamOneScore + 3;
            team1ScoreBox.innerHTML = teamOneScore;
            team2ScoreBox.innerHTML = teamTwoScore;
            restartRecover.style.display="flex";

            var newScoreRow = scoreTable.insertRow(1);
            var score1 = newScoreRow.insertCell(0);
            var score2 = newScoreRow.insertCell(1);
            var score3 = newScoreRow.insertCell(2);
            score1.innerHTML = mins + secs + tnthsecs;
            score2.innerHTML = teamOneInput.value;
            score3.innerHTML = "Penalty Goal";
        } else if (teamOneInPossession === false) {
            teamTwoPGs = teamTwoGs + 1;
            teamTwoScore = teamTwoScore + 3;
            team1ScoreBox.innerHTML = teamOneScore;
            team2ScoreBox.innerHTML = teamTwoScore;
            restartRecover.style.display="flex";

            var newScoreRow = scoreTable.insertRow(1);
            var score1 = newScoreRow.insertCell(0);
            var score2 = newScoreRow.insertCell(1);
            var score3 = newScoreRow.insertCell(2);
            score1.innerHTML = mins + secs + tnthsecs;
            score2.innerHTML = teamTwoInput.value;
            score3.innerHTML = "Penalty Goal";
        }
    } else if (pgResult === 'pg-to-twenty-two') {
        if (teamOneInPossession === true) {
            teamOneInPossession = false;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamOnePGsMissed = teamOnePGsMissed + 1;
            restartRecover.style.display = "flex";
        }
        else if (teamOneInPossession === false) {
            teamOneInPossession = true;
            var newPossessionRow = possessionTable.insertRow(1);
            var poss1 = newPossessionRow.insertCell(0);
            var poss2 = newPossessionRow.insertCell(1);
            poss1.innerHTML = mins + secs + tnthsecs;
            poss2.innerHTML = "None";
            teamTwoPGsMissed = teamOnePGsMissed + 1;
            restartRecover.style.display = "flex";
        };
    } else if (pgResult === 'pg-one-recovers') {
        if (teamOneInPossession === true) {
            teamOnePGsMissed = teamOnePGsMissed + 1;
        } else if (teamOneInPossession === false) {
            teamOneInPossession = true;
            teamTwoPGsMissed = teamTwoPGsMissed + 1;
        }
    }
    else if (pgResult === 'pg-two-recovers') {
        if (teamOneInPossession === true) {
            teamOneInPossession = false;
            teamOnePGsMissed = teamOnePGsMissed + 1;
        } else if (teamOneInPossession === false) {
            teamTwoPGsMissed = teamTwoPGsMissed + 1;
        }
    }
    penaltyGoal.style.display = "none";
}

function penaltyChoiceHandler(pkChoice) {
    if (pkChoice === 'pk-quick-tap') {
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

const scrumInfButton = document.getElementById("scrum-inf-event")
const scrumInfSubevents = document.getElementById("scrum-inf-subevents-container")