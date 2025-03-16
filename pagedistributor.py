import fitz  # PyMuPDF
import io
from PIL import Image

def pdf_to_images(pdf_path, output_prefix=""):
    """
    Converts a PDF to a sequence of JPEG images, one per page.

    Args:
        pdf_path (str): The path to the input PDF file.
        output_prefix (str): The prefix for the output image filenames.
    """
    try:
        pdf_document = fitz.open(pdf_path)
        for page_number in range(pdf_document.page_count):
            page = pdf_document[page_number]
            pix = page.get_pixmap() 
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            img_path = f"./pages/{output_prefix}{page_number + 1}.jpg"
            img.save(img_path)
            print(f"Saved {img_path}")
        pdf_document.close()
    except FileNotFoundError:
        print(f"Error: PDF file '{pdf_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

pdf_to_images("./editions/kalp-2-holi.pdf") 
