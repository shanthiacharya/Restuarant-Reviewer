function getselectedRestaurantname(){var e=window.location.hash.substring(1);return e}function getRestaurantJSONArray(){var e="../data/restuarant.json";return new Promise(function(t,r){var a=new XMLHttpRequest;a.open("GET",e),a.onload=function(){200==a.status?t(a.response):r(Error(a.statusText))},a.onerror=function(){r(Error("Network Error"))},a.send()})}function loadTemplateData(e){var t=$("#restuarant-template").html(),r=Handlebars.compile(t),a=r(e);$(".content-placeholder").html(a)}function handleEnterKey(e,t){console.log(t);var r=t;console.log("id: "+r.id),13==e.keyCode&&(window.location.href="restuarantdetail.html#"+r.name)}function saveReviews(){var e=JSON.stringify(restuarantReviews);localStorage.userreviews=e}function manageFocusRightDrawer(){function e(e){9===e.keyCode&&(e.shiftKey?document.activeElement===n&&(e.preventDefault(),l.focus()):document.activeElement===l?(e.preventDefault(),o.focus()):document.activeElement===o&&(e.preventDefault(),n.focus())),27===e.keyCode&&closeDrawer()}var t=document.querySelector(".mdl-layout__drawer-right"),r='a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',a=t.querySelectorAll(r);t.addEventListener("keydown",e),a=Array.prototype.slice.call(a);var o=a[0],n=a[1],l=a[a.length-1];n.focus()}function closeDrawer(){$(".mdl-layout__drawer-right").removeClass("active"),$(".mdl-layout__obfuscator-right").removeClass("ob-active"),focusedElementBeforeModal.focus()}var focusedElementBeforeModal;$(document).ready(function(){function e(e){var t=$("#restuarant-template").html(),r=Handlebars.compile(t),a=r(e);$(".content-placeholder").html(a)}function t(e){var t=$("#restuarantdetail-template").html(),r=Handlebars.compile(t),a=r(e);$(".content-placeholder").append(a)}function r(e){var t=$("#restuarantreviews-template").html(),r=Handlebars.compile(t),a=r(e);$(".content-placeholder").append(a)}var a,o=new XMLHttpRequest;if("restuarantList"===$("body").data("title"))a="../data/restuarant.json",o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var t=JSON.parse(o.responseText);console.log(t),e(t)}},o.open("GET",a,!0),o.send();else if("restuarantListDetail"===$("body").data("title")){var n=window.location.hash.substring(1);a="../data/restuarantreviews.json",o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var e=JSON.parse(o.responseText);console.log(e),filteredmyArr=e.filter(function(e){return e.name==n}),t(filteredmyArr),r(filteredmyArr[0].reviews)}},o.open("GET",a,!0),o.send()}});var restuarantReviews=new Array;$("#distance input[type=radio]").change(function(){var e=Number($(this).val()),t=new Array;getRestaurantJSONArray().then(function(r){console.log("Success!",r),t=JSON.parse(r),console.log("Success!",t),filtereddistance=t.filter(function(t){return Number(t.distance)<=e&&(console.log("Inside Greater Array Value : "+t.distance+"Selected Value : "+e),!0)}),console.log("filteredArray!",filtereddistance),loadTemplateData(filtereddistance.length>0?filtereddistance:t)},function(e){console.error("Failed!",e)})}),$("#price input[type=checkbox]").change(function(){var e=new Array,t=$("#price input:checkbox:checked").map(function(){return $(this).val()}).toArray();console.log("price :"+t),getRestaurantJSONArray().then(function(r){console.log("Success!",r),e=JSON.parse(r),console.log("Success!",e),filteredprice=e.filter(function(e){for(var r=0;r<t.length;r++)if(e.price==t[r])return!0;return!1}),console.log("filteredArray!",filteredprice),loadTemplateData(filteredprice.length>0?filteredprice:e)},function(e){console.error("Failed!",e)})}),$("#cuisine input[type=checkbox]").change(function(){var e=new Array,t=$("#cuisine input:checkbox:checked").map(function(){return $(this).val()}).toArray();console.log("Cuisines :"+t),getRestaurantJSONArray().then(function(r){console.log("Success!",r),e=JSON.parse(r),console.log("Success!",e),filteredcuisine=e.filter(function(e){for(var r=0;r<t.length;r++)if(e.cuisine==t[r])return!0;return!1}),console.log("filteredArray!",filteredcuisine),loadTemplateData(filteredcuisine.length>0?filteredcuisine:e)},function(e){console.error("Failed!",e)})});var redirecttoDetailsPage=function(e){console.log(e);var t=e;console.log("id: "+t.id),window.location.href="restuarantdetail.html#"+t.name};Handlebars.registerHelper("json",function(e){return JSON.stringify(e).replace(/"/g,"&quot;")}),Handlebars.registerHelper("addlabel",function(e){var t=JSON.stringify(e).replace(/"/g,"&quot;"),r="Price"+t;return r}),Handlebars.registerHelper("addratingLabel",function(e){var t=JSON.stringify(e).replace(/"/g,"&quot;"),r=t+"stars out of 5";return r});var showReviewModal=function(){function e(e){9===e.keyCode&&(e.shiftKey?document.activeElement===i&&(e.preventDefault(),c.focus()):document.activeElement===c&&(e.preventDefault(),l.focus())),27===e.keyCode&&(t.close(),focusedElementBeforeModal.focus())}focusedElementBeforeModal=document.activeElement;var t=(document.querySelector(".dialog-button"),document.querySelector("#dialog")),r=document.querySelector("#confirmdialog");t.querySelector("#cancelreviews").addEventListener("click",function(){t.close()}),r.querySelector("#doneconfirm").addEventListener("click",function(){r.close()}),t.showModal||dialogPolyfill.registerDialog(t);var a=new Date;document.getElementById("date").innerHTML=a.getMonth()+"/"+a.getDate()+"/"+a.getFullYear(),t.showModal();var o='a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',n=t.querySelectorAll(o);t.addEventListener("keydown",e),n=Array.prototype.slice.call(n);var l=n[0],i=n[1],c=n[n.length-1];l.focus(),t.querySelector("#postreviews").addEventListener("click",function(){var e=getselectedRestaurantname(),a=e,o=userreviews.value,n=$("#starratings input:radio:checked").map(function(){return $(this).val()}).toArray();restuarantReviews.push({key:a,reviews:o,rating:n}),saveReviews(restuarantReviews),t.close(),r.showModal||dialogPolyfill.registerDialog(r),r.showModal()})};$(".fab").click(function(){$(".mdl-layout__drawer-right").addClass("active"),$(".mdl-layout__obfuscator-right").addClass("ob-active"),focusedElementBeforeModal=document.activeElement,console.log("focusedElementBeforeModal: "+focusedElementBeforeModal),manageFocusRightDrawer()}),$(".mdl-layout__obfuscator-right").click(function(){$(".mdl-layout__drawer-right").removeClass("active"),$(".mdl-layout__obfuscator-right").removeClass("ob-active")}),$(".close").click(function(){closeDrawer()}),$(".mdl-layout__obfuscator-right").click(function(){console.log("obfuscator clicked"),closeDrawer()}),console.log(document.querySelector(".mdl-card__supporting-text"));