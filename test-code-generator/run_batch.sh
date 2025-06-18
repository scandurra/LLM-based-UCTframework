#!/bin/bash
model="llama3.3:latest"
# model="codellama:70b"

executable_file="test_code_generator.main_batch"

use_cases=(
    "UC1"
    "UC2" "UC2.1" "UC2.2" "UC2.3" "UC2.4"
    "UC3" "UC3.1" "UC3.2" "UC3.2.1" "UC3.1" "UC3.2" "UC3.2.1" 
    "UC3.3" "UC3.4" "UC3.4.1" "UC3.4.2" "UC3.4.3" "UC3.4.4" "UC3.4.5"
    "UC5" "UC6"
)

# Iterate over each use case
for use_case in "${use_cases[@]}"; do
    echo "Running test for use case: $use_case"
    poetry run python -m $executable_file --use_case_name="$use_case" --configuration="few_shot" --model="$model"
done