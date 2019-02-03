# CashDat - OCR Module

The ocr module uses `google-cloud-vision` API to detect text from pictures of receipts. The user is required to set vertical bounds on the image as well as a horizontal separator line which separates the prices and the items. These parameters are passed into `script.py` function `parse_receipt` which takes the following inputs:
- `x_offset`: integer offset from the left side. eg 300
- `y_offset`: array of two integer vertical offsets. eg[30, 160]
- `image_url`: url to an image available on open web.

`script.py` is designed to work for a backend server, in this case it is `Flask`. In order to run this module locally, use the following steps:

- Make a google cloud vision project and enable the vision api.
- Download the credentials.json which will look like <projectname>-<jibberish>.json
- Setup a `venv` for python3 and install `google-cloud-vision` and `Pillow`
- Export the following environment variable using
        `export GOOGLE_APPLICATION_CREDENTIALS="/home/harsh/Documents/Hackathons/McHacks6/Snack_Overflow/ocr/CashThat-e4bb7867495f.json"`
- Run `script-test.py`

![slt](https://github.com/danielwise14/Snack_Overflow/raw/master/ocr/ocr_example.png "OCR Example")
