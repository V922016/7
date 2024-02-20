//нашли контейнер с игрой по id
const game = document.getElementById("game");
//нашли контейнер для счёта по id
const score = document.getElementById("score");
//нашли контейнер для счёта пропусков по id
const count = document.getElementById("lose");

//объект для отслеживания состояния игры: счёт и флаг победы
const gameStatus = {
    score: 0,
    win: false
}

//объект для отслеживания состояния игры: счёт пропущенных и флаг проигрыша
const loseStatus = {
    count: 0,
    lose: false
}

//создаём элементы вида <div class="cell"></div>, которыми в цикле наполняем контейнер игры
//ширина контейнера / ширина элемента = 540 / 90 = 6
//высота контейнера / высота элемента = 540 / 90 = 6
//итого 36 элементов
for (let i = 0; i < 36; i++) {
    //создание элемента
    const cell = document.createElement("div");
    //даём элементу его основной класс (также применятся стили для этого класса)
    cell.classList.add("cell");
    
    //сразу вешаем на созданый элемент слушалку клика мышкой на нём
    //при этом событии будет выполняться переданная функция
    cell.addEventListener("mousedown", function(event) {
        //когда кликнем, к классам элемента добавится ещё один (соответственно, применятся и стили для этого класса)
        event.target.classList.add("cell-clicked");

        //делаем так, чтобы эффект пропадал после отпуска кнопки мыши                    
        cell.addEventListener("mouseup",function() {                        
            event.target.classList.remove("cell-clicked");
        })

        //удаляем эффект, если курсор вышел из клетки (даже с нажатой кнопкой)
        cell.addEventListener("mouseout",function() {                        
            event.target.classList.remove("cell-clicked");
        })

        //если мы кликнули по этому элементу и у него в этот момент был класс mole-norm, то увеличиваем счёт
        //заодно пишем его в контейнер для счёта
        if (event.target.classList.contains("mole-norm")) {           
            gameStatus.score++;
            score.innerText = 'Score is:' + gameStatus.score;
            //console.log("Caught Mole! Score is:", gameStatus.score);
        }

        //если мы кликнули по этому элементу и у него в этот момент был класс cell, то уменьшаем счёт
        //заодно пишем его в контейнер для счёта
        if (!event.target.classList.contains("mole-norm")) {           
            gameStatus.score--;
            score.innerText = 'Score is:' + gameStatus.score;
            //console.log("Caught Mole! Score is:", gameStatus.score);
        }

        //если мы попали по обычному кроту, то меняем иконку на побитого и удаляем иконку обычного
        //по аналогии с пустыми клетками, делаем так, чтобы эффект пропадал после отпуска кнопки мыши
        //и удаляем эффект, если курсор вышел из клетки (даже с нажатой кнопкой)
        if(event.target.classList.contains("mole-norm")){            
            event.target.classList.add("mole-crushed")
            event.target.classList.remove("mole-norm")
            cell.addEventListener("mouseup",function() {                        
                event.target.classList.remove("mole-crushed");
            })
            cell.addEventListener("mouseout",function() {                        
                event.target.classList.remove("mole-crushed");
            })
        }
        
        //а если счёт больше или равен 3, то мы победили!
        //пишем в контейнер поздравления
        //меняем флаг победы на true, т.к. нам нужно как-то завершить игру
        //если выиграли, то делаем активной кнопку "Restart"
        if (gameStatus.score >= 3) {
            score.innerText = "You won!";
            gameStatus.win = true;
        }        
    });

    //запихиваем созданный элемент в контейнер с игрой
    game.appendChild(cell);
    //конец блока цикла
}

//цикл отработал, в контейнер с игрой записалось 36 блоков класса cell
//можем найти все элементы класса cell
const cells = document.getElementsByClassName("cell");

//запускаем интервал, который каждую 1000мс буде выполнять переданную функцию
const interval = setInterval(function() {
    //проверяем флаг победы, может уже победили
    //если победили - останавливаем интервал и выходим из функции
    if (gameStatus.win) {
        clearInterval(interval);
        return;
    }

    //определяем текущего крота - случайный элемент из коллекции cells, которую нашли выше
    const mole = cells[Math.floor(Math.random() * cells.length)];
    //и даём ещё один класс - класс крота (с дополнительными стилями)
    //его наличие мы проверяем при клике
    mole.classList.add("mole-norm");

    //чтобы кроты как-то не копились, нужно их постепенно убирать
    //например через 750мс после добавления класса мы этот класс убираем
    setTimeout(function() {
    //тут же проверяем наличие крота для удаления. Если есть - значит не попали и засчитываем в пропущенные
        if (mole.classList.contains("mole-norm")){       
            loseStatus.count++;
            count.innerText = 'Missed:' + loseStatus.count;        
            mole.classList.remove("mole-norm");}
    }, 750);
}, 1000);
    
