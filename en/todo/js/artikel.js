var mapData;

async function mainclown() {

  const baseURL = window.location.href.endsWith('/') ? window.location.href : window.location.href + '/';

  const tableResponse = await fetch (baseURL + "table.html");
  const tableData = await tableResponse.text();

  document.getElementById('table-div').innerHTML = tableData;

  const textResponse = await fetch (baseURL + "text.txt")
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

  const mapResponse = await fetch (baseURL + "map.txt");
  mapData = await mapResponse.text(); 
  mapData = mapData.split(/\n/g);
  mapData = mapData.map(item => item.split(' '));
  mapData = mapData.map(item => item.slice(1));
  
  for (let i = 0; i < mapData.length; i++) {
    let innerArray = mapData[i];
    if (innerArray) {
      let lastElement = innerArray[innerArray.length - 1];
      if (lastElement && lastElement.endsWith('\r')) {
        innerArray[innerArray.length - 1] = lastElement.replace(/\r$/, '');
      }
    }
  }

  }  
  

mainclown()
  .then(() => {
    const artikelSpans = document.querySelectorAll(".artikel-span");
    artikelSpans.forEach(spanElement => {
        spanElement.addEventListener("click", event => {
          const clickedSpanId = event.target.id;
          if (document.getElementById(clickedSpanId).style.backgroundColor == '') {
            
            document.querySelectorAll(".artikel-span").forEach(element => element.style.backgroundColor = "");
            document.querySelectorAll(".table-element").forEach(element => element.style.backgroundColor = "");
                        

            document.getElementById(clickedSpanId).style.backgroundColor = "rgb(255, 128, 128)";
            mapData[clickedSpanId].forEach(mappedElement => {
              document.getElementById(mappedElement).style.backgroundColor = "rgb(255, 128, 128)"
            })
          } else {
            document.getElementById(clickedSpanId).style.backgroundColor = "";
            mapData[clickedSpanId].forEach(mappedElement => {
              document.getElementById(mappedElement).style.backgroundColor = ""
            })
          }
        });
    });
  });
  

