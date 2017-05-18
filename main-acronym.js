var acronymContainer = document.getElementById("acronym-info");
var btn = document.getElementById("btn");
var x;

var call = $.ajax({ 
    type: 'GET', 
    url: 'https://proxy.hxlstandard.org/data.json?force=on&url=https%3A//docs.google.com/spreadsheets/d/1LBQDNAi4EaD72FM5e4esmU30OxZbBcUgJPAgxNaM7G0/edit%23gid%3D1730333599&strip-headers=on',
    dataType: 'json',
});


$.when(call).then(function(data){
    var ourData = JSON.parse(call.responseText);
    renderHTML(ourData);
});


function filtering() {
    x = document.getElementById("mtagInput").value;

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
        text += (i + 1) + "." + "Definition" + definition[i];
    } /* Search for equal Definition" */

    document.getElementById("showdata").innerHTML = text; /* Print the different definition */

    if (didyoufindit != "yes") {
        document.getElementById("showdata").innerHTML = ("Create a new one"); /* Create a new one as a text */
    }
}

function renderHTML(data) {
    var htmlString = "<ul>";
    var didyoufindit; /* Create a new one */
    var numberofdefinition = 0; /* Amount of same definition */
    var definition = []; /* Result array */
    console.log(data);
    data.forEach(function (c, i) {
        if (i == 0) {

        } else {
            htmlString += "<li><p class='acronym'>" +c[1] + "</p><br />" + c[2] + "<p>" + c[3] + "<br /><a href='" + c[4] + "'>" + c[4] + "</a></p></li>";
        }
    })
    htmlString += "</ul>";
    document.getElementById("showdata").innerHTML = htmlString;
} /* If there is no Acronym, the text "Create a new one" will displayed therefore didyoufindit != "yes"  */




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
