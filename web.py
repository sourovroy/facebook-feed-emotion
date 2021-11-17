from wsgiref.simple_server import make_server
from dotenv import load_dotenv
import falcon

from app import routes
from app.middleware import AppMiddleware
from app.middleware import HandleCORS

# take environment variables from .env
load_dotenv()

# falcon.App instances are callable WSGI apps
app = application = falcon.App(
    cors_enable=True,
    middleware=[
        HandleCORS(),
        AppMiddleware()
    ],
)

routes.register(application)

if __name__ == '__main__':
    httpd = make_server('', 8000, application)

    # Serve until process is killed
    httpd.serve_forever()
