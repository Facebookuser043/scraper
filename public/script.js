document.getElementById('scrape-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const selector = document.getElementById('selector').value;

    const response = await fetch('/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, selector }),
    });

    const data = await response.json();
    const tableBody = document.getElementById('results-table').querySelector('tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = item;
        row.appendChild(cell);
        tableBody.appendChild(row);
    });
});
