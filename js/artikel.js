async function mainclown() {

const tableResponse = await fetch ("../artikel/table.html");
const tableData = await tableResponse.text();

document.getElementById('table-div').innerHTML = tableData;

const textResponse = await fetch ("../artikel/text.txt")
let textData = await textResponse.text();

textData = textData.replace(/\n/g, "<br>").trim();

const words = textData.split(/\s+/);
let outputHtml = '';
let indexCounter = 0;

words.forEach((word) => {
  if (word.startsWith('!')) {
    word = word.slice(1);
    let spanDummy = "<span id=\"" + indexCounter + "\">" 
    outputHtml += spanDummy+`${word}</span> `;
    indexCounter++;
  } else {
    outputHtml += `${word} `;
  }
});
    
document.getElementById('text-div').innerHTML = outputHtml;

}

mainclown()
  .then(() => {
    const artikelSpans = document.querySelectorAll(".russian-paragraph");
    artikelSpans.forEach(element => {
        element.addEventListener("click", event => {
        const clickedSpanId = event.target.id;
        if (clickedSpanId == 0) {
            console.log(clickedSpanId);
            if (document.getElementById(clickedSpanId).style.backgroundColor === "lightred") { 
                document.getElementById(clickedSpanId).style.backgroundColor = "lightred";
                document.getElementById(akk-indef-f).style.backgroundColor = "lightred";
            } else {
                document.getElementById(clickedSpanId).style.backgroundColor = "none";
                document.getElementById(akk-indef-f).style.backgroundColor = "none";

            } 
        }
      });
    });
    });
  

