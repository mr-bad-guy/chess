const board = document.getElementById('board');
const dfen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

/* this defines selected piece*/
let clicked = false;
let selectedp = [];

/* this separates the fen*/
const sep = dfen.split(" ")
const p_place = sep[0].split("/")
let turn = sep[1]

let dot = []
let str = []
let des = []
let rep ;

console.log(turn)

/* this is the board in matrix form*/
let matrix = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','','']
]

/* this is the movement of pieces*/
const wpawn = [[-1,0],[-2,0],[-1,-1],[-1,1]];
const bpawn = [[1,0],[2,0],[1,-1],[1,1]];
const king = [[1,-1],[1,0],[1,1],
              [0,-1],[0,1],
              [-1,-1],[-1,0],[-1,1]
]
const knight = [[-2,1],[-2,-1],
                [-1,2],[1,2],
                [2,1],[2,-1],
                [-1,-2],[1,-2]
]
const queen = {
    0 : [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],
    1 : [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],
    2 : [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],
    3 : [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],
    4 : [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],
    5 : [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],
    6 : [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],
    7 : [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]]
}

for (let i = 0; i < 64; i++) {
  const sqr = document.createElement('div');
  sqr.classList.add('sqr');
  sqr.classList.add(`sqr${i}`)

  const row = Math.floor(i / 8);
  const col = i % 8;
  
  sqr.dataset.index = i
  sqr.dataset.position = `${row}-${col}`
  
  if ((row + col) % 2 === 0) {
    sqr.style.backgroundColor = '#ffce9e';   // light
  } else {
    sqr.style.backgroundColor = '#d18b47';   // dark
  }
  
  board.appendChild(sqr);
  
  
} 

for (let row = 0; row < 8; row++) {
  let col = 0;                        // start at column 0 for this rank
  const rankStr = p_place[row];      // string for this row

  for (let char of rankStr) {        // go through every character
    if (char >= '1' && char <= '8') {
      // It's a number → skip that many empty squares
      col += parseInt(char);
    } else {
      // It's a piece letter → place it
      matrix[row][col] = char;       // store the letter (e.g. 'r', 'P')

      // Find the DOM square and put the symbol on it
      const square = document.querySelector(`.sqr[data-position="${row}-${col}"]`);
      if (square) {
        square.textContent = getPieceSymbol(char);
      }

      col++; // move to the next column
    }
  }
}


function getPieceSymbol(letter) {
  const symbols = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
  };
  return symbols[letter] || letter;
} 

/* adds event listener to all divs*/
for (let i = 0; i < 64; i++) {
  const sqr = document.querySelector(`.sqr${i}`); // or getElementsByClassName
  if (sqr) {
    sqr.addEventListener('click', handleClick);
  }
}

/* a function that handles click */
function handleClick(event) {
  const clickedDiv = event.currentTarget;
  // Get its index from the class name:
  const index = parseInt(clickedDiv.className.match(/\d+/)[0], 10);
  const empty = document.querySelector(`.sqr[data-index="${index}"]`)
  
  if (empty.textContent === '') {
      
      reset()
      
  }else if(clicked) {
     
     if (!is_mpiecep(index)) {
         
         reset()
         
     }else {
         
         let [row,col] = fconv(index)
     
         for(let de = 0; de < dot.length; de++){
     
             if (row === dot[de][0] && col === dot[de][1]){
             
                 des.push([row,col])
     
                 move(row,col)
     
                 console.log('destination')
                 break;
             }
         }
         
     }
  
     
     
  }else {
      
      if (turn === 'w'){
      
          let wpiece = piece_atp(index)
          if(wpiece === ''){
              
              console.log('illegal')
              
          }else if (isLowerCase(wpiece)) {
          
              console.log('illegal');
          }else {
          
              let selected = document.querySelector(`.sqr[data-index = "${index}"]`)
              selected.style.backgroundColor = '#ff946a53'
              clicked = true;
              dot = choose(index)
          
          }
      
      }else if (turn === 'b'){
      
          let bpiece = piece_atp(index)
          if (isUpperCase(bpiece)) {
          
              console.log('illegal');
          }else {
          
              let selected = document.querySelector(`.sqr[data-index = "${index}"]`)
              selected.style.backgroundColor = '#ff946a53'
              clicked = true;
              dot = choose(index)
          
          }
      
      }
  
  }
  
  for(let i = 0; i < dot.length; i++){
      
      if(is_there(dot[i][0],dot[i][1]) === false) {
          
          const square = document.querySelector(`.sqr[data-position="${dot[i][0]}-${dot[i][1]}"]`);
          square.textContent = getPieceSymbol('•');  // display the piece
          
      }
      
  }
  
  //cal(index)
  
  //console.log(`Clicked sqr${index}`);
}

function wpawn_movement(index){
    
    let result = [] 
    let [row,col] = fconv(index)
    console.log(row,col)      
    for (let j = 0; j < 4; j++) {
        
        let frow = row + wpawn[j][0]
        let fcol = col + wpawn[j][1]
        
        if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
            
            console.log('above')
            
        }else{
            
            if (wpawn[j][1] === -1 || wpawn[j][1] === 1) {
            
                if(is_there(frow,fcol)) {
                
                    result.push([frow,fcol])
                    console.log("there is a piece")
                }
            
            }else if (wpawn[j][0] === -2){
            
                if (row === 6) {
                
                    result.push([frow,fcol])
                    console.log("can move 2 sqr")
                }
            } else {
            
                result.push([frow,fcol])
            }
        }
    }
    
    return result;
}
function bpawn_movement(index){
    
    let result = [] 
    let [row,col] = fconv(index)
    console.log(row,col)      
    for (let j = 0; j < 4; j++) {
        
        let frow = row + bpawn[j][0]
        let fcol = col + bpawn[j][1]
        
        if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
            
            console.log('above')
            
        }else{
            
            if (bpawn[j][1] === -1 || bpawn[j][1] === 1) {
            
                if(is_there(frow,fcol)) {
                
                    result.push([frow,fcol])
                    console.log("there is a piece")
                }
            
            }else if (bpawn[j][0] === 2){
            
                if (row === 1 &&  matrix[row + 1][col] === '') {
                
                    result.push([frow,fcol])
                    console.log("can move 2 sqr")
                }
            } else {
                
                if(matrix[row+1][col] === ''){
                
                    result.push([frow,fcol])
                }
            }
        }
    }
    
    return result;
}
function queen_movement(index) {
    
    let result = []
    let [row,col] = fconv(index)
    for(let q = 0; q < 8; q++){
        
        let fq = queen[q]
        for(let r = 0 ; r < 7; r++){
            
            let frow = row + fq[r][0]
            let fcol = col + fq[r][1]
            if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
                
                console.log('above index')
                
            }else if (is_there(frow,fcol)) {
                
                result.push([frow, fcol])
                break;
            }else {
                
                result.push([frow ,fcol])
            }
            
        }
        
    }
    
    return result 
}

function rook_movement(index) {
    
    let result = []
    let [row,col] = fconv(index)
    for(let q = 0; q < 4; q++){
        
        let fq = queen[q]
        for(let r = 0 ; r < 7; r++){
            
            let frow = row + fq[r][0]
            let fcol = col + fq[r][1]
            if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
                
                console.log('above index')
                
            }else if (is_there(frow,fcol)) {
                
                result.push([frow, fcol])
                break;
            }else {
                
                result.push([frow ,fcol])
            }
            
        }
        
    }
    
    return result 
}

function bishop_movement(index) {
    
    let result = []
    let [row,col] = fconv(index)
    for(let q = 4; q < 8; q++){
        
        let fq = queen[q]
        for(let r = 0 ; r < 7; r++){
            
            let frow = row + fq[r][0]
            let fcol = col + fq[r][1]
            if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
                
                console.log('above index')
                
            }else if (is_there(frow,fcol)) {
                
                result.push([frow, fcol])
                break;
            }else {
                
                result.push([frow ,fcol])
            }
            
        }
        
    }
    
    return result 
}

function knight_movement(index) {
    
    let result = []
    let [row,col] = fconv(index)
    for(let N = 0; N < 8; N++){
        
        let frow = row + knight[N][0]
        let fcol = col + knight[N][1]
        
        if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
            
            console.log('above')
            
        }else if(is_there(frow,fcol)){
            
            result.push([frow, fcol])
            
        }else{
            
            result.push([frow, fcol])
            
        }
        
    }
    
    return result
}

function king_movement(index) {
    
    let result = []
    let [row,col] = fconv(index)
    for(let k = 0; k < 8; k++){
        
        let frow = row + king[k][0]
        let fcol = col + king[k][1]
        
        if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
            
            console.log('above')
            
        }else if(is_there(frow,fcol)){
            
            if (is_mpiece(frow,fcol)) {
                
                result.push([frow, fcol])
                
            }
            //result.push([frow, fcol])
            //break;
            
        }else{
            
            result.push([frow, fcol])
            
        }
        
    }
    
    return result
}

function move(row,col) {
    
    let strr = str[0][0]
    let strc = str[0][1]
    
    const starting = document.querySelector(`.sqr[data-position="${strr}-${strc}"]`);
    const destination = document.querySelector(`.sqr[data-position="${row}-${col}"]`);
    
    let piece = piece_atrc(strr,strc)
    
    if(turn === 'w'){
        
        if(isLowerCase(piece_atrc(row,col))){
            
            matrix[strr][strc] = '';
            starting.textContent = getPieceSymbol('');
            matrix[row][col] = piece;
            destination.textContent = getPieceSymbol(piece);
    
            turn = (turn === 'w') ? 'b' : 'w';
    
            reset()
            
        }else if(destination.textContent === '•'){
            
            matrix[strr][strc] = '';
            starting.textContent = getPieceSymbol('');
            matrix[row][col] = piece;
            destination.textContent = getPieceSymbol(piece);
    
            turn = (turn === 'w') ? 'b' : 'w';
    
            reset()
            
        }//else{
            
            //console.log('my piece')
            //reset()
            
        //}
        
    }else if(turn === 'b'){
        
        if(isUpperCase(piece_atrc(row,col))){
            
            matrix[strr][strc] = '';
            starting.textContent = getPieceSymbol('');
            matrix[row][col] = piece;
            destination.textContent = getPieceSymbol(piece);
    
            turn = (turn === 'w') ? 'b' : 'w';
    
            reset()
            
        }else if(destination.textContent === '•'){
            
            matrix[strr][strc] = '';
            starting.textContent = getPieceSymbol('');
            matrix[row][col] = piece;
            destination.textContent = getPieceSymbol(piece);
    
            turn = (turn === 'w') ? 'b' : 'w';
    
            reset()
            
        }
        
    }
    
}

/* 
    support functions
*/

function reset() {
    
    for (let d = 0;d < dot.length; d++){
        
        let dotr = dot[d][0]
        let dotc = dot[d][1]
        
        let doted = document.querySelector(`.sqr[data-position="${dotr}-${dotc}"]`);
        
        if (doted.textContent === '•') {
            
            //let [row,col] = fconv(d)
            
            const dotsqr = document.querySelector(`.sqr[data-position="${dot[d][0]}-${dot[d][1]}"]`);
            
            
            dotsqr.textContent = ''
        }
        
    }
    
    const color = document.querySelector(`.sqr[data-position="${str[0][0]}-${str[0][1]}"]`);
    
    if ((str[0][0] + str[0][1]) % 2 === 0) {
        color.style.backgroundColor = '#ffce9e';   // light
    } else {
        color.style.backgroundColor = '#d18b47';   // dark
    }
    
    dot = []
    str = []
    des = []
    clicked = false
}

function isUpperCase(char) {
  return char >= 'A' && char <= 'Z';
}

function isLowerCase(char) {
  return char >= 'a' && char <= 'z';
}

function choose(pos) {
    
    let piece = piece_atp(pos);
    let [row,col] = fconv(pos)
    str.push([row,col])
    
    if (piece != 'P'){
        piece = piece.toLowerCase();
    }
    if(piece === '') {
        
        console.log('click a piece')
        
    }else if (piece === 'p') {
        
        let tep = bpawn_movement(pos)
        return tep
        
    }else if (piece === 'P'){
        
        let tep = wpawn_movement(pos)
        return tep
        
    }else if(piece === 'q'){
        
        let tep = queen_movement(pos)
        return tep
        
    }if (piece === 'r') {
        
        let tep = rook_movement(pos)
        return tep
        
    }else if (piece === 'b'){
        
        let tep = bishop_movement(pos)
        return tep
        
    }else if(piece === 'n'){
        
        let tep = knight_movement(pos)
        return tep
        
    }else if(piece === 'k'){
        
        let tep = king_movement(pos)
        return tep
        
    }
}

function is_mpiecep(pos) {
    
    let [row,col] = fconv(pos)
    
    if (turn === 'w') {
        
        if(isUpperCase(piece_atrc(row,col))){
            
            return false
            
        }else {
            
            return true
            
        }
        
    }else if(turn === 'b'){
        
        if(isLowerCase(piece_atrc(row,col))){
            
            return false
            
        }else{
            
            return true
            
        }
        
    }
    
}

function is_mpiece(row , col) {
    
    //let [row,col] = fconv(pos)
    
    if (turn === 'w') {
        
        if(isUpperCase(piece_atrc(row,col))){
            
            return false
            
        }else {
            
            return true
            
        }
        
    }else if(turn === 'b'){
        
        if(isLowerCase(piece_atrc(row,col))){
            
            return false
            
        }else{
            
            return true
            
        }
        
    }
    
}

function fconv(pos) {
    
    const row = Math.floor(pos / 8);
    const col = pos % 8;
    
    return [row,col];
}

function is_there(r,c) {
    
    let T = matrix[r][c].toLowerCase()
    if (T === 'p' || T === 'q' || T === 'k' || T === 'r' || T === 'b' || T === 'n') {
       
       return true 
    }else {
        
        return false
    }
    
}

function piece_atp(index) {
    
    let [r,c] = fconv(index)
    let piece = matrix[r][c]
    
    return piece
}

function piece_atrc(r,c) {
    
    let piece = matrix[r][c]
    
    return piece
}

function is_incheck() {
    
    let result = []
    let [row,col] = fconv(index)
    for(let q = 0; q < 8; q++){
        
        let fq = queen[q]
        for(let r = 0 ; r < 7; r++){
            
            let frow = row + fq[r][0]
            let fcol = col + fq[r][1]
            if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
                
                console.log('above index')
                
            }else {
                
                result.push([frow ,fcol])
            }
            
        }
        
    }
    
    for(let N = 0; N < 8; N++){
        
        let frow = row + knight[N][0]
        let fcol = col + knight[N][1]
        
        if (frow < 0 || frow > 7 || fcol < 0 || fcol > 7){
            
            console.log('above')
            
        }else{
            
            result.push([frow, fcol])
            
        }
        
    }
    
    return result
    
}

