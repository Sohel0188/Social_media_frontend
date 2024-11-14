fetch('left_sidebar.html')
.then(res=>res.text())
.then(data=>{
    document.getElementById('left_sidebar').innerHTML=data;
})