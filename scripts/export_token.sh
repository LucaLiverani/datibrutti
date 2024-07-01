#!/bin/bash

# Load the .env file
export $(grep -v '^#' .env | xargs)

# Echo the token
echo $GITHUB_TOKEN
