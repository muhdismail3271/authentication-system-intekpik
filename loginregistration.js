function validemail(email) {
    if (email.trim() === '') { return false };
    if (email.includes(' ')) { return false };
    if (!email.includes('@')) { return false };

    let parts = email.split('@');
    if (parts.length !== 2) { return false };

    let address = parts[1];

    if (address.length === 0) { return false };

    if (!address.includes('.')) { return false };
    if (address.startsWith('.')) { return false };
    if (address.endsWith('.')) { return false };
    return true;
};


function validpass(password) {
    return password.length > 6;
};

document.querySelectorAll(".show-pass").forEach(btn => {
    btn.addEventListener("click", () => {
        let input = btn.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
    });
});

const registerform = document.getElementById(`register`);
if (registerform) {
    registerform.addEventListener(`submit`, (reg) => {
        reg.preventDefault();
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirm = document.getElementById('confirmpass').value;

        let flag = true;

        if (!validemail(email)) {
            document.querySelector('#email + p').textContent = 'Invalid Email';
            flag = false;
        }
        if (name.trim() === ``) {
            document.querySelector(`#name + p`).textContent = `Enter Name`;
            flag = false;
        }
        if (!validpass(password)) {
            if (password == ``) {
                document.querySelector(`.pass-error`).textContent = `Enter Password`;
            }
            if (password.length > 0 && password.length <= 6) {
                document.querySelector(`.pass-error`).textContent = `Minimum 7 characters`;
            }
            flag = false;
        }
        if (confirm.trim() === ``) {
            document.querySelector('.confirm-error').textContent = 'Enter password again to confirm ';
            flag = false;
        }
        else if (confirm !== password) {
            document.querySelector('.confirm-error').textContent = 'Confirm the correct password';
            flag = false;
        }
        if (exists(email)) {
            document.querySelector(`#email + p`).textContent = 'Email already exists';
            flag = false;
        }

        if (!flag) return;

        saveUser(name, email, password);
        alert('Registered Successfully')
        window.location.href = `login.html`

    });
};

if (document.getElementById("register")) {
    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let confirm = document.getElementById('confirmpass').value;
            if (validemail(email) && !exists(email)) document.querySelector('#email + p').textContent = "";
            if (name.length >= 1 && name.trim() !== ``) document.querySelector(`#name + p`).textContent = "";
            if (confirm == password && confirm.trim() !== ``) document.querySelector('.confirm-error').textContent = "";
            if (validpass(password) && password !== ``) document.querySelector(`.pass-error`).textContent = "";
        });

    });
}
function saveUser(name, email, password) {
    let users = localStorage.getItem("users") || "";
    users += name + "," + email + "," + password + " ! ";
    localStorage.setItem("userdata", users);
};

function getUser() {
    let users = localStorage.getItem("userdata");
    if (!users) return [];
    return users.split(" ! ");
};

function exists(email) {
    let users = getUser();
    for (let user of users) {
        let data = user.split(",");
        if (data[1] === email) return true;
    }
    return false;
};

let loginform = document.getElementById("loginform");

if (loginform) {
    loginform.addEventListener("submit", (lin) => {
        lin.preventDefault();

        let logemail = document.getElementById("loginemail").value.trim();
        let logpassword = document.getElementById("loginpass").value;

        if (!validemail(logemail)) {
            document.querySelector(`#loginemail + p`).textContent = "Invalid email";
            return;
        }

        if (!check(logemail, logpassword)) {
            document.querySelector("#loginpass + p").textContent = "Wrong credentials";
            return;
        }

        localStorage.setItem(`name`, welcome(logemail, logpassword))
        localStorage.setItem("loggedIn", logemail);
        alert(`Logged in Successfully`)
        window.location.href = "home.html";
    });
};

function check(email, password) {
    let users = getUser();
    for (let user of users) {
        let data = user.split(",");
        if (data[1] === email && data[2] === password) return true;
    }
    return false;
};


function welcome(email, password) {
    let users = getUser();
    for (let user of users) {
        let data = user.split(",");
        if (data[1] === email && data[2] === password) return data[0];
    }
    return false;
};

