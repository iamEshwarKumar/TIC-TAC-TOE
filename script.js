const boardEl = document.getElementById('board');
function checkResult(){
for(const line of wins){
const [a,b,c] = line;
if(board[a] && board[a]===board[b] && board[b]===board[c]){
running = false;
highlightWin(line);
const winner = board[a];
scores[winner]++;
updateScores();
statusEl.innerHTML = `<span class='highlight'>${winner} wins!</span>`;
progress.style.width = '100%';
return;
}
}
if(board.every(cell=>cell)){
running = false;
statusEl.textContent = "It's a draw.";
progress.style.width = '100%';
}
}


function highlightWin(line){
line.forEach(i=>{
const el = boardEl.querySelector(`[data-idx='${i}']`);
el.classList.add('win');
// slightly pulse the winning cells
el.animate([
{ transform: 'scale(1.06)' },
{ transform: 'scale(1)' }
], { duration: 420, iterations: 2 });
});
}


function updateScores(){ scoreX.textContent = scores.X; scoreO.textContent = scores.O; }


function updateStatus(){
currentEl.textContent = turn;
statusEl.innerHTML = `Current: <strong>${turn}</strong>`;
const filled = board.filter(Boolean).length/9;
progress.style.width = `${Math.round(filled*100)}%`;
}


resetBtn.addEventListener('click', ()=>{
board = Array(9).fill('');
turn = 'X'; running = true; progress.style.width = '0%';
boardEl.querySelectorAll('.cell').forEach(c=>{c.textContent='';c.classList.remove('disabled','win','x','o')});
updateStatus();
});


modeBtn.addEventListener('click', ()=>{
mode = (mode==='2p')? 'cpu' : '2p';
modeBtn.textContent = `Mode: ${mode==='2p'?'2 Players':'vs CPU'}`;
modeBtn.setAttribute('aria-pressed', mode==='cpu');
resetBtn.click();
});


// init
init();
