import { Text,View,TextInput,TouchableOpacity} from "react-native"
import { Image} from "react-native"
import Logo from './../../imagens/logo_janlive.png'
import Icone_celular from './../../imagens/celular.png'
import {useNavigation}  from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export default function Login(){
   const navigation  = useNavigation()
    return(
         <View style={{flex:1,backgroundColor:'rgb(252, 252, 252)',alignItems:'center',justifyContent:"center"}}>
             <Image style={{width:50,height:50,borderRadius:10}}source={Logo}/>
              <Text style={{color:'black',fontSize:20,marginTop:20}}>Faça seu login utilizando essas opções.</Text>
             <TouchableOpacity  onPress={() => navigation.navigate('Login_celular')}style={{width:290,height:40,
                                        borderWidth:1,borderColor:'black',marginTop:20,
                                        borderRadius:20,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                            
                  <Image source={Icone_celular} style={{width:20,height:20}}/>
                 <Text style={{color:'black'}}>Login com numero</Text>
             </TouchableOpacity>
            
         </View>
    )
}