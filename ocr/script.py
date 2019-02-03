import io
import os


import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image
import numpy as np


# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def draw_boxes(response, x_offset, y_offset):
    im = np.array(Image.open('example3.jpg'), dtype=np.uint8)
    # Create figure and axes
    fig,ax = plt.subplots(1)
    # Display the image
    ax.imshow(im, origin='upper')
    items ={}
    price = []
    dot = False
    for box in response.text_annotations:
        # print(price)
        # Create a Rectangle patch
        coords = get_coords(box.bounding_poly.vertices)
        # print(box.description, coords)
        if coords['y']> y_offset[0] and coords['y']< y_offset[1]:
            if(coords['x'] > x_offset):
                if box.description == '.':
                    dot=True
                if box.description.isdigit():
                    if(dot):
                        price.append(box.description)
                        # print(price)
                        prc = ".".join(price)
                        print(prc)
                        items[coords['y']] =float(prc)
                        dot = False
                        price[:] = []
                    else:
                        price.append((box.description))
                    rect = patches.Rectangle((coords['x'],coords['y']),coords['w'], coords['h'],linewidth=1,edgecolor='r',facecolor='none')
                    # Add the patch to the Axes
                    ax.add_patch(rect)
            else:
                rect = patches.Rectangle((coords['x'],coords['y']),coords['w'], coords['h'],linewidth=1,edgecolor='g',facecolor='none')
                # Add the patch to the Axes
                ax.add_patch(rect)
    # print(items)
    # print(len(items))
    hash_map = dict(zip(items.keys(), [[] for _ in range(len(items))]))
    def is_in(coord, lst):
        ymax = coord['y']+coord['h']
        for y in lst:
            if(coord['y']<=y<=ymax):
                return y
        return None
    for box in response.text_annotations:
        coords = get_coords(box.bounding_poly.vertices)
        if coords['y']> y_offset[0] and coords['y']< y_offset[1] and coords['x'] < x_offset:
            print(coords['y'])
            # if d:
            #     print(items)
            #     d = False
            rval =is_in(coords, items.keys())
            if rval:
                print("Found!", box.description)
                hash_map[rval].append(box.description)
    final = []
    for k, v in hash_map.items():
        item_name = " ".join(v)
        final.append({item_name:items[k]})
    print(final)
    plt.show()
    return final
    # return items
        
def get_coords(box):
    # 0 - 1
    # |   |
    # 2 - 3
    # print(box)
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

def init_conf():
    im = np.array(Image.open('example3.jpg'), dtype=np.uint8)
    # Create figure and axes
    fig,ax = plt.subplots(1)
    # Display the image
    ax.imshow(im, origin='upper')
    plt.show()
# Instantiates a client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    'example3.jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

# Performs label detection on the image file
response = client.document_text_detection(image=image)
# init_conf()
# draw_boxes(response, 400, [50, 350])
draw_boxes(response, 1800, [750, 1400])
