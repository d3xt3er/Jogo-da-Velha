var divElement = document.querySelector('div'),
    tableElement = document.querySelector('table');

var Game = {
    start(){
        this.field = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        this.currentPlayer = 'X';
        this.isFinished = false;
        this.round = 0;
        this.render();
    },
    nextPlayer(){
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';  
    },
    setField(line, column){
        if(!this.isFinished && this.field[line][column] === ''){
            this.field[line][column] = this.currentPlayer;
            this.nextPlayer();
            this.round++;
            this.render();
        }
    },
    isGameOver(){
        var field = this.field,
            rows = 3,
            cols = 3,
            totalRow = 0,
            totalCol = 0;
            for(var i = 0; i < rows; i++){
                totalRow = 0;
                totalRow = 0;
                for(var j = 0; j < cols; j++){
                    if (field[i][j] === 'X') {
                        totalRow++;
                    }
                    if (field[i][j] === 'O') {
                        totalRow--;
                    }
                    if (field[j][i] === 'X') {
                        totalCol++;
                    }
                    if (field[j][i] === 'X') {
                        totalCol--;
                    }
                }
                if (totalRow === 3 || totalCol === 3) {
                    return 'X';
                }
                if (totalRow === -3 || totalCol === -3) {
                    return 'O';
                }
            }
            if(field[0][0] !== '' && field[0][0] === field[1][1] && field[1][1] === field[2][2]){
                return field[0][0];
            }
            if(field[0][2] !== '' && field[0][2] === field[1][1] && field[1][1] === field[2][2]){
                return field[0][2];
            }
            if(this.round === rows * cols) {
                return 'Nobody';
            }


    },
    render(){
        var winner = this.isGameOver();
        divElement.textContent = winner ? `Winer: ${winner}` : `Current Player ${this.currentPlayer}`;
        
        if(winner){
            this.isFinished = true;
        }
       
        var template = '';
        this.field.forEach((line, lineIndex)=>{
            template += '<tr>';
            line.forEach((column, columnIndex)=>{
                template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})">${column}</td>`;
            })
            template += '</tr>';
        })
        tableElement.innerHTML = template;
    }
}

Game.start();