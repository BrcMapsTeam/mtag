var data;
var x;

var call = $.ajax({ 
    type: 'GET', 
    url: 'https://proxy.hxlstandard.org/data.json?url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1lLiL-dOWt9rQxCD6bxyAIXUlS9mK0dmA1P-sW637gsI%2Fedit%23gid%3D964805108&force=on',
    dataType: 'json',
});


$.when(call).then(function (a) {
    data = JSON.parse(call.responseText);
    renderHTML(data);
});


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
                li[i-2].style.display = "none";
            }
        }
    if (didyoufindit != "yes") {
        document.getElementById("not-found").style.display = "";/* Create a new one as a text */
    }
}

function renderHTML(data) {
    var htmlString = "<ul>";
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

[].forEach.call(menuItems, function(c, i){
    c.onclick = function closeMenu() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("menu").style.display = "none";
    }
})


/*Generate acronym*/

//function permute(input) {
//    var permArr = [],
//            usedChars = [];
//    function permute_recursive(input) {
//        var i, ch;
//        for (i = 0; i < input.length; i++) {
//            ch = input.splice(i, 1)[0];
//            usedChars.push(ch);
//            if (input.length == 0) {
//                permArr.push(usedChars.slice());
//            }
//            permute_recursive(input);
//            input.splice(i, 0, ch);
//            usedChars.pop();
//        }
//        return permArr
//    }
//    return permute_recursive(input);
//}
//function generate_word_list() {
//    var words = $('#words').val();
//    words = words.split(/[\r\n]+/);
//    words = _.map(words, function (word) {
//        word = _.trim(word);
//        if (word.length > 0) {
//            word = word.charAt(0).toUpperCase() + word.slice(1);
//        }
//        return word;
//    });
//    words = _.filter(words, function (word) {
//        return !_.isEmpty(word);
//    });
//    words = _.uniq(words);
//    words.sort();
//    console.log(words);
//    var wordList = $('#candidate_words');
//    wordList.html('');
//    var wordListItems = [];
//    _.each(words, function (word) {
//        var wordListItem = $('<li>' +
//                '<label>' +
//                '<input type="checkbox" ' +
//                'name="candidate_words" ' +
//                'data-candidate-word="'
//                + word
//                + '"/>'
//                + word
//                + '</label>' +
//                '</li>');
//        wordListItem.find('input').prop('checked', true);
//        wordListItems.push(wordListItem);
//    });
//    wordList.append(wordListItems);
//}
//function generate_acronyms() {
//    var candidateWords = [];
//    $('#candidate_words').find('input:checked').each(function () {
//        candidateWords.push($(this).data('candidate-word'));
//    });
//    console.log(candidateWords);
//    var permuations = permute(candidateWords);
//    console.log(permuations);
//    var acronymList = $('#candidate_acronyms');
//    acronymList.html('');
//    var acronymListItems = [];
//    _.each(permuations, function (permuation) {
//        var acronym = _.map(permuation, function (word) {
//            return word.charAt(0);
//        }).join('');
//        var name = permuation.join(' ');
//        var acronymListItem = $('<li>' +
//                '<label>' +
//                '<input type="checkbox" ' +
//                'name="candidate_acronym" ' +
//                'data-candidate-acronym="'
//                + acronym
//                + '"/>'
//                + '<b>' + acronym + '</b>' + ' - ' + name
//                + '</label>' +
//                '</li>');
//        acronymListItem.find('input').prop('checked', true);
//        acronymListItems.push(acronymListItem);
//    });
//    acronymList.append(acronymListItems);
//}
//$(document).ready(function () {
//    $('#generate_acronyms').click(function () {
//        generate_word_list();
//        generate_acronyms();
//    });
//    $('#generate_acronyms2').click(function () {
//        generate_acronyms();
//    });
//});
