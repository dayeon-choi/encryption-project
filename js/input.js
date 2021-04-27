const data = { inputedStr: "happy new year" };

/* 입력 값 data에 */
function getInput(e) {
  data[e.name] = e.value.toLowerCase();
  console.log(data);
}

/* 암호화 버튼을 클릭했는지, 복호화 버튼을 입력했는지 판별 */
function submitData(whatIs) {
  if (whatIs == "en") {
    encryption();
  } else {
    decryption();
  }
}

/* 암호화 */
function encryption() {
  const playFair = [];
  const enPlayFair = [];
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  let encStr = "";

  for (let i = 0; i < data.inputedStr.length(); i += 2) {
    let tmpArr = [];
    temArr.length = 2;
    tmpArr[0] = inputStr.charAt(i);

    if (inputedStr.charAt(i) === inputedStr(i + 1)) {
      tmpArr[1] = "x";
      i--;
    } else {
      tmpArr[1] = inputStr.charAt(i + 1);
    }
    playFair.push(temArr);
  }
  console.log(playFair);
}
