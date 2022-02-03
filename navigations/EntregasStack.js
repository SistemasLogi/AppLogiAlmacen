import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Entregas from '../screens/Entregas'

const Stack = createStackNavigator()

export default function EntregasStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
                name="Entregas"
                component={Entregas}
                options={{headerShown: false}}
           />
    </Stack.Navigator>
  )
}
