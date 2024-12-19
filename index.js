const numberInput = document.getElementById('numberInput');
    const number = parseInt(numberInput.value, 10);
    const output = document.getElementById('output');

            // Clear existing output
    output.innerHTML = '';

            // Validate input
    if (isNaN(number) || number < 1 || number > 1000) {
                alert('Please enter a valid number between 1 and 1000.');
                return;
            }

            // Generate and display the sequence
            for (let i = 1; i <= number; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = `${i}. Forbidden`;
                output.appendChild(listItem);
            }

            // Hide the form
            document.getElementById('numberForm').style.display = 'none';
        ;
 