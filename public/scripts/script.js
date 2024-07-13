
// Storing the data from html to JSON to be sent to server
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
                fetchDebts(); // Calling this function to refresh debts log displayed
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to submit user data.');
            });
    });
});

// Fetching data from database to show the users debts
function fetchDebts() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const logOfDebts = document.getElementById('log-of-debts');
            logOfDebts.innerHTML = '';
            users.forEach(user => {
                const debtDiv = document.createElement('div');
                debtDiv.innerHTML= `
                <p>Name: ${user.name}</p>
                <p>Creditor: ${user.creditor}</p>
                <p>Amount: ${user.amount}</p>
                <p>Currency: ${user.currency}</p>
                <p>Due Date: ${new Date(user.dueDate).toLocaleDateString()}</p>
                <hr>
                `;
                logOfDebts.appendChild(debtDiv);
            });
        })
        .catch(error => console.error('Error fetching debts:', error));
}


