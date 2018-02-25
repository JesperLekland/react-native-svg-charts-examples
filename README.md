# react-native-svg-charts-examples

This repository is meant to serve as a showcase for [`react-native-svg-charts`](https://github.com/JesperLekland/react-native-svg-charts).
Here we try to gather all the coolest implementations and use cases to serve as inspiration for other people. Open Source is all about sharing knowledge!

Have you ever made a cool graph using `react-native-svg-charts`, maybe a super complex use case or just really pretty design?
Make a PR with your code and include it here for everyone to see. 

Have a separate repo with some awesome examples? Make a PR and just include the link to your repo in this README, We'd rather have too many cool examples!

Just make sure that all examples are fully reproducible demos so that people don't hav eto figure a bunch of stuff out on the own.

# Examples

* [Area](#area)
    * [with top line](#areachart-with-line)
    * [with gradient](#areachart-with-gradient)
    * [clipped](#areachart-clipped)
* [Bar](#bar)
    * [with multiple data sets](#barchart-with-multiple-data-sets)
    * [with gradient](#barchart-with-gradient)
* [Line](#linechart)
    * [with shadow](#linechart-with-shadow)
    * [with gradient](#linechart-with-gradient)
    * [clipped](#linechart-clipped)
* [ProgressCircle](#progress-circle)
    * [Gauge](#gauge)
* [Scale](#scale)
    * [ScaleTime](#scaletime)
* [Decorator](#decorator)
* [Extras](#extras)
* [Layered Charts](#layered-charts)
* [Grid](#grid)

## Area

### AreaChart with line

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/area-chart.png" width=50% />
<details>
<summary> Code </summary>

```javascript
import React from 'react'
import { Path } from 'react-native-svg'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class AreaChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />
        )

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                extras={[ Line ]}
            />
        )
    }
}

```
</details>

### AreaChart with gradient 
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/gradient.png" width=50% />
<details><summary>Code</summary>

```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'

class GradientExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.2}/>
                </LinearGradient>
            </Defs>
        )

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 20, bottom: 20 }}
                extras={[ Gradient ]}
                svg={{ fill: 'url(#gradient)' }}
            />
        )
    }

}

export default GradientExample

```
</details>

### AreaChart clipped
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/partial-charts.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { ClipPath, Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { AreaChart, Path } from 'react-native-svg-charts'

class PartialAreaChartExample extends React.PureComponent {
    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const Gradient = () => (
            <Defs key={'defs'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.2}/>
                </LinearGradient>
            </Defs>
        )

        const Clips = ({ x, width }) => (
            <Defs key={'clips'}>
                <ClipPath id={'clip-path-1'} key={'0'}>
                    <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
                <ClipPath id="clip-path-2" key={'1'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
            </Defs>
        )

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'green'}
                fill={'none'}
                clipPath={'url(#clip-path-1)'}
            />
        )

        const DashedLine = ({ line }) => (
            <Path
                key={'dashed-line'}
                stroke={'green'}
                d={line}
                fill={'none'}
                clipPath={'url(#clip-path-2)'}
                strokeDasharray={[ 4, 4 ]}
            />
        )

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                svg={{
                    fill: 'url(#gradient)',
                    clipPath: 'url(#clip-path-1)',
                }}
                extras={[
                    Gradient,
                    Clips,
                    Line,
                    DashedLine,
                ]}
            />
        )
    }
}
```

</details>



## Bar

### BarChart multiple data sets

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/grouped-bar-chart.png" width=50% />

<details>
    <summary> Code </summary>
    
```javascript
import React from 'react'
import { BarChart } from 'react-native-svg'

class GroupedBarChartExample extends React.PureComponent {

    render() {

        const data1 = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
        const data2 = [ 24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84 ]

        const barData = [
            {
                values: data1,
                positive: {
                    fill: 'rgb(134, 65, 244)',
                },
                negative: {
                    fill: 'rgba(134, 65, 244, 0.2)',
                },
            },
            {
                values: data2,
                positive: {
                    fill: 'rgb(244, 115, 65)',
                },
                negative: {
                    fill: 'rgb(244, 115, 65, 0.2)',
                },
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 30, bottom: 30 } }
            />
        )
    }

}

```
</details>

### BarChart with gradient
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/gradient-bar.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { LinearGradient, Stop } from 'react-native-svg'
import { BarChart } from 'react-native-svg-charts'

class GradientBarExample extends React.PureComponent {

    render() {

        const {
                  fillColor         = 'rgb(134, 65, 244)',
                  fillColorNegative = 'rgb(239, 71, 71)',
              } = this.props

        const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const barData = [
            {
                values: data,
                positive: {
                    fill: fillColor,
                    // other react-native-svg supported props
                },
                negative: {
                    fill: fillColorNegative,
                    // other react-native-svg supported props
                },
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 20, bottom: 20 } }
                renderGradient={ ({ id, value, fill }) => (
                    <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                        <Stop offset={ '0%' } stopColor={ value > 0 ? fill : 'rgb(66, 194, 244)' }/>
                        <Stop offset={ '100%' } stopColor={ value < 0 ? fill : 'rgb(66, 194, 244)' }/>
                    </LinearGradient>
                ) }
                svg={ {
                    strokeWidth: 2,
                } }
            />
        )
    }

}

export default GradientBarExample

```
</details>

## LineChart

### LineChart with shadow
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/line-chart.png" width=50% />

<details>
    <summary>Code</summary>
    
```javascript
import React from 'react'
import { LineChart, Path } from 'react-native-svg-charts'

class LineChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={ { top: 20, bottom: 20 } }
                extras={[ Shadow ]}
            />
        )
    }

}

```
</details>

### LineChart with gradient

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/gradient-line.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart } from 'react-native-svg-charts'

class GradientLineExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
                </LinearGradient>
            </Defs>
        )

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                contentInset={ { top: 20, bottom: 20 } }
                svg={{
                    strokeWidth: 2,
                    stroke: 'url(#gradient)',
                }}
                extras={[ Gradient ]}
            />
        )
    }

}
```
</details>

### LineChart clipped
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/partial-charts.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { ClipPath, Defs, Rect } from 'react-native-svg'
import { LineChart, Path } from 'react-native-svg-charts'

class PartialLineChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const Clips = ({ x, width }) => (
            <Defs key={'clips'}>
                <ClipPath id="clip-path-1">
                    <Rect x={'0'} y={'0'} width={x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
                <ClipPath id={'clip-path-2'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
            </Defs>
        )

        // Line extras:
        const DashedLine = ({ line }) => (
            <Path
                key={'line-1'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                strokeWidth={2}
                fill={'none'}
                strokeDasharray={[ 4, 4 ]}
                clipPath={'url(#clip-path-2)'}
            />
        )

        const Shadow = ({ line }) => (
            <Path
                y={3}
                key={'shadow-1'}
                d={line}
                stroke={'rgba(134, 65, 244, 0.2)'}
                strokeWidth={5}
                fill={'none'}
            />
        )

        return (
            <LineChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                    clipPath: 'url(#clip-path-1)',
                }}
                extras={[
                    Clips,
                    Shadow,
                    DashedLine,
                ]}
            />
        )
    }
}

```
</details>

## Progress circle

### Gauge

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/progress-gauge.png" width=50% />

<details>
    <summary>Code</summary>
    
```javascript
import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressGaugeExample extends React.PureComponent {

    render() {

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={ 'rgb(134, 65, 244)' }
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
            />
        )
    }

}

```
</details>

## Scale
### ScaleTime
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/scale-time.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { AreaChart, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import dateFns from 'date-fns'

class ScaleTimeExample extends React.PureComponent {

    render() {

        const data = [
            {
                value: 50,
                date: dateFns.setHours(new Date(2018, 0, 0), 6),
            },
            {
                value: 10,
                date: dateFns.setHours(new Date(2018, 0, 0), 9),
            },
            {
                value: 150,
                date: dateFns.setHours(new Date(2018, 0, 0), 15),
            },
            {
                value: 10,
                date: dateFns.setHours(new Date(2018, 0, 0), 18),
            },
            {
                value: 100,
                date: dateFns.setHours(new Date(2018, 0, 0), 21),
            },
            {
                value: 20,
                date: dateFns.setHours(new Date(2018, 0, 0), 24),
            },
        ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <AreaChart
                  style={{ flex: 1 }}
                  data={data}
                  yAccessor={({ item }) => item.value}
                  xAccessor={({ item }) => item.date}
                  xScale={scale.scaleTime}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                  curve={shape.curveLinear}
                />
                <XAxis
                  data={data}
                  svg={{
                      fill: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      rotation: 20,
                      originY: 30,
                      y: 5,
                  }}
                  xAccessor={({ item }) => item.date}
                  scale={scale.scaleTime}
                  numberOfTicks={6}
                  style={{ marginHorizontal: -15, height: 20 }}
                  contentInset={{ left: 10, right: 25 }}
                  formatLabel={(value) => dateFns.format(value, 'HH:mm')}
                />
            </View>
        )
    }

}

```
</details>

## Extras

### Labels
<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/extras.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

class ExtrasExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        /**
         * Both below functions should preferably be their own React Components
         */

        const HorizontalLine = (({ y }) => (
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '100%' }
                y1={ y(50) }
                y2={ y(50) }
                stroke={ 'grey' }
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 2 }
            />
        ))

        const Tooltip = ({ x, y }) => (
            <G
                x={ x(5) - (75 / 2) }
                key={ 'tooltip' }
                onPress={ () => console.log('tooltip clicked') }
            >
                <G y={ 50 }>
                    <Rect
                        height={ 40 }
                        width={ 75 }
                        stroke={ 'grey' }
                        fill={ 'white' }
                        ry={ 10 }
                        rx={ 10 }
                    />
                    <Text
                        x={ 75 / 2 }
                        dy={20}
                        alignmentBaseline={'middle'}
                        textAnchor={ 'middle' }
                        stroke={ 'rgb(134, 65, 244)' }
                    >
                        { `${data[5]}ºC` }
                    </Text>
                </G>
                <G x={ 75 / 2 }>
                    <Line
                        y1={ 50 + 40 }
                        y2={ y(data[ 5 ]) }
                        stroke={ 'grey' }
                        strokeWidth={ 2 }
                    />
                    <Circle
                        cy={ y(data[ 5 ]) }
                        r={ 6 }
                        stroke={ 'rgb(134, 65, 244)' }
                        strokeWidth={2}
                        fill={ 'white' }
                    />
                </G>
            </G>
        )

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                svg={{
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                }}
                contentInset={ { top: 20, bottom: 20 } }
                curve={ shape.curveLinear }
                extras={ [ HorizontalLine, Tooltip ] }
            />
        )
    }

}
```
</details>


### Layered Charts

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/stacked-charts.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'

class LayeredChartsExample extends React.PureComponent {

    render() {

        const data  = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ].reverse()

        return (
            <View style={ { height: 200 } }>
                <AreaChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    data={ data2 }
                    svg={{ fill: 'rgba(34, 128, 176, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
            </View>
        )
    }

}
```
</details>


## Grid

<img src="https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts-examples/master/screenshots/custom-grid.png" width=50% />

<details><summary>Code</summary>

```javascript
import React from 'react'
import { LineChart } from 'react-native-svg-charts'
import { View } from 'react-native'
import { G, Line } from 'react-native-svg'

class CustomGridExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {
                    // Horizontal grid
                    ticks.map(tick => (
                        <Line
                            key={ tick }
                            x1={ '0%' }
                            x2={ '100%' }
                            y1={ y(tick) }
                            y2={ y(tick) }
                            stroke={ 'rgba(0,0,0,0.2)' }
                        />
                    ))
                }
                {
                    // Vertical grid
                    data.map((_, index) => (
                        <Line
                            key={ index }
                            y1={ '0%' }
                            y2={ '100%' }
                            x1={ x(index) }
                            x2={ x(index) }
                            stroke={ 'rgba(0,0,0,0.2)' }
                        />
                    ))
                }
            </G>
        )

        return (
            <View style={ { height: 200, flexDirection: 'row' } }>
                <LineChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={ {
                        stroke: 'rgb(134, 65, 244)',
                    } }
                    renderGrid={ CustomGrid }
                />
            </View>
        )
    }

}

```
</details>

## License
[MIT](./LICENSE)
