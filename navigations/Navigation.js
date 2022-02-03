import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import EntregasStack from './EntregasStack'
import CuentaStack from './CuentaStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    const screenOptions = (route, color) => {
        switch (route.name) {
            case "entrega":
                iconName = "human-dolly"
                break;
            case "cuenta":
                iconName = "account-details"
                break;
        }
        return (
            <Icon
                type="material-community"
                name={iconName}
                size={25}
                color={color}
            />
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="entrega"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
                tabBarInactiveTintColor: '#c996c3',
                tabBarActiveTintColor: '#7c046c'
            })}
        >
            <Tab.Screen
                name='entrega'
                component={EntregasStack}
                options={{ title: "Entrega" }}
            />
            <Tab.Screen
                name="cuenta"
                component={CuentaStack}
                options={{ title: "Cuenta" }}
            />
        </Tab.Navigator>
    )
}
