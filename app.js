const apiUrl = 'https://bajaj-test-6vxx.onrender.com/bfhl'; // Replace with your deployed API URL

// Function to handle the POST request
function sendPostRequest() {
    // Get form values
    const userId = document.getElementById('userId').value;
    const email = document.getElementById('email').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const dataArray = document.getElementById('dataArray').value.split(',').map(item => item.trim());

    // Prepare the POST request payload
    const data = {
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        data_array: dataArray
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = JSON.stringify(data, null, 4);
    })
    .catch(error => {
        console.error('Error in POST request:', error);
        document.getElementById('response').textContent = 'Error in POST request';
    });
}

// Function to handle the GET request
function sendGetRequest() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = JSON.stringify(data, null, 4);
    })
    .catch(error => {
        console.error('Error in GET request:', error);
        document.getElementById('response').textContent = 'Error in GET request';
    });
}
