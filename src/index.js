// module.exports = function solveSudoku(matrix) {
//   // your solution
// }
let cell = document.querySelectorAll('.cell')
const fullArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const initial = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0],
]

function solveSudoku(matrix) {}

function showSudoku(init) {
  let counter = 0
  init.forEach((el, index) => {
    el.forEach((value, ind) => {
      cell[counter].innerHTML = value
      counter++
    })
  })
}

function stepHorizontal(init) {
  let tempArr = [...init]
  tempArr.forEach((el, index) => {
    const zeroPozition = []
    const notFullArr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let littleArr = []
    // парсим строки на предмет отсутствия чисел
    el.forEach((value, ind) => {
      if (value === 0 || Array.isArray(value)) {
        zeroPozition.push(ind)
        notFullArr.push(value)
      } else {
        notFullArr[value - 1] = value
      }
    })
    // проверяем каких цифр нехватает в строке
    for (let i = 0; i < fullArr.length; i++) {
      if (fullArr[i] !== notFullArr[i]) {
        littleArr.push(fullArr[i])
      }
    }
    //пушим массив недостающих цифр в ячейки с нулями
    zeroPozition.forEach((el) => {
      // идем по массиву по вертикали по тем ячейкам в которых были нули
      let tempLittleArr = [...littleArr]
      for (let j = 0; j < tempArr.length; j++) {
        if (tempArr[j][el] !== 0) {
          let verticalNumber = tempArr[j][el]
          if (tempLittleArr.indexOf(verticalNumber) !== -1) {
            tempLittleArr.splice(tempLittleArr.indexOf(verticalNumber), 1)
          }
        }
      }
      tempArr[index][el] = tempLittleArr
    })
  })
  showSudoku(tempArr)
}

showSudoku(initial)
let result = stepHorizontal
result(initial)
