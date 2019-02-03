import numpy as np
import matplotlib.pyplot as plt

x = np.array([[1,2,1,4],[2,5,3,1],[0,1,2,2]])
plt.imshow(x, extent=[-x.shape[1]/2., x.shape[1]/2., -x.shape[0]/2., x.shape[0]/2. ])
plt.show()