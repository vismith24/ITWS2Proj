function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        /*Down key and focus on current*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*UP key and decrease focus on the previous*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {/*On enter prevent submission*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}

function myFunction() {

   var a = document.getElementById("myInput");

	var myarray=new Array(3)
	for(var i=0;i<3;i++)
	{
		myarray[i]=new Array(2);
	}
	myarray[0][0]='Pavan';
	myarray[0][1]='pro_1.html';
	myarray[1][0]='Nikhil';
	myarray[1][1]='pro_2.html';
	myarray[2][0]='Vismith';
	myarray[2][1]='https://www.google.com/';

	var j=0;
	for(j=0;j<3;j++)
	{
		console.log(a);
		if(myarray[j][0]==a.value)
		{
			window.location.href = myarray[j][1];
			console.log(myarray[j][1]);
		}
	
	}
	
}

var profiles = ["Pavan","Kevin","Prashant","Kate","Nikhil","Padmadhar","Parth","Palak","Padmanaban","Hemanth","Himaja","Vismith","Pranav","Pratyush","Paul","Kylie","Vinay","Nupur","Siddhartha","Sasikanth","Sejal"];

/*initiate the autocomplete function on the "myInput" element, and pass along the profiles array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), profiles);
