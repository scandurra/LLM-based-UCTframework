from dataclasses import dataclass
from enum import Enum
from typing import List

# class RoleType(Enum, str):
#     system = "system"
#     user = "user"
#     assistant = "assistant"
    
@dataclass
class LlmChatRequestMessage:
    role: str       # system, user, assistant
    content: str

@dataclass
class LlmChatRequest:
    messages: List[LlmChatRequestMessage]