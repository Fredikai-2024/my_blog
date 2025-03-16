// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio Loaded");

    // 1. Enhancing User Interaction (Toggle Dark Mode)
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // 2. Validating Forms (Contact Form)
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("All fields are required!");
            return;
        }
        if (!validateEmail(email)) {
            alert("Invalid email format!");
            return;
        }
        alert("Form submitted successfully!");
        contactForm.reset();
    });

    // Email Validation Function
    function validateEmail(email) {
        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // 3. Manipulating the DOM (Change Portfolio Text)
    const changeTextBtn = document.getElementById("change-text-btn");
    changeTextBtn.addEventListener("click", () => {
        document.getElementById("portfolio-text").textContent = "Welcome to Juba Light Technology!";
    });

    // 4. Handling Events (Hover Effect on Skills)
    const skillItems = document.querySelectorAll(".skill");
    skillItems.forEach(skill => {
        skill.addEventListener("mouseover", () => {
            skill.style.color = "blue";
        });
        skill.addEventListener("mouseout", () => {
            skill.style.color = "black";
        });
    });

    // 5. Creating Animations & Effects (Fade In Effect)
    function fadeIn(element, duration) {
        element.style.opacity = 2 // Initial opacity;
        let start = null;
        function animate(time) {
            if (!start) start = time;
            let progress = (time - start) / duration;
            element.style.opacity = Math.min(progress, 1);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    let profileImage = document.getElementById("profile-img");
    fadeIn(profileImage, 3000); // Apply fade-in effect

    // 6. Fetching Data from Servers (AJAX & APIs - Fetch GitHub Repos)
    const githubRepos = document.getElementById("github-repos");
    fetch("https://api.github.com/users/KaiFredi/repos")
        .then(response => response.json())
        .then(data => {
            data.slice(0, 5).forEach(repo => {
                let listItem = document.createElement("li");
                listItem.innerHTML = <a href="${repo.html_url}" target="_blank">${repo.name}</a>;
                githubRepos.appendChild(listItem);
            });
        })
        .catch(error => console.log("Error fetching GitHub repos:", error));

    // 7. Building Web Applications (Simple Portfolio Tab Navigation)
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            contents.forEach(content => content.classList.remove("active"));
            contents[index].classList.add("active");
        });
    });

    // 8. Enhancing Browser Compatibility
    // Ensures older browsers support fetch
    if (!window.fetch) {
        console.log("Fetch API is not supported in this browser.");
    }
});