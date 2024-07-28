let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")


function PieceObject(row , col , color){
    
    this.row = row;
    this.col = col;
    this.color = color;

    this.isClicked = false;
    this.isKing = false;


    this.draw = function(){

        let X = this.col * 100+50;
        let Y = this.row * 100+50;

        if (this.isClicked) {

            ctx.beginPath();
            ctx.arc(X, Y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }

        ctx.beginPath()
        ctx.arc(X,Y,38,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

    }

    this.checkKing = function(){
        if((piece.color == "red" && piece.row == 7) || (piece.color == "gray" && piece.row == 0)){
            this.isKing = true;
        }
    }

    this.move = function(newRow,newCol){
        this.row = newRow;
        this.col = newCol;
        this.checkKing()
    }

    this.isValidMove= function(){
        
    }

}

let checkerBoard = [     

    ["", new PieceObject(0,1,"red"), "", new PieceObject(0,3,"red"), "", new PieceObject(0,5,"red"), "", new PieceObject(0,7,"red")],
    [new PieceObject(1,0,"red"), "", new PieceObject(1,2,"red"), "", new PieceObject(1,4,"red"), "", new PieceObject(1,6,"red"), ""],
    ["", new PieceObject(2,1,"red"), "", new PieceObject(2,3,"red"), "", new PieceObject(2,5,"red"), "", new PieceObject(2,7,"red")],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [new PieceObject(5,0,"gray"), "", new PieceObject(5,2,"gray"), "", new PieceObject(5,4,"gray"), "", new PieceObject(5,6,"gray"), ""],
    ["", new PieceObject(6,1,"gray"), "", new PieceObject(6,3,"gray"), "", new PieceObject(6,5,"gray"), "", new PieceObject(6,7,"gray")],
    [new PieceObject(7,0,"gray"), "", new PieceObject(7,2,"gray"), "", new PieceObject(7,4,"gray"), "", new PieceObject(7,6,"gray"), ""]

]   

function drawBoard(){
    
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            if((i+j) % 2 == 0 ){         
                ctx.fillStyle = "White"
            }else{
                ctx.fillStyle = "Black"
            }
            ctx.fillRect(i*100,j*100,100,100) 
        }
    }

}  


function drawPieces(){

    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            let color = checkerBoard[i][j].color;

            if(color == "red"){
                checkerBoard[i][j].draw()
            }
            if(color == "gray"){
                checkerBoard[i][j].draw()
            }
        }
    }

}

function getSelectedPiece(){
    for(let i = 0 ; i < checkerBoard.length ; i++){
        for(let j = 0 ; j < checkerBoard[i].length; j++){
            let piece = checkerBoard[i][j];
            if(piece && piece.isClicked){
                return piece;
            }
        }
    }

    return null;
}


canvas.addEventListener("click",function(event){
    
    let x = event.offsetX;
    let y = event.offsetY;
    
    let row = Math.floor(y/100);
    let col = Math.floor(x/100);
    
    let piece = checkerBoard[row][col];

    if(piece !== undefined && piece !== ""){
        let selectedPiece = getSelectedPiece();
        if(selectedPiece && selectedPiece !== piece){
            selectedPiece.isClicked = false;
        }

        piece.isClicked = !piece.isClicked;
    }
    drawBoard();
    drawPieces();
    
})


window.addEventListener("load", function(){
    drawBoard();
    drawPieces();
})
