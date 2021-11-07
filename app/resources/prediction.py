import falcon
import json

class PredictionResource:

    # Request POST: /predict-emotion
    def on_post(self, req, resp):
        data = json.loads(req.stream.read())

        # print(data['texts'])

        result = {"success": True}

        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_JSON

        resp.text = json.dumps(result)
