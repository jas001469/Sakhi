from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# Load model and encoder
model = joblib.load("spam_phone_model.pkl")
label_encoder = joblib.load("spam_label_encoder.pkl")

# Load dataset (should be in the same directory)
df = pd.read_csv("extended_phone_spam_dataset_5000.csv")

# Define request schema
class PhoneNumberInput(BaseModel):
    number: int

# Initialize FastAPI app
app = FastAPI()

@app.post("/predict")
def predict_spam(data: PhoneNumberInput):
    number = data.number

    # Find the number in the dataset
    features = df[df["number"] == number]
    if features.empty:
        raise HTTPException(status_code=404, detail="Phone number not found in dataset")

    # Drop non-feature columns
    X = features.drop(columns=["number", "spam_label"])
    
    # Predict and decode
    prediction = model.predict(X)
    label = label_encoder.inverse_transform(prediction)[0]
    
    return {"number": number, "prediction": label}
