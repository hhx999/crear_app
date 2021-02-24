import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cuenta from "../screens/Cuenta/Cuenta";
import Ingreso from "../screens/Cuenta/Ingreso";
import Registro from "../screens/Cuenta/Registro";

const Stack = createStackNavigator();

export default function CuentaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="cuenta"
                component={Cuenta}
                options={{ title : "Cuenta" }}
             />
             <Stack.Screen
                name="ingreso"
                component={Ingreso}
                options={{ title : "Iniciar sesión" }}
             />
             <Stack.Screen
                name="registro"
                component={Registro}
                options={{ title : "Creá tu cuenta" }}
             />
        </Stack.Navigator>
    )
}