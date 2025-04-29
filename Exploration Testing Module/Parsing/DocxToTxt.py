from docx import Document

def convert_docx_to_txt(docx_file, output_file):
    """
    Converte il contenuto di un file .docx in un file di testo .txt.
    Ignora le righe vuote e converte tutto il contenuto, inclusi i sommari e le tabelle stesse.
    :param docx_file: Percorso al file .docx di input.
    :param output_file: Percorso al file .txt di output.
    """
    try:
        
        doc = Document(docx_file)
        
        
        with open(output_file, 'w', encoding='utf-8') as txt_file:
            paragraph_count = 0
            table_count = 0
            
            for para in doc.paragraphs:
                text = para.text.strip()
                if text:  # Scrivi solo i paragrafi che non sono vuoti
                    txt_file.write(text + '\n')
                    paragraph_count += 1

                if paragraph_count % 100 == 0:
                    print(f"Paragrafo {paragraph_count} elaborato.")
                    
            
            txt_file.write('\n')
            for table in doc.tables:
                table_count += 1

                txt_file.write('\n')

                for row in table.rows:
                    row_text = []
                    for cell in row.cells:
                        for para in cell.paragraphs:
                            cell_text = para.text.strip()
                            if not cell_text:  # Se la cella è vuota, scrivi "no"
                                cell_text = "no"
                            row_text.append(cell_text)
                    
                    if row_text:
                        txt_file.write(" : ".join(row_text) + '\n')
                
                txt_file.write('\n')

                print(f"Tabella {table_count} elaborata.")
        
        print(f"Conversione completata: {output_file}")
        print(f"Totale paragrafi elaborati: {paragraph_count}")
        print(f"Totale tabelle elaborate: {table_count}")
    
    except Exception as e:
        print(f"Errore durante la conversione: {e}")
