#!/bin/bash
model="llama3.3:latest"
# model="codellama:70b"

executable_file="test_code_generator.main"

# Genero file mancant non presenti nella baseline
# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="zero_shot" --model="llama3.3:latest"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="zero_shot" --model="llama3.3:latest"

# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="one_shot" --model="llama3.3:latest"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="one_shot" --model="llama3.3:latest"

# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="few_shot" --model="llama3.3:latest"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="few_shot" --model="llama3.3:latest"


# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="zero_shot" --model="codellama:70b"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="zero_shot" --model="codellama:70b"

# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="one_shot" --model="codellama:70b"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="one_shot" --model="codellama:70b"

# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC4 --configuration="few_shot" --model="codellama:70b"
# poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC4 --configuration="few_shot" --model="codellama:70b"


configurations=(
    # "zero_shot"
    "one_shot"
    "few_shot"
)

model="codellama:70b"

for configuration in "${configurations[@]}"; do
    echo "Running test for configuration: $configuration"
    
    poetry run python -m $executable_file --use_case_name=UC1 --test_case_name=UC1_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC1 --test_case_name=UC1_TC2 --configuration="$configuration" --model="$model"

    poetry run python -m $executable_file --use_case_name=UC2 --test_case_name=UC2_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC2.1 --test_case_name=UC2.1_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC2.2 --test_case_name=UC2.2_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC2.3 --test_case_name=UC2.3_TC2 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC2.4 --test_case_name=UC2.4_TC1 --configuration="$configuration" --model="$model"

    poetry run python -m $executable_file --use_case_name=UC3 --test_case_name=UC3_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.1 --test_case_name=UC3.1_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.2 --test_case_name=UC3.2_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.2.1 --test_case_name=UC3.2.1_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.3 --test_case_name=UC3.3_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4 --test_case_name=UC3.4_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.1 --test_case_name=UC3.4.1_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.2 --test_case_name=UC3.4.2_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.2 --test_case_name=UC3.4.2_TC2 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.3 --test_case_name=UC3.4.3_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.4 --test_case_name=UC3.4.4_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC3.4.5 --test_case_name=UC3.4.5_TC1 --configuration="$configuration" --model="$model"

    poetry run python -m $executable_file --use_case_name=UC5 --test_case_name=UC5_TC1 --configuration="$configuration" --model="$model"
    poetry run python -m $executable_file --use_case_name=UC6 --test_case_name=UC6_TC1 --configuration="$configuration" --model="$model"
done



# model="codellama:70b"

# for configuration in "${configurations[@]}"; do
#     echo "Running test for configuration: $configuration"
    
#     poetry run python -m $executable_file --use_case_name=UC1 --configuration="$configuration" --model="$model"

#     poetry run python -m $executable_file --use_case_name=UC2 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC2.1 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC2.3 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC2.4 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC2.5 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC2.6 --configuration="$configuration" --model="$model"


#     poetry run python -m $executable_file --use_case_name=UC3 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.1 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.2 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.2.1 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.2.2 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.2.3 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.2.4 --configuration="$configuration" --model="$model"
    
#     poetry run python -m $executable_file --use_case_name=UC3.3 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.4 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.4.1 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.4.2 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.4.3 --configuration="$configuration" --model="$model"
    
#     poetry run python -m $executable_file --use_case_name=UC3.4.4 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC3.4.5 --configuration="$configuration" --model="$model"

#     poetry run python -m $executable_file --use_case_name=UC5 --configuration="$configuration" --model="$model"
#     poetry run python -m $executable_file --use_case_name=UC6 --configuration="$configuration" --model="$model"
# done

