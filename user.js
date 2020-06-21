var usernb = window.localStorage.getItem('user');

if(usernb == null){

}else{
    document.getElementById("alio").style.visibility="visible";
    document.getElementById("usern").style.visibility="hidden";
}

function usercheck(){
    //alert(usernb);
    if(document.getElementById("username").value == null){

    }else{
        window.localStorage.setItem('user', document.getElementById("username").value);
        window.location.reload();
    }
    
}