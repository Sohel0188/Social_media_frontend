fetch('header.html')
.then(res=>res.text())
.then(data=>{
    document.getElementById('nav_header').innerHTML=data;
})