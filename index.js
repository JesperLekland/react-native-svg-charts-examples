import React from 'react'
import { AppRegistry, Text, View } from 'react-native'

class App extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
          }}
        >
          {
            'Welcome to \n"react-native-svg-charts".\n\n' +
            'To see showcases of all our charts\n'
          }
        </Text>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {
            '• Stop your packager \n' +
            '• run "yarn storybook" \n' +
            '• Go to "localhost:7008" in your browser\n' +
            '• reload your device \n' +
            '• browse our charts'
          }
        </Text>

      </View>
    )
  }
}

AppRegistry.registerComponent('examples', () => App)
