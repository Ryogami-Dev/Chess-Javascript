let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d");

let checkersBoard = [
    ["", new Piece(0, 1, "red"), "", new Piece(0, 3, "red"), "", new Piece(0, 5, "red"), "", new Piece(0, 7, "red")],
    [new Piece(1, 0, "red"), "", new Piece(1, 2, "red"), "", new Piece(1, 4, "red"), "", new Piece(1, 6, "red"), ""],
    ["", new Piece(2, 1, "red"), "", new Piece(2, 3, "red"), "", new Piece(2, 5, "red"), "", new Piece(2, 7, "red")],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [new Piece(5, 0, "gray"), "", new Piece(5, 2, "gray"), "", new Piece(5, 4, "gray"), "", new Piece(5, 6, "gray"), ""],
    ["", new Piece(6, 1, "gray"), "", new Piece(6, 3, "gray"), "", new Piece(6, 5, "gray"), "", new Piece(6, 7, "gray")],
    [new Piece(7, 0, "gray"), "", new Piece(7, 2, "gray"), "", new Piece(7, 4, "gray"), "", new Piece(7, 6, "gray"), ""]
];



function drawBoard() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 8; i++) {
        y = 0;
        for (let p = 0; p < 8; p++) {

            if ((i + p) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillRect(x, y, 100, 100)
            ctx.fill();
            y += 100;
        }
        x += 100;
    }
}


function drawPieces() {
    for (let i = 0; i < checkersBoard.length; i++) {
        for (let p = 0; p < checkersBoard[i].length; p++) {
            let color = checkersBoard[i][p];

            if (color instanceof Piece)
                color.draw();
        }
    }
}



/*document.addEventListener('DOMContentLoaded', function callBoard() {
    drawBoard();
    drawPieces();
})*/
canvas.addEventListener("click", function getPoint(event) {

    let x = event.offsetX;
    let y = event.offsetY;

    let row = Math.floor(y / 100);
    let col = Math.floor(x / 100);

    //checking if row are within the bounds
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        let piece = checkersBoard[row][col];

        if (piece !== undefined && piece !== "") {
            console.log("row: " + row, " col: " + col)
        }

        if (piece === "red") {
            alert("Red")
        } else if (piece === "gray") {
            alert("Gray")
        }
        else {
            console.log("row: " + row, " col: " + col)
            alert(" '' ")
        }
    }
})


window.addEventListener("load", function () {
    drawBoard();
    drawPieces();
});
function Piece(row, col, color, isKing) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = true;
    this.isKing = isKing;

    // Method to draw the piece on the canvas
    this.draw = function () {
        let X = this.col * 100 + 50;
        let Y = this.row * 100 + 50;

        if (this.isClicked) {
            ctx.beginPath();
            ctx.arc(X, Y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(X, Y, 35, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
function getSelectedPiece() {
    for (let i = 0; i < checkersBoard.length; i++) {
        for (let p = 0; p < checkersBoard[i].length; p++) {
            let piece = checkersBoard[i][p];
            if (piece instanceof Piece && piece.isClicked) {
                return piece;
            }
        }
    }
    return null; // Return null if no piece is selected
}
