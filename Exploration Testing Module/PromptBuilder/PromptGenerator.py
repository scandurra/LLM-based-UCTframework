import os
import json

def load_template(template_path):
    with open(template_path, "r", encoding="utf-8") as f:
        return f.read()

def generate_prompts():
    template_path = os.path.join("PromptBuilder", "prompt_templateFewShot.txt")
    source_folder = os.path.join("Parsing", "UC Formatted in JSON")
    destination_folder = os.path.join("PromptBuilder", "GeneratedPrompts")

    os.makedirs(destination_folder, exist_ok=True)

    template_text = load_template(template_path)

    for filename in sorted(os.listdir(source_folder)):
        if not filename.endswith(".json"):
            continue

        file_path = os.path.join(source_folder, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            try:
                parsed_json = json.load(f)
                usecase_text = json.dumps(parsed_json, indent=2, ensure_ascii=False)
            except json.JSONDecodeError:
                print(f"⚠️ Skipping invalid JSON file: {filename}")
                continue

        assistant_tags = "<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
        full_prompt = f"{template_text.strip()}\n\n{usecase_text.strip()}\n\n{assistant_tags}"

        output_name = f"Prompt_{os.path.splitext(filename)[0]}.txt"

        if isinstance(parsed_json, list) and isinstance(parsed_json[0], dict):
            uc_id = parsed_json[0].get("Id")
            if uc_id:
                safe_id = uc_id.replace(".", "_").replace(" ", "_")
                output_name = f"{safe_id}.txt"

        output_path = os.path.join(destination_folder, output_name)
        with open(output_path, "w", encoding="utf-8") as out_file:
            out_file.write(full_prompt)

        print(f"✅ Prompt generated: {output_path}")

    print(f"🎯 All the prompts have been created: {destination_folder}")

if __name__ == "__main__":
    generate_prompts()
