import json
from typing import Dict, List, Set
from collections import deque
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
    
    def get_topological_order(self) -> List[Node]:
        """
        Get all nodes in topological order using Kahn's algorithm.
        
        Returns:
            List[Node]: Nodes ordered such that dependencies come before dependents.
                       Returns empty list if a cycle is detected.
        """
        # Calculate in-degree for each node (number of dependencies)
        in_degree = {}
        for node in self.nodes.values():
            in_degree[node] = len(node.dependencies)
        
        # Initialize queue with nodes that have no dependencies
        queue = deque([node for node in self.nodes.values() if in_degree[node] == 0])
        result = []
        
        while queue:
            # Remove a node with no incoming edges
            current_node = queue.popleft()
            result.append(current_node)
            
            # For each dependent of current node
            for dependent in current_node.dependents:
                # Remove the edge (decrease in-degree)
                in_degree[dependent] -= 1
                
                # If dependent has no more dependencies, add to queue
                if in_degree[dependent] == 0:
                    queue.append(dependent)
        
        # Check for cycles - if we haven't processed all nodes, there's a cycle
        if len(result) != len(self.nodes):
            raise ValueError("Cyclic dependency detected in the graph")
        
        return result
    
    def get_topological_order_dfs(self) -> List[Node]:
        """
        Get all nodes in topological order using DFS approach.
        
        Returns:
            List[Node]: Nodes ordered such that dependencies come before dependents.
                       Returns empty list if a cycle is detected.
        """
        visited = set()
        temp_visited = set()  # For cycle detection
        result = []
        
        def dfs(node: Node):
            if node in temp_visited:
                raise ValueError("Cyclic dependency detected in the graph")
            if node in visited:
                return
            
            temp_visited.add(node)
            
            # Visit all dependencies first
            for dependency in node.dependencies:
                dfs(dependency)
            
            temp_visited.remove(node)
            visited.add(node)
            result.append(node)
        
        # Start DFS from all unvisited nodes
        for node in self.nodes.values():
            if node not in visited:
                dfs(node)
        
        return result
    
    def has_cycle(self) -> bool:
        """Check if the dependency graph has a cycle."""
        try:
            self.get_topological_order()
            return False
        except ValueError:
            return True
    
    def get_processing_batches(self) -> List[List[Node]]:
        """
        Get nodes grouped in batches where each batch can be processed in parallel.
        
        Returns:
            List[List[Node]]: List of batches, where nodes in the same batch 
                             have no dependencies on each other.
        """
        # Calculate in-degree for each node
        in_degree = {}
        for node in self.nodes.values():
            in_degree[node] = len(node.dependencies)
        
        batches = []
        remaining_nodes = set(self.nodes.values())
        
        while remaining_nodes:
            # Find all nodes with no remaining dependencies
            current_batch = [node for node in remaining_nodes if in_degree[node] == 0]
            
            if not current_batch:
                raise ValueError("Cyclic dependency detected in the graph")
            
            batches.append(current_batch)
            
            # Remove processed nodes and update in-degrees
            for node in current_batch:
                remaining_nodes.remove(node)
                for dependent in node.dependents:
                    if dependent in remaining_nodes:
                        in_degree[dependent] -= 1
        
        return batches
    
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
    
    def __str__(self) -> str:
        """String representation of the graph."""
        lines = [f"DependencyGraph with {len(self.nodes)} nodes:"]
        for node_id, node in self.nodes.items():
            deps = [dep.id for dep in node.dependencies]
            lines.append(f"  {node_id} -> depends on: {deps}")
        return "\n".join(lines)