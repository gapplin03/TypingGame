'use strict';

{
  const word = 'apple';
  let loc = 0; //あとで再定義するのでletを使う
  let score = 0;
  let miss = 0;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  target.textContent = word;

  function updateTarget(){
    let placeholder = '';
    for(var i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.innerHTML = placeholder + word.substring(loc);
  }

  window.addEventListener('keydown',(e)=>{
    console.log(e.key);
    if(e.key === word[loc]) {
      console.log('score');
      loc++; //正解したら次の文字に進むからプラス１
      updateTarget();
      score++;
      scoreLabel.innerHTML = score;
    }else{
      console.log('miss');
      miss++;
      missLabel.innerHTML = miss;
    }
  })
}