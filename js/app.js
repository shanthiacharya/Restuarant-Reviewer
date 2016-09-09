// Will hold previously focused element
var focusedElementBeforeModal;


/* Fetch json file and populate handlebar templates */
$(document).ready(function(){
    var xmlhttp = new XMLHttpRequest();
    var url ;

    if ($("body").data("title") === "restuarantList") {
        /* JSON file for restuarnt list */
        url = "./data/restuarant.json";
        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                console.log(myArr);
                displayResturantList(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

   else
    if ($("body").data("title") === "restuarantListDetail") {
       /* Get restuarantname */
     var restuarantname = window.location.hash.substring(1);
       /* JSON file for reviews*/
     url = "./data/restuarantreviews.json";
     xmlhttp.onreadystatechange = function() {
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             var myArr = JSON.parse(xmlhttp.responseText);
             console.log(myArr);
             filteredmyArr = myArr.filter (function (value) {
                 if(value.name == restuarantname) {
                     return true
                 } else
                 {
                       return false;
                 }
               });
             displayResturantListDetail(filteredmyArr);
             displayResturantListReviews(filteredmyArr[0].reviews)
         }
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
   }

/* Handlebar template for restuarant list */
  function displayResturantList(context) {
      // Grab the template script
      var theTemplateScript = $("#restuarant-template").html();
      // Compile the template
      var theTemplate = Handlebars.compile(theTemplateScript);
      // Pass our data to the template
      var theCompiledHtml = theTemplate(context);
      // Add the compiled html to the page
      $('.content-placeholder').html(theCompiledHtml);
  }
/* Handlebar template for restuarant detail -top */
  function displayResturantListDetail(context) {
    // Grab the template script
    var theTemplateScript = $("#restuarantdetail-template").html();
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.content-placeholder').append(theCompiledHtml);
  }

/* Handlebar template for restuarant detail -reviews list */
  function displayResturantListReviews(context) {
    // Grab the template script
    var theTemplateScript = $("#restuarantreviews-template").html();
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
  // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    // Add the compiled html to the page
    $('.content-placeholder').append(theCompiledHtml);
  }





});





var restuarantReviews = new Array();


function getselectedRestaurantname() {
  var restuarantname = window.location.hash.substring(1);
  return restuarantname;
}

function getRestaurantJSONArray() {

    var url = "../data/restuarant.json";
   // Return a new promise.
   return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };
    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    // Make the request
    req.send();
  });
}



// Filter the restuarant array based on distance.
$('#distance input[type=radio]').change(function(){
      var selecteddistance = Number ($(this).val());
      var restArr =  new Array();
      getRestaurantJSONArray().then(function(response) {
        console.log("Success!", response);
        restArr = JSON.parse(response);
        console.log("Success!", restArr);
        // Filter the array by passed filter array
      filtereddistance =  restArr.filter (function (value) {
      //   console.log( "Array Value : " + value.distance + "Selected Value : " +selecteddistance);
            if( Number (value.distance) <= selecteddistance ){
               console.log( "Inside Greater Array Value : " + value.distance + "Selected Value : " +selecteddistance);
                return true
             }
           return false;
        });
       console.log("filteredArray!", filtereddistance );
       if (filtereddistance.length > 0)
         loadTemplateData(filtereddistance);
        else
         loadTemplateData(restArr);



    }, function(error) {
      console.error("Failed!", error);
    });
});

// Filter the restuarant array based on price.
$('#price input[type=checkbox]').change(function(){
    // code goes here
    var restArr =  new Array();
    var filtersarray = $("#price input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();
    console.log("price :"  + filtersarray);
    getRestaurantJSONArray().then(function(response) {
      console.log("Success!", response);
      restArr = JSON.parse(response);
      console.log("Success!", restArr);
      // Filter the array by passed filter array
    filteredprice =  restArr.filter (function (value) {
        for (var i = 0; i < filtersarray.length; i++) {
          if(value.price == filtersarray[i]) {
              return true
           }
        }
         return false;
      });
     console.log("filteredArray!", filteredprice);
     if (filteredprice.length > 0)
       loadTemplateData(filteredprice);
      else
       loadTemplateData(restArr);


  }, function(error) {
    console.error("Failed!", error);
  });
  });

// Filter the restuarant array based on cuisine.
$('#cuisine input[type=checkbox]').change(function(){
    // code goes here
    var filteredArray = [];
    var restArr =  new Array();
    var filtersarray = $("#cuisine input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();
    console.log("Cuisines :"  + filtersarray);

    getRestaurantJSONArray().then(function(response) {
      console.log("Success!", response);
      restArr = JSON.parse(response);
      console.log("Success!", restArr);
      // Filter the array by passed filter array
    filteredcuisine =  restArr.filter (function (value) {
        for (var i = 0; i < filtersarray.length; i++) {
          if(value.cuisine == filtersarray[i]) {

              return true
           }
        }
         return false;
      });
     console.log("filteredArray!", filteredcuisine);
     if (filteredcuisine.length > 0)
       loadTemplateData(filteredcuisine);
      else
       loadTemplateData(restArr);

  }, function(error) {
    console.error("Failed!", error);
  });

});


function loadTemplateData (loadData){

  // Grab the template script
  var theTemplateScript = $("#restuarant-template").html();
  // console.log(theTemplateScript)
  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Pass our data to the template
  var theCompiledHtml = theTemplate(loadData);

  // Add the compiled html to the page
  $('.content-placeholder').html(theCompiledHtml);

}



var redirecttoDetailsPage = function(someValue) {
    // Work with that value
    console.log(someValue);
    var obj = someValue;
    console.log("id: " + obj.id )
    window.location.href = "restuarantdetail.html"+"#" + obj.name;

  // $(location).href ="restuarantdetail.html"
}

function handleEnterKey(e,someValue) {

  // var restuarantDiv = document.querySelector('.mdl-card__supporting-text');
  // console.log(restuarantDiv);
  // var restuarantName = restuarantDiv.id;

  // Work with that value
  console.log(someValue);
  var obj = someValue;
  console.log("id: " + obj.id )
    if (e.keyCode == 13){
    window.location.href = "restuarantdetail.html"+"#" + obj.name;

    }
  // $(location).href ="restuarantdetail.html"
}




Handlebars.registerHelper('json', function(context) {

  return JSON.stringify(context).replace(/"/g, '&quot;');
});

Handlebars.registerHelper('addlabel', function(context) {

  var lprice =  JSON.stringify(context).replace(/"/g, '&quot;');
  var arialabel_adder = "Price" + lprice;
  return arialabel_adder;
});

Handlebars.registerHelper('addratingLabel', function(context) {

  var lrating =  JSON.stringify(context).replace(/"/g, '&quot;');
  var arialabel_adder = lrating + "stars out of 5"
  return arialabel_adder;
});



var showReviewModal = function(){

      focusedElementBeforeModal = document.activeElement;
      var dialogButton = document.querySelector('.dialog-button');
      var dialog = document.querySelector('#dialog');
      var confirmdialog = document.querySelector('#confirmdialog');
      dialog.querySelector('#cancelreviews')
      .addEventListener('click', function() {
        dialog.close();
      });
      confirmdialog.querySelector('#doneconfirm')
      .addEventListener('click', function() {
        confirmdialog.close();
      });

      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }

      // Add date
       var d = new Date();
       document.getElementById("date").innerHTML = d.getMonth() +'/' + d.getDate() + '/' +d.getFullYear();

       dialog.showModal();
       var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
       var focusableElements = dialog.querySelectorAll(focusableElementsString);

       // // Listen for and trap the keyboard
       dialog.addEventListener('keydown', trapTabKey);
       // Convert NodeList to Array
       focusableElements = Array.prototype.slice.call(focusableElements);
       var firstTabStop = focusableElements[0]; // close button
       var secondTabStop = focusableElements[1];
       var lastTabStop = focusableElements[focusableElements.length - 1];
       // Focus first filter checkbox
       firstTabStop.focus();

       function trapTabKey(e) {
           // Check for TAB key press
           if (e.keyCode === 9) {

             // SHIFT + TAB
             if (e.shiftKey) {

               if (document.activeElement === secondTabStop) {
               e.preventDefault();
               lastTabStop.focus();
             }

             // TAB
             } else {
                  if (document.activeElement === lastTabStop) {
                   e.preventDefault();
                   firstTabStop.focus();
                 }
              //  else
              //    if (document.activeElement === firstTabStop) {
              //      e.preventDefault();
              //      secondTabStop.focus();
              //    }
             }
           }

           // ESCAPE
           if (e.keyCode === 27) {
             dialog.close();
             focusedElementBeforeModal.focus();
           }
         }


       dialog.querySelector('#postreviews')
      .addEventListener('click', function() {
        var selectedRestuarantname = getselectedRestaurantname();
        var key = selectedRestuarantname;
        var reviews = userreviews.value;
        //var rating = $('#starratings input[type=radio]').val();
        var rating = $("#starratings input:radio:checked").map(function(){
            return $(this).val();
        }).toArray();
        restuarantReviews.push({key: key, reviews: reviews, rating:rating});
        saveReviews (restuarantReviews);
        dialog.close();

        if (! confirmdialog.showModal) {
          dialogPolyfill.registerDialog(confirmdialog);
        }
        confirmdialog.showModal();
      });




}


// Save user reviews to localStorage
 function saveReviews() {
  var selectedReviews = JSON.stringify(restuarantReviews);

  localStorage.userreviews = selectedReviews;
};




$(".fab").click(function() {
      $(".mdl-layout__drawer-right").addClass("active");
      $(".mdl-layout__obfuscator-right").addClass("ob-active");
      // Save current focus
      focusedElementBeforeModal = document.activeElement;
      console.log("focusedElementBeforeModal: " +focusedElementBeforeModal)
      manageFocusRightDrawer ();
    });
  $(".mdl-layout__obfuscator-right").click(function() {
      $(".mdl-layout__drawer-right").removeClass("active");
      $(".mdl-layout__obfuscator-right").removeClass("ob-active");
});



function manageFocusRightDrawer (){

  // Find all focusable children
  var drawer = document.querySelector('.mdl-layout__drawer-right');
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = drawer.querySelectorAll(focusableElementsString);

  // // Listen for and trap the keyboard
  drawer.addEventListener('keydown', trapTabKey);
  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);
  var firstTabStop = focusableElements[0]; // close button
  var secondTabStop = focusableElements[1];
  var lastTabStop = focusableElements[focusableElements.length - 1];
  // Focus first filter checkbox
  secondTabStop.focus();

  function trapTabKey(e) {
      // Check for TAB key press
      if (e.keyCode === 9) {

        // SHIFT + TAB
        if (e.shiftKey) {

          if (document.activeElement === secondTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
        } else {
             if (document.activeElement === lastTabStop) {
              e.preventDefault();
              firstTabStop.focus();
            }
          else
            if (document.activeElement === firstTabStop) {
              e.preventDefault();
              secondTabStop.focus();
            }
        }
      }

      // ESCAPE
      if (e.keyCode === 27) {
        closeDrawer();
      }
    }


}

function closeDrawer(){

  $(".mdl-layout__drawer-right").removeClass("active");
  $(".mdl-layout__obfuscator-right").removeClass("ob-active");
  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}


$(".close").click(function() {

  closeDrawer();
      // $(".mdl-layout__drawer-right").removeClass("active");
      // $(".mdl-layout__obfuscator-right").removeClass("ob-active");
});

$(".mdl-layout__obfuscator-right").click(function() {
  console.log ('obfuscator clicked');
  closeDrawer();
  // $(".mdl-layout__drawer-right").removeClass("active");
  // $(".mdl-layout__obfuscator-right").removeClass("ob-active");
});
console.log (document.querySelector('.mdl-card__supporting-text'));
