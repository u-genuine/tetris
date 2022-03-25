// DOM
const playground = document.querySelector(".playground > ul"); 

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval ;
let tempMovingItem;

const BLOCKS = {
    tree: [ //방향키를 돌렸을때 각각의 모양 즉 4개의 배열
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ]
}

const movingItem = {
    type: "tree",
    direction: 2, //방향키를 눌렀을 때 도형의 회전을 도와주는 지표 역할
    top: 0, //좌표를 기준으로 어디까지 내려왔는지를 표현
    left: 0, //좌우값을 알려주는 역할
};

init()

// functions
function init(){    
    tempMovingItem = { ...movingItem }; //...: separate operater. movingItem 객체의 주소값이 아니라 단순히 값만 가져옴
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine()
    }
    renderBlocks()
}

function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j = 0; j < GAME_COLS; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType=""){
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type, "moving"); //이전모양 지우기
    })
    BLOCKS[type][direction].some( block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, "moving")
        } else{
            tempMovingItem = { ...movingItem }
            setTimeout(()=>{
                renderBlocks();
                if(moveType === "top"){
                    seizeBlock();
                }
            }, 0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}
function seizeBlock(){
    console.log("seize block")
}

function checkEmpty(target){
    if(!target){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocksmoveType()
}
function changeDerection(){
    const direction = tempMovingItem.direction;
    direction ===3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1
    renderBlocks()
}

//event handling
document.addEventListener("keydown", e=> {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDerection();
            break;
        default:
            break;
    }
})