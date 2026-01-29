from numbers_parser import Document
import csv
import os

input_path = "data/ProjectsList_2026-01-22 (A).numbers"
output_path = "data/projects.csv"

def convert_numbers_to_csv():
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        exit(1)

    print(f"Reading {input_path}...")
    try:
        doc = Document(input_path)
        sheets = doc.sheets
        if not sheets:
            print("No sheets found in document")
            exit(1)
        
        # Take the first sheet
        table = sheets[0].tables[0]
        data = table.rows(values_only=True)
        
        print(f"Writing to {output_path}...")
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerows(data)
            
        print("Conversion complete!")
        
    except Exception as e:
        print(f"Error converting file: {e}")
        exit(1)

if __name__ == "__main__":
    convert_numbers_to_csv()
