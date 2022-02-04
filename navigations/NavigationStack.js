import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Navigation from './Navigation'
import Login from '../screens/Login'

const Stack = createStackNavigator()

export default function NavigationStack() {
    return (
        <Stack.Navigator
            initialRouteName="Navigation"
        >
            <Stack.Screen
                name="Navigation"
                component={Navigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
