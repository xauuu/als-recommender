from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
import json
from pydantic import BaseModel, Field
from fastapi.encoders import jsonable_encoder
import joblib
import uvicorn

model = joblib.load('./rfc_model.pkl')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    Pregnancies: int = Field(..., example=1)
    Glucose: int = Field(..., example=20)
    BloodPressure: int = Field(..., example=20)
    SkinThickness: int = Field(..., example=20)
    Insulin: int = Field(..., example=20)
    BMI: float = Field(..., example=20.5)
    DiabetesPedigreeFunction: float = Field(..., example=0.54)
    Age: int = Field(..., example=20)


@app.post("/predict")
async def predict(request: PredictRequest = Body(...)):
    data = jsonable_encoder(request)
    data = [[data['Pregnancies'], data['Glucose'],
             data['BloodPressure'], data['SkinThickness'], data['Insulin'], data['BMI'], data['DiabetesPedigreeFunction'], data['Age']]]
    print(data)
    predict = model.predict(data)
    return Response(content=json.dumps({"result": str(predict[0])}), media_type="application/json")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
