import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Consultas from "../screens/Consultas";

const Stack = createStackNavigator();

export default function ConsultasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="consultas"
                component={Consultas}
                options={{ title : "Consultas" }}
            />
        </Stack.Navigator>
    )
}