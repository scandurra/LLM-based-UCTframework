import json
from typing import Dict, List
from test_code_generator.dependency_graph.node import Node

class DependencyGraph:
    """Represents a graph of dependencies between nodes."""
    
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
    
    def add_node(self, node_id: str, base_test_case_id: str|None) -> Node:
        """Add a node to the graph if it doesn't exist and return it."""
        if node_id not in self.nodes:
            self.nodes[node_id] = Node(node_id, base_test_case_id)
        return self.nodes[node_id]
    
    def add_edge(self, source_id: str, target_id: str) -> None:
        """Add a dependency edge from source to target."""
        source = self.add_node(source_id, None)
        target = self.add_node(target_id, None)
        
        # source depends on target
        source.add_dependency(target)
        # target is depended on by source
        target.add_dependent(source)
    
    def get_direct_dependents(self, node_id: str) -> List[Node]:
        """Get all nodes that directly depend on the specified node."""
        if node_id not in self.nodes:
            return []
        return list(self.nodes[node_id].dependents)
    
    def get_direct_dependencies(self, node_id: str) -> List[Node]:
        """Get all nodes that the specified node directly depends on."""
        if node_id not in self.nodes:
            return []
        return list(self.nodes[node_id].dependencies)
    
    def get_all_dependents(self, node_id: str) -> List[Node]:
        """Get all nodes that depend on the specified node (directly or indirectly)."""
        if node_id not in self.nodes:
            return []
        
        visited = set()
        result = []
        
        def dfs(current_node: Node):
            for dependent in current_node.dependents:
                if dependent not in visited:
                    visited.add(dependent)
                    result.append(dependent)
                    dfs(dependent)
        
        dfs(self.nodes[node_id])
        return result
    
    def get_all_dependencies(self, node_id: str) -> List[Node]:
        """Get all nodes that the specified node depends on (directly or indirectly)."""
        if node_id not in self.nodes:
            return []
        
        visited = set()
        result = []
        
        def dfs(current_node: Node):
            for dependency in current_node.dependencies:
                if dependency not in visited:
                    visited.add(dependency)
                    result.append(dependency)
                    dfs(dependency)
        
        dfs(self.nodes[node_id])
        return result
    
    @classmethod
    def from_json_file(cls, file_path: str) -> 'DependencyGraph':
        """Create a dependency graph from a JSON file."""
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
            return cls.from_json(data)
        except FileNotFoundError:
            print(f"Error: File '{file_path}' not found.")
            return cls()
        except json.JSONDecodeError:
            print(f"Error: File '{file_path}' contains invalid JSON.")
            return cls()
    
    @classmethod
    def from_json(cls, data: dict) -> 'DependencyGraph':
        """Create a dependency graph from a JSON object."""
        graph = cls()
        
        # Add all nodes first
        if 'nodes' in data:
            for node_data in data['nodes']:
                if 'id' in node_data:
                    graph.add_node(node_data['id'], node_data.get('base_test_case_id'))
        
        # Add all edges
        if 'edges' in data:
            for edge_data in data['edges']:
                if 'source' in edge_data and 'target' in edge_data:
                    # In our graph representation, source depends on target
                    graph.add_edge(edge_data['source'], edge_data['target'])
        
        return graph