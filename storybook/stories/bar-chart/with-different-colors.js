import React from 'react'
import { BarChart } from 'react-native-svg-charts'

class ColorBarExample extends React.PureComponent {

    render() {

        const values = [ 50, 10, 40, 95, 4, 24, 85, 91 ]
        const colors = [ 'red', 'blue', 'green', 'purple', 'orange', 'teal', 'grey', 'brown' ];

        const data = values.map((value, index) => ({
            value,
            svg: {
                fill: colors[ index ]
            }
        }))

        return (
            <BarChart
                style={{ height: 200 }}
                data={data}
                gridMin={0}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 20, bottom: 20 }}
            />
        )
    }

}

export default ColorBarExample
