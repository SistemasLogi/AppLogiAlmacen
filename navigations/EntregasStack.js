import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Entregas from '../screens/Entregas'
import CameraScan from '../components/CameraScan'

const Stack = createStackNavigator()

export default function EntregasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Entregas"
        component={Entregas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanCode"
        component={CameraScan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
