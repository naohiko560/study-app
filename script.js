// Generate random numbers for the math quiz
let num1, num2;
function generateNumbers() {
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
}
// Display a math problem for the user to solve
function displayProblem() {
  generateNumbers();
  document.getElementById('problem').textContent = `${num1} + ${num2} =`;
}
// Check the user's answer
function checkAnswer() {
  const answer = parseInt(document.getElementById('answer').value);
  const correctAnswer = num1 + num2;

  if (answer === correctAnswer) {
    document.getElementById('result').textContent = 'Correct! 🎉';
  } else {
    document.getElementById('result').textContent = 'Incorrect. Try again!';
  }
  // Display a new problem
  displayProblem();
}
// Initialize the app
displayProblem();