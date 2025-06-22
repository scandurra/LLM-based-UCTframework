from evaluation.functions.bleu import calculate_bleu
from evaluation.functions.code_bleu import calculate_code_bleu
from evaluation.functions.cosine_similarity import calculate_cosine_similarity





if __name__ == "__main__":
    result = calculate_bleu("The cat sat on the mat", "The cat sits on the mat")
    print(result)

    result = calculate_code_bleu("function ciccio() return a;", "function ciccio() return b;")
    print(result)

    result = calculate_cosine_similarity("function ciccio() return a;", "function ciccio() return b;")
    print(result)