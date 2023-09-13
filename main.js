const gameinfo = document.querySelector(".game-info");
const boxes =  document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");
  

let currentPlayer;
let gameGrid;
const winningPositions  = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

// let create a function to initial the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box,index) =>{
        box.innerText= "";
        boxes[index].style.pointerEvents ='all';
        box.classList.remove("win");
    })
    
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current player - ${currentPlayer}`;
  
}


initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameinfo.innerText = `Current player - ${currentPlayer}`;

}
function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position) =>{
        if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
        &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]==gameGrid[position[2]])){
            
            if(gameGrid[position[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            
        }
    });

    if(ans !== ""){
        gameinfo.innerText = `Winner player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
        
    }

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !==""){
            fillCount++;
        }
    });
    if(fillCount == 9){
        gameinfo.innerText ="game Tied!";
        newGameBtn.classList.add("active");
    }


    
}

function handleclick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
        
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click",() => {
        handleclick(index);
    })
});

newGameBtn.addEventListener("click",initGame);





