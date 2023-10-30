class WhackAMole {
    constructor() {
      this.table = document.getElementById('game-table');
      this.cells = [];
      this.rows = 10;
      this.cols = 10;
      this.level = 1;
      this.score = 0;
      this.timeInterval = this.getTimeInterval(this.level);
      this.isGameOver = false;
      this.timer = null;
  
      this.init();
    }
  
    init() {
      this.createTable();
      this.addClickListeners();
      this.startGame();
    }
  
    createTable() {
      let html = '';
      for (let i = 0; i < this.rows; i++) {
        html += '<tr>';
        for (let j = 0; j < this.cols; j++) {
          html += '<td></td>';
        }
        html += '</tr>';
      }
      this.table.innerHTML = html;
      this.cells = this.table.getElementsByTagName('td');
    }
  
    addClickListeners() {
      for (let cell of this.cells) {
        cell.addEventListener('click', () => this.onCellClick(cell));
      }
    }
  
    onCellClick(cell) {
      if (cell.classList.contains('mole')) {
        cell.classList.add('hit');
        this.score += 1;
      } else {
        cell.classList.add('miss');
      }
    }
  
    getRandomCell() {
      const randomIndex = Math.floor(Math.random() * this.cells.length);
      return this.cells[randomIndex];
    }
  
    activateRandomCell() {
      const cell = this.getRandomCell();
      cell.classList.add('mole');
      setTimeout(() => this.deactivateCell(cell), this.timeInterval);
    }
  
    deactivateCell(cell) {
      cell.classList.remove('mole');
      cell.classList.remove('hit');
      cell.classList.remove('miss');
      if (!this.isGameOver) {
        this.activateRandomCell();
      }
    }
  
    getTimeInterval(level) {
      switch (level) {
        case 1:
          return 1500; // 1.5 seconds
        case 2:
          return 1000; // 1 second
        case 3:
          return 500;  // 0.5 seconds
        default:
          return 1500; // Default to level 1
      }
    }
  
    startGame() {
      this.isGameOver = false;
      this.score = 0;
      this.timeInterval = this.getTimeInterval(this.level);
      this.activateRandomCell();
  
      this.timer = setInterval(() => {
        if (this.isGameOver || this.score >= this.cells.length / 2) {
          this.endGame();
        }
      }, 100);
    }
  
    endGame() {
      this.isGameOver = true;
      clearInterval(this.timer);
      const result = this.score >= this.cells.length / 2 ? 'You Win!' : 'Computer Wins!';
      alert(`Game Over! ${result}\nYour score: ${this.score}`);
      this.askToPlayAgain();
    }
  
    askToPlayAgain() {
        const playAgain = confirm('Do you want to play again?');
        if (playAgain) {
          this.startGame();
        }
      }

    setLevel(level) {
      this.level = level;
      this.timeInterval = this.getTimeInterval(this.level);
      if (!this.isGameOver) {
        this.restartGame();
    }
  }
  
  restartGame() {
    for (let cell of this.cells) {
      cell.classList.remove('mole', 'hit', 'miss');
    }
    this.score = 0;
    this.activateRandomCell();
  }
}

  // Initialize the game
  const game = new WhackAMole();