// 生成する問題文の数字
let num1, num2;

// ボタンの数を取得
const buttons = document.querySelectorAll('.js-checkAnswer');

// 押したボタンの数字を定義
let buttonText;

// 音声ファイルの初期化
const correctAudio = new Audio('./sound/correct.mp3');
const incorrectAudio = new Audio('./sound/incorrect.mp3');

// 2つの数字をランダムに生成
function generateNumbers() {
  num1 = Math.floor(Math.random() * 6);
  num2 = Math.floor(Math.random() * 6);
}
// 問題文の表示
function displayProblem() {
  generateNumbers();
  document.getElementById('js-problem').textContent = `${num1} + ${num2}`;
}

// 押したボタンの数字を取得
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttonText = Number(button.textContent);
    button.classList.add('answer-button')
    checkAnswer();
  });
});

// 正解不正解を判定
function checkAnswer() {
  const correctAnswer = num1 + num2;

  if (buttonText === correctAnswer) {
    document.getElementById('js-result').textContent = '正解！よくできました 🎉';
    correctAudio.play();
    document.getElementById('js-next').classList.remove('display-none');
  } else {
    document.getElementById('js-result').textContent = '残念、不正解です 😢';
    document.getElementById('js-correct').textContent = '正解は、';
    document.getElementById('js-correct-num').textContent = correctAnswer;

    incorrectAudio.play();
    document.getElementById('js-next').classList.remove('display-none');
  }
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

  displayProblem();
}

// アプリの初期化
displayProblem();