'use strict';

{
  const words = [
    'commit',
    'remote',
    'push',
    'document',
    'var',
    'console',
    'zoom',
    'hello',
    'world',
    'string',
    'integer',
  ];
  let word = words[Math.floor(Math.random() * words.length)];//wordsの要素分ランダムに選出
  let loc = 0; //あとで再定義するのでletを使う
  let score = 0;
  let miss = 0;
  const timeLimit = 3 * 1000;
  let startTime;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');


  function updateTarget(){
    let placeholder = '';
    for(var i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.innerHTML = placeholder + word.substring(loc);
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.innerHTML = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(()=>{
      updateTimer();
    }, 10);

    if(timeLeft < 0){
      clearTimeout(timeoutId);
      timerLabel.innerHTML = '0.00';
      setTimeout(()=>{
        alert('Time up');
      }, 100);
    }
  }


  window.addEventListener('click',()=>{
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown',(e)=>{
    console.log(e.key);
    if(e.key === word[loc]) {
      console.log('score');
      loc++; //正解したら次の文字に進むからプラス１
      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
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