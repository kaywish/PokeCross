

const winCon= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const title= document.querySelector(".title")
const restartBtn= document.querySelector("#restart")
const cells= document.querySelectorAll(".cell")
const statusText= document.querySelector(".status")
const currentPlayer= "X"
const options= ["","","","","","","","",""]
const running = false;


// RESTART GAME 

const restart= document.getElementById("restart")
restart.addEventListener("click", (e) =>{
    console.log("hello")
    alert("Player 1 Goes First!")
    document.getElementsByClassName("cell").innerHTML=" "
    
    cells.forEach(cell => {
        cell.innerHTML=" "
        
        
    });
    });
    
// CELLS
function cellClicked(){
const cellIndex= this.getAttribute("cellIndex");

if(options[cellIndex] != "" || !running){
    return;
}

updateCell(this. cellIndex)
checkWinner();
}

 // CHANGE PLAYER

 function changePlayer () {
     currentPlayer = (currentPlayer== "X") ? "O" : "X"
     statusText.textContent = (currentPlayer+"s turn")
 }








// const cell1 = document.querySelector("#playerx")
// cell1.addEventListener("click", (e) => {
    
//     if (playerX) {document.querySelector("#playerx").background.src="pickachu.png"
//     }
//     else{
//         document.querySelector("#playerx").innerHTML="O"
//     }
// })





/////////////////////////////////////////////////////////////////////////////////////////






























