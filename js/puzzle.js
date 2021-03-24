const container = document.querySelector(".image-container");
const BtnStart = document.querySelector(".btn-start");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

let tiles = [];
const dragged ={
  el: null,
  class: null,
  index: null,
}

let isPlaying = false;
let timeInterval;
let time = 0;

//function
function checkStatus(){
  const currentList = [...container.children];
  const unMatchedList = currentList.filter( (child, index) => {
    return Number(child.getAttribute("data-index")) !== index
  })

  if(unMatchedList.length === 0){
    gameText.style.display = "block";
    container.find('li').style.border ="none";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}


function setGame(){
  isPlaying = true;
  time = 0;
  clearInterval(timeInterval);
  container.innerHTML = "";
  gameText.style.display = "none";  

  tiles = createImageTiles();
  tiles.forEach(tile => container.appendChild(tile))
  setTimeout(()=>{
    container.innerHTML = "";
    shuffle(tiles).forEach(tile => container.appendChild(tile))
    timeInterval = setInterval(() => {
      playTime.innerText = time;
      time++;
     }, 1000)
  },5000)
  
}


function createImageTiles(){
  const teamArray = [];
  Array(tileCount).fill().forEach( (_, index) => {
    const li = document.createElement("li");
    li.setAttribute('data-index', index)
    li.setAttribute('draggable', 'true')
    li.classList.add(`list${index}`);
    teamArray.push(li)
   });
   return teamArray;
}

function shuffle(array){
 let piece = array.length -1;
 while( piece > 0){
  const randomPiece = Math.floor(Math.random()*(piece+1));
  [array[piece], array[randomPiece]] = [array[randomPiece], array[piece]]
  piece--;
 }
 return array;
}




//event
container.addEventListener('dragstart', (e) => {
 if(!isPlaying) return;
 const obj = e.target;
 dragged.el = obj;
 dragged.class = obj.className;
 dragged.index = [...obj.parentNode.children].indexOf(obj)
})

container.addEventListener('dragover', (e) => {
  e.preventDefault()
})

 container.addEventListener('drop', (e) => {
  if(!isPlaying) return;
  const obj = e.target;

  if(obj.className !== dragged.class){

    let originPlace;
    let isLast = false;
  
    if(dragged.el.nextsibling){
      originPlace = dragged.el.nextsibling
    }else{
      originPlace = dragged.el.previousSibling
      isLast = true;
    }

    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
    isLast ? originPlace.after(obj) : originPlace.before(obj)
  }
  checkStatus();
})

BtnStart.addEventListener('click', () => {
  setGame();
})


















