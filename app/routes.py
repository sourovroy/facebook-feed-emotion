from app.resources.PredictionResource import PredictionResource

# Register routes
def register(app):

    app.add_route('/predict-emotion', PredictionResource())
