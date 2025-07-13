import logging
import os
import re
from typing import Dict, List, Tuple

logger = logging.getLogger(__name__)

class JavascriptCodeRepair:
    def __init__(self, use_case_name, test_case_id, markdown_content: str) -> None:
        self.use_case_name = use_case_name
        self.test_case_id = test_case_id
        self.markdown_content = markdown_content
        self.extracted_files = []
        pass

    def process_content(self):
        self.extract_code_blocks()


    def extract_code_blocks(self) -> List[Dict[str, str]]:
        """
        Extract JavaScript code blocks from content that might have markdown code fences.
        
        Args:
            content: Content string that might contain code blocks
            
        Returns:
            List of extracted JavaScript code blocks
        """
        logger.info("Extracting JavaScript code blocks")

        # Pattern to match filename headers (### filename.js) followed by javascript code blocks
        # ?: makes Python not capturing the first (..) as a group. I need it only for 'OR' condition
        # Llama3.3: ### file_name.functions.js
        # Codellama: **file_name.functions.js** or **File: file_name.functions.js** or File: file_name.functions.js
        #external_name_pattern = r'(?:#|\*+(?:File:\s)?|(?:\nFile:\s))+\s*([^\n]+\.js)\**\s*\n```javascript\n(.*?)\n```'
        # sometimes Codellama writes the file name insiede the code block as comment in the first row like "// File: UC2_TC1.functions.js"
        #internal_name_pattern = r'```javascript\n//\s*File:\s*([^\n]+\.js)\s*\n(.*?)\n```'

        # Pattern 1: **File: filename.js** format
        bold_file_pattern = r'\*\*File:\s*([^\n*]+\.js)\*\*\s*\n```javascript\n(.*?)\n```'
        
        # Pattern 2: ### filename.js format  
        header_pattern = r'#{1,6}\s*([^\n]+\.js)\s*\n```javascript\n(.*?)\n```'
        
        # Pattern 3: **filename.js** format (without "File:")
        bold_name_pattern = r'\*\*([^\n*]+\.js)\*\*\s*\n```javascript\n(.*?)\n```'

        # Pattern 4: **filename.js (Functions for Test Ste)** format (with a text after the name)
        bold_name_with_text_pattern = r'\*\*([^\n*]+\.js)[^*]*\*\*\s*\n```javascript\n(.*?)\n```'
        
        # Pattern 5: Comment-style filename inside code blocks
        internal_pattern = r'```javascript\n//\s*File:\s*([^\n]+\.js)\s*\n(.*?)\n```'

        xml_pattern = r'<output\s+file="([^\n]+\.js)">\n(.*?)\n</output>'

        patterns = [
            bold_file_pattern,
            header_pattern,
            bold_name_pattern,
            bold_name_with_text_pattern,
            internal_pattern,
            xml_pattern
        ]

        self.extracted_files = []
        for pattern in patterns:
            matches = re.findall(pattern, self.markdown_content, re.DOTALL)

            for filename, code in matches:
                clean_filename = filename.strip().replace('*', '')
                self.extracted_files.append({
                    'filename': clean_filename,
                    'code': code.strip()
                })

        return self.extracted_files

    def ensure_require_statements(self, dependencies, output_folder) -> str:
        for file_data in self.extracted_files:
            code = file_data['code']
        
            # Create a copy of the code to modify
            modified_code = code
            
            # Find all existing require statements
            require_pattern = r'(?:const|let|var)\s+(?:\{[^}]*\}|\w+)\s*=\s*require\s*\(\s*[\'"]([^\'"]+)[\'"]\s*\)'
            existing_requires = re.findall(require_pattern, code)
            
            # Also check for simple require() calls without assignment
            simple_require_pattern = r'require\s*\(\s*[\'"]([^\'"]+)[\'"]\s*\)'
            simple_requires = re.findall(simple_require_pattern, code)
            
            # Combine both patterns to get all required files
            all_required_files = set(existing_requires + simple_requires)
            
            # Find missing require statements
            missing_files = []
            for dependency in dependencies:
                # Construct the full require path: output_folder + dependency + .functions.js
                require_path = os.path.join("..", dependency.id, dependency.base_test_case_id + '.functions.js').replace('\\', '/')
                
                # Check if this path is already required
                if require_path not in all_required_files:
                    missing_files.append((dependency, require_path))
            
            # Add missing require statements at the beginning of the code
            if missing_files:
                new_requires = []
                for dependency, require_path in missing_files:
                    # Generate variable name from dependency name
                    var_name = dependency.base_test_case_id.replace('-', '_').replace('/', '_')
                    # Clean up variable name to be valid JavaScript identifier
                    var_name = re.sub(r'[^\w]', '_', var_name)
                    if var_name and var_name[0].isdigit():
                        var_name = '_' + var_name
                    
                    new_require = f"const {var_name} = require('{require_path}');"
                    new_requires.append(new_require)
                
                # Add new requires at the top of the file
                if new_requires:
                    require_block = '\n'.join(new_requires) + '\n'
                    # Find the best place to insert - after existing requires or at the beginning
                    if existing_requires or simple_requires:
                        # Find the last require statement and insert after it
                        last_require_match = None
                        for match in re.finditer(require_pattern + '|' + simple_require_pattern, code):
                            last_require_match = match
                        
                        if last_require_match:
                            insert_pos = last_require_match.end()
                            # Find the end of the line
                            next_newline = code.find('\n', insert_pos)
                            if next_newline != -1:
                                insert_pos = next_newline + 1
                            else:
                                insert_pos = len(code)
                            
                            modified_code = code[:insert_pos] + require_block + code[insert_pos:]
                        else:
                            modified_code = require_block + code
                    else:
                        # No existing requires, add at the beginning
                        modified_code = require_block + code
            file_data['code'] = modified_code


    def fix_import_statements(self) -> str:
        # Patterns to match import and require statements
        import_patterns = [
            # # ES6 import statements
            # r'import\s+(?:(?:\*\s+as\s+\w+)|(?:\{[^}]*\})|(?:\w+))\s+from\s+[\'"]([^\'"]+)[\'"]',
            # r'import\s+[\'"]([^\'"]+)[\'"]',
            
            # # CommonJS require statements
            # r'(?:const|let|var)\s+(?:\{[^}]*\}|\w+)\s*=\s*require\s*\(\s*[\'"]([^\'"]+)[\'"]\s*\)',
            # r'require\s*\(\s*[\'"]([^\'"]+)[\'"]\s*\)',

            r'^(\s*)import\s+(.+?)\s+from\s+[\'"](.+?)[\'"];?\s*$'
        ]

         # Pattern to match UCxx_TCx.functions format
        target_pattern = r'^(?:\.\/)?UC(\d+)_TC(\d+)\.functions(.js)?$'

        for file_data in self.extracted_files:
            code = file_data['code']
        
            # Create a copy of the code to modify
            modified_code = code

            for pattern in import_patterns: 
                matches = re.finditer(pattern, modified_code, re.MULTILINE)
            
                for match in matches:
                    indent, import_path, path = match.groups()
                    full_statement = match.group(0)

                    # Rule 1: Transform TestResultReporter destructured import
                    if re.search(r'\{\s*TestResultReporter\s*\}', import_path):
                        import_path = "TestResultReporter"

                    path_match = re.match(r'^(?:\.\/)?UC(\d+)_TC(\d+)\.functions(.js)?$', path)
                    if path_match:
                        uc_num = path_match.group(1)
                        tc_num = path_match.group(2)
                        
                        if f"UC{uc_num}" != self.use_case_name:
                            # Create new path: ../UCxx/UCxx_TCx.functions
                            path = f"../UC{uc_num}/UC{uc_num}_TC{tc_num}.functions.js"

                    # Replace the path in the statement
                    new_statement = f"{indent}import {import_path} from '{path}';\n"
                    
                    # Replace in the modified code
                    modified_code = modified_code.replace(full_statement, new_statement, 1)
                    

            file_data['code'] = modified_code
           

    def save_files_to_disk(self, output_path: str) -> None:
        if not self.extracted_files:
            raise Exception("No extracted files found")

        folder_abs_path = os.path.join(output_path, self.use_case_name)
        if not os.path.exists(folder_abs_path):
            os.makedirs(folder_abs_path)

        for file_data in self.extracted_files:
            if not self.test_case_id or file_data['filename'].startswith(self.test_case_id):
                filename = file_data['filename']
            else:
                parts = file_data['filename'].rsplit('.', 2)  # Split from right, max 2 splits
                filename = f"{self.test_case_id}.{'.'.join(parts[1:])}"
            
            filepath = os.path.join(folder_abs_path, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(file_data['code'])