import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text as SvgText, G } from 'react-native-svg'

export default class PieChartWithOuterLabels extends React.PureComponent {

    render() {
        const data = [50, 10, 40, 95];

        const randomColor = () => (`#${(Math.random() * 0xFFFFFF << 0).toString(16)}000000`).slice(0, 7);

        const pieData = data.filter(value => value > 0).map((value, index) => ({
            value,
            svg: { fill: randomColor() },
            key: `pie-${index}`,
        }));

        const Labels = ({ slices }) => slices.map((slice, index) => {
            const { labelCentroid, data } = slice;
            console.log(slice);
            return (
                <G key={index}>
                    <SvgText
                        fill={data.svg.fill}
                        fontSize="20"
                        fontWeight="bold"
                        x={labelCentroid[0]}
                        y={labelCentroid[1]}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >{data.value}</SvgText>
                </G>
            );
        });
        return (
            <PieChart
                style={{ height: 200 }}
                data={pieData}
                innerRadius={20}
                outerRadius={55}
                labelRadius={80}
                padAngle={0.03}
            >
                <Labels />
            </PieChart>
        )
    }

}

