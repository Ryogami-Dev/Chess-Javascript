let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")


let checkerBoard = [     

    ["", "red", "", "red", "", "red", "", "red"],
    ["red", "", "red", "", "red", "", "red", ""],
    ["", "red", "", "red", "", "red", "", "red"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["gray", "", "gray", "", "gray", "", "gray", ""],
    ["", "gray", "", "gray", "", "gray", "", "gray"],
    ["gray", "", "gray", "", "gray", "", "gray", ""]

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
            if(checkerBoard[i][j] !== ""){
                
                ctx.beginPath();
                ctx.arc(j*100+50 , i*100+50 ,40,0, 2*Math.PI)
                if(checkerBoard[i][j] == "red"){
                    ctx.fillStyle = "red";
                }else{
                    ctx.fillStyle = "gray"
                }

                ctx.fill();
                ctx.closePath()

            }
        }
    }

}


canvas.addEventListener("click",function(event){
    
    let x = event.offsetX;
    let y = event.offsetY;
    
    let row = Math.floor(y/100);
    let col = Math.floor(x/100);
    
    let piece = checkerBoard[row][col];
    
    if(piece){
        console.log("row: "+row , " col: "+ col)
    }
    
    if(piece === "red"){
        alert("Red")
    }else if(piece === "gray"){
        alert("Gray")
    }
    else{
        alert(" '' ")
    }
    
    
})


window.addEventListener("load", function(){
    drawBoard();
    drawPieces();
})
