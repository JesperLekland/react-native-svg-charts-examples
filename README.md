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
* [Pie](#piechart)
* [ProgressCircle](#progress)
* [YAxis](#yaxis)
* [XAxis](#xaxis)

Also see [other examples](#other-examples)
* [Gradient](#gradient)
* [Decorator](#decorator)
* [Extras](#extras)
* [GridMin/Max](#gridminmax)
* [Layered Charts](#layered-charts)
* [PieChart with labels](#piechart-with-labels)
* [Custom Grid](#custom-grid)
* [Partial Chart](#partial-charts)

## Area

### AreaChart with line

![Area chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/area-chart.png)

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
![Gradient AreaChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient.png)

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
![Partial Charts](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/partial-charts.png)

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

![Grouped bar chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/grouped-bar-chart.png)

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
![Gradient BarChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient-bar.png)

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
![Line chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/line-chart.png)

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

![Gradient LineChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient-line.png)

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

## Progress circle - Gauge variant

![Progress gauge](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/progress-gauge.png)


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

See [Partial Chart](#partial-chart) for use case for this.

Remember that all components returned by an `extras` function must be one that is renderable by the [`<Svg/>`](https://github.com/react-native-community/react-native-svg#svg) element, i.e all components supported by [react-native-svg](https://github.com/react-native-community/react-native-svg)

![Extras](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/extras.png)

#### Example

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

### gridMin/Max
Charts normally render edge to edge, if this is not the wanted behaviour it can easily be altered with the `gridMin` and `gridMax` props. Just compare the below example with the example for the regular [AreaChart](#areachart)

![Grid Min Max](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/grid-min-max.png)

#### Example
```javascript
import React from 'react'
import { AreaChart, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class GridMinMaxExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                curve={shape.curveNatural}
                gridMax={500}
                gridMin={-500}
                extras={[
                    ({ line }) => (
                        <Path
                            key={'line '}
                            d={line}
                            stroke={'rgb(134, 65, 244)'}
                            fill={'none'}
                        />
                    ),
                ]}
            />
        )
    }

}
```

### StackedAreaChart with YAxis
Since the `<StackedAreaChart>` uses a different data structure and can be affected by both the `order` and `offset` prop it's not obvious how to extra the dataPoints for the YAxis.
The remedy this the AreaStackChart exposes a static API with a function `extractDataPoints` where you must pass in the same `data`,  `keys` ( as well as  `order` and `offset` if other than default is used) as the props to the component itself

![Area stack chart with YAxis](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/area-stack-with-y-axis.png)

```javascript
import React from 'react'
import { StackedAreaChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native'

class AreaStackWithAxisExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)', 'rgb(194, 102, 255, 0.8)', 'rgb(214, 153, 255, 0.8)' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <View style={ { flexDirection: 'row', height: 200 } }>
                <StackedAreaChart
                    style={ { flex: 1 } }
                    contentInset={ { top: 10, bottom: 10 } }
                    data={ data }
                    keys={ keys }
                    colors={ colors }
                    curve={ shape.curveNatural }
                    { ...this.props }
                />
                <YAxis
                    style={ { position: 'absolute', top: 0, bottom: 0 }}
                    data={ StackedAreaChart.extractDataPoints(data, keys) }
                    contentInset={ { top: 10, bottom: 10 } }
                    svg={ {
                        fontSize: 8,
                        fill: 'white',
                        stroke: 'black',
                        strokeWidth: 0.1,
                        alignmentBaseline: 'baseline',
                        baselineShift: '3',
                    } }
                />
            </View>
        )
    }
}

```

### Layered Charts
This library supports layering/composing out of the box with simple styling. As long as the layered charts share the same container and are correctly positioned everything will work as expected.
If your data sets don't share the same max/min data make sure to utilize the `gridMin/gridMax` prop to align the charts.

![Stacked Charts](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/stacked-charts.png)

#### Example
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

### PieChart with labels
The PieChart as well as most of the charts support decorators.
In the case of the PieChart you get `pieCentroid` and `labelCentroid` instead of the `x` and `y` as arguments in the `renderDecorator` callback.
This will allow you to render labels aligned with your pie slices. Experiment with `outerRadius` and `labelRadius` to layout your labels in relation to your chart

![PieChart with labels](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/pie-chart-with-labels.png)

### Example
```javascript
import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

class PieChartWithLabelExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                spacing={ 0 }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
                renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
                    <G key={ index }>
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ item.color }
                        />
                        <Circle
                            cx={ labelCentroid[ 0 ] }
                            cy={ labelCentroid[ 1 ] }
                            r={ 15 }
                            fill={ item.color }
                        />
                    </G>
                ) }

            />
        )
    }

}
```


### Custom grid
The default grid is just a collection of horizontal `Line`s. If you simply want to change the direction or styling look at the `renderGrid` & `gridProps` prop.
Some projects might require more control of the grid ( direction, different distributions etc), therefore all affected components support the `renderGrid` prop.
The `renderGrid` prop takes a function and provides the `x`, `y`, `ticks` and `dataPoints` arguments. Use them as in the example below

![Custom grid](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/custom-grid.png)

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
