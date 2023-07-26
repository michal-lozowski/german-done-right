async function mainclown() {

const tableResponse = await fetch ("../artikel/table.html");
const tableData = await tableResponse.text();

document.getElementById('table-div').innerHTML = tableData;

const textResponse = await fetch ("../artikel/text.txt")
let textData = await textResponse.text();

textData = textData.replace(/\n/g, "<br>").trim();

const words = textData.split(/\s+/);
let outputHtml = '';
words.forEach((word) => {
  if (word.startsWith('!')) {
    outputHtml += `<span>${word}</span> `;
  } else {
    outputHtml += `${word} `;
  }
});
    
document.getElementById('text-div').innerHTML = outputHtml;

}

mainclown()
  .then(() => {

    });
  

