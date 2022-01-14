import re
import string
import pickle
from os import path
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Base model
def load_model():
    model_path = path.abspath('storage/lstm/Emotion_Recognition.h5')
    return keras.models.load_model(model_path)

# Tokenizer
def load_tokenizer():
    tokenizer_path = path.abspath('storage/lstm/tokenizer.pickle')
    return pickle.load(open(tokenizer_path , 'rb'))

# Label Encoder
def load_label_encoder():
    labelEncoder_path = path.abspath('storage/lstm/labelEncoder.pickle')
    return pickle.load(open(labelEncoder_path , 'rb'))

str_punc = string.punctuation.replace(',', '').replace("'",'')

def clean(text):
    global str_punc
    text = re.sub(r'[^a-zA-Z ]', '', text)
    text = text.lower()
    return text
'''
sentences = [
            "He's over the moon about being accepted to the university",
            "Your point on this certain matter made me outrageous, how can you say so? This is insane.",
            "I can't do it, I'm not ready to lose anything, just leave me alone",
            "Merlin's beard harry, you can cast the Patronus charm! I'm amazed!"
            ]
for sentence in sentences:
    print(sentence)
    sentence = clean(sentence)
    sentence = tokenizer.texts_to_sequences([sentence])
    sentence = pad_sequences(sentence, maxlen=256, truncating='pre')

    predictData = model.predict(sentence);

    result = le.inverse_transform(np.argmax(predictData, axis=-1))[0]

    # for val in predictData[0]:
    #  print(f"{val}")

    proba =  np.max(predictData)
    print(f"{result} : {proba}\n\n")
'''

def make_summary(average_result):
    max_key, max_value = max(average_result.items(), key = lambda k : k[1])
    max_key = str(max_key).lower()

    if max_key == "anger":
        if max_value > 50:
            return "Seems like the user is extremely angry."
        else:
            return "Seems like the user is angry."
    elif max_key == "fear":
        if max_value > 50:
            return "Seems like the user is in a extreme fear condition."
        else:
            return "Seems like the user is in a fear condition."
    elif max_key == "joy":
        if max_value > 50:
            return "Seems like the user is extremely jollify."
        else:
            return "Seems like the user is in joy."
    elif max_key == "love":
        if max_value > 50:
            return "Seems like the user is in a excellent condition."
        else:
            return "Seems like the user is having lovely condition."
    elif max_key == "sadness":
        if max_value > 50:
            return "Seems like the user is in extremely sad condition."
        else:
            return "Seems like the user is in sad condition."
    elif max_key == "surprise":
        if max_value > 50:
            return "Seems like the user is so much surprised."
        else:
            return "Seems like the user is feeling surprise."
    else:
        return ""

def predict_texts(sentences):
    model = load_model()
    tokenizer = load_tokenizer()
    le = load_label_encoder()
    le_classes = list(le.classes_)
    results = []
    sentences_len = len(sentences)
    sentence_sum_dict = dict.fromkeys(le_classes, 0)

    for sentence in sentences:
        # if text is empty
        if not sentence.strip():
            continue
        original_sentence = sentence
        sentence = clean(sentence)
        sentence = tokenizer.texts_to_sequences([sentence])
        sentence = pad_sequences(sentence, maxlen=256, truncating='pre')

        predictData = model.predict(sentence);

        sentence_dict = {}
        for index, val in zip(le_classes, predictData[0]):
            sentence_dict[ index ] = round(np.multiply(val, 100), 2)
            sentence_sum_dict[ index ] = sentence_sum_dict[ index ] + sentence_dict[ index ]

        results.append({
            "sentence": original_sentence,
            "result": sentence_dict
        })

    average_result = {}
    for key, value in sentence_sum_dict.items():
        average_result[ key.capitalize() ] = round((value / len(results)), 2);

    return {
        "average_result": average_result,
        "items_result": results,
        "summary": make_summary(average_result),
    }
