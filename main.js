const X="<img src='img/xturn.png'>";
const O="<img src='img/oturn.png'>";
let box=document.querySelectorAll('.items');
let statuss=document.querySelector('.status');
let restart=document.querySelector('.restart');

let Winner=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","",""];
let currentPlayer=X;
let player="X";
let running=false;
init();

function init(){ 
box.forEach(item=>{
    item.addEventListener('click',boxesClick);
});
restart.addEventListener('click',restartGame);
statuss.textContent=`${player} Your Turn `;
running="true";

}
function boxesClick(){
    let index=this.dataset.id;
    if(options[index]!="" || !running){
        return;
    }
    // console.log(options[index]);
updateBox(this,index);
gameWinner();
}
function updateBox(box,index){
    options[index]=player;
box.innerHTML=currentPlayer;
// running="true";
}
function changePlayer(){
    player=(player=='X')?"O":"X";
    currentPlayer=(currentPlayer==X)? O:X;
    statuss.textContent=`${player} Your Turn`;
    // running="true";

}
function gameWinner(){
    isWon=false;
    for(let i=0;i<Winner.length;i++){
        let value=Winner[i];
        const box1=options[value[0]];
        const box2=options[value[1]];
        const box3=options[value[2]];
        if(box1==""||box2==""||box3=="")
        {
continue;
        }
if(box1==box2 && box2==box3){
    isWon="true";
    // animation blink
    box[value[0]].classList.add('win');
    box[value[1]].classList.add('win');
    box[value[2]].classList.add('win');

} 
   }
    if(isWon){
        statuss.textContent=`${player} WON.`
        statuss.classList.add('win')
        running=false;
    }else if(!options.includes('')){
        statuss.textContent=`GAME DRAW.`
        running=false;
    }else{
        changePlayer();
    }
}
function restartGame(){
    
    options=["","","","","","","",""];
      currentPlayer=X;
 player="X";
 running=true;
statuss.textContent=`${player} Your Turn`;
statuss.classList.remove('win');
box.forEach(item=>{
    item.innerHTML="";
    item.classList.remove('win');
});
}