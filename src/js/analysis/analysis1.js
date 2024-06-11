// Load data and create a D3 visualization
fetch('../data/analysis1.json')
    .then(response => response.json())
    .then(data => {
        // Create your D3 visualization here using the data
        console.log(data);
    });
