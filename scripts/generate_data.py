import json
import os

# Ensure the data directory exists
data_dir = 'data'
os.makedirs(data_dir, exist_ok=True)

# Example data generation
data = {
    "nodes": [
        {"id": "A", "group": 1},
        {"id": "B", "group": 2}
    ],
    "links": [
        {"source": "A", "target": "B", "value": 1}
    ]
}

file_path = os.path.join(data_dir, 'analysis1.json')
with open(file_path, 'w') as f:
    json.dump(data, f)

print(f'Data written to {file_path}')
