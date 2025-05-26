import os
import subprocess
from Parsing.DocxToTxt import convert_docx_to_txt

def main():
    docx_file = 'UseCases.docx'
    parsing_folder = 'Parsing'
    output_txt_file = os.path.join(parsing_folder, 'UseCasesTXT.txt')
    use_cases_folder = os.path.join(parsing_folder, 'Use Cases from DOCX')

    if not os.path.isfile(docx_file):
        print(f"Error: The file {docx_file} does not exist.")
        return
    if not os.path.isdir(parsing_folder):
        print(f"Error: The folder {parsing_folder} does not exist.")
        return

    convert_docx_to_txt(docx_file, output_txt_file)
    print(f"✅ File successfully converted to {output_txt_file}")

    split_use_cases(output_txt_file, use_cases_folder)

    generate_for_each_usecase(use_cases_folder)

    build_dependency_graph()

    execute_prompts()

    refine_outputs()


def split_use_cases(input_txt_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    with open(input_txt_path, "r", encoding="utf-8") as file:
        content = file.read()

    parts = content.split("\n\n")
    index_start = 0
    consecutive_blanks = 0

    for i, part in enumerate(parts):
        if not part.strip():
            consecutive_blanks += 1
            if consecutive_blanks == 2:
                index_start = i + 1
                break
        else:
            consecutive_blanks = 0

    cleaned_content = "\n\n".join(parts[index_start:])
    cases = cleaned_content.strip().split("\n\n\n")

    for idx, case in enumerate(cases):
        case = case.strip()
        if not case:
            continue
        if idx != 0:
            filename = f"UC_{idx:02}.txt"
            filepath = os.path.join(output_folder, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(case)
            print(f"📄 Created: {filepath}")

def generate_for_each_usecase(use_cases_folder):
    script_path = os.path.join('Parsing', 'UseCaseBuilderJSON.py')
    output_folder = os.path.join('Parsing', 'UC Formatted in JSON')
    os.makedirs(output_folder, exist_ok=True)

    print(f"⚙️  Running batch on folder: {use_cases_folder}")
    try:
        subprocess.run(["python", script_path, use_cases_folder, output_folder], check=True)
        print("✅ Generation completed.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during generation: {e}")

    print(f"🎯 All use cases have been processed and saved in {output_folder}")

    prompt_generator_path = os.path.join("PromptBuilder", "PromptGenerator.py")
    subprocess.run(["python", prompt_generator_path, "1"], check=True)

def build_dependency_graph():
    print("🔗 Generating dependency graph among use cases...")
    script_path = os.path.join("DependencyGraph", "GraphBuilder.py")
    try:
        subprocess.run(["python", script_path], check=True)
        print("✅ Dependency graph successfully generated.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during graph generation: {e}")

def execute_prompts():
    prompt_dir = os.path.join("PromptBuilder", "GeneratedPrompts")
    output_dir = os.path.join("Generations", "Output")
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.isdir(prompt_dir):
        print(f"❌ Prompt folder not found: {prompt_dir}")
        return

    prompt_files = sorted(f for f in os.listdir(prompt_dir) if f.endswith(".txt"))
    if not prompt_files:
        print(f"⚠️  No prompts found in {prompt_dir}")
        return

    print(f"🚀 Starting result generation in: {output_dir}")

    for file in prompt_files:
        prompt_path = os.path.join(prompt_dir, file)
        output_filename = f"{os.path.splitext(file)[0]}.json"
        output_path = os.path.join(output_dir, output_filename)

        print(f"🤖 Processing prompt: {file}")
        executor_path = os.path.join("Generations", "ModelExecutor.py")
        subprocess.run(["python", executor_path, prompt_path, output_path], check=True)

    print(f"✅ All prompts executed and results saved in: {output_dir}")

def refine_outputs():
    print("🧹 Starting refinement of generated JSON files...")
    script_path = os.path.join("Repair", "refiner.py")
    subprocess.run(["python", script_path], check=True)


if __name__ == '__main__':
    main()
