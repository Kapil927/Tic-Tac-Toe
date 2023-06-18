const result = document.querySelector('[result]');
const allBoxes = document.querySelectorAll('.allBoxes'); // querySelectorAll return nodeList not array, but it is like array only but we cant perform operation like array, we can ony access elements like array using indexes.
const newGame = document.querySelector('[newGame]');
const wholeGridBox = document.querySelector('[wholeGridBox]');// taki winner milte hi pure gridbox ko ek bar unclickable bna sake

let currentPlayer = "X";
result.innerText = `Current Player - ${currentPlayer}`;
let winnerFound = false;
let fillCount = 0;

let grid = ["", "", "", "", "", "", "", "", ""]; // backend
const winningPositions = [ // we already know all winning positions
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let winner = ()=>{ //check for winner
    winningPositions.forEach((value, index)=>{
        if((grid[value[0]]=="X" || grid[value[0]]=="0") && grid[value[0]] == grid[value[1]] && grid[value[1]] == grid[value[2]]){
            allBoxes[value[0]].style.background="#90EE90";
            allBoxes[value[1]].style.background="#90EE90";
            allBoxes[value[2]].style.background="#90EE90";
            allBoxes.forEach((box, index)=>{      // winner milte hi make all cells unclickable        
                box.style.pointerEvents="none";  
            });
            
            result.innerText = `Winner Player - ${currentPlayer}`;
            winnerFound=true;
            return true;
        }
    }
    )
    return false;
 
}


let handleClicks = (box, index) =>{
    if (!winnerFound){
        if(grid[index] == ""){ // ager vo spotkhali ha tabhi click work karegi, vese click hote hi hum pointer event bund karva dete to iski jaturat nahi
            box.innerText=`${currentPlayer}`; // update frontend
            box.style.pointerEvents = "none"; // ek bar click hone ke bad dubara click nahi hona chahie to ek bar click hote hi uska pointer event bund kar do
            grid[index]=`${currentPlayer}`;    // update backend
            if(++fillCount == 9){ // keep track of filled cells, if all filled and no winner means its a tie;
                result.innerText = `Game Tied !`;
            }
            else{
                if(winner()){  // keep checking for winner after every click
                    result.innerText = `Winner Player - ${currentPlayer}`;
                    console.log(currentPlayer);
                }
                else if(!winnerFound){ // if no winner found , just switch players
                    if(currentPlayer === "X") currentPlayer = "0";
                    else currentPlayer = "X";  
                    result.innerText = `Current Player - ${currentPlayer}`; // uper current player upadate karo after every click              
                }                
            }
        }        
    }
}

allBoxes.forEach((box, index)=>{              //for each loop provides us with the element and its indexes,  by default
    box.addEventListener('click',()=>handleClicks(box, index)); // proper arrow function bna diya kaatwaat ke, har cell me click listner dal diya
    box.style.cursor="pointer";  // har cell ka cursor pointer kar diya
});

newGame.addEventListener('click',(e)=>{  // ye click karte hi sab reset kar do
    console.log(e);
    currentPlayer="X";
    fillCount=0;
    winnerFound=false;
    grid = ["", "", "", "", "", "", "", "", ""];

    allBoxes.forEach((value, index)=>{
        value.innerText="";
        value.style.pointerEvents="all";
        value.style.cursor="pointer";
        value.style.background="transparent";
    })
    result.innerText=`Current Player - ${currentPlayer}`;
} );