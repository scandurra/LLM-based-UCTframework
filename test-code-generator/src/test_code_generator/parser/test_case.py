
from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class TestStep:
    """Class representing a test step within a test case."""
    step: str
    expected: str
    
    def __str__(self) -> str:
        return f"Step: {self.step}\nExpected: {self.expected}"

@dataclass
class TestCase:
    """Class representing a test case with all its attributes."""
    test_case_id: str
    title: str
    preconditions: str
    postconditions: str
    test_steps: List[Dict[str, str]]
    test_type: str
    priority: str
    use_case_id: str
    # This field will be processed and won't appear in the __init__ parameters
    processed_test_steps: List[TestStep] = field(init=False, default_factory=list)
    
    def __post_init__(self):
        """Process test steps after initialization"""
        self.processed_test_steps = [TestStep(step["step"], step["expected"]) for step in self.test_steps]
    
    def __str__(self) -> str:
        steps_str = "\n".join([f"  {i+1}. {str(step)}" for i, step in enumerate(self.processed_test_steps)])
        return (
            f"Test Case ID: {self.test_case_id}\n"
            f"Title: {self.title}\n"
            f"Use Case ID: {self.use_case_id}\n"
            f"Priority: {self.priority}\n"
            f"Type: {self.test_type}\n"
            f"Preconditions: {self.preconditions}\n"
            f"Postconditions: {self.postconditions}\n"
            f"Test Steps:\n{steps_str}"
        )