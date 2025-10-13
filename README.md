# GenE2E: an AI-enhanced framework that uses LLMs to enable fully automated End-to-End Testinng of modern web applications.  
GenE2E generates test cases from use case scenarios (see the repository's folder `Exploration Testing Module`) and, in a second stage, transforms these test cases into executable test scripts, directly executable by 
the automation tool Playwright (see the repository's folder `examples`). GenE2E is implemented as a CLI tool in Python for easy integration into development workflows and CI pipelines.
It was developed upon the Ollama framework to manage and run local Large Language Models efficiently on local hardware.
Only two models, Meta Llama 3.3 70B and CodeLlama (a foundational model for code generation tasks, built on top of Llama 2) are employed.
