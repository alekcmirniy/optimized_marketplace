import uuid

def generate_file_name(filename):
    """Генерирует уникальное имя файла с сохранением расширения"""
    ext = filename.split('.')[-1]
    return f"{uuid.uuid4()}.{ext}"
