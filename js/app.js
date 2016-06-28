
var myGreatFunction = function(someValue) {
    // Work with that value
    console.log(someValue);
    var obj = someValue;
    console.log("id: " + obj.id )
    window.location.href = "restuarantdetail.html"+"#" + obj.name;
  // $(location).href ="restuarantdetail.html"
}

// (function() {
//     'use strict';
//     var dialogButton = document.querySelector('.dialog-button');
//     var dialog = document.querySelector('#dialog');
//     if (! dialog.showModal) {
//       dialogPolyfill.registerDialog(dialog);
//     }
//     dialogButton.addEventListener('click', function() {
//        dialog.showModal();
//     });
//     dialog.querySelector('button:not([disabled])')
//     .addEventListener('click', function() {
//       dialog.close();
//     });
//   }());


Handlebars.registerHelper('json', function(context) {
  //return JSON.stringify(context);
//  var str = JSON.stringify(context).replace(/"/g, '&quot;');
//  console.log(str);
  return JSON.stringify(context).replace(/"/g, '&quot;');
});


$(document).ready(function(){

    var xmlhttp = new XMLHttpRequest();
    var url ;
    if ($("body").data("title") === "restuarantList") {
        // Place the logic pertaining to the page with title 'my_page_title' here...
        url = "../data/restuarant.json";
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
   else if ($("body").data("title") === "restuarantListDetail") {

     var restuarantname = window.location.hash.substring(1);
     console.log (restuarantname)
     url = "../data/restuarantreviews.json";
     xmlhttp.onreadystatechange = function() {
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             var myArr = JSON.parse(xmlhttp.responseText);
             console.log(myArr);
             filteredmyArr = myArr.filter (function (value) {
                 if(value.name == restuarantname) {
                   console.log("matches:" + value.name  );
                   return true
                 } else {
                    console.log("not matches:" + value.name  );
                   return false;
                 }
               });

               console.log(filteredmyArr);
               console.log(filteredmyArr.length);
               console.log(filteredmyArr[0].reviews);
             displayResturantListDetail(filteredmyArr);
             displayResturantListReviews(filteredmyArr[0].reviews)
         }
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();

     var dialogButton = document.querySelector('.dialog-button');
     var dialog = document.querySelector('#dialog');
     if (! dialog.showModal) {
       dialogPolyfill.registerDialog(dialog);
     }
     dialogButton.addEventListener('click', function() {
       console.log('fab clicked')
        dialog.showModal();
     });
     dialog.querySelector('button:not([disabled])')
     .addEventListener('click', function() {
       dialog.close();
     });

   }


  function displayResturantList(context) {
    // Grab the template script
    var theTemplateScript = $("#restuarant-template").html();
    // console.log(theTemplateScript)
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
  }


  function displayResturantListDetail(context) {
    // Grab the template script
    var theTemplateScript = $("#restuarantdetail-template").html();
    // console.log(theTemplateScript)
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').append(theCompiledHtml);
  }



  function displayResturantListReviews(context) {
    // Grab the template script
    var theTemplateScript = $("#restuarantreviews-template").html();
    // console.log(theTemplateScript)
    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').append(theCompiledHtml);
  }


});
