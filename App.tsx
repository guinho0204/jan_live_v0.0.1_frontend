import Live from "./src/Live/index_live_toLogin";
import { NavigationContainer } from "@react-navigation/native";
import Approutes from "./src/Pages/routes/app.routes";
import Settings from "./src/Pages/Settings";
import Chat from "./src/Pages/Chat";
import Cadastro from "./src/Pages/Auth/Cadastro";
import AreaMoedas from "./src/Pagamento";
import { View } from "react-native";
import { useState } from "react";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthProvider } from "./src/Pages/Auth/AuthContext/Authcontext";
import Presente from "./src/Live/Presentes/indes";
import Login from "./src/Pages/Auth/Login";
import Segunda_pag_login from "./src/Pages/Auth/Login/Segunda_pag_login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PagamentoForm from "./src/Pagamento/formularioPagamento";



export default function App(){

  return(
    <NavigationContainer>
       <Approutes/>
    </NavigationContainer>
  )
}