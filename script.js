const London = document.querySelector('#London')
const newYork = document.querySelector('#newYork')
const losAngeles = document.querySelector('#losAngeles')
const lasVagas = document.querySelector('#lasVagas')
const dataBody = document.querySelector('#data-body')
const input = document.querySelector('.seach-bar')
const table = document.querySelector('.myTable')
const tr = table.getElementsByTagName("tr")
document.querySelector(".getWether").addEventListener("click", () => {
    console.log("click");
})
let city = "";
const Url = "https://python3-dot-parul-arena-2.appspot.com/test?cityname=";
London.addEventListener("click", () => {
    city = "London";
    getData()
})
newYork.addEventListener("click", () => {
    city = "New York";
    getData()
})
losAngeles.addEventListener("click", () => {
    city = "Los Angeles";
    getData()
})
lasVagas.addEventListener("click", () => {
    city = "Las Vegas";
    getData()
})
getData();
function getData() {
    fetch(Url + city)
        .then(data => data.json())
        .then(data => {
            if (city.length > 0) {
                fetchData(data)
            }
        })
        .catch(err => { console.log(err) })
}
function fetchData(data) {
    const { date_and_time, description, humidity_in_percent, pressure_in_hPa, temp_in_celsius } = data
    let newDate = new Date(date_and_time)
    let curDate = new Date()
    let dif = Math.abs(curDate.getHours() - newDate.getHours())
    console.log(dif);
    const noData = `<tr class ="noData"> No Data </tr>`
    const element = `<tr class="row" >
           <td>${city}</td>
           <td>${description}</td>
           <td>${temp_in_celsius}</td>
           <td>${pressure_in_hPa}</td>
           <td>${dif}</td>
           <td> <button onclick = removeThisElement(this) class="delBtn" >Delete</button> </td>
    </tr>`
    if (city.length == 0) {
        // dataBody.innerHTML = noData
    } else {
        dataBody.innerHTML += element
    }

}

function removeThisElement(e) {
    var element = e.parentNode.parentNode.rowIndex;
    document.querySelector(".myTable").deleteRow(element)
}
document.querySelector(".seach-bar-btn").addEventListener("click", () => {
    mySearchFunction()

})
function mySearchFunction() {
    let filterWord = (input.value).trim().toUpperCase()
    console.log(filterWord, tr.length);
    for (let index = 0; index < tr.length; index++) {
        const element = tr[index];
        let td = element.getElementsByTagName("td")[0]
        if (td) {
            let value = td.textContent || td.innerText
            if (value.toUpperCase().indexOf(filterWord) > -1) {
                element.style.backgroundColor = "yellow"
            } else {
                element.style.backgroundColor = "white"
            }

        }
    }

}

