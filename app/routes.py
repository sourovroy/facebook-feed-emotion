from app.resources.prediction import PredictionResource

# Register routes
def register(app):

    app.add_route('/predict-emotion', PredictionResource())
