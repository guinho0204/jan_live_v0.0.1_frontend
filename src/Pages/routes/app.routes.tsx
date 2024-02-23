import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Auth/Login";
import Live from "../../Live/index_live_toLogin";
import Cadastro from "../Auth/Cadastro";
import Segunda_pag_login from "../Auth/Login/Segunda_pag_login";
import PagamentoForm from "../../Pagamento/formularioPagamento";
import { Float } from "react-native/Libraries/Types/CodegenTypes";


export type StackParamsList = {
    Login:undefined,
    Cadastro:undefined,
    Login_celular:undefined,
    Live:{uuid_user:string;
        image_user:string;
        nome:string;
        user:string;
        numero_celular:string;
        password:string;
        followers:string;
        following:string;
        nivel:string;
        visualisacoes:string;
        moedas:string;}
        Comprar_moedas:{
            valor:string;
            quantidade:string;
            uuid_user:string;
        }
}
const Stack = createNativeStackNavigator<StackParamsList>();
export default function Approutes(){
   return(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Login_celular" component={Segunda_pag_login}/>
        <Stack.Screen name="Live" component={Live} options={{headerShown:false}}/>
        <Stack.Screen name="Comprar_moedas" component={PagamentoForm} options={{headerStyle:{backgroundColor:'orange'}}}/>
     </Stack.Navigator>
   )
}