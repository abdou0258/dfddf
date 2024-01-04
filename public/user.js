const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const loginInput = document.getElementById('login-username')
const registerInput = document.getElementById('register-username')
const registerDateInput = document.getElementById('birthdate')
const messageUser = document.querySelector('.message')
const quiz = document.querySelector('.quiz')


registerForm.style.display = 'none';
quiz.style.display = 'none';

registerBtn.addEventListener('click', function () {
  
  loginForm.style.display = 'none';

  registerForm.style.display = 'block';
});

loginBtn.addEventListener('click', function () {
  
  loginForm.style.display = 'block';
  
  registerForm.style.display = 'none';
});



 
  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    const username = loginInput.value;

    try {
      const response = await axios.post("/auth/login", {
        username
      });

      
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        messageUser.innerHTML = `<p>welcome ${username}</p>`;
        
        quiz.style.display = 'block';
      }
      
     
    } catch (error) {
      console.log(error);
      messageUser.innerHTML = `<p>This user isn't registered</p>`;
      setTimeout(function () {
        messageUser.innerHTML = ""; 
      }, 6000)
    }
  });

  // Register
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("register form submitted");
    const username = registerInput.value;
    const birthdate = registerDateInput.value;

    try {
      const response = await axios.post("/auth/register", {
        username,
        birthdate
      });

     
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        messageUser.innerHTML = `<p>welcome ${username}</p>`;
        
        quiz.style.display = 'block';
      }
    } catch (error) {
      console.log(error);
      messageUser.innerHTML = `<p>This user is already registered</p>`;
      setTimeout(function () {
        messageUser.innerHTML = ""; 
      }, 6000)
    }
  });


