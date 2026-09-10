function startMode(mode) {
// Main Menu hide kar dein
document.getElementById('main-menu').style.display = 'none';

if (mode === 'local') {
console.log("Local 4-Player mode started");
// Purana game reset/start function yahan call karein
} else if (mode === 'online') {
alert("Online Multiplayer is coming next! Pehle backend setup karenge.");
} else if (mode === 'bot') {
alert("Computer Bot mode target is selected.");
}
}

function toggleSettings() {
alert("Settings menu opens (Sound / Theme)");
}
// Game Mode State Variable
let isTeamMode = false;

function startMode(mode) {
document.getElementById('main-menu').style.display = 'none';
document.getElementById('exit-btn').style.display = 'block'; // Show Exit button in-game

if (mode === 'local_4p') {
isTeamMode = false;
console.log("Normal 4-Player Mode Started");
} else if (mode === 'team_2v2') {
isTeamMode = true;
alert("2v2 Team Mode Active!\nTeam 1: Red & Yellow\nTeam 2: Green & Blue\nTeammates cannot capture each other's pawns!");
} else if (mode === 'online') {
alert("Online Multiplayer functionality coming next!");
}
}

// In-Game Mid Exit Logic
function exitToMenu() {
const confirmExit = confirm("Are you sure you want to exit to the Main Menu?");
if (confirmExit) {
document.getElementById('main-menu').style.display = 'flex';
document.getElementById('exit-btn').style.display = 'none';

// Optional: Reset your board state here
if (typeof resetGameBoard === "function") {
resetGameBoard();
}
}
}

// Team Capture Validation Logic (Call this inside your pawn capture logic)
function canCapturePawn(attackerColor, targetColor) {
// Normal Mode: Har koi ek doosre ki goti maar sakta hai
if (!isTeamMode) {
return attackerColor !== targetColor;
}

// Team Mode: Red & Yellow team, Green & Blue team
const team1 = ['red', 'yellow'];
const team2 = ['green', 'blue'];

if (team1.includes(attackerColor) && team1.includes(targetColor)) {
return false; // Teammate: Goti nahi maar sakte
}
if (team2.includes(attackerColor) && team2.includes(targetColor)) {
return false; // Teammate: Goti nahi maar sakte
}

return true; // Dushman team: Goti maar sakte hain
}
/* =========================================================
   CLASSIC LUDO GAME
========================================================= */


/* =========================================================
   DOM
========================================================= */

const board = document.getElementById("ludoBoard");
const dice = document.getElementById("dice");
const diceScene = document.getElementById("diceScene");

const rollButton = document.getElementById("rollButton");
const newGameButton = document.getElementById("newGameBtn");
const playAgainButton = document.getElementById("playAgainBtn");

const turnText = document.getElementById("turnText");
const turnColorDot = document.getElementById("turnColorDot");

const gameMessage = document.getElementById("gameMessage");
const diceResult = document.getElementById("diceResult");

const victoryPopup = document.getElementById("victoryPopup");
const victoryTitle = document.getElementById("victoryTitle");
const victoryText = document.getElementById("victoryText");

const finishTokens = document.getElementById("finishTokens");


/* =========================================================
   PLAYER DATA
========================================================= */

const PLAYERS = [
    {
        color: "red",
        name: "RED",
        startIndex: 0
    },

    {
        color: "green",
        name: "GREEN",
        startIndex: 13
    },

    {
        color: "yellow",
        name: "YELLOW",
        startIndex: 26
    },

    {
        color: "blue",
        name: "BLUE",
        startIndex: 39
    }
];


const PLAYER_COLORS = {
    red: "#e92b25",
    green: "#22964a",
    yellow: "#f7bd00",
    blue: "#2946c9"
};


/* =========================================================
   OUTER TRACK - EXACTLY 52 CELLS
========================================================= */

const OUTER_TRACK = [

    /* RED SIDE */
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],

    /* LEFT TOP VERTICAL */
    [5, 6],
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6],
    [0, 6],

    /* TOP CENTER */
    [0, 7],
    [0, 8],

    /* GREEN SIDE */
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],

    /* TOP RIGHT HORIZONTAL */
    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [6, 14],

    /* RIGHT CENTER */
    [7, 14],

    /* YELLOW SIDE */
    [8, 14],
    [8, 13],
    [8, 12],
    [8, 11],
    [8, 10],
    [8, 9],

    /* RIGHT BOTTOM VERTICAL */
    [9, 8],
    [10, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [14, 8],

    /* BOTTOM CENTER */
    [14, 7],
    [14, 6],

    /* BLUE SIDE */
    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [9, 6],

    /* BOTTOM LEFT HORIZONTAL */
    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],

    /* LEFT CENTER */
    [7, 0],
    [6, 0]
];


/* =========================================================
   5-CELL HOME PATHS
========================================================= */

const HOME_PATHS = {

    red: [
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
        [7, 5]
    ],

    green: [
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7]
    ],

    yellow: [
        [7, 13],
        [7, 12],
        [7, 11],
        [7, 10],
        [7, 9]
    ],

    blue: [
        [13, 7],
        [12, 7],
        [11, 7],
        [10, 7],
        [9, 7]
    ]
};


/* =========================================================
   ENTRY ARROWS
========================================================= */

const ENTRY_ARROWS = {

    "7-0": "➜",
    "0-7": "⬇",
    "7-14": "⬅",
    "14-7": "⬆"
};


/* =========================================================
   SAFE POSITIONS
========================================================= */

/*
   Player starts:
   Red    index 0
   Green  index 13
   Yellow index 26
   Blue   index 39

   Four additional standard safe spots:
*/

const COLORED_SAFE_POSITIONS = {
    0: "red",
    13: "green",
    26: "yellow",
    39: "blue"
};

const STANDARD_SAFE_INDICES = [
    8,
    21,
    34,
    47
];

const ALL_SAFE_INDICES = [
    0,
    8,
    13,
    21,
    26,
    34,
    39,
    47
];


/* =========================================================
   GAME STATE
========================================================= */

let currentPlayerIndex = 0;

let diceValue = null;

let rolling = false;

let waitingForMove = false;

let gameOver = false;


/*
   Pawn position:

   -1       = inside base
   0-51     = outer track progress
   52-56    = home path progress
   57       = finished at center
*/

const pawns = {};


/* =========================================================
   CELL MAP
========================================================= */

const cellMap = {};


/* =========================================================
   HELPERS
========================================================= */

function getCellKey(row, col) {
    return `${row}-${col}`;
}


function getTrackIndex(row, col) {

    return OUTER_TRACK.findIndex(
        position =>
            position[0] === row &&
            position[1] === col
    );
}


function isHomePathCell(row, col) {

    return Object.values(HOME_PATHS).some(
        path =>
            path.some(
                position =>
                    position[0] === row &&
                    position[1] === col
            )
    );
}


function getHomePathColor(row, col) {

    for (const color in HOME_PATHS) {

        const exists =
            HOME_PATHS[color].some(
                position =>
                    position[0] === row &&
                    position[1] === col
            );

        if (exists) {
            return color;
        }
    }

    return null;
}


/* =========================================================
   CREATE BOARD
========================================================= */

function createBoard() {

    const homes = Array.from(
        board.querySelectorAll(
            ".home-base"
        )
    );

    const finishZone =
        board.querySelector(".finish-zone");

    const diceControl =
        board.querySelector(".dice-control");


    /* Temporarily remove overlays */

    homes.forEach(
        home => home.remove()
    );

    finishZone.remove();
    diceControl.remove();


    /* Create 15 x 15 cells */

    for (
        let row = 0;
        row < 15;
        row++
    ) {

        for (
            let col = 0;
            col < 15;
            col++
        ) {

            const cell =
                document.createElement("div");

            cell.classList.add(
                "board-cell"
            );


            const key =
                getCellKey(row, col);

            cell.dataset.row = row;
            cell.dataset.col = col;


            /* OUTER TRACK */

            const trackIndex =
                getTrackIndex(row, col);

            if (trackIndex !== -1) {

                cell.classList.add(
                    "outer-track"
                );
            }


            /* HOME PATH */

            const pathColor =
                getHomePathColor(row, col);

            if (pathColor) {

                cell.classList.add(
                    `${pathColor}-path`
                );
            }


            /* COLORED SAFE START STARS */

            if (
                Object.prototype.hasOwnProperty.call(
                    COLORED_SAFE_POSITIONS,
                    trackIndex
                )
            ) {

                const color =
                    COLORED_SAFE_POSITIONS[
                        trackIndex
                    ];

                cell.classList.add(
                    "safe-star-cell",
                    `colored-${color}`
                );

                cell.innerHTML =
                    `<span class="safe-star">★</span>`;
            }


            /* STANDARD SAFE STARS */

            if (
                STANDARD_SAFE_INDICES.includes(
                    trackIndex
                )
            ) {

                cell.classList.add(
                    "safe-star-cell",
                    "standard-safe"
                );

                cell.innerHTML =
                    `<span class="safe-star">★</span>`;
            }


            /* ENTRY ARROWS */

            if (
                ENTRY_ARROWS[key]
            ) {

                cell.innerHTML =
                    `<span class="entry-arrow">${ENTRY_ARROWS[key]}</span>`;
            }


            board.appendChild(cell);

            cellMap[key] = cell;
        }
    }


    /* Restore overlays */

    homes.forEach(
        home => board.appendChild(home)
    );

    board.appendChild(finishZone);
    board.appendChild(diceControl);
}


/* =========================================================
   CREATE PAWNS
========================================================= */

function createPawns() {

    PLAYERS.forEach(
        player => {

            pawns[player.color] = [];


            for (
                let i = 0;
                i < 4;
                i++
            ) {

                const pawn = {
                    id: `${player.color}-${i}`,
                    color: player.color,
                    number: i,
                    position: -1,
                    element: null
                };


                const element =
                    document.createElement("button");

                element.type = "button";

                element.className =
                    `pawn pawn-${player.color}`;

                element.dataset.color =
                    player.color;

                element.dataset.pawn =
                    i;

                element.setAttribute(
                    "aria-label",
                    `${player.color} pawn ${i + 1}`
                );


                element.addEventListener(
                    "click",
                    () => {

                        movePawnByClick(
                            player.color,
                            i
                        );

                    }
                );


                pawn.element = element;

                pawns[player.color].push(
                    pawn
                );


                const baseSlot =
                    document.getElementById(
                        `${player.color}-base-${i}`
                    );

                baseSlot.appendChild(element);
            }
        }
    );
}


/* =========================================================
   GET PAWN
========================================================= */

function getPawn(color, number) {

    return pawns[color][number];
}


/* =========================================================
   GET BOARD POSITION FOR PAWN
========================================================= */

function getPawnCellPosition(pawn) {

    const player =
        PLAYERS.find(
            item =>
                item.color === pawn.color
        );


    if (!player) {
        return null;
    }


    /* BASE */

    if (pawn.position === -1) {
        return null;
    }


    /* FINISHED */

    if (pawn.position === 57) {
        return "finish";
    }


    /* OUTER TRACK */

    if (pawn.position >= 0 &&
        pawn.position <= 51) {

        const absoluteIndex =
            (
                player.startIndex +
                pawn.position
            ) % 52;


        const position =
            OUTER_TRACK[absoluteIndex];


        return getCellKey(
            position[0],
            position[1]
        );
    }


    /* HOME PATH */

    if (pawn.position >= 52 &&
        pawn.position <= 56) {

        const homeIndex =
            pawn.position - 52;


        const position =
            HOME_PATHS[pawn.color][homeIndex];


        return getCellKey(
            position[0],
            position[1]
        );
    }


    return null;
}


/* =========================================================
   RENDER ALL PAWNS
========================================================= */

function renderPawns() {

    document
        .querySelectorAll(".pawn")
        .forEach(
            pawnElement => {

                pawnElement.classList.remove(
                    "selectable"
                );

            }
        );


    finishTokens.innerHTML = "";


    PLAYERS.forEach(
        player => {

            pawns[player.color].forEach(
                pawn => {

                    /* PAWN IN BASE */

                    if (pawn.position === -1) {

                        const baseSlot =
                            document.getElementById(
                                `${pawn.color}-base-${pawn.number}`
                            );

                        if (
                            baseSlot &&
                            pawn.element.parentElement !== baseSlot
                        ) {

                            baseSlot.appendChild(
                                pawn.element
                            );
                        }

                        return;
                    }


                    /* PAWN FINISHED */

                    if (pawn.position === 57) {

                        const miniPawn =
                            pawn.element.cloneNode(false);

                        miniPawn.className =
                            `pawn pawn-${pawn.color}`;

                        miniPawn.style.width = "22%";
                        miniPawn.style.height = "22%";
                        miniPawn.style.minWidth = "7px";
                        miniPawn.style.minHeight = "7px";
                        miniPawn.style.pointerEvents = "none";

                        finishTokens.appendChild(
                            miniPawn
                        );

                        pawn.element.style.display =
                            "none";

                        return;
                    }


                    /* NORMAL PAWN */

                    pawn.element.style.display =
                        "";

                    const cellKey =
                        getPawnCellPosition(pawn);

                    const cell =
                        cellMap[cellKey];

                    if (cell) {

                        cell.appendChild(
                            pawn.element
                        );
                    }

                }
            );
        }
    );
}


/* =========================================================
   UPDATE TURN UI
========================================================= */

function updateTurnUI() {

    const player =
        PLAYERS[currentPlayerIndex];


    turnText.textContent =
        `${player.name}'S TURN`;


    turnColorDot.style.background =
        PLAYER_COLORS[player.color];


    document
        .querySelectorAll(".player-card")
        .forEach(
            card =>
                card.classList.remove(
                    "active-player"
                )
        );


    const activeCard =
        document.getElementById(
            `player-${player.color}`
        );


    if (activeCard) {

        activeCard.classList.add(
            "active-player"
        );
    }
}


/* =========================================================
   DICE ROTATIONS
========================================================= */

const FINAL_DICE_ROTATIONS = {

    1:
        "rotateX(0deg) rotateY(0deg)",

    2:
        "rotateX(0deg) rotateY(180deg)",

    3:
        "rotateX(0deg) rotateY(-90deg)",

    4:
        "rotateX(0deg) rotateY(90deg)",

    5:
        "rotateX(-90deg) rotateY(0deg)",

    6:
        "rotateX(90deg) rotateY(0deg)"
};


/* =========================================================
   RANDOM NUMBER
========================================================= */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


/* =========================================================
   ROLL DICE
========================================================= */

function rollDice() {

    if (
        rolling ||
        waitingForMove ||
        gameOver
    ) {
        return;
    }


    rolling = true;

    rollButton.disabled = true;

    diceResult.textContent = "...";

    gameMessage.textContent =
        "Rolling the dice...";


    const spinX =
        randomNumber(720, 1440);

    const spinY =
        randomNumber(720, 1440);

    const spinZ =
        randomNumber(360, 1080);


    dice.style.transition =
        "transform 1.1s cubic-bezier(.15,.75,.2,1)";


    dice.style.transform =
        `
        rotateX(${spinX}deg)
        rotateY(${spinY}deg)
        rotateZ(${spinZ}deg)
        `;


    setTimeout(
        () => {

            diceValue =
                randomNumber(1, 6);


            dice.style.transition =
                "transform .55s cubic-bezier(.2,.8,.2,1)";


            dice.style.transform =
                FINAL_DICE_ROTATIONS[
                    diceValue
                ];


            diceResult.textContent =
                diceValue;


            rolling = false;


            const currentPlayer =
                PLAYERS[currentPlayerIndex];


            gameMessage.textContent =
                `${currentPlayer.name} rolled ${diceValue}.`;


            const movablePawns =
                getMovablePawns(
                    currentPlayer.color,
                    diceValue
                );


            if (
                movablePawns.length === 0
            ) {

                gameMessage.textContent =
                    `${currentPlayer.name} rolled ${diceValue}, but has no valid move.`;

                setTimeout(
                    () => {

                        if (diceValue === 6) {

                            gameMessage.textContent =
                                `${currentPlayer.name} gets an extra turn!`;

                            rollButton.disabled =
                                false;

                        } else {

                            nextTurn();
                        }

                    },
                    900
                );

                return;
            }


            waitingForMove = true;


            highlightMovablePawns(
                movablePawns
            );


            gameMessage.textContent =
                `${currentPlayer.name}: choose a highlighted pawn to move ${diceValue} step${diceValue === 1 ? "" : "s"}.`;

        },
        1100
    );
}


/* =========================================================
   CHECK IF PAWN CAN MOVE
========================================================= */

function canMovePawn(
    pawn,
    value
) {

    /* FINISHED PAWN */

    if (pawn.position === 57) {
        return false;
    }


    /* PAWN INSIDE BASE */

    if (pawn.position === -1) {

        return value === 6;
    }


    /* NORMAL MOVE */

    return (
        pawn.position + value
    ) <= 57;
}


/* =========================================================
   GET MOVABLE PAWNS
========================================================= */

function getMovablePawns(
    color,
    value
) {

    return pawns[color].filter(
        pawn =>
            canMovePawn(
                pawn,
                value
            )
    );
}


/* =========================================================
   HIGHLIGHT MOVABLE PAWNS
========================================================= */

function highlightMovablePawns(
    movablePawns
) {

    movablePawns.forEach(
        pawn => {

            pawn.element.classList.add(
                "selectable"
            );

        }
    );
}


/* =========================================================
   PAWN CLICK MOVE
========================================================= */

function movePawnByClick(
    color,
    number
) {

    if (
        !waitingForMove ||
        gameOver
    ) {
        return;
    }


    const currentPlayer =
        PLAYERS[currentPlayerIndex];


    if (
        color !== currentPlayer.color
    ) {
        return;
    }


    const pawn =
        getPawn(color, number);


    if (
        !canMovePawn(
            pawn,
            diceValue
        )
    ) {
        return;
    }


    document
        .querySelectorAll(".pawn")
        .forEach(
            element =>
                element.classList.remove(
                    "selectable"
                )
        );


    waitingForMove = false;


    performPawnMove(
        pawn,
        diceValue
    );
}


/* =========================================================
   PERFORM PAWN MOVE
========================================================= */

function performPawnMove(
    pawn,
    value
) {

    /*
       Unlock from base only with 6.
       Pawn goes to its starting star.
    */

    if (pawn.position === -1) {

        pawn.position = 0;

    } else {

        pawn.position += value;
    }


    renderPawns();


    setTimeout(
        () => {

            /* Capture after movement */

            if (
                pawn.position >= 0 &&
                pawn.position <= 51
            ) {

                captureOpponents(pawn);
            }


            renderPawns();


            /* Check victory */

            if (
                checkPlayerVictory(
                    pawn.color
                )
            ) {

                showVictory(
                    pawn.color
                );

                return;
            }


            /* Extra turn on 6 */

            if (diceValue === 6) {

                gameMessage.textContent =
                    `${pawn.color.toUpperCase()} rolled 6 and gets another turn!`;

                rollButton.disabled =
                    false;

            } else {

                nextTurn();
            }

        },
        250
    );
}


/* =========================================================
   CAPTURE LOGIC
========================================================= */

function captureOpponents(movingPawn) {

    const movingPlayer =
        PLAYERS.find(
            player =>
                player.color === movingPawn.color
        );


    const absoluteIndex =
        (
            movingPlayer.startIndex +
            movingPawn.position
        ) % 52;


    /*
       SAFE SPOTS CANNOT CAPTURE.
    */

    if (
        ALL_SAFE_INDICES.includes(
            absoluteIndex
        )
    ) {

        return;
    }


    PLAYERS.forEach(
        player => {

            if (
                player.color === movingPawn.color
            ) {
                return;
            }


            pawns[player.color].forEach(
                opponentPawn => {

                    if (
                        opponentPawn.position < 0 ||
                        opponentPawn.position > 51
                    ) {
                        return;
                    }


                    const opponentAbsoluteIndex =
                        (
                            player.startIndex +
                            opponentPawn.position
                        ) % 52;


                    if (
                        opponentAbsoluteIndex ===
                        absoluteIndex
                    ) {

                        opponentPawn.position = -1;


                        gameMessage.textContent =
                            `${movingPawn.color.toUpperCase()} captured a ${opponentPawn.color.toUpperCase()} pawn!`;

                    }

                }
            );

        }
    );
}


/* =========================================================
   CHECK VICTORY
========================================================= */

function checkPlayerVictory(color) {

    return pawns[color].every(
        pawn =>
            pawn.position === 57
    );
}


/* =========================================================
   SHOW VICTORY
========================================================= */

function showVictory(color) {

    gameOver = true;

    rollButton.disabled = true;

    const player =
        PLAYERS.find(
            item =>
                item.color === color
        );


    victoryTitle.textContent =
        `${player.name} WINS!`;

    victoryText.textContent =
        `Congratulations! ${player.name} successfully moved all 4 pawns to the center finish zone.`;

    victoryPopup.classList.remove(
        "hidden"
    );
}


/* =========================================================
   NEXT TURN
========================================================= */

function nextTurn() {

    currentPlayerIndex =
        (
            currentPlayerIndex + 1
        ) % PLAYERS.length;


    diceValue = null;


    updateTurnUI();


    rollButton.disabled =
        false;


    gameMessage.textContent =
        `${PLAYERS[currentPlayerIndex].name}'S turn. Roll the dice.`;
}


/* =========================================================
   RESET GAME
========================================================= */

function resetGame() {

    currentPlayerIndex = 0;

    diceValue = null;

    rolling = false;

    waitingForMove = false;

    gameOver = false;


    PLAYERS.forEach(
        player => {

            pawns[player.color].forEach(
                pawn => {

                    pawn.position = -1;

                    pawn.element.style.display = "";

                }
            );

        }
    );


    finishTokens.innerHTML = "";


    victoryPopup.classList.add(
        "hidden"
    );


    dice.style.transition =
        "transform .4s ease";

    dice.style.transform =
        FINAL_DICE_ROTATIONS[1];


    diceResult.textContent =
        "-";


    rollButton.disabled =
        false;


    updateTurnUI();


    gameMessage.textContent =
        "Roll the dice to begin.";


    renderPawns();
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

rollButton.addEventListener(
    "click",
    rollDice
);


diceScene.addEventListener(
    "click",
    rollDice
);


diceScene.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            rollDice();
        }

    }
);


newGameButton.addEventListener(
    "click",
    resetGame
);


playAgainButton.addEventListener(
    "click",
    resetGame
);


/* =========================================================
   START GAME
========================================================= */

createBoard();

createPawns();

updateTurnUI();

renderPawns();

dice.style.transform =
    FINAL_DICE_ROTATIONS[1];