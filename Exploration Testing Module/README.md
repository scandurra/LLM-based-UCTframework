# LLM Test Case Generation and Evaluation Framework

Python framework for generating test cases using Large Language Models (LLMs). 
It supports end-to-end test case generation from use case descriptions, multiple prompting strategies (zero/one/few-shot), automatic dependency graph construction and JSON repair.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Modules Description](#modules-description)

## Features

- **Automated Use Case Parsing**: Converts DOCX use cases to structured JSON format
- **Dependency Graph Management**: Automatically builds and manages use case dependencies needed for the following module
- **Multi-Strategy Prompt Generation**: Supports zero-shot, one-shot, and few-shot prompting
- **LLM Integration**: Generates suites of test case from the prompts generated 
- **Automatic JSON Repair**: Fixes malformed JSON outputs from LLM responses
- **Comprehensive Evaluation**: Quantitative metrics and qualitative analysis of the 41 use cases of the portal across 3 rounds for each strategy
- **Detailed Logging**: Timestamped logs for all generations and evaluations

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
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Exploration Testing Module
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
   python --version
   ollama --version
   ```
5. **Run the module**:
    ```bash
    poetry run python orchestrator.py
    ```
## Project Structure

```
TesiLLMTesting/
├── orchestrator.py                    # Main pipeline orchestrator
├── pyproject.toml                     # Poetry dependencies configuration
├── README.md                          # This file
├── UseCases.docx                      # Original use cases description file
│
├── Parsing/                           # Use case parsing module
│   ├── DocxToTxt.py                  # DOCX to TXT converter
│   ├── UseCaseBuilderJSON.py         # TXT to JSON structured parser
│   ├── UseCasesTXT.txt               # Intermediate TXT output
│   ├── Use Cases from DOCX/          # Individual use case files
│   └── UC Formatted in JSON/         # Structured JSON use cases
│
├── DependencyGraph/                   # Dependency management
│   ├── GraphBuilder.py               # Builds use case dependency graph
│   └── UseCaseDependencyGraph.json   # Generated dependency graph
│
├── PromptBuilder/                     # Prompt generation module
│   ├── PromptGenerator.py            # Generates prompts from templates
│   ├── prompt_templateZeroShot.txt   # Zero-shot template
│   ├── prompt_templateOneShot.txt    # One-shot template
│   ├── prompt_templateFewShot.txt    # Few-shot template
│   └── GeneratedPrompts/             # Generated prompt files
│
├── Generations/                       # LLM execution module
│   ├── ModelExecutor.py              # Ollama LLM client
│   ├── Output/                       # Raw LLM outputs
│   └── Log/                          # Execution logs
│
├── Repair/                            # JSON repair module
│   └── refiner.py                    # Repairs malformed JSON outputs
│
└── Evaluation/                        # Evaluation framework
    ├── Qualitative/                  # Qualitative evaluation
    │   ├── ExpertEvaluation/         # Expert assessments
    │   └── Feasibility/              # Feasibility analysis
    │
    ├── Quantitative/                 # Automated metrics
    │   ├── Confrontation metrics/    # Baseline vs Generated comparison
    │   │   ├── Dataset/              # Baseline and generated test cases
    │   │   │   ├── Baseline/         # Human-written test cases
    │   │   │   ├── Baseline JSON/    # Baseline in JSON format
    │   │   │   ├── Generated/        # LLM-generated outputs that will be used for BLEU, ROUGE and Cosine Similarity
    │   │   │   └── Results/          # Excel reports and charts
    │   │   └── Scripts/              # Evaluation scripts
    │   │
    │   ├── Data Collected/           # Raw evaluation data
    │   ├── JSON Syntax/              # Syntax validation results
    │   └── Summary/                  # Evaluation summaries
    │
    ├── Full Generation Analyzed/     # Complete generation outputs
    │   ├── R1 Zero Shot/
    │   ├── R1 One Shot/
    │   ├── R1 Few Shot/
    │   ├── R2 Zero Shot/
    │   ├── R2 One Shot/
    │   ├── R2 Few Shot/
    │   ├── R3 Zero Shot/
    │   ├── R3 One Shot/
    │   └── R3 Few Shot/
    │
    └── Scripts/                       # Evaluation utilities
```

## Usage

### Complete Pipeline Execution

Run the entire pipeline from DOCX to test cases descriptions:

```bash
# Execute the full orchestrator
poetry run python orchestrator.py
```

This will:
1. Convert DOCX use cases to TXT
2. Parse TXT to structured JSON
3. Build dependency graph
4. Generate prompts for selected strategy
5. Execute LLM generation
6. Repair malformed JSON outputs


## Modules Description

### 1. Parsing Module
Converts unstructured DOCX use cases into structured JSON format.

**Key Files**:
- `DocxToTxt.py`: Extracts text from DOCX files
- `UseCaseBuilderJSON.py`: Parses use case structure (ID, Title, Actors, Pre/Post-conditions, Sequences, etc.)

**Input Format**: DOCX with use cases
**Output Format**: JSON with structured fields

### 2. Dependency Graph Module
Analyzes use case preconditions and builds a directed acyclic graph (DAG) of dependencies.

**Key Files**:
- `GraphBuilder.py`: Constructs nodes and edges based on preconditions

**Output**: `UseCaseDependencyGraph.json`

### 3. Prompt Builder Module
Generates prompts for LLMs using different prompting strategies.

**Strategies**:
- **Zero-Shot**: No examples provided
- **One-Shot**: Single example provided
- **Few-Shot**: Multiple examples provided

**Key Files**:
- `PromptGenerator.py`: Combines templates with use case JSON
- Template files for each strategy

### 4. Generation Module
Executes LLM inference using Ollama API.

**Key Files**:
- `ModelExecutor.py`: Handles API calls, logging, and output storage

**Features**:
- Configurable temperature and parameters
- Automatic logging with timestamps
- Error handling and retry logic

### 5. Repair Module
Fixes common JSON formatting errors in LLM outputs.

**Key Files**:
- `refiner.py`: Detects and repairs malformed JSON

**Fixes**:
- Missing closing brackets
- Trailing commas
- Incomplete structures
