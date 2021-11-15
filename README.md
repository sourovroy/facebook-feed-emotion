# Facebook Feed Emotion

Find emotions from facebook posts.

### Prerequisite

```bash
python -m pip install -r requirements.txt

pip install tensorflow
pip install transformers
pip3 install torch torchvision
pip install contractions
pip install nltk
python3 -m nltk.downloader stopwords
python3 -m nltk.downloader wordnet
pip install python-dotenv
pip install falcon
pip install gunicorn
```

### Start the application

```bash
gunicorn --reload web
```
