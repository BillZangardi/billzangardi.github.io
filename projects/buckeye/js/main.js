var dropdown;
var tableShowing;

var json = '{"values" : [' +
  '"180 90 105 120 135 150 165 120",' +
  '"190 95 115 130 145 160 175 130",' +
  '"200 105 120 140 155 170 185 140",' +
  '"205 110 125 140 160 175 190 140",' +
  '"210 115 130 145 165 180 195 145",' +
  '"215 120 135 150 165 185 200 150",' +
  '"220 125 140 155 170 190 205 155",' +
  '"225 130 145 160 175 190 210 160",' +
  '"230 135 150 165 180 195 215 165",' +
  '"235 140 155 170 185 200 220 170",' +
  '"240 150 165 180 195 210 225 180",' +
  '"245 150 170 185 200 215 230 185",' +
  '"250 155 175 190 205 220 235 190",' +
  '"255 160 175 195 210 225 240 195",' +
  '"260 165 180 200 215 230 245 200",' +
  '"265 170 185 200 220 235 250 200",' +
  '"270 175 190 205 225 240 255 205",' +
  '"275 180 195 210 225 245 260 210",' +
  '"280 185 200 215 230 250 265 215",' +
  '"285 190 215 220 235 250 270 220",' +
  '"290 195 210 225 240 255 275 225",' +
  '"295 200 215 230 245 260 280 230",' +
  '"300 210 225 240 255 270 285 240",' +
  '"305 210 230 245 260 275 290 245",' +
  '"310 215 235 250 265 280 295 250",' +
  '"315 220 235 255 270 285 300 255",' +
  '"320 225 240 260 275 290 305 260",' +
  '"325 230 245 260 280 295 310 260",' +
  '"330 235 250 265 285 300 315 265",' +
  '"335 240 255 270 285 305 320 270",' +
  '"340 245 260 275 290 310 325 275",' +
  '"345 245 265 280 295 210 330 280",' +
  '"350 255 270 285 300 315 335 285",' +
  '"360 270 285 300 315 330 345 300",' +
  '"370 275 295 310 325 340 355 310",' +
  '"380 285 300 320 335 350 365 320",' +
  '"390 295 310 325 345 360 375 325",' +
  '"400 305 320 335 350 370 385 335",' +
  '"410 315 330 345 360 375 395 345",' +
  '"420 330 345 360 375 390 405 360",' +
  '"430 335 355 370 385 400 415 370",' +
  '"440 345 360 380 395 410 425 380",' +
  '"450 355 370 385 405 420 435 385",' +
  '"460 365 380 395 410 430 445 395",' +
  '"470 375 390 405 420 435 455 405",' +
  '"480 390 405 420 435 450 465 420",' +
  '"490 395 415 430 445 460 475 430",' +
  '"500 405 420 440 455 470 485 440"' +
']}';
var sets = JSON.parse(json);
var buckeyeObjects = new Array(sets.values.length);

for(var i = 0; i < sets.values.length; i++) {
    var obj = sets.values[i];
    var values = obj.split(' ');
    buckeyeObjects[i] = {
      max: values[0], 
      weight1: values[1], 
      weight2: values[2], 
      weight3: values[3], 
      weight4: values[4], 
      weight5: values[5], 
      weight6: values[6], 
      weight7: values[7]
    };
}

function displaySets(selectObject) {
  if(document.getElementById("myPersonalTable").rows.length > 1) {
    document.getElementById("myPersonalTable").deleteRow(1);
  }
  var index = selectObject.selectedIndex;
  var buckeye = buckeyeObjects[index];
  var table = document.getElementById("myPersonalTable");
  var row = table.insertRow(1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);
  var cell7 = row.insertCell(7);
  cell0.innerHTML = buckeye.max;
  cell1.innerHTML = buckeye.weight1;
  cell2.innerHTML = buckeye.weight2;
  cell3.innerHTML = buckeye.weight3;
  cell4.innerHTML = buckeye.weight4;
  cell5.innerHTML = buckeye.weight5;
  cell6.innerHTML = buckeye.weight6;
  cell7.innerHTML = buckeye.weight7;
  document.getElementById('personalRow').style.display = 'block';
}

function displayTable() {
  if(!tableShowing) {
    document.getElementById('tableButton').innerHTML = "Hide Table";
    document.getElementById('tableRow').style.display = 'block';
    tableShowing = true;
  } else {
    document.getElementById('tableButton').innerHTML = 'Show Full Table';
    document.getElementById('tableRow').style.display = 'none';
    tableShowing = false;
  }
}

function displayHistoryTable(history) {
  while(document.getElementById("historyTable").rows.length > 1) {
    document.getElementById("historyTable").deleteRow(1);
  }
  var json = JSON.parse(history);
  for (var i=0; i < json.values.length;++i){  
      var table = document.getElementById("historyTable");
      var row = table.insertRow(i + 1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      cell0.innerHTML = json.values[i].weight;
      cell1.innerHTML = json.values[i].workout;
      cell2.innerHTML = json.values[i].date;
      cell3.innerHTML = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" onClick=\"deleteHistory(" + i + ")\"><span>×</span></button>";
  }
  document.getElementById('historyRow').style.display = 'block';
}

function remember_workout() {
  var index = dropdown.selectedIndex;
  var buckeye = buckeyeObjects[index];
  var history=getCookie("history");
  var workout = prompt("Please enter type of workout: (Bench, Squat, etc.)", "");
  if(history) {
    var json = JSON.parse(history);
    json.values.push({"weight" : buckeye.max, "date" : getDate(), "workout" : workout});
    setCookie("history", JSON.stringify(json), 30);
  } else {
      var cookie = '{"values":[{' +
      '"weight":"' + buckeye.max + '",' +
      '"date":"' + getDate() + '",' + 
      '"workout":"' + workout + '"}]}';
      setCookie("history", cookie, 30);
  }
  checkCookie();
}

function deleteHistory(position) {
  if(confirm("Are you sure you want to delete this item?")) {
    var history=getCookie("history");
    if(history) {
      var json = JSON.parse(history);
      json.values.splice(position, 1);
      setCookie("history", JSON.stringify(json), 30);
      checkCookie();
    }
  }
}

window.onload = function() {
  dropdown = document.getElementById("selectNumber");
  for (var i=0; i < buckeyeObjects.length;++i){  
      var buckeye = buckeyeObjects[i];  
      var option = document.createElement("OPTION");
      option.text = buckeye.max;
      option.value = buckeye.max;
      dropdown.options.add(option); 
      var table = document.getElementById("myTable");
      var row = table.insertRow(i + 1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      var cell7 = row.insertCell(7);
      cell0.innerHTML = buckeye.max;
      cell1.innerHTML = buckeye.weight1;
      cell2.innerHTML = buckeye.weight2;
      cell3.innerHTML = buckeye.weight3;
      cell4.innerHTML = buckeye.weight4;
      cell5.innerHTML = buckeye.weight5;
      cell6.innerHTML = buckeye.weight6;
      cell7.innerHTML = buckeye.weight7;
  }
  checkCookie();
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var history=getCookie("history");
    if (history != "") {
        displayHistoryTable(history);
    }
}

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  return mm+'/'+dd+'/'+yyyy;
}
