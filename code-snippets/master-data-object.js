const game = {
    possession: 'None',
    direction: '',
    tackles: {count: 0,time: [],quadrant: [],q1: 0,q2: 0,q3: 0,q4: 0},
    teamOne: {
        name: 'Team 1',
        startsLeft: false,
        action: '',
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
        scrms: {won:0, lost:0, stolen:0},
        penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0}
    },
    teamTwo: {
        name: 'Team 1',
        startsLeft: false,
        action: '',
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
        scrms: {won:0, lost:0, stolen:0},
        penalties: {rucks:0, scrums:0, lineouts:0, offsides:0, dangerous:0, other:0}
    }
}