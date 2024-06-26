// 生成する問題文の数字
let num1 = null;
let num2 = null;

// 前回の問題文の数字
let prevNum1 = null;
let prevNum2 = null;

// ボタンの数を取得
const buttons = document.querySelectorAll('.js-checkAnswer');

// 押したボタンの数字を定義
let buttonText = null;

// 音声ファイルの初期化
const correctAudio = new Audio('../sounds/correct.mp3');
const incorrectAudio = new Audio('../sounds/incorrect.mp3');

// 2つの数字をランダムに生成
function generateNumbers() {
  num1 = Math.floor(Math.random() * 11);
  num2 = Math.floor(Math.random() * 11);
}
// 問題文の表示
function displayProblem() {
  generateNumbers();

  // 前回と同じ問題、または答えがマイナスなら再生成
  while ((num1 === prevNum1 && num2 === prevNum2) || num1 - num2 < 0) {
    generateNumbers();
  }

  // 今回の問題を保存
  prevNum1 = num1;
  prevNum2 = num2;

  document.getElementById('js-problem').textContent = `${num1} - ${num2}`;
}

// 押したボタンの数字を取得
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttonText = Number(button.textContent);
    button.classList.add('answer-button');
    checkAnswer();
  });
});

// 正解不正解を判定
function checkAnswer() {
  const correctAnswer = num1 - num2;

  if (buttonText === correctAnswer) {
    correctAudio.play();

    document.getElementById('js-result').textContent = 'せいかい！よくできました 🎉';
    document.getElementById('js-next').classList.remove('display-none');
  } else {
    incorrectAudio.play();

    document.getElementById('js-result').textContent = 'ざんねん 😢';
    document.getElementById('js-correct').textContent = 'せいかいは、';
    document.getElementById('js-correct-num').textContent = correctAnswer;

    document.getElementById('js-next').classList.remove('display-none');
  }

  // ボタンを押せなくする
  buttons.forEach((e) => {
    e.classList.toggle('pointer-none');
  });
}

// 次の問題を表示を押したとき
function nextProblem() {
  document.getElementById('js-result').textContent = '';
  document.getElementById('js-next').classList.add('display-none');
  document.getElementById('js-correct').textContent = '';
  document.getElementById('js-correct-num').textContent = '';

  buttons.forEach((button) => {
    button.classList.remove('answer-button');
  });

  // ボタンを押せるようにする
  buttons.forEach((e) => {
    e.classList.toggle('pointer-none');
  });

  displayProblem();
}

// アプリの初期化
displayProblem();
