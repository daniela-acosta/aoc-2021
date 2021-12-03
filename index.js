let input = document.querySelector("input");

let textarea = document.querySelector("textarea");

// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input.addEventListener("change", () => {
  let files = input.files;

  if (files.length == 0) return;

  /* If any further modifications have to be made on the
       Extracted text. The text can be accessed using the 
       file variable. But since this is const, it is a read 
       only variable, hence immutable. To make any changes, 
       changing const to var, here and In the reader.onload 
       function would be advisible */
  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;

    // This is a regular expression to identify carriage
    // Returns and line breaks
    const lines = file.split(/\r\n|\n/);
    textarea.value = lines.join("\n");

    // DAY 1
    const data = lines.map((d) => +d);
    countIncrements(data); // 1665
    countIncrements(groupByThree(data)); // 1702

    // DAY 2
    // const data = lines.map((line) => coordinatesArr(line));

    // const forward = sumByType(data, "forward");
    // const up = sumByType(data, "up");
    // const down = sumByType(data, "down");
    // console.log("XY: ", forward * (-up + down)); // 1714950

    // const position = getPositionChange(data);
    // console.log(position.x * position.depth); // 1281977850
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

const countIncrements = (data) => {
  const count = data.filter((el, ix, arr) => el < arr[ix + 1]).length;
  console.log("total increments: ", count);
};

const groupByThree = (data) => {
  const newArr = data
    .map((el, ix, arr) => {
      return +el + +arr[ix + 1] + +arr[ix + 2];
    })
    .slice(0, data.length - 2);
  return newArr;
};

const coordinatesArr = (line) => {
  const elements = line.split(" ");
  return elements;
};

const sumByType = (arr, type) => {
  const res = arr
    .filter((el) => el[0] === type)
    .map((el) => +el[1])
    .reduce((a, b) => a + b);
  return res;
};

const getPositionChange = (arr) => {
  let position = {
    aim: 0,
    depth: 0,
    x: 0,
  };

  let i = 0;

  for (j of arr) {
    if (j[0] === "up") {
      position.aim = position.aim - +j[1];
    }
    if (j[0] === "down") {
      position.aim = position.aim + +j[1];
    }
    if (j[0] === "forward") {
      position.x = position.x + +j[1];
      position.depth = position.depth + +j[1] * position.aim;
    }
  }

  return position;
};
