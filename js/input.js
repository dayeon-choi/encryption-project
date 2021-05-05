const data = { inputedKey: "", inputedStr: "" };

/* 입력 값 data에 */
function getInput(e) {
  data[e.name] = e.value.toLowerCase();
}

function actionEn() {
  document.forResult.action = "resultEn.html";
  document.forResult.submit();
}
