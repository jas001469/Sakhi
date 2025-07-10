from wsgiref.simple_server import make_server
from main import app

if __name__ == '__main__':
    print("Starting server on http://127.0.0.1:8000")
    with make_server('127.0.0.1', 8000, app) as httpd:
        print("Server ready")
        httpd.serve_forever()