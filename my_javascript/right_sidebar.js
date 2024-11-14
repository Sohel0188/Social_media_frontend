fetch('right_sidebar.html')
.then(res=>res.text())
.then(data=>{
    document.getElementById('right_sidebar').innerHTML = data;
})
