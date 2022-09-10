# HeatMap.js
HeatMap.js is a front-end javascript library that can generate smooth heat maps from a discrete 2D array of numbers. 
This is done efficiently *(on load)*, on the client machine. 
For less powerful client computers, the algorithm can be tuned to run faster with small compromises to the resulting heat map.

Heat maps generated by HeatMap.js require very little storage, as an array of integers takes much less space than an image of similar quality.
As such, they can be loaded by client machines that have very slow internet connections in a small amount of time.

The algorithm that transforms the array into a smooth image treats each value in the array as a coefficient of a 3D bell curve.
The function that generates the color of a pixel in the heat map is the sum of the bell curves in the vicinity of the pixel.
The algorithm is the most important part of this project, as it allows something that typically takes a very long time to generate to generate in O(pixels) time and O(1) space.

This library could be very useful to local communities, especially in Miami, as it could be used to model dangerous weather events or rent prices.

HeatMap.js relies on p5.js, and that library is included in the default project zip folder. For more information: [p5.js](https://p5js.org/).

# How to use
The heat map constructor only has one required parameter: the array that you want to transform.
It also has three optional parameters: colorScheme, epsilon, and pixelSize. There are two built-in color schemes: dark and rainbow. If not specified, it will default to rainbow. Epsilon represents how many coefficients away we should look when calculating the color of a pixel. The lower this number, the faster the algorithm runs. Pixel size represents the size of a pixel and thus the number of operations that must be done in order to get the result. The larger the pixel size, the faster the algorithm will run.

The display method has three required parameters: the x and y location of the top-left corner of the heat map, and the height. The width will be automatically scaled based on the ratio of rows to columns in the array. It also has an optional parameter, transparency. By default, there is no transparency, but this is useful if you want to layer a heat map on top of a map.