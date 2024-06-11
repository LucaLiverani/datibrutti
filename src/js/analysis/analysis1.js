fetch('../../data/analysis1.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process the JSON data
        console.log(data);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
