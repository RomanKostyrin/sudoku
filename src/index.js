module.exports = function solveSudoku(matrix) {
  let isCorrect = false
  let result = stepLine(matrix)
  result = checkArrValue(result)
  for (let i = 0; i < 2; i++) {
    tact(result)
    isCorrect = checkArr(result)
    if (isCorrect) {
      console.log('correct!')
      return result
    }
  }

  const longestArray = tryToGuess(result)
  let tempResult = copyArray(result)
  let lengthArr = result[longestArray[1][0]][longestArray[1][1]].length
  for (let k = 0; k < lengthArr; k++) {
    let val = result[longestArray[1][0]][longestArray[1][1]][k]
    result[longestArray[1][0]][longestArray[1][1]] = val
    for (let h = 0; h < 11; h++) {
      tact(result)
      isCorrect = checkArr(result)
      if (h === 10) {
        const longestArray2 = tryToGuess(result)
        let tempResult2 = copyArray(result)
        let lengthArr2 = result[longestArray2[1][0]][longestArray2[1][1]].length
        let val = result[longestArray2[1][0]][longestArray2[1][1]][k]
        result[longestArray2[1][0]][longestArray2[1][1]] = val
        console.log(result[longestArray2[1][0]][longestArray2[1][1]])
        for (let n = 0; n < lengthArr2; n++) {
          tact(result)
          isCorrect = checkArr(result)
          if (isCorrect) {
            console.log('correct!')
            return result
          }
          if (n === 11) {
            const longestArray3 = tryToGuess(result)
            let tempResult3 = copyArray(result)
            let lengthArr3 =
              result[longestArray3[1][0]][longestArray3[1][1]].length
            let val = result[longestArray3[1][0]][longestArray3[1][1]][k]
            result[longestArray3[1][0]][longestArray3[1][1]] = val
            console.log(result[longestArray3[1][0]][longestArray3[1][1]])
            for (let u = 0; u < lengthArr3; u++) {
              tact(result)
              isCorrect = checkArr(result)
              if (isCorrect) {
                console.log('correct!')
                return result
              }
              if (n === 11) {
                const longestArray4 = tryToGuess(result)
                let tempResult4 = copyArray(result)
                let lengthArr4 =
                  result[longestArray4[1][0]][longestArray4[1][1]].length
                let val = result[longestArray4[1][0]][longestArray4[1][1]][k]
                result[longestArray4[1][0]][longestArray3[1][1]] = val
                console.log(result[longestArray4[1][0]][longestArray4[1][1]])
                for (let f = 0; f < lengthArr4; f++) {
                  tact(result)
                  isCorrect = checkArr(result)
                  if (isCorrect) {
                    console.log('correct!')
                    return result
                  }
                }
                result = copyArray(tempResult4)
              }
            }
            result = copyArray(tempResult3)
          }
        }
        result = copyArray(tempResult2)
      }
    }
    if (isCorrect) {
      console.log('correct!')
      return result
    }
    result = copyArray(tempResult)
  }
}

// let cell = document.querySelectorAll('.cell')
const fullArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const initial = [
  [8, 7, 0, 0, 0, 0, 6, 5, 2],
  [0, 0, 0, 0, 7, 2, 4, 0, 0],
  [0, 3, 2, 0, 5, 0, 0, 0, 0],
  [0, 0, 8, 0, 0, 5, 3, 0, 4],
  [6, 0, 0, 9, 0, 3, 0, 0, 0],
  [0, 1, 3, 7, 0, 0, 0, 0, 0],
  [5, 0, 9, 4, 0, 7, 0, 0, 0],
  [3, 0, 0, 1, 0, 9, 0, 7, 0],
  [1, 2, 0, 0, 0, 6, 0, 4, 9],
]

// function showSudoku(init) {
//   let counter = 0
//   init.forEach((el, index) => {
//     el.forEach((value, ind) => {
//       cell[counter].innerHTML = value
//       counter++
//     })
//   })
// }

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
            // console.log(verticalNumber)
            // console.log(tempLittleArr)
          }
        }
      }

      tempArr[index][el] = tempLittleArr
    })
  })
  tempArr = checkArrValue(tempArr)
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
      if (typeof array[index][ind] !== 'number') {
        answer = false
      }
    })
    if (el.reduce((acc, el) => acc + el) !== 45) {
      answer = false
    }
  })
  return answer
}

function solveSudoku(initial) {
  let isCorrect = false
  let result = stepLine(initial)
  result = checkArrValue(result)
  for (let i = 0; i < 2; i++) {
    tact(result)
    isCorrect = checkArr(result)
    if (isCorrect) {
      console.log('correct!')
      return result
    }
  }

  const longestArray = tryToGuess(result)
  let tempResult = copyArray(result)
  let lengthArr = result[longestArray[1][0]][longestArray[1][1]].length
  for (let k = 0; k < lengthArr; k++) {
    let val = result[longestArray[1][0]][longestArray[1][1]][k]
    result[longestArray[1][0]][longestArray[1][1]] = val
    for (let h = 0; h < 11; h++) {
      tact(result)
      isCorrect = checkArr(result)
      if (h === 10) {
        const longestArray2 = tryToGuess(result)
        let tempResult2 = copyArray(result)
        let lengthArr2 = result[longestArray2[1][0]][longestArray2[1][1]].length
        let val = result[longestArray2[1][0]][longestArray2[1][1]][k]
        result[longestArray2[1][0]][longestArray2[1][1]] = val
        for (let n = 0; n < lengthArr2; n++) {
          tact(result)
          isCorrect = checkArr(result)
          if (isCorrect) {
            console.log(result)
            return result
          }
          if (n === 11) {
            const longestArray3 = tryToGuess(result)
            let tempResult3 = copyArray(result)
            let lengthArr3 =
              result[longestArray3[1][0]][longestArray3[1][1]].length
            let val = result[longestArray3[1][0]][longestArray3[1][1]][k]
            result[longestArray3[1][0]][longestArray3[1][1]] = val
            console.log(result[longestArray3[1][0]][longestArray3[1][1]])
            for (let u = 0; u < lengthArr3; u++) {
              tact(result)
              isCorrect = checkArr(result)
              if (isCorrect) {
                console.log('correct!')
                return result
              }
              if (n === 11) {
                const longestArray4 = tryToGuess(result)
                let tempResult4 = copyArray(result)
                let lengthArr4 =
                  result[longestArray4[1][0]][longestArray4[1][1]].length
                let val = result[longestArray4[1][0]][longestArray4[1][1]][k]
                result[longestArray4[1][0]][longestArray3[1][1]] = val
                console.log(result[longestArray4[1][0]][longestArray4[1][1]])
                for (let f = 0; f < lengthArr4; f++) {
                  tact(result)
                  isCorrect = checkArr(result)
                  if (isCorrect) {
                    console.log('correct!')
                    return result
                  }
                }
                result = copyArray(tempResult4)
              }
            }
            result = copyArray(tempResult3)
          }
        }
        result = copyArray(tempResult2)
      }
    }
    if (isCorrect) {
      console.log(result)
      return result
    }
    result = copyArray(tempResult)
  }
}

function copyArray(mainArr) {
  const tempArr = []
  for (let key in mainArr) {
    if (typeof mainArr[key] === 'object') {
      tempArr[key] = copyArray(mainArr[key])
    } else {
      tempArr[key] = mainArr[key]
    }
  }
  return tempArr
}

function tryToGuess(result) {
  let long = 0
  let coord = [0, 0]
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Array.isArray(result[i][j])) {
        if (result[i][j].length > long) {
          long = result[i][j].length
          coord = [i, j]
        }
      }
    }
  }
  return [long, coord]
}

function tact(result) {
  return new Promise(function (resolve) {
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    result = checkUniqueValue(result)
    result = checkArrValue(result)
    result = stepLine(result)
    result = checkArrValue(result)
    // showSudoku(result)
    setTimeout(() => resolve(result), 100)
  })
}

solveSudoku(initial)
