import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChartHorizontalWithLabels extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, 85 ]

        const CUT_OFF = 50
        const Label = ({ item: value, x, y, index, bandwidth }) => (
            <Text
                key={index}
                x={value > CUT_OFF ? x(value) - 10 : x(value) + 10}
                y={y(index) + (bandwidth / 2)}
                fontSize={14}
                fill={value > CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
                textAnchor={value > CUT_OFF ? 'end' : 'start'}
            >
                {value}
            </Text>
        )

        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={data}
                    horizontal={true}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                    renderDecorator={Label}
                    renderGrid={Grid.Vertical}
                />
            </View>
        )
    }

}

export default BarChartHorizontalWithLabels
