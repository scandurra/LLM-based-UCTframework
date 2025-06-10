#!/bin/sh
model="llama3.3:latest"
# model="codellama:70b"


# poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC1 --test_case_name=UC1_TC2 --model="$model"

poetry run python -m test_code_generator.main --use_case_name=UC2 --test_case_name=UC2_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC2.1 --test_case_name=UC2.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC2.2 --test_case_name=UC2.2_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC2.3 --test_case_name=UC2.3_TC2 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC2.4 --test_case_name=UC2.4_TC1 --model="$model"

poetry run python -m test_code_generator.main --use_case_name=UC3 --test_case_name=UC3_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.1 --test_case_name=UC3.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.2 --test_case_name=UC3.2_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.2.1 --test_case_name=UC3.2.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.1 --test_case_name=UC3.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.2 --test_case_name=UC3.2_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.2.1 --test_case_name=UC3.2.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.3 --test_case_name=UC3.3_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4 --test_case_name=UC3.4_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.1 --test_case_name=UC3.4.1_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.2 --test_case_name=UC3.4.2_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.2 --test_case_name=UC3.4.2_TC2 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.3 --test_case_name=UC3.4.3_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.4 --test_case_name=UC3.4.4_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC3.4.5 --test_case_name=UC3.4.5_TC1 --model="$model"

poetry run python -m test_code_generator.main --use_case_name=UC5 --test_case_name=UC5_TC1 --model="$model"
poetry run python -m test_code_generator.main --use_case_name=UC6 --test_case_name=UC6_TC1 --model="$model"