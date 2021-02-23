import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import ConsultasStack from "../navigations/ConsultasStack";
import NovedadesStack from "../navigations/NovedadesStack";
import BuscarStack from "../navigations/BuscarStack";
import CuentaStack from "../navigations/CuentaStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="cuenta"
                tabBarOptions={{
                    inactiveTintColor : "#646464",
                    activeTintColor : "#00a680"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions( route, color ),
                })}
            >
                <Tab.Screen 
                    name="consultas" 
                    component={ConsultasStack} 
                    options={{ title : "Consultas" }}
                    />
                <Tab.Screen 
                    name="novedades" 
                    component={NovedadesStack} 
                    options={{ title : "Novedades" }}
                    />
                <Tab.Screen 
                    name="buscar" 
                    component={BuscarStack} 
                    options={{ title : "Buscar" }}
                    />
                <Tab.Screen 
                    name="cuenta" 
                    component={CuentaStack} 
                    options={{ title : "Cuenta" }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions( route, color) {
    let iconName;

    switch (route.name) {
        case "consultas":
            iconName="comment-question"
            break;
        case "novedades":
            iconName="newspaper-variant-multiple-outline"
            break;
        case "buscar":
            iconName="magnify"
            break;
        case "cuenta":
            iconName="account"
            break;
        
        default:
            break;
    }
    return (
        <Icon type="material-community" name={ iconName } size={22} color={color}/>
    )
}