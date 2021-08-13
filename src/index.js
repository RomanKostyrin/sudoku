// module.exports = function solveSudoku(matrix) {
//   let isCorrect = false
//   let result = stepLine(matrix)
//   while (!isCorrect) {
//     result = stepLine(result)
//     result = checkUniqueValue(result)
//     isCorrect = checkArr(result)
//   }
//   return result
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

function showSudoku(init) {
  let counter = 0
  init.forEach((el, index) => {
    el.forEach((value, ind) => {
      cell[counter].innerHTML = value
      counter++
    })
  })
}

function showSudokuTypeOf(init) {
  let counter = 0
  init.forEach((el, index) => {
    el.forEach((value, ind) => {
      cell[counter].innerHTML = typeof value
      counter++
    })
  })
}

function stepLine(init) {
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

  return stepQube(tempArr)
}

function stepQube(arr) {
  for (let i = 0; i < arr.length; i += 3) {
    for (let j = 0; j < arr.length; j += 3) {
      let array = []
      for (let k = 0; k < 3; k++) {
        if (!Array.isArray(arr[i + k][j])) {
          array.push(arr[i + k][j])
        }
        if (!Array.isArray(arr[i + k][j + 1])) {
          array.push(arr[i + k][j + 1])
        }
        if (!Array.isArray(arr[i + k][j + 2])) {
          array.push(arr[i + k][j + 2])
        }
      }
      for (let k = 0; k < 3; k++) {
        if (Array.isArray(arr[i + k][j])) {
          array.forEach((numb) => {
            if (arr[i + k][j].indexOf(numb) !== -1) {
              arr[i + k][j].splice(arr[i + k][j].indexOf(numb), 1)
            }
          })
        }
        if (Array.isArray(arr[i + k][j + 1])) {
          array.forEach((numb) => {
            if (arr[i + k][j + 1].indexOf(numb) !== -1) {
              arr[i + k][j + 1].splice(arr[i + k][j + 1].indexOf(numb), 1)
            }
          })
        }
        if (Array.isArray(arr[i + k][j + 2])) {
          array.forEach((numb) => {
            if (arr[i + k][j + 2].indexOf(numb) !== -1) {
              arr[i + k][j + 2].splice(arr[i + k][j + 2].indexOf(numb), 1)
            }
          })
        }
      }
    }
  }

  arr = checkArrValue(arr)

  return arr
}

function checkArrValue(array) {
  array.forEach((el, index) => {
    el.forEach((value, ind) => {
      if (Array.isArray(array[index][ind]) && array[index][ind].length === 1) {
        array[index][ind] = value[0]
      }
    })
  })
  return array
}

function checkUniqueValue(arr) {
  for (let i = 0; i < arr.length; i += 3) {
    for (let j = 0; j < arr.length; j += 3) {
      let array = []

      for (let k = 0; k < 3; k++) {
        if (Array.isArray(arr[i + k][j])) {
          array.push(arr[i + k][j])
        }
        if (Array.isArray(arr[i + k][j + 1])) {
          array.push(arr[i + k][j + 1])
        }
        if (Array.isArray(arr[i + k][j + 2])) {
          array.push(arr[i + k][j + 2])
        }
      }
      // проверяем есть ли одинокие значения в массивах для заполнения
      for (let k = 0; k < 3; k++) {
        let newArr = []
        if (array.length > 1) {
          array.forEach((el) => {
            el.forEach((elem) => {
              newArr.push(elem)
            })
          })
          for (let ii = 0; ii < newArr.length; ii++) {
            if (newArr.indexOf(newArr[ii]) === newArr.lastIndexOf(newArr[ii])) {
              if (
                Array.isArray(arr[i + k][j]) &&
                arr[i + k][j].indexOf(newArr[ii]) !== -1
              ) {
                arr[i + k][j] = newArr[ii]
              }
              if (
                Array.isArray(arr[i + k][j + 1]) &&
                arr[i + k][j + 1].indexOf(newArr[ii]) !== -1
              ) {
                arr[i + k][j + 1] = newArr[ii]
              }
              if (
                Array.isArray(arr[i + k][j + 2]) &&
                arr[i + k][j + 2].indexOf(newArr[ii]) !== -1
              ) {
                arr[i + k][j + 2] = newArr[ii]
              }
            }
          }
        }
      }
    }
  }
  return checkArrValue(arr)
}

function checkArr(array) {
  let answer = true
  array.forEach((el, index) => {
    el.forEach((value, ind) => {
      if (Array.isArray(array[index][ind])) {
        answer = false
      }
    })
  })
  return answer
}

function solveSudoku(initial) {
  let isCorrect = false
  let result = stepLine(initial)
  while (!isCorrect) {
    result = stepLine(result)
    result = checkUniqueValue(result)
    showSudoku(result)
    isCorrect = checkArr(result)
  }
}

solveSudoku(initial)
