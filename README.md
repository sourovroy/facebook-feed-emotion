# Facebook Feed Emotion

Find emotions from facebook posts.

### Prerequisite

```bash
python -m pip install -r requirements.txt
```

### Start the application

```bash
gunicorn --reload web
# Or
hupper -m waitress --listen=127.0.0.1:8000 web:app
```
