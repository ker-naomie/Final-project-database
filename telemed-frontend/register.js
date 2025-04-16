document.addEventListener('DOMContentLoaded', function () {
    const userTypeSelect = document.getElementById('userType');
    const patientForm = document.getElementById('patientForm');
    const doctorForm = document.getElementById('doctorForm');
    const patientRegistration = document.getElementById('patientRegistration');
    const doctorRegistration = document.getElementById('doctorRegistration');
    const alreadyHaveAccountLink = document.getElementById('alreadyHaveAccountLink');

    // Function to toggle between patient and doctor forms
    function toggleForm(userType) {
        if (userType === 'patient') {
            patientForm.classList.add('active');
            doctorForm.classList.remove('active');
        } else if (userType === 'doctor') {
            doctorForm.classList.add('active');
            patientForm.classList.remove('active');
        }
    }

    // Listen for changes on the userType select input
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function () {
            const selectedUserType = this.value;
            toggleForm(selectedUserType);
        });

        // Default form display on load
        toggleForm(userTypeSelect.value);
    }

    // Function to handle redirection to login page
    function redirectToLogin() {
        window.location.href = 'login.html';
    }

    // Handle form submissions
    async function handleFormSubmit(event) {
        event.preventDefault(); // Prevent form default submission

        // Determine which form was submitted
        const isPatientForm = patientForm.classList.contains('active');
        const formData = isPatientForm ? new FormData(patientRegistration) : new FormData(doctorRegistration);

        // Convert FormData to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Perform registration logic here (e.g., validation, send data to server)
        const apiUrl = 'http://localhost:3000/api/auth/register'; // Updated URL
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    role: isPatientForm ? 'patient' : 'doctor' // Include user role
                }),
            });

            if (response.ok) {
                // After successful registration, redirect to login
                redirectToLogin();
            } else {
                // Handle error response
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    // Add event listeners to registration forms
    if (patientRegistration) {
        patientRegistration.addEventListener('submit', handleFormSubmit);
    }

    if (doctorRegistration) {
        doctorRegistration.addEventListener('submit', handleFormSubmit);
    }

    // Add event listener for "Already have an account? Login here" link
    if (alreadyHaveAccountLink) {
        alreadyHaveAccountLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            redirectToLogin(); // Redirect to login page
        });
    }
});
