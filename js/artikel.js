fetch('../artikel/table.html')
.then(response => response.text())
.then(data => {
    document.getElementById('table-div').innerHTML = data;
})

