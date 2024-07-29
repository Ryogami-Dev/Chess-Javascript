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
            ctx.fillStyle = (i + p) % 2 === 0 ? "white" : "black";
            ctx.fillRect(x, y, 100, 100);
            y += 100;
        }
        x += 100;
    }
}


function drawPieces() {
    for (let i = 0; i < checkersBoard.length; i++) {
        for (let p = 0; p < checkersBoard[i].length; p++) {
            let piece = checkersBoard[i][p];

            if (piece instanceof Piece) {
                piece.draw();
            }
        }
    }
}

canvas.addEventListener("click", function getPoint(event) {

    let x = event.offsetX;
    let y = event.offsetY;

    let row = Math.floor(y / 100);
    let col = Math.floor(x / 100);

    //checking if row are within the bounds
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        let piece = checkersBoard[row][col];


        if (piece instanceof Piece) {
            for (let i = 0; i < checkersBoard.length; i++) {
                for (let j = 0; j < checkersBoard[i].length; j++) {
                    let p = checkersBoard[i][j];
                    if (p instanceof Piece) {
                        p.isClicked = false;
                    }
                }
            }

            // Toggle isClicked for the clicked piece
            piece.isClicked = !piece.isClicked;

            // Redraw board and pieces
            drawBoard();
            drawPieces();
        } else {
            let selectedPiece = getSelectedPiece();

            if (selectedPiece) {
                if (selectedPiece.isValidMove(row, col)) {
                    //removing the piece
                    let oldRow = selectedPiece.row;
                    let oldCol = selectedPiece.col;

                    checkersBoard[oldRow][oldCol] = "";

                    //move the piece
                    selectedPiece.move(row, col);

                    //updating the board array
                    checkersBoard[row][col] = selectedPiece;

                    //deselecting
                    selectedPiece.isClicked = false;

                    //redrawing
                    drawBoard();
                    drawPieces();
                }
            }
        }
    }
})


window.addEventListener("load", function () {
    drawBoard();
    drawPieces();
});
function Piece(row, col, color,) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = false;
    this.isKing = false;

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

        if (this.isKing) {

            // Draw the smiley face
            ctx.beginPath();
            ctx.arc(X, Y , 15, 0, Math.PI); // Draw the smile
            ctx.strokeStyle = "white";
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(X - 10, Y - 15, 5, 0, 2 * Math.PI); // Left eye
            ctx.fillStyle = "white";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(X + 10, Y - 15, 5, 0, 2 * Math.PI); // Right eye
            ctx.fillStyle = "white";
            ctx.fill();
            
        }
    }

    this.checkKing = function () {
        if ((this.color == "red" && this.row == 7) || (this.color == "grey" && this.row == 0)) {
            this.isKing = true;
        }
    }
    this.move = function (newRow, newCol) {
        this.row = newRow;
        this.col = newCol;
        this.checkKing()
    }

    this.isValidMove = function (newRow, newCol) {
        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
            return false;
        }
        if (checkersBoard[newRow][newCol] !== "") {
            return false;
        }
        let row2 = newRow - this.row;
        let col2 = newCol - this.col;

        if ((row2 === 1 || row2 === -1) && (col2 === 1 || col2 === -1)) {
            if (this.isKing || (this.color === "red" && row2 === 1) || (this.color === "gray" && row2 === -1)) {
                return true;
            }
        }

        if ((row2 === 2 || row2 === -2) && (col2 === 2 || col2 === -2)) {
            let middleRow = this.row + row2 / 2;
            let middleCol = this.col + col2 / 2;

            if (checkersBoard[middleRow][middleCol] !== '' && checkersBoard[middleRow][middleCol].color !== this.color) {
                checkersBoard[middleRow][middleCol] = '';
                return true;
            }
        }

        return false;
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