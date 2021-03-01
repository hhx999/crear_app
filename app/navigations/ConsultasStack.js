import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Consultas from "../screens/Consultas/Consultas";
import AgregarConsulta from "../screens/Consultas/AgregarConsulta";

const Stack = createStackNavigator();

export default function ConsultasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="consultas"
                component={Consultas}
                options={{ title : "Consultas" }}
            />
            <Stack.Screen 
                name="agregar-consulta"
                component={AgregarConsulta}
                options={{title : "Enviar nueva consulta"}}
            />
        </Stack.Navigator>
    )
}