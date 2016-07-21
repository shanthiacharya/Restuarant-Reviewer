
/* Fetch json file and populate handlebar templates */
$(document).ready(function(){
    var xmlhttp = new XMLHttpRequest();
    var url ;

    if ($("body").data("title") === "restuarantList") {
        /* JSON file for restuarnt list */
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

   else
    if ($("body").data("title") === "restuarantListDetail") {
       /* Get restuarantname */
     var restuarantname = window.location.hash.substring(1);
       /* JSON file for reviews*/
     url = "../data/restuarantreviews.json";
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
var restuarantFilters = [];

function getselectedRestaurantname() {
  var restuarantname = window.location.hash.substring(1);
  return restuarantname;
}


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


$('#distance input[type=radio]').change(function(){
      console.log($(this).val());
});


$('#price input[type=checkbox]').change(function(){
    // code goes here

    var searchIDs = $("#price input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();
    console.log("price :"  + searchIDs);
  });


$('#cuisine input[type=checkbox]').change(function(){
    // code goes here

    var searchIDs = $("#cuisine input:checkbox:checked").map(function(){
        return $(this).val();
    }).toArray();
    console.log("Cuisines :"  + searchIDs);
    var restArr = new Array;


    if ($(this).is(':checked')) {
    var currval = $(this).val()
    //console.log($(this).val());


    var restArr = new Array;
    var xmlhttp = new XMLHttpRequest();
    var url = "../data/restuarant.json";
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            restArr = JSON.parse(xmlhttp.responseText);
          //  console.log(restArr);
            filteredcuisine =   restArr.filter (function (value) {
            if(value.cuisine == currval) {

                  return true
                } else {

                  return false;
                }
              });

          //  console.log(filteredcuisine);
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

function filteredRestuarantArray(filtersarray){




}


var redirecttoDetailsPage = function(someValue) {
    // Work with that value
    console.log(someValue);
    var obj = someValue;
    console.log("id: " + obj.id )
    window.location.href = "restuarantdetail.html"+"#" + obj.name;
  // $(location).href ="restuarantdetail.html"
}

Handlebars.registerHelper('json', function(context) {

  return JSON.stringify(context).replace(/"/g, '&quot;');
});









var showReviewModal = function(){
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
         dialog.showModal();


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


// $('#starratings input[type=radio]').click(function(){
//     // var currval = $(this).val()
//     // console.log ("Radio button clicked " +  currval);
//     var searchIDs = $("#starratings input:radio:checked").map(function(){
//         return $(this).val();
//     }).toArray();
//     console.log("stars :"  + searchIDs);
//
//
// });


// $("#postreviews").click(function() {
//   console.log ("Post Reviews to localStorage");
//   console.log (getselectedRestaurantname());
//   console.log ("value:" + $('#starratings input[type=radio]').val());
//   var selectedRestuarantname = getselectedRestaurantname();
//   var key = selectedRestuarantname;
//   var reviews = userreviews.value;
//   var rating = $('#starratings input[type=radio]').val();
//   restuarantReviews.push({key: key, reviews: reviews, rating:rating});
//   saveReviews (restuarantReviews);
// });

// Save user reviews to localStorage
 function saveReviews() {
  var selectedReviews = JSON.stringify(restuarantReviews);

  localStorage.userreviews = selectedReviews;
};




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
