// Base URL for your API
const API_BASE_URL = 'http://localhost/Telemed%20Platform/api';

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    console.log('TeleMed website loaded');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            if (targetId) {
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal for Login/Register (simulated for demonstration purposes)
    const loginButton = document.querySelector('.btn-primary');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            showModal('login');
        });
    }

    function showModal(type) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>${type === 'login' ? 'Login' : 'Register'}</h2>
                <form id="${type}-form">
                    ${type === 'register' ? `
                        <label for="full_name">Full Name</label>
                        <input type="text" id="full_name" name="full_name" required>

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>

                        <label for="phone_number">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" required>

                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>

                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" required>

                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" required>
                    ` : `
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>

                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    `}
                    <button type="submit">${type === 'login' ? 'Login' : 'Register'}</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        // Form validation and submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Prepare data for API call based on the form type
            const data = {};
            if (type === 'register') {
                data.full_name = form.querySelector('#full_name').value;
                data.email = form.querySelector('#email').value;
                data.phone_number = form.querySelector('#phone_number').value;
                data.password = form.querySelector('#password').value;
                data.age = form.querySelector('#age').value;
                data.gender = form.querySelector('#gender').value;
                data.location = form.querySelector('#location').value;
                data.role = 'patient'; // Adjust role as needed
            } else {
                data.email = form.querySelector('#email').value;
                data.password = form.querySelector('#password').value;
            }

            // API call
            const result = await apiCall(`${API_BASE_URL}/auth/${type}`, data);

            if (result) {
                alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Successful!`);
                modal.remove();
            }
        });
    }

    // Fetch data for health centers (simulated)
    const healthCentersLink = document.querySelector('a[href="#health-centers"]');
    if (healthCentersLink) {
        healthCentersLink.addEventListener('click', function () {
            fetchHealthCenters();
        });
    }

    function fetchHealthCenters() {
        // Simulating fetching data from an API
        const healthCenters = [
            { name: "City Hospital", location: "Downtown", contact: "012-345-6789" },
            { name: "Suburb Clinic", location: "Suburb Avenue", contact: "987-654-3210" },
            { name: "Healthcare Hub", location: "Health District", contact: "555-123-4567" }
        ];

        // Display the data
        const healthCentersSection = document.getElementById('health-centers');
        if (healthCentersSection) {
            healthCentersSection.innerHTML = '<h2>Nearby Health Centers</h2>';
            healthCenters.forEach(center => {
                const centerDiv = document.createElement('div');
                centerDiv.classList.add('center-item');
                centerDiv.innerHTML = `
                    <h3>${center.name}</h3>
                    <p>Location: ${center.location}</p>
                    <p>Contact: ${center.contact}</p>
                `;
                healthCentersSection.appendChild(centerDiv);
            });
        }
    }

    // Real-time Form Validation
    const registrationForm = document.getElementById('register-form');
    if (registrationForm) {
        registrationForm.addEventListener('input', function () {
            const username = registrationForm.querySelector('#username').value;
            const password = registrationForm.querySelector('#password').value;

            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            if (username.length < 4 || password.length < 6) {
                submitBtn.disabled = true;
            } else {
                submitBtn.disabled = false;
            }
        });
    }

    // Function to simulate an API call for user login or registration
    async function apiCall(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error with API call:', error);
        }
    }
});
