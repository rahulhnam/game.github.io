var usernb = window.localStorage.getItem('user');

if(usernb == null){
    document.getElementById("username").value = ""
}else{
    document.getElementById("alio").style.visibility="visible";
    document.getElementById("usern").style.visibility="hidden";
}

function usercheck(){
    //alert(usernb);
    if(document.getElementById("username").value == ""){

    }else{
        window.localStorage.setItem('user', document.getElementById("username").value);
        window.location.reload();
    }
    
}

function resetdata(){
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("hsc");
    window.location.reload();
}