var data;
var x;


// ----------------- AJAX calls ------------------

var call = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1lLiL-dOWt9rQxCD6bxyAIXUlS9mK0dmA1P-sW637gsI%2Fedit%23gid%3D964805108&force=on',
    dataType: 'json',
	timeout: 3000
});

var categoryCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1lLiL-dOWt9rQxCD6bxyAIXUlS9mK0dmA1P-sW637gsI%2Fedit%23gid%3D964805108&force=on',
    dataType: 'json',
	timeout: 3000
});

// ----------------- Call managements ------------------

$.when(call).then(
//runs when call successful
    function (a) {
        data = JSON.parse(call.responseText);
        renderHTML(data);
    },
// will fire when timeout or error is reached
    function () {
        console.log("using backup sheet");
        call2 = $.ajax({
            type: 'GET',
            url: 'data.json',
            dataType: 'json',
            error: function () {
                console.log("Error loading the backup JSON. Please contact https://twitter.com/zibethin about this issue.");
            },
            success: function (data) {
                renderHTML(data);
            },
            timeout: 3000 // sets timeout to 3 seconds
        });

        // runs when call to backup spreadsheet is successful
        $.when(call2).then(
            function (a) {
                data = JSON.parse(call2.responseText);
                renderHTML(data);
            }
        );
});


// ------------------ Main functionality -----------------------


function filtering() {
    var didyoufindit; /* Create a new one */
    var numberofdefinition = 0; /* Amount of same definition */
    var definition = []; /* Result array */
    x = document.getElementById("mtagInput");
    // Get all li tags
    li = document.getElementsByTagName("li");
    x = x.value.toUpperCase();
    for (i = 2; i < data.length; i++) {
        if (data[i][1].toUpperCase().indexOf(x) > -1) {
                didyoufindit = "yes";
                li[i - 2].style.display = "";
                document.getElementById("not-found").style.display = "none";
            } else {
                li[i - 2].style.display = "none";
            }
        }
    if (didyoufindit !== "yes") {
        document.getElementById("not-found").style.display = "";/* Create a new one as a text */
    }
}

function renderHTML(data) {
    var htmlString = "<ul>";
    data = sortingDataAlphabetically(data);
    data.forEach(function (c, i) {
        if (i == 0 || i == 1) {

        } else {
            htmlString += "<li><p class='acronym'>" + c[1].toUpperCase() + "</p><p>" + capitalizeFirstLetter(c[2]) + "</p><p>" + capitalizeFirstLetter(c[3]) + "<br /><a href='" + c[4] + "'>" + c[4] + "</a></p></li>";
        }
    })
    htmlString += "</ul><p id='not-found' style='display:none'>Acronym not found.<br /><a href='#SendnewAcronym'>Suggest it to us.</a></p>";
    document.getElementById("showdata").innerHTML = htmlString;
    document.getElementById("input").innerHTML = '<input type="text" id="mtagInput" onkeyup="filtering()" placeholder="Type acronym to filter">';
} /* If there is no Acronym, the text "Create a new one" will displayed therefore didyoufindit != "yes"  */


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function sortingDataAlphabetically(data) {

     function Comparator(a, b) {
       if (a[1].toUpperCase() < b[1].toUpperCase()) return -1;
       if (a[1].toUpperCase() > b[1].toUpperCase()) return 1;
       return 0;
    }

    numberOfHeaders = 2;
    dataNeeded = data;
    dataNeeded.splice(0,numberOfHeaders);
    dataNeeded.sort(Comparator);
    dataNeeded.splice(0, 0, data[0], data[1]);
    return dataNeeded;
}


// ------------- Menu management ------------------------


document.getElementById("nav").onclick = function showMenu() {
    document.getElementById("overlay").style.display = "";
    document.getElementById("menu").style.display = "";
}

function closeMenu() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("menu").style.display = "none";
}

document.getElementById("close-button").onclick = function closeMenu() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("menu").style.display = "none";
}

var menuItems = document.getElementsByClassName("menu-item");

[].forEach.call(menuItems, function(c){
    c.onclick = function closeMenu() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("menu").style.display = "none";
    }
})
