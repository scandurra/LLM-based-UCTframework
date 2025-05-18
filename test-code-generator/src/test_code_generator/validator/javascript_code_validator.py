import logging
import re
from typing import Dict, List, Tuple

logger = logging.getLogger(__name__)

class JavascriptCodeValidator:
    def __init__(self) -> None:
        pass

    def extract_code_blocks(self, content: str) -> List[str]:
        """
        Extract JavaScript code blocks from content that might have markdown code fences.
        
        Args:
            content: Content string that might contain code blocks
            
        Returns:
            List of extracted JavaScript code blocks
        """
        logger.info("Extracting JavaScript code blocks")

        # Check for markdown-style JS code blocks
        js_blocks = re.findall(r'```(?:javascript|js)(.*?)```', content, re.DOTALL)
        
        if js_blocks:
            logger.info(f"Found {len(js_blocks)} JavaScript code blocks with markdown syntax")
            return [block.strip() for block in js_blocks]
        else:
            # If no markdown code blocks found, assume the entire content is JavaScript
            logger.info("No markdown code blocks found, treating entire content as JavaScript")
            return [content.strip()]
    

    def clean_code(self, code_content: str) -> str:
        """
        Clean JavaScript code by applying all fixes.
        
        Args:
            code_content: The JavaScript code content to clean
            
        Returns:
            Cleaned JavaScript code
        """
        logger.info("Starting JavaScript code cleaning")
        
        # Extract code blocks if there are markdown code fences
        code_blocks = self.extract_code_blocks(code_content)
        
        logger.info("JavaScript code cleaning completed")
        
        # If there was only one block, return it directly
        if len(code_blocks) == 1:
            return code_blocks[0]
        
        # If there were multiple blocks, join them with separators
        return '\n\n// Next JavaScript Block\n\n'.join(code_blocks)

    def save_to_file(self, code: str, output_path: str) -> None:
        """
        Save cleaned JavaScript code to a file.
        
        Args:
            code: Cleaned JavaScript code
            output_path: Path to save the cleaned code to
        """
        self.logger.info(f"Saving cleaned code to {output_path}")
        
        try:
            with open(output_path, 'w') as f:
                f.write(code)
            self.logger.info(f"Successfully saved cleaned code to {output_path}")
        except Exception as e:
            self.logger.error(f"Failed to save code: {str(e)}")
            raise

