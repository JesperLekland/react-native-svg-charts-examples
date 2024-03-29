import React from 'react'

import { storiesOf } from '@storybook/react-native'

import ShowcaseCard from './decorators/showcase-container'

import AreaChart from './area-chart/with-line'
import AreaChartWithGradient from './area-chart/with-gradient'


import LineChart from './line-chart/with-shadow'
import LineChartWithGradient from './line-chart/with-gradient'

// BarCharts
import MultipleBarChart from './bar-chart/with-multiple-data-sets'
import BarChartWithGradient from './bar-chart/with-gradient'
import BarChartWithDifferentBars from './bar-chart/with-different-bars'
import BarChartHorizontal from './bar-chart/horizontal'
import BarChartHorizontalWithYAxis from './bar-chart/horizontal-with-axis'
import BarChartHorizontalWithLabels from './bar-chart/horizontal-with-labels'
import BarChartVerticalWithLabels from './bar-chart/vertical-with-labels'

import PieChart from './pie-chart'
import PieChartWithLabels from './pie-chart/with-labels'
import PieChartWithDifferentArcs from './pie-chart/with-different-arcs'
import PieChartWithCenteredLabels from './pie-chart/with-centered-labels';
import PieChartWithImageLabels from './pie-chart/with-image-labels';
import PieChartWithDynamicSlices from './pie-chart/with-dynamic-slices';

import ProgressCircle from './progress-circle'
import ProgressGauge from './progress-gauge'

import LayeredCharts from './layered-charts'
import Decorators from './decorator'
import Extras from './extras'

import XAxisScaleBandExample from './x-axis/scale-band'
import XAxisScaleTimeExample from './x-axis/scale-time'
import XAxisScaleLinearExample from './x-axis/scale-linear'

import YAxisExample from './y-axis'
import AxesExample from './both-axes'
import AreaStackWithAxisExample from './area-stack/with-y-axis'

import GridMinMax from './grid-min-max'
import CustomGrid from './custom-grid'
import PartialAreaChart from './partial-chart/area-chart'
import PartialLineChart from './partial-chart/line-chart'
import InteractiveChart from "./interactive-chart";


storiesOf('AreaChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('With Gradient', () => <AreaChartWithGradient/>)
    .add('Stack with axis', () => <AreaStackWithAxisExample/>)

storiesOf('LineChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('With shadow', () => <LineChart/>)
    .add('With gradient', () => <LineChartWithGradient/>)

storiesOf('BarChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('With Multiple data set', () => <MultipleBarChart/>)
    .add('With Gradient', () => <BarChartWithGradient/>)
    .add('With Different Bars', () => <BarChartWithDifferentBars/>)
    .add('Horizontal', () => <BarChartHorizontal/>)
    .add('Horizontal with YAxis', () => <BarChartHorizontalWithYAxis/>)
    .add('Horizontal with Labels', () => <BarChartHorizontalWithLabels/>)
    .add('Vertical with Labels', () => <BarChartVerticalWithLabels/>)

storiesOf('PieChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <PieChart/>)
    .add('With labels', () => <PieChartWithLabels/>)
    .add('With centered labels', () => <PieChartWithCenteredLabels/>)
    .add('With Image labels', () => <PieChartWithImageLabels/>)
    .add('With different arcs', () => <PieChartWithDifferentArcs/>)
    .add('With dynamic slices', () => <PieChartWithDynamicSlices/>)

storiesOf('ProgressCircle', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <ProgressCircle/>)
    .add('Gauge', () => <ProgressGauge/>)

storiesOf('Axes', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('YAxis', () => <YAxisExample/>)
    .add('XAxis - scaleLinear', () => <XAxisScaleLinearExample/>)
    .add('XAxis - scaleTime', () => <XAxisScaleTimeExample/>)
    .add('XAxis - scaleBand', () => <XAxisScaleBandExample/>)
    .add('Both Axes', () => <AxesExample/>)

storiesOf('Others', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Layered charts', () => <LayeredCharts/>)
    .add('Decorators', () => <Decorators/>)
    .add('Extras', () => <Extras/>)
    .add('Grid Min/Max', () => <GridMinMax/>)
    .add('Custom Grid', () => <CustomGrid/>)
    .add('Partial Area Chart', () => <PartialAreaChart/>)
    .add('Partial Line Chart', () => <PartialLineChart/>)
    .add('Interactive Chart', () => <InteractiveChart/>)
