function buy(evt, ID) {
    var i, menucontent, menulinks;
  
    // Get all elements with class="tabcontent" and hide them
    menucontent = document.getElementsByClassName("menucontent");
    for (i = 0; i < menucontent.length; i++) {
        menucontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    menulinks = document.getElementsByClassName("menulinks");
    for (i = 0; i < menulinks.length; i++) {
        menulinks[i].className = menulinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(ID).style.display = "block";
    evt.currentTarget.className += " active" ;
}