import io
import os


import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image
import numpy as np


# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def draw_boxes(response):
    im = np.array(Image.open('example.jpg'), dtype=np.uint8)
    # Create figure and axes
    fig,ax = plt.subplots(1)
    # Display the image
    ax.imshow(im, origin='upper')

    for box in response.text_annotations:
        # Create a Rectangle patch
        coords = get_coords(box.bounding_poly.vertices)
        print(box.description, coords)
        rect = patches.Rectangle((coords['x'],coords['y']),coords['w'], coords['h'],linewidth=1,edgecolor='r',facecolor='none')
        # Add the patch to the Axes
        ax.add_patch(rect)
    plt.show()
        
def get_coords(box):
    # 0 - 1
    # |   |
    # 2 - 3
    print(box)
    w = box[1].x-box[0].x
    h = box[2].y-box[0].y
    x = box[2].x - w
    y = box[2].y - h
    return {
        'w':w,
        'h':h,
        'x':x,
        'y':y
    }

# Instantiates a client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    'example.jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

# Performs label detection on the image file
response = client.document_text_detection(image=image)
draw_boxes(response)
