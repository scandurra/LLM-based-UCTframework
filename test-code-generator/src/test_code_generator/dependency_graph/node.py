from typing import Set

class Node:
    """Represents a node in the dependency graph."""
    
    def __init__(self, node_id: str):
        self.id = node_id
        # Nodes that depend on this node (children)
        self.dependents: Set[Node] = set()
        # Nodes that this node depends on (parents)
        self.dependencies: Set[Node] = set()
    
    def add_dependent(self, node: 'Node') -> None:
        """Add a node that depends on this node."""
        self.dependents.add(node)
    
    def add_dependency(self, node: 'Node') -> None:
        """Add a node that this node depends on."""
        self.dependencies.add(node)
    
    def __str__(self) -> str:
        return self.id
    
    def __repr__(self) -> str:
        return f"Node({self.id})"
    
    def __hash__(self) -> int:
        return hash(self.id)
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Node):
            return False
        return self.id == other.id