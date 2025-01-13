from fastapi import FastAPI, UploadFile, File
import pandas as pd
from app.llm_model import run_llm_on_data

app = FastAPI()

@app.post("/upload/")
async def upload_csv(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    output = run_llm_on_data(df)
    return {"processed_data": output.to_dict()}
