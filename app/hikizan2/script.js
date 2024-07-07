// 生成する問題文の数字
let num1 = 0;
let num2 = 0;

// 前回の問題文の数字
let prevNum1 = 0;
let prevNum2 = 0;

// ボタンの数を取得
const buttons = document.querySelectorAll('.js-checkAnswer');

// 押したボタンの数字を定義
let buttonText = 0;

// 解いた問題数
let count = 1;

// 正解した数
let correctCount = 0;

// 問題数を設定
let total = 5;

// 音声ファイルの設定
const correctAudio = '../sounds/correct.mp3';
const incorrectAudio = '../sounds/incorrect.mp3';
const startAudio = '../sounds/start.mp3';

// 音を再生する関数
function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

// 2つの数字をランダムに生成
function generateNumbers() {
  num1 = Math.floor(Math.random() * 11);
  num2 = Math.floor(Math.random() * 11);
}
// 問題文の表示
function displayProblem() {
  // スタート音を再生
  playSound(startAudio);

  // 2つの数字をランダムに生成
  generateNumbers();

  // 問題数の表示
  document.getElementById('js-total').textContent = `もんだいすう ${count} / ${total}`;

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

  if (buttonText === correctAnswer && count < total) {
    playSound(correctAudio);

    document.getElementById('js-result').textContent = 'せいかい！よくできました 🎉';
    document.getElementById('js-next').classList.remove('display-none');
    correctCount++;
  } else if (buttonText !== correctAnswer && count < total) {
    playSound(incorrectAudio);

    document.getElementById('js-result').textContent = 'ざんねん 😢';
    document.getElementById('js-correct').textContent = 'せいかいは、';
    document.getElementById('js-correct-num').textContent = correctAnswer;

    document.getElementById('js-next').classList.remove('display-none');
  } else if (buttonText === correctAnswer && count === total) {
    playSound(correctAudio);
    document.getElementById('js-result').textContent = 'せいかい！よくできました 🎉';
    correctCount++;

    // 最終点数表示
    const totalPoint = (correctCount / total) * 100;
    document.getElementById('js-final').textContent = ` あなたのてんすうは ${totalPoint} てん 🎉`;
    document.getElementById('js-new').classList.remove('display-none');
  } else if (buttonText !== correctAnswer && count === total) {
    playSound(incorrectAudio);
    document.getElementById('js-result').textContent = 'ざんねん 😢';
    document.getElementById('js-correct').textContent = 'せいかいは、';
    document.getElementById('js-correct-num').textContent = correctAnswer;

    // 最終点数表示
    const totalPoint = (correctCount / total) * 100;
    document.getElementById('js-final').textContent = `あなたのてんすうは ${totalPoint} てん 🎉`;
    document.getElementById('js-new').classList.remove('display-none');
  }

  // ボタンを押せなくする
  // buttons.forEach((e) => {
  //   e.classList.toggle('pointer-none');
  // });
}

// 次の問題を表示を押したとき
function nextProblem() {
  document.getElementById('js-result').textContent = '';
  document.getElementById('js-next').classList.add('display-none');
  document.getElementById('js-correct').textContent = '';
  document.getElementById('js-correct-num').textContent = '';

  // 出題数のカウント
  count++;

  buttons.forEach((button) => {
    button.classList.remove('answer-button');
  });

  // ボタンを押せるようにする
  // buttons.forEach((e) => {
  //   e.classList.toggle('pointer-none');
  // });

  displayProblem();
}

// 「もういちどボタン」を押したとき
function newProblem() {
  document.getElementById('js-result').textContent = '';
  document.getElementById('js-new').classList.add('display-none');
  document.getElementById('js-final').textContent = '';
  document.getElementById('js-correct').textContent = '';
  document.getElementById('js-correct-num').textContent = '';
  correctCount = 0;

  // 出題数のリセット
  count = 1;

  buttons.forEach((button) => {
    button.classList.remove('answer-button');
  });

  displayProblem();
}

// アプリの初期化
displayProblem();
