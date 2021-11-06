from wsgiref.simple_server import make_server

import falcon

from app import routes

# falcon.App instances are callable WSGI apps
# in larger applications the app is created in a separate file
application = falcon.App()

routes.register(application)

if __name__ == '__main__':
    with make_server('', 8000, application) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()
