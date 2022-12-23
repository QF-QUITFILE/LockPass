var Keypad = {}

Keypad.Open = function (data) {
  CurrentType = "keypad"
  $("#keypad").css("display", "block");
  $("#keypad").html(
    "<form action='' method='' name='PINform' id='PINform' autocomplete='off' draggable='true'>" +
    "<input id='PINbox' type='password' value='' name='PINbox' disabled />" +
    "<br/>" +
    "<input type='button' class='PINbutton' name='1' value='1' id='1' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='2' value='2' id='2' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='3' value='3' id='3' onClick=addKeyPadNumber(this); />" +
    "<br>" +
    "<input type='button' class='PINbutton' name='4' value='4' id='4' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='5' value='5' id='5' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='6' value='6' id='6' onClick=addKeyPadNumber(this); />" +
    "<br>" +
    "<input type='button' class='PINbutton' name='7' value='7' id='7' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='8' value='8' id='8' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton' name='9' value='9' id='9' onClick=addKeyPadNumber(this); />" +
    "<br>" +
    "<input type='button' class='PINbutton clear' name='-' value='clear' id='-' onClick=clearForm(this); />" +
    "<input type='button' class='PINbutton' name='0' value='0' id='0' onClick=addKeyPadNumber(this); />" +
    "<input type='button' class='PINbutton enter' name='+' value='enter' id='+' onClick=submitForm(PINbox); />" +
    "</form>"
  );
}

Keypad.Close = function (data) {
  $("#keypad").css("display", "none");
  $.post('https://option_lockpass/PadLockClose');
  if (data.error != null) {
    $.post('https://option_lockpass/CombinationFail');
  }
}

function addKeyPadNumber(e) {
  //document.getElementById('PINbox').value = document.getElementById('PINbox').value+element.value;
  var v = $("#PINbox").val();
  if (v.length < 4) {
    $("#PINbox").val(v + e.value);
  }
}

function submitForm(e) {
  $("#keypad").css("display", "none");
  $.post("https://option_lockpass/TryCombination", JSON.stringify({
    combination: e.value,
  }));
};

function clearForm(e) {
  //document.getElementById('PINbox').value = "";
  $("#PINbox").val("");
}


$(function () {
  window.addEventListener('message', function(event){
    var eventData = event.data;
    if (eventData.action == "openKeypad") {
      Keypad.Open(eventData);
    }
  
    if (eventData.action == "closeKeypad") {
      Keypad.Close(eventData);
    }
  })
}); //docready


