// Initialize Pikaday with minDate and maxDate
const picker = new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'YYYY-MM-DD',
    minDate: new Date(1800, 0, 1), // January 1, 1800
    maxDate: new Date(), // Today's date
    onSelect: function() {
        calculateAge();
    }
});

function calculateAge() {
    const datepickerInput = document.getElementById('datepicker').value;
    const messageElement = document.getElementById('message');
    const resultElement = document.getElementById('result');

    // Clear previous messages
    messageElement.textContent = '';
    resultElement.textContent = '';

    if (!datepickerInput) {
        messageElement.textContent = 'Please select a valid date.';
        messageElement.style.color = '#d9534f'; // Red color for error
        return;
    }

    // Parse the selected date
    const [year, month, day] = datepickerInput.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day); // JavaScript months are 0-based
    const today = new Date();

    // Validate the date
    if (birthDate > today) {
        messageElement.textContent = 'Date of birth cannot be in the future.';
        messageElement.style.color = '#d9534f'; // Red color for error
        return;
    }

    // Calculate age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Adjust days
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12; // Adjust months
    }

    // Display result
    resultElement.textContent = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
    resultElement.style.color = '#007bff'; // Blue color for result
}
