function updatePossession () {
    for (i=0; i < allTeamInPossessionToReplace.length; i++) {allTeamInPossessionToReplace[i].innerHTML = " " + game.possession;};
}

function updatePlayDescription () {
    if (startsLeft === 'one-starts-left' && firstHalf === true) {
        game.direction = " the left.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    } else if (startsLeft === 'two-starts-left' && firstHalf === true) {
        game.direction = " the right.";
        possessionDirection.innerHTML = game.teamOne.name + game.action + game.direction;
    }; }

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

function possessionToggle () {
    if (game.possession === game.teamOne.name){
        game.possesion = game.teamTwo.name
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

updatePlayDescription();
updatePossession();