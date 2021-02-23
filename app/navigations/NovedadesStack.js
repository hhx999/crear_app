import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Novedades from "../screens/Novedades";

const Stack = createStackNavigator();

export default function NovedadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="novedades"
                component={Novedades}
                options={{ title : "Novedades" }}
             />
        </Stack.Navigator>
    )
}