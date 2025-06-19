from nltk.translate.bleu_score import sentence_bleu, corpus_bleu
from nltk.translate.bleu_score import SmoothingFunction
import nltk

def calculate_bleu(reference, candidate, smoothing=True):
    """
    Calculate BLEU score using NLTK.
    
    Args:
        reference (str): Reference string
        candidate (str): Candidate string
        smoothing (bool): Apply smoothing for short sentences
    
    Returns:
        float: BLEU score
    """
    # Tokenize
    ref_tokens = reference.lower().split()
    cand_tokens = candidate.lower().split()
    
    # NLTK expects reference as list of token lists
    references = [ref_tokens]

    if smoothing:
        smoothing_fn = SmoothingFunction().method4
        return sentence_bleu(references, cand_tokens, smoothing_function=smoothing_fn)
    else:
        return sentence_bleu(references, cand_tokens)