import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import re
import nltk
import numpy as np
import pandas as pd
import contractions
from os import path
import tensorflow as tf
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.optimizers import Adam
from transformers import RobertaTokenizerFast
from transformers import TFRobertaModel

tf.get_logger().setLevel('ERROR')

'''
Save roberta base model
Need to run only once
'''
def save_roberta_base_model():
    dir_path = path.abspath('storage/TFRobertaModel_roberta_base_save_pretrained')
    roberta_model = TFRobertaModel.from_pretrained('roberta-base')
    roberta_model.save_pretrained(dir_path);
# save_roberta_base_model()
# exit()

'''
Save tokenizer model
Need to run only once
'''
def save_tokenizer_model():
    dir_path = path.abspath('storage/RobertaTokenizerFast_roberta_base_save_pretrained')
    tokenizer = RobertaTokenizerFast.from_pretrained("roberta-base")
    tokenizer.save_pretrained(dir_path);
# save_tokenizer_model()
# exit()

'''
Download necessary nltk files once
'''
def download_necessary_nltk_files():
    nltk.download('stopwords')
    nltk.download('wordnet')
# download_necessary_nltk_files()
# exit()

# Load saved roberta base model.
def get_roberta_base_model():
    dir_path = path.abspath('storage/TFRobertaModel_roberta_base_save_pretrained')
    return TFRobertaModel.from_pretrained(dir_path, local_files_only=True)

roberta_model = get_roberta_base_model()

# Load saved tokenizer model.
def get_tokenizer_model():
    dir_path = path.abspath('storage/RobertaTokenizerFast_roberta_base_save_pretrained')
    return RobertaTokenizerFast.from_pretrained(dir_path, local_files_only=True)

tokenizer = get_tokenizer_model()

def roberta_inference_encode(data, maximum_length):
    input_ids = []
    attention_masks = []

    encoded = tokenizer.encode_plus(
        data,
        add_special_tokens=True,
        max_length=maximum_length,
        padding='max_length',
        return_attention_mask=True,
        truncation=True
    )

    input_ids.append(encoded['input_ids'])
    attention_masks.append(encoded['attention_mask'])

    return np.array(input_ids), np.array(attention_masks)

# Create the final model.
def create_model(bert_model, max_len):
    input_ids = tf.keras.Input(shape=(max_len,),dtype='int32')
    attention_masks = tf.keras.Input(shape=(max_len,),dtype='int32')

    output = bert_model([input_ids,attention_masks])
    output = output[1]

    output = tf.keras.layers.Dense(6, activation='softmax')(output)
    model = tf.keras.models.Model(inputs = [input_ids,attention_masks],outputs = output)
    model.compile(Adam(learning_rate=1e-5), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

'''
Removing stopwords (without removing negative words)
Expand Contractions
Lemmatization
'''
def preprocess(sentence):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    sentence = re.sub('[^A-z]', ' ', sentence)
    negative = ['not', 'neither', 'nor', 'but', 'however', 'although', 'nonetheless', 'despite', 'except', 'even though', 'yet']
    stop_words = [z for z in stop_words if z not in negative]
    preprocessed_tokens = [lemmatizer.lemmatize(contractions.fix(temp.lower())) for temp in sentence.split() if temp not in stop_words] #lemmatization

    return ' '.join([x for x in preprocessed_tokens]).strip()

# Get prediction from a sentence.
def inference(text_sentence, max_len):
    preprocessed_text = preprocess(text_sentence)

    input_ids, attention_masks = roberta_inference_encode(preprocessed_text, maximum_length = max_len)

    weights_file_path = path.abspath('storage/RoBERTa_Model_weights-2.h5')

    model = create_model(roberta_model, max_len)
    model.load_weights(weights_file_path)
    
    result = model.predict([input_ids, attention_masks])
    
    le_categories = ['anger', 'fear', 'joy', 'love', 'sadness', 'surprise']
    formated = dict( zip(le_categories, [ round(x * 100, 2) for x in result[0] ]) )
    
    return pd.DataFrame(formated.items(), columns = ['Category', 'Confidence'])

text_sentence = "I am unhappy";
#text_sentence = "We are very happy today to complete our first AI prediction.";

max_len = len(text_sentence.split())

result = inference(text_sentence, max_len);

print(result)
