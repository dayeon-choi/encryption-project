const data = { inputedKey: "", inputedStr: "" };
let alphabetBoard = createArray(5, 5);
let addFlag = false;
let zCheck = "";
let encryptionStr = "";

function createArray(rows, columns) {
  var arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
  }
  return arr;
}

/* 입력 값 data에 */
function getInput(e) {
  data[e.name] = e.value.toLowerCase();
  console.log(data);
}

/* 암호화 버튼을 클릭했는지, 복호화 버튼을 입력했는지 판별 */
function submitData(whatIs) {
  /* 공백 제거 */
  let key = data.inputedKey;
  setBoard(key);
  let str = data.inputedStr;

  let blankCheck = "";
  let blankCheckCount = 0;

  if (whatIs == "en") {
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
  } else {
    decryption();
  }
}

/* 암호화 */
function encryption(key, str) {
  let playFair = new createArray();
  let encPlayFair = new createArray();
  let x = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0;
  let encStr = "";

  for (let i = 0; i < str.length; i += 2) {
    let tmpArr = new Array(2);
    tmpArr[0] = str.charAt(i);

    if (i in tmpArr) {
      console.log(i in tmpArr, tmpArr);
      if (str.charAt(i) == str.charAt(i + 1)) {
        console.log(tmpArr);
        tmpArr[1] = "x";
        i--;
      } else {
        console.log(tmpArr);
        tmpArr[1] = str.charAt(i + 1);
      }
    } else {
      console.log(i in tmpArr, tmpArr);
      tmpArr[1] = "x";
      oddFlag = true;
      console.log(tmpArr);
    }

    playFair.push(tmpArr);
    console.log("음" + playFair);
  }

  for (let i = 0; i < playFair.size; i++) {
    console.log("음" + playFair[i][0] + "" + playFair[i][1] + " ");
  }
  console.log();

  for (let i = 0; i < playFair.size; i++) {
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
    encPlayFair.add(tmpArr);
  }
  for (let i = 0; i < encPlayFair.size; i++) {
    encStr += encPlayFair[i][0] + "" + encPlayFair[i][1] + " ";
  }
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
  //배열에 대입
  for (let i = 0; i < alphabetBoard.length; i++) {
    for (let j = 0; j < alphabetBoard[i].length; j++) {
      console.log(alphabetBoard[i][j] + "-");
    }
    console.log();
  }
}
