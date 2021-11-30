import cv2
import numpy as np
from PIL import ImageColor
from matplotlib.colors import is_color_like

frame = np.zeros((500,500,3), dtype=np.uint8)
frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
font = cv2.FONT_HERSHEY_SIMPLEX
fontScale = 1
thickness = 2
lineType  = 2
while True:

    colour = None
    while not is_color_like(colour):
        if colour in ('q', 'Q'):
            exit()
        colour = input("Cor: ")

    rgb = ImageColor.getcolor(colour, "RGB")

    if rgb[0] + rgb[1] + rgb[2] > 765/2:
        text_colour = (0, 0, 0)
    else:
        text_colour = (255, 255, 255)

    cv2.rectangle(frame, (0, 0), (500, 500), (rgb[2], rgb[1], rgb[0]), thickness=-1)
    text_size = cv2.getTextSize(colour, font, fontScale, thickness)
    # print(text_size)
    cv2.putText(frame, colour, (250-text_size[0][0], 250-text_size[0][1]), font, fontScale, text_colour, thickness, cv2.LINE_AA)

    cv2.imshow("Test", frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()