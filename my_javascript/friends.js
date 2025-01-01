fetch('http://127.0.0.1:8000/user/list/')
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.forEach(element => {
         console.log(element.user.username);
         const parent = document.getElementById('friend_card');
         
         const div = document.createElement('div');
         console.log(div);
         div.classList.add('col-md-3','col-sm-4','pe-2','ps-2');
         div.innerHTML=`
            <div class="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                <div class="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                    <figure class="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src="${element.profile_image}" alt="image" class="float-right p-0 bg-white rounded-circle w-100 shadow-xss"></figure>
                        <div class="clearfix"></div>
                        </br><a href = "author-page.html?id=${element.id}"> ${element.user.first_name +" "+ element.user.last_name} </a>
                                <p class="fw-500 font-xsssss text-grey-500 mt-0 mb-3">@macale343</p>
                                <a href="#" class="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">ADD FRIEND</a>
                        </div>
                </div>
         `
         parent.appendChild(div);

    });
});