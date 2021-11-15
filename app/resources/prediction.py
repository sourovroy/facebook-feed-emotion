import falcon
import json
import app.model as model

class PredictionResource:

    # Request POST: /predict-emotion
    def on_post(self, req, resp):
        data = json.loads(req.stream.read())

        # print(data['texts'])
        result = model.predict_texts(data['texts'])
        
        # result = {"success": True}

        resp.status = falcon.HTTP_OK
        resp.content_type = falcon.MEDIA_JSON

        resp.text = json.dumps(result)
