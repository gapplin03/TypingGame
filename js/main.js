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
    'JavaScript',
    'ruby',
    'build',
    'continue',
    'master',
    'index',
    'style',
    'awesome',
    'happy',
    'Thanks',
  ];
  // let word = words[Math.floor(Math.random() * words.length)];//wordsの要素分ランダムに選出
  // let loc = 0; //あとで再定義するのでletを使う
  // let score = 0;
  // let miss = 0;
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 60 * 1000;
  let startTime;
  let isPlaying = false;
  // ion.sound.init();

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
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.innerHTML = '0.00';
      setTimeout(()=>{
        showResult();
      }, 100);
      target.innerHTML = 'click to replay';
    }
  }

  function showResult(){
    //正解とミスを足した時０だったら割り算できないので、参考演算子で先に0のパターンを出しておく
    const accuracy = score + miss === 0 ? 0 : score / ( score + miss ) * 100;
    alert(`${score} 文字　${miss} ミス　${accuracy.toFixed(2)}%正解率`);
  }

  function sound(){
    const music = document.getElementById('sound-file');
    music.currentTime = 0;
    music.play();
  }


  window.addEventListener('click',()=>{
    if(isPlaying){
      return;//　もしすでにゲームが始まっていたらそれ以降は処理したくない
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.innerHTML = score;
    missLabel.innerHTML = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown',(e)=>{
    sound();
    // ion.sound.play("カーソル移動4.mp3");
    if(isPlaying !== true){
      return;
    }
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