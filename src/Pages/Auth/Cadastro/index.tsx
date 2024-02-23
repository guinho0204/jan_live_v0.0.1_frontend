import { useState } from "react"
import { TextInput, Text,View } from "react-native"
import { TouchableOpacity } from "react-native"
import Icon_Fechar from  '../../imagens/fechar.png'
import { Image } from "react-native-elements";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Adiconar_icon from '../../imagens/plus.png'
import user_icon from '../../imagens/Use.png'
import { axiosApi } from "../../../services/api";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { StackPromiseListImage} from "../../../Pagamento/routescreateuser.app";


type CepfindProp = {
     bairro:string;
     cep:string;
     complemento:string;
     localidade:string;
     logradouro:string;
     uf:string;
     numero:number;
}

type UserProp = {
  Uuid_User: string;
  id:number;
	Nome: string;
	User: string,
	Numero_celular: string,
	Followers: string,
	Following:string,
	Nivel:string,
	Visualisacoes: string,
	Moedas: string,
}
export default function Cadastro(){

   
    const [password,setPassword] = useState('');
    const [nome,setNome] = useState('')
    const [numero_celular,setNumero_celular] = useState('')
    const [cep,setCep] = useState('')
    const [ceplist,setCeplist] = useState<CepfindProp>()
    const [listUser,setListUser] = useState<UserProp>() 
   

    const navigation = useNavigation<NativeStackNavigationProp<StackPromiseListImage>>();


     
     async function Cadastrar_user(){
      var followers = "0";
      var following = "0";
      var nivel = "0";
      var visualisacoes = "0";
      var moedas = "0"
     

      try{
        const data = new FormData() 

         data.append('file',{uri:'https://cdn.icon-icons.com/icons2/632/PNG/512/user_icon-icons.com_57997.png',name:'imageuser.png',type:'image/png'})
         data.append('nome',nome)
         data.append('user',nome)
         data.append('numero_celular',numero_celular)
         data.append('password',password)
         data.append('followers',followers)
         data.append('following',following)
         data.append('nivel',nivel)
         data.append('visualisacoes',visualisacoes)
         data.append('moedas',moedas);

      
        const response = await axiosApi.post('/upload',data,{
        headers:{'Content-Type':'multipart/form-data'}
      })


       setListUser(response.data)

       const uid_user = listUser?.Uuid_User!

       console.log(uid_user)
        
       navigation.navigate('Adicionar_imagem',{uid_user:uid_user!})
        

      }catch(err){
        console.log(err)
      } 
     }
    
  return(
      <>
      <View style={{flex:1,alignItems:'center',backgroundColor:'#ffff'}}>
            <Text style={{fontSize:20,color:'black',marginTop:40}}>Create user </Text>
                <Text style={{fontSize:15,color:'black'}}>Criar Usuario com email e senha</Text>
                <TextInput placeholderTextColor="black" style={{color:'black',width:'80%', height:40,paddingLeft:20,borderWidth:1,borderColor:'red',borderRadius:20,marginTop:10}} onChangeText={setNome} placeholder="Nome"/>
                  <TextInput placeholderTextColor="black" style={{color:'black',width:'80%', height:40,paddingLeft:20,borderWidth:1,borderColor:'red',borderRadius:20,marginTop:10}} onChangeText={setNumero_celular} placeholder="Numero celular"/>
                    <TextInput placeholderTextColor="black" style={{color:'black',width:'80%', height:40,paddingLeft:20,borderWidth:1,borderColor:'red',borderRadius:20,marginTop:10}} onChangeText={setPassword} placeholder="Password"/>
                    <TextInput placeholderTextColor="black" style={{color:'black',width:'80%', height:40,paddingLeft:20,borderWidth:1,borderColor:'red',borderRadius:20,marginTop:10}} placeholder="Confirma password"/>
                    <TouchableOpacity style={{width:'40%',height:30,backgroundColor:'purple',alignItems:"center",justifyContent:'center',borderRadius:20,marginTop:10}}onPress={()=>Cadastrar_user()}><Text>Seguinte</Text></TouchableOpacity>
      </View>  
       </>
    
   
  )
}