
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userData = {
            name: document.getElementById('name').value,
            creditor: document.getElementById('creditor').value,
            amount: document.getElementById('amount').value,
            currency: document.getElementById('currency').value,
            dueDate: document.getElementById('dueDate').value,
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('User data submitted successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to submit user data.');
            });
    });
});





// Excess script to test the backend logic
document.getElementById('fetchDataBtn').addEventListener('click', () => {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dataDisplay').innerText = data.message;
        })
        .catch(error => console.error('Error fetching data:', error));
});
