// Function to validate JSON input
function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

// Function to handle the POST request
async function sendPostRequest() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');

    if (!isValidJson(jsonInput)) {
        errorMessage.textContent = 'Invalid JSON format.';
        errorMessage.classList.remove('hidden');
        dropdownContainer.classList.add('hidden');
        return;
    }

    errorMessage.classList.add('hidden');

    try {
        const response = await fetch('http://localhost:3000/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();
        dropdownContainer.classList.remove('hidden');
        populateResponse(result);
    } catch (error) {
        errorMessage.textContent = 'Error: ' + error.message;
        errorMessage.classList.remove('hidden');
    }
}

// Function to display the response based on selected options
function populateResponse(responseData) {
    const multiSelect = document.getElementById('multiSelect');
    const responseContainer = document.getElementById('responseContainer');
    const selectedOptions = Array.from(multiSelect.selectedOptions).map(option => option.value);

    responseContainer.innerHTML = ''; // Clear previous response

    const filteredResponse = {};

    if (selectedOptions.includes('alphabets')) {
        filteredResponse.alphabets = responseData.alphabets;
    }

    if (selectedOptions.includes('numbers')) {
        filteredResponse.numbers = responseData.numbers;
    }

    if (selectedOptions.includes('highest_lowercase')) {
        filteredResponse.highestLowercase = responseData.highest_lowercase_alphabet;
    }

    responseContainer.innerHTML = `<pre>${JSON.stringify(filteredResponse, null, 2)}</pre>`;
}

// Event listener to update response when dropdown changes
document.getElementById('multiSelect').addEventListener('change', () => {
    const responseData = {
        alphabets: ["A", "B", "C"],
        numbers: [1, 2, 3],
        highest_lowercase: ["z"]
    };  // Example response data to simulate dynamic update
    populateResponse(responseData);
});
