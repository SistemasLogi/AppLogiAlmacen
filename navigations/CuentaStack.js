import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Cuenta from '../screens/Cuenta'

const Stack = createStackNavigator()

export default function CuentaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cuenta"
                component={Cuenta}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
