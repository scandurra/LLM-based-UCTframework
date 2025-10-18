import ollama
import os
import sys
import json
from datetime import datetime
import time

if len(sys.argv) < 3:
    print("❌ You must provide: [1] the prompt .txt file, [2] the output .json file")
    sys.exit(1)

prompt_path = sys.argv[1]
output_path = sys.argv[2]

if not os.path.isfile(prompt_path):
    print(f"❌ The prompt file does not exist: {prompt_path}")
    sys.exit(1)

os.makedirs(os.path.dirname(output_path), exist_ok=True)
log_folder = os.path.join("Generations", "Log")
os.makedirs(log_folder, exist_ok=True)

with open(prompt_path, "r", encoding="utf-8") as file:
    prompt_text = file.read().strip()

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_basename = os.path.splitext(os.path.basename(output_path))[0]
log_filename = f"log_{output_basename}_FS_{timestamp}.txt"
log_path = os.path.join(log_folder, log_filename)

import time

def write_log(prompt, response_text, duration):
    with open(log_path, "w", encoding="utf-8") as log_file:
        log_file.write(f"📝 PROMPT:\n{prompt}\n\n")
        log_file.write(f"📥 RESPONSE:\n{response_text}\n\n")
        log_file.write(f"⏱️ EXECUTION TIME: {duration:.2f} seconds\n")

try:
    start_time = time.time()

    response = ollama.generate(
        model="llama3.3:latest",
        prompt=prompt_text,
        options={
            "temperature": 0.3,
            # "stop": ["###"],
        },
        raw=True
    )

    end_time = time.time()
    duration = end_time - start_time

    result_text = response['response'].strip()
    write_log(prompt_text, result_text, duration)

    try:
        parsed_json = json.loads(result_text)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(parsed_json, f, indent=2, ensure_ascii=False)
        print(f"✅ JSON result saved in: {output_path}")
        print(f"🗒️  Complete log saved in: {log_path}")
    except json.JSONDecodeError:
        fallback_path = output_path.replace(".json", ".txt")
        with open(fallback_path, "w", encoding="utf-8") as f:
            f.write(result_text)
        print(f"⚠️ Invalid JSON output. Raw text saved in: {fallback_path}")
        print(f"🗒️  Complete log saved in: {log_path}")

except Exception as e:
    error_text = f"❌ Error during generation: {str(e)}"
    write_log(prompt_text, error_text, duration=0)
    print(error_text)
    print(f"🗒️  Complete log saved in: {log_path}")
