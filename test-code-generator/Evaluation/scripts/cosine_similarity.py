from typing import List
import ollama
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def generate_code_embeddings(codes:List[str])->List[str]:
    response = ollama.embed(model="unclemusclez/jina-embeddings-v2-base-code:latest", input=codes)
    return np.array(response["embeddings"])

def calculate_cosine_similarity(reference:str, candidate:str):
    """
    Calculate cosine similarity between two code snippets using Ollama embeddings.
    
    Args:
        code1 (str): First code snippet
        code2 (str): Second code snippet  
        model (str): Ollama model to use for embeddings
    
    Returns:
        float: Cosine similarity score between -1 and 1
    """
    embeddings = generate_code_embeddings([reference, candidate])

    similarity = cosine_similarity(embeddings[0:1], embeddings[1:2])[0][0]
    return similarity
    