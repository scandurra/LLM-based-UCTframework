from codebleu import calc_codebleu

def calculate_code_bleu(reference, candidate):
    return calc_codebleu([reference], [candidate], lang="javascript", weights=(0.25, 0.25, 0.25, 0.25), tokenizer=None)