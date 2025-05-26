import os
import json
import sys

def build_dependency_graph(input_dir):
    graph = {"nodes": [], "edges": []}
    node_ids = set()
    edge_set = set()

    for filename in sorted(os.listdir(input_dir)):
        filepath = os.path.join(input_dir, filename)
        if not filename.endswith(".txt"):
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)[0] 

            uc_id = data.get("Id", "").strip()
            precondition = data.get("Precondition", "").strip()

            if uc_id.startswith("UC"):
                if uc_id not in node_ids:
                    graph["nodes"].append({"id": uc_id})
                    node_ids.add(uc_id)

                if precondition.startswith("UC") and precondition != uc_id:
                    if precondition not in node_ids:
                        graph["nodes"].append({"id": precondition})
                        node_ids.add(precondition)

                    edge = (uc_id, precondition)
                    if edge not in edge_set:
                        graph["edges"].append({
                            "source": uc_id,
                            "target": precondition
                        })
                        edge_set.add(edge)

    return graph

if __name__ == "__main__":
    input_dir = os.path.join("Parsing", "UC Formatted in JSON")
    output_file = os.path.join("DependencyGraph", "UseCaseDependencyGraph.json")

    os.makedirs("DependencyGraph", exist_ok=True)
    graph = build_dependency_graph(input_dir)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(graph, f, indent=2, ensure_ascii=False)
    print(f"🕸️  Graph generated in: {output_file}")
