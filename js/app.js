function getRestaurantJSONArray(){
    var restArr = new Array;
    var xmlhttp = new XMLHttpRequest();
    var url = "../data/restuarant.json";
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            restArr = JSON.parse(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    return restArr;
}


$('#category input[type=checkbox]').click(function(){
    // code goes here




    if ($(this).is(':checked')) {
    var currval = $(this).val()
    console.log($(this).val());

    var restArr = new Array;
    var xmlhttp = new XMLHttpRequest();
    var url = "../data/restuarant.json";
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            restArr = JSON.parse(xmlhttp.responseText);
            console.log(restArr);
            filteredcuisine =   restArr.filter (function (value) {
            if(value.cuisine == currval) {

                  return true
                } else {

                  return false;
                }
              });

            console.log(filteredcuisine);
          //  displayResturantList(filteredcuisine);
            // Grab the template script
            var theTemplateScript = $("#restuarant-template").html();
            // console.log(theTemplateScript)
            // Compile the template
            var theTemplate = Handlebars.compile(theTemplateScript);

            // Pass our data to the template
            var theCompiledHtml = theTemplate(filteredcuisine);

            // Add the compiled html to the page
            $('.content-placeholder').html(theCompiledHtml);

        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


  }
});

var myGreatFunction = function(someValue) {
    // Work with that value
    console.log(someValue);
    var obj = someValue;
    console.log("id: " + obj.id )
    window.location.href = "restuarantdetail.html"+"#" + obj.name;
  // $(location).href ="restuarantdetail.html"
}

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



function showModal(){

  var dialogButton = document.querySelector('.dialog-button');

  var dialog = document.querySelector('#dialog');

  dialog.querySelector('button:not([disabled])')
  .addEventListener('click', function() {
    dialog.close();
  });
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();

}

$(".fab").click(function() {
      $(".mdl-layout__drawer-right").addClass("active");
      $(".mdl-layout__obfuscator-right").addClass("ob-active");
    });

    $(".mdl-layout__obfuscator-right").click(function() {
      $(".mdl-layout__drawer-right").removeClass("active");
      $(".mdl-layout__obfuscator-right").removeClass("ob-active");
});

$(".close").click(function() {
      $(".mdl-layout__drawer-right").removeClass("active");
      $(".mdl-layout__obfuscator-right").removeClass("ob-active");
    });

    $(".mdl-layout__obfuscator-right").click(function() {
      $(".mdl-layout__drawer-right").addClass("active");
      $(".mdl-layout__obfuscator-right").addClass("ob-active");
});

//
// $('#chkbox1').click(function() {
//        if ($(this).is(':checked')) {
//         console.log("Checkbox clicked")
//       }
// });

// $('#chkbox1').click(function() {
//     console.log($(this).val());
// });
