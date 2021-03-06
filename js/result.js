let alphabetBoard = createArray(5, 5);
let oddFlag = false;
let zCheck = "";
var encryptionStr = "";
var decryptionStr = "";

function createArray(rows, columns) {
  let arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
  }
  return arr;
}

/* 쿼리스트링에서 파라미터 추출하는 함수 */
function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";
  params = params.split("&");
  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");
    if ([temp[0]] == sname) {
      sval = temp[1];
    }
  }
  return sval.split("+");
}

/* 쿼리 추출 */
let key = getParam("inputedKey");

setBoard(key);
setKeyTextArea();

let getStr = getParam("inputedStr");
let str = "";
let forStrContainer = "";
for (let i = 0; i < getStr.length; i++) {
  str += getStr[i];
  forStrContainer += getStr[i] + " ";
}

let StrContainer = document.querySelector(".StrContainer");
StrContainer.innerHTML +=
  "<div><input class='StrTextArea' type='text' value='" +
  forStrContainer +
  "' readonly='readonly'/>" +
  "</div>";

let blankCheck = "";
let blankCheckCount = 0;

/* 공백 제거 */
for (let i = 0; i < str.length; i++) {
  //공백 제거
  if (str.charAt(i) == " ") {
    str = str.substring(0, i) + str.substring(i + 1, str.length);
    blankCheck += 10;
  } else {
    blankCheck += 0;
  }
  //z를 q로 바꿔줘서 처리함
  if (str.charAt == "z") {
    str = str.substring(0, i) + "q" + str.substring(i + 1, str.length);
    zCheck += 1;
  } else {
    zCheck += 0;
  }
}
console.log(str);
encryptionStr = encryption(key, str);
console.log("암호화된 문자열:" + encryptionStr);

function goDescryption() {
  for (let i = 0; i < encryptionStr.length; i++) {
    if (encryptionStr.charAt(i) == " ")
      //공백제거
      encryptionStr =
        encryptionStr.substring(0, i) +
        encryptionStr.substring(i + 1, encryptionStr.length);
  }
  decryptionStr = decryption(key, encryptionStr, zCheck);

  for (let i = 0; i < decryptionStr.length; i++) {
    if (blankCheck.charAt(i) == "1") {
      decryptionStr =
        decryptionStr.substring(0, i) +
        " " +
        decryptionStr.substring(i, decryptionStr.length);
    }
  }
  let DeResultContainer = document.querySelector(".DeResultContainer");
  DeResultContainer.innerHTML +=
    "<input class='DeResultTextArea' type='text' value='" +
    decryptionStr +
    "' readonly='readonly'/>";
}

function setKeyTextArea() {
  let KeyContainer = document.querySelector(".KeyContainer");
  KeyContainer.innerHTML +=
    "<input class='keyTextArea' type='text' value='" +
    key +
    "' readonly='readonly'/>";
}

function decryption(key, str, zCheck) {
  let playFair = [];
  let decPlayFair = [];
  let x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0;
  let decStr = "";
  let lengthOddFlag = 1;

  for (let i = 0; i < str.length; i += 2) {
    let tmpArr = new Array(2);
    tmpArr[0] = str.charAt(i);
    tmpArr[1] = str.charAt(i + 1);
    playFair.push(tmpArr);
  }

  for (let i = 0; i < playFair.length; i++) {
    let tmpArr = new Array(2);
    for (let j = 0; j < alphabetBoard.length; j++) {
      for (let k = 0; k < alphabetBoard[j].length; k++) {
        if (alphabetBoard[j][k] == playFair[i][0]) {
          x1 = j;
          y1 = k;
        }
        if (alphabetBoard[j][k] == playFair[i][1]) {
          x2 = j;
          y2 = k;
        }
      }
    }

    if (x1 == x2) {
      //행이 같은 경우 각각 바로 아래열 대입
      tmpArr[0] = alphabetBoard[x1][(y1 + 4) % 5];
      tmpArr[1] = alphabetBoard[x2][(y2 + 4) % 5];
    } else if (y1 == y2) {
      //열이 같은 경우 각각 바로 옆 열 대입
      tmpArr[0] = alphabetBoard[(x1 + 4) % 5][y1];
      tmpArr[1] = alphabetBoard[(x2 + 4) % 5][y2];
    } //행, 열 다른경우 각자 대각선에 있는 곳.
    else {
      tmpArr[0] = alphabetBoard[x2][y1];
      tmpArr[1] = alphabetBoard[x1][y2];
    }
    decPlayFair.push(tmpArr);
  }

  /* 중복 문자열 돌려놓음 */
  for (let i = 0; i < decPlayFair.length; i++) {
    if (
      i != decPlayFair.length - 1 &&
      decPlayFair[i][1] == "x" &&
      decPlayFair[i][0] == decPlayFair[i + 1][0]
    ) {
      decStr += decPlayFair[i][0];
    } else {
      decStr += decPlayFair[i][0] + "" + decPlayFair[i][1];
    }
  }

  /* z->q */
  for (let i = 0; i < zCheck.length; i++) {
    if (zCheck.charAt(i) === "1") {
      decStr =
        decStr.substring(0, i) + "z" + decStr.substring(i + 1, decStr.length);
    }
  }

  if (oddFlag) {
    decStr = decStr.substring(0, decStr.length - 1);
  }

  for (let i = 0; i < decStr.length; i++) {
    if (i % 2 == lengthOddFlag) {
      decStr =
        decStr.substring(0, i + 1) +
        " " +
        decStr.substring(i + 1, decStr.length);
      i += 1;
      lengthOddFlag = ++lengthOddFlag % 2;
    }
  }
  return decStr;
}

/* 암호화 & 암호화 과정 출력*/
function encryption(key, str) {
  let playFair = [];
  let encPlayFair = [];
  let x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0;
  let encStr = "";

  for (let i = 0; i < str.length; i += 2) {
    let tmpArr = new Array(2);
    tmpArr[0] = str.charAt(i);
    tmpArr[1] = str.charAt(i + 1);

    if (tmpArr[1] === "") {
      tmpArr[1] = "x";
      oddFlag = true;
      playFair.push(tmpArr);
    } else {
      if (str.charAt(i) === str.charAt(i + 1)) {
        tmpArr[1] = "x";
        i--;
      } else {
        tmpArr[1] = str.charAt(i + 1);
      }
      playFair.push(tmpArr);
    }
  }

  let eningValue = "";
  for (let i = 0; i < playFair.length; i++) {
    console.log(playFair[i][0] + playFair[i][1]);
    eningValue += playFair[i][0] + playFair[i][1] + " ";
  }
  let EnIngContainer = document.querySelector(".EnIngContainer");
  EnIngContainer.innerHTML +=
    "<div><input class='EnIngTextArea' type='text' value='" +
    String(eningValue) +
    "' readonly='readonly'/></div>";

  for (let i = 0; i < playFair.length; i++) {
    let tmpArr = new Array(2);
    for (let j = 0; j < alphabetBoard.length; j++) {
      for (let k = 0; k < alphabetBoard.length; k++) {
        if (alphabetBoard[j][k] == playFair[i][0]) {
          x1 = j;
          y1 = k;
        }
        if (alphabetBoard[j][k] == playFair[i][1]) {
          x2 = j;
          y2 = k;
        }
      }
    }

    if (x1 == x2) {
      //행이 같은 경우
      tmpArr[0] = alphabetBoard[x1][(y1 + 1) % 5];
      tmpArr[1] = alphabetBoard[x2][(y2 + 1) % 5];
    } else if (y1 == y2) {
      //열이 같은 경우
      tmpArr[0] = alphabetBoard[(x1 + 1) % 5][y1];
      tmpArr[1] = alphabetBoard[(x2 + 1) % 5][y2];
    } else {
      tmpArr[0] = alphabetBoard[x2][y1];
      tmpArr[1] = alphabetBoard[x1][y2];
    }
    encPlayFair.push(tmpArr);
    console.log(tmpArr);
  }

  let enResultValue = "";
  for (let i = 0; i < encPlayFair.length; i++) {
    //encStr += encPlayFair[i] + "" + encPlayFair[i] + " ";
    encStr += String(encPlayFair[i][0]) + String(encPlayFair[i][1]);
    enResultValue +=
      String(encPlayFair[i][0]) + String(encPlayFair[i][1]) + " ";
  }
  let EnResultContainer = document.querySelector(".EnResultContainer");
  EnResultContainer.innerHTML +=
    "<input class='EnResultTextArea' type='text' value='" +
    enResultValue +
    "' readonly='readonly'/>";
  return encStr;
}

/* 암호판 세팅 */
function setBoard(key) {
  let keyForSet = ""; //중복된 문자가 제거된 문자열을 저장할 문자열
  let duplicationFlag = false; //문자 중복을 체크하기 위한 flag변수
  let keyLengthCount = 0; //alphabetBoard에 keyForSet을 넣기 위한 count변수

  key += "abcdefghijklmnopqrstuvwxyz";

  //중복처리
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < keyForSet.length; j++) {
      if (key.charAt(i) == keyForSet.charAt(j)) {
        duplicationFlag = true;
        break;
      }
    }
    if (!duplicationFlag) keyForSet += key.charAt(i);
    duplicationFlag = false;
  }

  //배열에 대입
  for (let i = 0; i < alphabetBoard.length; i++) {
    for (let j = 0; j < alphabetBoard[i].length; j++) {
      alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
    }
  }

  //배열에 대입된 값 출력
  let resultBoard = document.querySelector("#resultBoard");

  for (let i = 0; i < alphabetBoard.length; i++) {
    for (let j = 0; j < alphabetBoard[i].length; j++) {
      if (j == 0) {
        resultBoard.innerHTML += "<div>";
      }
      if (alphabetBoard[i][j] == "q") {
        resultBoard.innerHTML +=
          "<input class='boardTextArea' type='text' value='" +
          alphabetBoard[i][j] +
          "/z" +
          "' readonly='readonly'/>";
      } else {
        resultBoard.innerHTML +=
          "<input class='boardTextArea' type='text' value='" +
          alphabetBoard[i][j] +
          "' readonly='readonly'/>";
      }

      if ((j + 1) % 5 == 0) {
        resultBoard.innerHTML += "</div>";
      }
    }
    console.log();
  }
}
