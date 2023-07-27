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
    let spanDummy = "<span class=\"artikel-span\" id=\"" + indexCounter + "\">" 
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
    console.log("yes!");
    const artikelSpans = document.querySelectorAll(".artikel-span");
    artikelSpans.forEach(element => {
        element.addEventListener("click", event => {
        const clickedSpanId = event.target.id;
        console.log(clickedSpanId);
        if (clickedSpanId == 0) {
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
  

