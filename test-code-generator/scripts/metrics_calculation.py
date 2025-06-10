# https://pypi.org/project/codebleu/0.1.2/
from codebleu import calc_codebleu

def calculate_bleu(source_path, target_path):
    result = calc_codebleu([reference], [prediction], lang="python", weights=(0.25, 0.25, 0.25, 0.25), tokenizer=None)
    # save result
    print(result)


def main():
    # read all files from output directories
    # real all files from target directory
    # i should put together .spec.js and .functions.js files in a single variable?


if __name__ == "__main__":
    main()