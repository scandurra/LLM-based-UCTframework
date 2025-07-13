# Test Code Generation Module

Python module responsible of generating Playwright test code using Large Language Models (LLMs). 
It supports both single and batch processing, zero/one/few shot prompting, CodeLlama and Llama models. 

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Processing Types](#processing-types)
- [Command Line Arguments](#command-line-arguments)
- [Examples](#examples)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Features

- **Dual Processing Modes**: Single test case processing or batch processing for entire use cases
- **Dependency Management**: Automatically processes use cases in dependency order
- **Flexible Configuration**: YAML-based configuration for easy customization
- **Multiple LLM Support**: Compatible with various Ollama models
- **Page Object Model Integration**: Automatic integration of POM files
- **Comprehensive Logging**: Detailed logging with timestamps and error tracking
- **Code Repair**: Automatic JavaScript code extraction and import statement fixing

## Prerequisites

- **Python**: 3.8 or higher
- **Poetry**: For dependency management
- **Ollama**: For running LLM models locally

### Installing Poetry

If you don't have Poetry installed:

```bash
# On macOS/Linux
curl -sSL https://install.python-poetry.org | python3 -

# On Windows (PowerShell)
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -

# Or using pip
pip install poetry
```

### Installing Ollama

Download and install Ollama from [https://ollama.ai](https://ollama.ai)

Pull the required models:
```bash
ollama pull llama3.3:latest
ollama pull codellama:70b
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd test-code-generator
   ```

2. **Install dependencies using Poetry**:
   ```bash
   poetry install
   ```

3. **Activate the virtual environment**:
   ```bash
   poetry shell
   ```

4. **Verify installation**:
   ```bash
   poetry run python -m test_code_generator.orchestrator --help
   ```

## Configuration

The orchestrator uses a YAML configuration file (`config.yaml`) to manage all settings, paths, and parameters.

### Default Configuration Structure

```yaml
# File paths configuration
paths:
  dependency_graph: "./input_files/include_graph/include_graph.json"
  test_parameters: "./input_files/parameters/test_parameters.env"
  pom_folder: "./input_files/pom"
  existing_code: "./input_files/reporter_minimal.js"
  test_cases_folder: "./input_files/test_cases/"
  prompts_base: "./prompts"
  output_base: "./output"
  logs_base: "./logs"

# Model configuration
models:
  default: "llama3.3"
  available:
    - "llama3.3"
    - "codellama"

# Processing configuration
processing:
  default_configuration: "few_shot"
  default_type: "single"
  temperature: 0.0
```

### Required Directory Structure

Create the following directory structure:

```
test-code-generator
├── config.yaml
├── input_files/
│   ├── include_graph/
│   │   └── include_graph.json
│   ├── parameters/
│   │   └── test_parameters.env
│   ├── pom/
│   │   └── [page object model files]
│   ├── test_cases/
│   │   └── [test case JSON files]
│   └── reporter_minimal.js
├── prompts/
│   ├── single/
│   │   ├── zero_shot/
│   │   ├── one_shot/
│   │   └── few_shot/
│   └── batch/
│       ├── zero_shot/
│       ├── one_shot/
│       └── few_shot/
├── output/
├── logs/
└── src /
    └── test_code_generator/
        ├── orchestrator.py
        ├── dependency_graph/
        │   ├── __init__.py
        │   ├── dependency_graph.py
        │   └── node.py
        ├── llml_client/
        |   └── ...
        ├── parser/
        !   └── ...
        ├── prompt_builder/
        |   └── ...
        ├── repair/
            └── ...
```

## Usage

### Basic Usage with Poetry

```bash
# Run with default settings (processes all use cases in dependency order)
poetry run python -m test_code_generator.orchestrator

# Process a specific use case
poetry run python -m test_code_generator.orchestrator -uc "UC1"

# Process with specific model and configuration
poetry run python -m test_code_generator.orchestrator -uc "UC1" -m "codellama:70b" -c "zero_shot"
```

### Processing Types

#### Single Processing (Default)
Processes each test case individually, creating separate files for each test case.

```bash
poetry run python -m test_code_generator.orchestrator -uc "UC1" -pt single
```

**Output structure**:
```
output/single/few_shot/llama3.3/UC1/
├── UC1_TC1.spec.js
├── UC1_TC1.functions.js
├── UC1_TC1.json
├── UC1_TC2.spec.js
├── UC1_TC2.functions.js
└── UC1_TC2.json
```

#### Batch Processing
Processes all test cases for a use case together in one LLM call.

```bash
poetry run python -m test_code_generator.orchestrator -uc "UC1" -pt batch
```

**Output structure**:
```
output/batch/few_shot/llama3.3/UC1/
├── UC1.spec.js
├── UC1.functions.js
└── UC1.json
```

## Command Line Arguments

| Argument | Short | Type | Description | Default |
|----------|-------|------|-------------|---------|
| `--use_case_name` | `-uc` | string | Specific use case to process. If not provided, processes all use cases in dependency order | None |
| `--test_case_name` | `-tc` | list | Specific test case(s) to process (can be used multiple times) | None |
| `--model` | `-m` | string | LLM model to use | From config |
| `--configuration` | `-c` | string | Processing configuration (zero_shot, one_shot, few_shot) | From config |
| `--processing_type` | `-pt` | string | Processing type (single, batch) | From config |
| `--config` | | string | Path to configuration file | config.yaml |
| `--help` | `-h` | | Show help message | |

### Available Options

**Models**: `llama3.3:latest`, `codellama:70b`

**Configurations**: `zero_shot`, `one_shot`, `few_shot`

**Processing Types**: `single`, `batch`

## Examples

### 1. Process All Use Cases (Dependency Order)
```bash
# Uses default settings from config.yaml
poetry run python -m test_code_generator.orchestrator

# With specific model and configuration
poetry run python -m test_code_generator.orchestrator -m "llama3.3:latest" -c "zero_shot" -pt "batch"
```

### 2. Process Specific Use Case
```bash
# Single processing with default settings
poetry run python -m test_code_generator.orchestrator -uc "UC1"

# Batch processing with specific model
poetry run python -m test_code_generator.orchestrator -uc "UC1" -pt batch -m "llama3.3:latest"

# With custom configuration
poetry run python -m test_code_generator.orchestrator -uc "UC1" -c "one_shot" -pt single
```

### 3. Process Specific Test Cases
```bash
# Process only specific test cases within a use case
poetry run python -m test_code_generator.orchestrator -uc "UC1" -tc "UC1_TC1" -tc "UC1_TC2"

# Batch process specific test cases
poetry run python -m test_code_generator.orchestrator -uc "UC1" -tc "UC1_TC1" -pt batch
```

### 4. Custom Configuration File
```bash
# Use a different configuration file
poetry run python -m test_code_generator.orchestrator --config "production_config.yaml" -uc "UC1"
```

### 5. Development vs Production Examples
```bash
# Development (detailed logging, single processing)
poetry run python -m test_code_generator.orchestrator -uc "UC1" -pt single -c "few_shot"

# Production (batch processing, efficient)
poetry run python -m test_code_generator.orchestrator -pt batch -c "zero_shot" -m "llama3.3:latest"
```

## Project Structure

### Input Files

1. **Dependency Graph** (`input_files/include_graph/include_graph.json`):
   ```json
   {
     "nodes": [
        {
        "id": "UC1",
        "base_test_case_id": "UC1_TC1"
        },
        {
        "id": "UC2.1"
        }
      ],
      "edges": [
        {
        "source": "UC2.1",
        "target": "UC2"
        },
        {
        "source": "UC2.2",
        "target": "UC2"
        }
      ]
   }
   ```

2. **Test Cases** (`input_files/test_cases/UC_001.json`):
   ```json
   [
     {
        "test_case_id": "UC1_TC1",
        "title": "Login con credenziali valide",
        "preconditions": "L’utente non è autenticato",
        "postconditions": "L’utente è autenticato ed è a conoscenza che l’operazione ha avuto successo",
        "test_steps": [
        {
            "step": "Inserisci le credenziali corrette nel form di login",
            "expected": "Il sistema accetta le credenziali"
        },
        {
            "step": "Clicca il tasto “Login”",
            "expected": "L’utente viene autenticato con successo"
        },
        {
            "step": "Visualizza il messaggio di operazione completata con successo",
            "expected": "Il messaggio conferma l’avvenuta autenticazione"
        }
        ],
        "test_type": "Positivo",
        "priority": "Alta",
        "use_case_id": "UC1"
      }
   ]
   ```

3. **Page Object Models** (`input_files/pom/`): JavaScript/TypeScript POM files

4. **Test Parameters** (`input_files/parameters/test_parameters.env`): Environment variables

### Output Files

Generated files follow this structure:
```
output/{processing_type}/{configuration}/{model}/{use_case}/
├── {test_case_id}.spec.js      # Test specification file
├── {test_case_id}.functions.js # Helper functions file
└── {test_case_id}.json         # Execution parameters and metadata
```

## Logging

Logs are automatically generated with timestamps:
```
logs/{processing_type}/{configuration}/{model}/orchestrator_YYYY-MM-DD_HH-MM-SS.log
```

Log levels can be configured in `config.yaml`:
- `INFO`: General information
- `WARNING`: Warning messages
- `ERROR`: Error messages
- `DEBUG`: Detailed debugging information

## Troubleshooting

### Common Issues

1. **Poetry not found**:
   ```bash
   # Ensure Poetry is in your PATH or reinstall
   curl -sSL https://install.python-poetry.org | python3 -
   ```

2. **Ollama connection issues**:
   ```bash
   # Check if Ollama is running
   ollama list
   
   # Start Ollama service if needed
   ollama serve
   ```

3. **Missing dependencies**:
   ```bash
   # Reinstall dependencies
   poetry install --no-cache
   ```

### Debug Mode

For detailed debugging:
1. Set logging level to `DEBUG` in `config.yaml`
2. Check log files in the `logs/` directory
3. Use verbose output:
   ```bash
   poetry run python -m test_code_generator.orchestrator -uc "UC_001" --verbose
   ```

## Environment Variables

You can override configuration using environment variables:

```bash
export ORCHESTRATOR_MODEL="llama3.3:70b"
export ORCHESTRATOR_CONFIG="zero_shot"
export ORCHESTRATOR_PROCESSING_TYPE="batch"

poetry run python -m test_code_generator.orchestrator -uc "UC1"
```

---

**Note**: This tool requires a local Ollama installation with appropriate models. Ensure your system has installed the selected LLM models.