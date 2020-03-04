# colour-mixer
Blends two colours together, can be used to lighten, darken, or mix colours.


# Install

```
npm install @k-renwick/colour-mixer
```

# Usage

```
import React from 'react'
import * as colourMixer from '@k-renwick/colour-mixer'

const ExampleDiv = () => (
  <div style={{backgroundColor: colourMixer.blend('#B57EE5', 0.5)}}>
    This div has a blended background colour
  </div>
)
```


## Testing
run `npm test` to run existing unit tests