import re
import numpy as np
import contractions
from os import path
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from transformers import RobertaTokenizerFast

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
        pad_to_max_length=True,
        return_attention_mask=True
    )

    input_ids.append(encoded['input_ids'])
    attention_masks.append(encoded['attention_mask'])

    return np.array(input_ids), np.array(attention_masks)

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

    model = create_model(roberta_model, max_len)
    model.load_weights('/content/drive/MyDrive/ColabFiles/Emotion_Detection_Bidirectional_LSTM/RoBERTa_Model_weights.h5')

    result = model.predict([input_ids, attention_masks])

    #le.categories_[0] = ['anger' 'fear' 'joy' 'love' 'sadness' 'surprise']
    result = pd.DataFrame(dict(zip(list(le.categories_[0]), [round(x*100, 2)for x in result[0]])).items(), columns = ['Category', 'Confidence'])
    # plot_result(result)

    return result

text_sentence = "I am unhappy";

max_len = len(text_sentence.split())

result = inference(text_sentence, max_len);

print(result)
