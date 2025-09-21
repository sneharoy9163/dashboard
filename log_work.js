document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault(); //stop form from refreshing the page
    const username = document.getElementById("mail").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
    message.textContent = "";
    try {
        const res = await fetch('https://dummyjson.com/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30 
            }),
            ///credentials: "include"
        });
        const data = await res.json();
        if (res.ok) {
            message.classList.remove("text-red-600");
            message.classList.add("text-green-400");
            message.textContent = "Login successful! Welcome " + data.username;
            console.log("Access Token:", data.token); //token returned
            console.log("Full Response:", data);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);
        } else {
            message.classList.remove("text-green-500");
            message.classList.add("text-red-600");
            message.textContent = "Login failed: " + (data.message || "Invalid credentials");
        }
    } catch (err) {
        message.classList.remove("text-green-500");
        message.classList.add("text-red-600");
        message.textContent = "Error: " + err.message;
    }
});  