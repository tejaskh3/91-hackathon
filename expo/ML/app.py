import numpy as np
import pandas as pd
import requests
from PIL import Image, ImageEnhance
# from google.cloud import vision
import io
import cv2 as cv
from flask import Flask, request, jsonify
from NLP.k import predict
app = Flask(__name__)

@app.route("/prediction", methods=["POST"])
def prediction():
    # print("Reached correctly")
    data = request.get_json(force=True)
    # tp = ["Cocoa", "Notebooks", "Chips"]
    print(data['data'])
    # res = "Food"
    res = predict([data['data']])
    print(res)
    return {"category":res[0]}

@app.route("/image_ocr", methods=["POST"])
def ocr_enable():
    data = []
    path = request.get_json(force=True)
    # print(path)
    url = path['src']
    print(url)
    response = requests.get(url)
    img = Image.open(io.BytesIO(response.content))
    enhancer = ImageEnhance.Contrast(img)
    img2 = enhancer.enhance(2)
    # img2 = np.array(img2)
    img2.save("Bill.jpg")
    img2 = cv.imread("Bill.jpg", 0)
    th = cv.adaptiveThreshold(img2,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY,11,2)
    cv.imwrite("Bill.jpg", th)
    return data