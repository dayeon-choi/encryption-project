const data = {};

function getInput(e) {
  data[e.name] = e.value;
}
function submitData() {
  console.log(data);
}
