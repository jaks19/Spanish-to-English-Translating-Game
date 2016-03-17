// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	

	var correctAnswer;
    var autoOptions;
    var date = new Date();

	$("#phone").css("text-decoration", "line-through");
	$("input").focus();
	$(".from").text(lang_from);
	$(".to").text(lang_to);
	$("#currentWord").text(pickRandomProperty(current_dict));

	var button = $("button");
	button.on("click", function(){
		checkSubmission();
    });

    var body = $("body");
    body.on("keypress", function(event){
        console.log(event);
        if (event["which"] == 13){
        textBox.autocomplete('close');
        checkSubmission();
    }
    });

    var textBox = $("input");
    textBox.on("input", function(event){
            populateArray($("input").val());
            textBox.autocomplete({
                source: autoOptions,
                minLength: 2,

                select: function(event, ui) {
                    $("input").val(ui["item"]["value"]);
                    checkSubmission();
                    return false;
                }
            });
    });

	function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj){
        if (Math.random() < 1/++count){
           result = obj[prop];
       	   correctAnswer = prop;
   			}
		}
    return result;
	}

	function isCorrect(inputWord) {
		if (inputWord in current_dict){
			if (dicts[lang_to][lang_from][inputWord] == $("#currentWord").text()){
				return true;
			}
		}
		return false;
	}


	function archiveCorrect() {
		$("table thead").after("<tr class = \"correct\"><td>" + $("#currentWord").text() + 
            "</td><td>" + $("input").val() + 
            "</td><td><span class=\"ui-icon ui-icon-check\"></span></td></tr>");   
	}

	function archiveWrong() {
		$("table thead").after("<tr class = \"wrong\"><td>" + $("#currentWord").text() + 
            "</td><td id=\"wrong\">" + $("input").val() + "</td><td>" + correctAnswer +"</td></tr>");
	}

    function populateArray(inputString) {
        autoOptions = [];
        for (var word in current_dict){
            if (word.indexOf(inputString) >= 0){
                autoOptions.push(word);
                console.log("done");
            }
        }
    }

    function checkSubmission(){
        if (isCorrect($("input").val())) {
            archiveCorrect();
        }
        else {
            archiveWrong();
        }
        $("#currentWord").text(pickRandomProperty(current_dict));
        $("input").val("");
        $("input").focus();
    }
    

});
