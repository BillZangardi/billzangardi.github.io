
function compute() {
  var principal = document.getElementById("principal").value;   // fetch the 2 numbers
  var interest = (document.getElementById("interest").value)/100;
  var term = document.getElementById("term").value;
  var MonthOrYear = document.getElementById("flip-2").value;
  var NumberOfPayments = 0;
  var Years=0; 
  var MonthlyInterest = interest/12;
  if(MonthOrYear=="Year"){
    NumberOfPayments=term*12;
    Years = term;
  }
  else{
    NumberOfPayments=term;
    Years = term/12;
  }

  var TotalMonth = principal * MonthlyInterest / (1 - (Math.pow(1/(1 + MonthlyInterest), NumberOfPayments)));
  document.getElementById("TotalMonth").value = TotalMonth.toFixed(2);

  var TotalPayment=NumberOfPayments*TotalMonth;
  document.getElementById("TotalPayment").value = TotalPayment.toFixed(2);

  var TotalInterest = TotalPayment-principal;
  document.getElementById("TotalInterest").value = TotalInterest.toFixed(2);

  var mytable = "<table cellpadding=\"5em\" cellspacing=\"1\"><tbody><tr>";
  mytable += "<tr><td>Payment&nbsp;</td><td>Principal&nbsp;</td><td>Interest&nbsp;</td><td>Balance&nbsp;</td></tr>";

  var BalanceLeft = principal;
  for (var i = 1; i <= NumberOfPayments; i++) {
    var CurrentPayment=i;
    var CurrentInterest= BalanceLeft * MonthlyInterest;
    var CurrentPrincipal= TotalMonth - CurrentInterest;
    var BalanceLeft= BalanceLeft - CurrentPrincipal;
    mytable += "<tr><td>" + i + "</td><td>" + CurrentPrincipal.toFixed(2) + "</td><td>" + CurrentInterest.toFixed(2) + "</td><td>" + BalanceLeft.toFixed(2) + "</td></tr>";
  }
  mytable += "</tr></tbody></table>";

  document.getElementById("amortizationTable").innerHTML=mytable;
}

function keypresshandler(event)
{
	var charCode = event.charCode||event.keyCode;
    //Non-numeric character range
	
   if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=46){	
		event.preventDefault();
	}
}

window.onload = function() {

  var inp1 = document.getElementById("principal");
  inp1.onkeyup = compute;
  inp1.onkeypress=keypresshandler;

  var inp2 = document.getElementById("interest");
  inp2.onkeyup = compute;
  inp2.onkeypress = keypresshandler;

  var inp3 = document.getElementById("term");
  inp3.onkeyup = compute;
  inp3.onkeypress = keypresshandler;

  var inp4 = document.getElementById("flip-2");
  inp4.onchange = compute;
  //inp4.onkeypress = keypresshandler;
  
};