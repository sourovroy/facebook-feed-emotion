import falcon
import falcon.status_codes as status
from falcon.http_error import HTTPError
from os import getenv

class AppSecretError(HTTPError):

    def __init__(self):
        super().__init__(status.HTTP_401)

    def to_dict(self, obj_type=dict):

        obj = obj_type()

        obj['success'] = False
        obj['description'] = 'Please provide proper App-Secret-ID'

        return obj

class AppMiddleware:

    # through error if anything wrong happened.
    def process_request(self, req, resp):
        # Check proper APP ID
        app_id = req.get_header('App-Secret-ID')

        if (getenv('APP_SECRET_ID') != app_id):
            raise AppSecretError()
