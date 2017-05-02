var acronymContainer = document.getElementById("acronym-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://proxy.hxlstandard.org/data.json?force=on&url=https%3A//docs.google.com/spreadsheets/d/1LBQDNAi4EaD72FM5e4esmU30OxZbBcUgJPAgxNaM7G0/edit%23gid%3D1730333599&strip-headers=on'); /* Link JSON File */

    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
});

var x;

function myFunction() {
    x = document.getElementById("myInput").value;

}

function renderHTML(data) {
    var htmlString = "";
    var didyoufindit; /* Create a new one */
        var numberofdefinition = 0; /* Amount of same definition */
        var definition = [] ; /* Result array */
    
    for (i = 1; i < data.length; i++) {
        htmlString = data[i][1];

        if (htmlString === x) {
            definition[numberofdefinition] = "<p>" + data[i][2] + "<p>" + data[i][3] + "<a href='" + data[i][4] + "'><p>" + data[i][4] + "</a>";
            numberofdefinition += 1; /* counts up if a another is found */
            didyoufindit = "yes";
        }
  }
        var text = ""; 
        for (i = 0; i < definition.length; i++) {
            text += (i+1) + "." + "Definition" + definition[i];
        } /* Search for equal Definition" */

    document.getElementById("showdata").innerHTML = text; /* Print the different definition */
    
    if (didyoufindit != "yes") {
        document.getElementById("showdata").innerHTML = ("Create a new one"); /* Create a new one as a text */
    }
} /* If there is no Acronym, the text "Create a new one" will displayed therefore didyoufindit != "yes"  */
