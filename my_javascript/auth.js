const getValue=(id)=>{
    const value = document.getElementById(id).value.trim();
    return value;
}
const clearForm = () => {
    document.getElementById("user_name").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm_password").value = "";
    document.getElementById("date_of_birth").value = "";
};
const handleRegistration=(event)=>{
    event.preventDefault();
    
    const username = getValue("user_name");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const date_of_birth = getValue("date_of_birth");
    const info={
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        date_of_birth,
    };

    if(password===confirm_password){
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            document.getElementById("registration_button").value = "Loding....";
            fetch("http://127.0.0.1:8000/user/register/",{
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
            
            .then((res) => res.json())
            .then((data)=>{
                document.getElementById('error').innerText= data;
                document.getElementById("registration_button").value = 'Register';
                clearForm();
            });
        }else{
            document.getElementById("error").innerText =
                "Password must contain at least eight characters, including one letter, one number, and one special character.";
        }

    }else{

        document.getElementById("error").innerText = "Password Dosn't Match";
    };

    console.log(info);
};
 
const handleLogin=(event)=>{
    event.preventDefault();
    const username = getValue("user_name");
    const password = getValue("password");
    const value= {
        username,
        password,
    };
    console.log(value);
   
    fetch("http://127.0.0.1:8000/user/login/",{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ username:'username', password:'password' }),
        body: JSON.stringify(value),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.token && data.user_id){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = data.redirect_url;
        }
        else if (data.error) {
            document.getElementById('error').innerText= data.error;
        }
    });
}

const seePassword=(event,id1,id2,password)=>{
    document.getElementById(password).type = "text";
    document.getElementById(id1).className = "d-none";
    document.getElementById(id2).className = "d-flex";
}
const hidePassword=(event,id1,id2,password)=>{
    document.getElementById(password).type = "password";
    document.getElementById(id1).className = "d-flex";
    document.getElementById(id2).className = "d-none";
}


//================== Auth Profile ===================//

const userProfile=()=>{
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
    .then(res => res.json())
    .then(data=>{
        console.log(data.date_of_birth);
    });
}

userProfile();