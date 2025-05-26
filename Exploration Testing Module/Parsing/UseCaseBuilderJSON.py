import os
import json
import re
import sys

INPUT_DIR = sys.argv[1]
OUTPUT_DIR = sys.argv[2]

os.makedirs(OUTPUT_DIR, exist_ok=True)

def parse_use_case(text):
    lines = text.strip().split("\n")
    data = {
        "Id": "",
        "Title": "",
        "Summary": "",
        "Actor": [],
        "Precondition": "",
        "Postcondition": "",
        "Base_sequence": [],
        "Branch_sequence": [],
        "Exception_sequence": [],
        "Note": ""
    }

    current_key = None

    for line in lines:
        if ":" in line:
            parts = line.split(":", 1)
            key = parts[0].strip()
            value = parts[1].strip()
            current_key = key
        else:
            value = line.strip()

        if current_key == "UseCase":
            match = re.match(r"UC[\d\.]+", value)
            if match:
                data["Id"] = match.group(0)
                title = value.replace(match.group(0), "").strip(" :")
                data["Title"] = title
        elif current_key == "Summary":
            data["Summary"] = value
        elif current_key == "Actor":
            actors = [a.strip() for a in value.split(",") if a.strip()]
            data["Actor"] = actors
        elif current_key == "Precondition":
            data["Precondition"] = value
        elif current_key == "Postcondition":
            data["Postcondition"] = value
        elif current_key == "Base sequence":
            if value.lower() != "no":
                data["Base_sequence"] = [s.strip() for s in value.split(" : ") if s.strip()]
        elif current_key == "Branch sequence":
            if value.lower() != "no":
                data["Branch_sequence"] = [s.strip() for s in value.split(" : ") if s.strip()]
        elif current_key == "Exception sequence":
            if value.lower() != "no":
                data["Exception_sequence"] = [s.strip() for s in value.split(" : ") if s.strip()]
        elif current_key == "Note":
            data["Note"] = value

    return data
for filename in os.listdir(INPUT_DIR):
    filepath = os.path.join(INPUT_DIR, filename)
    if os.path.isfile(filepath):
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
            parsed = parse_use_case(content)
            if parsed["Id"]:
                output_path = os.path.join(OUTPUT_DIR, f"{parsed['Id']}.json")
                with open(output_path, "w", encoding="utf-8") as out_file:
                    json.dump([parsed], out_file, indent=2, ensure_ascii=False)
                print(f"✔ Created file JSON: {output_path}")
            else:
                print(f"⚠ Error in file: {filename} - ID not found")
