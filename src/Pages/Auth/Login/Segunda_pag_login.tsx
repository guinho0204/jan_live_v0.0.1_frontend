import React, { useEffect, useState } from "react"
import { View ,Text, TextInput} from "react-native"
import { TouchableOpacity } from "react-native"
import { useContext } from "react"
import { AuthContext } from "../AuthContext/Authcontext"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Image } from "react-native-elements"
import Icone_fechar from './../../imagens/fechar.png'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useRoute } from "@react-navigation/native"

import { axiosApi } from "../../../services/api"

import { StackParamsList } from "../../routes/app.routes"
import AsyncStorage from "@react-native-async-storage/async-storage"


type UserProp = {
            Uuid_user:string;
            Image_user:string;
            Nome:string;
            User:string;
            Numero_celular:string;
            Password:string;
            Followers:string;
            Following:string;
            Nivel:string;
            Visualisacoes:string;
            Moedas:string;
            token:string;
}
export default function Segunda_pag_login(){
    
    
    const {Login} = useContext(AuthContext)

    const [numero_celular,setNumero_celular] = useState("")
    const [password,setPassword] = useState("")
    const [popUp,setpopUp] = useState(false)
    const [listuser,setListUser] = useState<UserProp[]>([])
     const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
      
     useEffect(()=>{
        async function getUser(){
           const userInfo = await AsyncStorage.getItem('@jan_live')
           let hasUser:UserProp = JSON.parse(userInfo || '{}')

           if(Object.keys(hasUser).length > 0){
             axiosApi.defaults.headers.common['Authorization'] = `Bearer ${listuser[0].token}`
           }
           
        }
        getUser()
     })

    async function Verfificacao(){  
        
       const response = await axiosApi.get('/Login',{params:{
              numero_celular:numero_celular,
              password:password
       }
       }).catch(console.log)
        
       setListUser(response!.data)
       console.log(response!.data)
       var uid = response!.data.Uuid_user
       var nome = response!.data.nome
       
       var user = response!.data.user
       var image_user = response!.data.image_user
       var numero_celulars = response!.data.numero_celular
       var passwords = response!.data.password
       var followers = response!.data.followers
       var following = response!.data.following
       var nivel = response!.data.nivel
       var visualisacoes = response!.data.visualisacoes
       var moedas = response!.data.moedas

       navigation.navigate('Live',{uuid_user:uid,image_user:image_user,nome:nome,user:user,numero_celular:numero_celulars,password:passwords,followers:followers,
        following:following,
        nivel:nivel,
        visualisacoes:visualisacoes,
        moedas:moedas})
       
        await AsyncStorage.setItem('@jan_live',JSON.stringify(response!.data.token))

        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${response!.data.token}`

        if(numero_celular! && password!){
          setpopUp(true)
        }
       
    }
    
    function fecharPopup(){
      setpopUp(false)
    }

    return(
        <>
          
          <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'white',position:'absolute'}}>  
          <Text style={{color:'black',marginLeft:20,marginTop:20,fontSize:20}}>Digite o numero do celular e a senha </Text>
             <View style={{flex:1,backgroundColor:'white'}}>
                  <TextInput onChangeText={setNumero_celular}placeholderTextColor="black"placeholder="Numero do celular" style={{width:300,height:40,borderColor:'black',color:'black',borderWidth:1,marginTop:20,marginLeft:20,borderRadius:5}}/>
                  <TextInput onChangeText={setPassword}secureTextEntry={true} placeholderTextColor="black"placeholder="Password" style={{width:300,height:40,borderColor:'black',color:'black',borderWidth:1,marginTop:20,marginLeft:20,borderRadius:5}}/>
                  <TouchableOpacity onPress={() => Verfificacao()}style={{borderWidth:5,borderColor:'black',width:100,height:40,marginTop:20,marginLeft:230,alignItems:'center',justifyContent:'center',borderRadius:20}}><Text style={{color:'black'}}>Entrar</Text></TouchableOpacity>
                  
              </View>
          </View>
          {popUp&&(
             <View style={{width:200,height:200,backgroundColor:'#d1cfcf',marginLeft:100,marginTop:280,borderRadius:20}}>
              <TouchableOpacity  onPress={() => fecharPopup()}style={{width:20,height:20,marginLeft:160,marginTop:20}}><Image style={{width:20,height:20}}source={Icone_fechar}/></TouchableOpacity>
               <Text style={{marginLeft:32,marginTop:20}}>Não possui cadastro ?</Text>
              <TouchableOpacity style={{width:130,height:45,backgroundColor:'rgb(105, 102, 102)',marginTop:20,marginLeft:37,alignItems:'center',justifyContent:'center',borderRadius:20}}><Text>Fazer cadastro</Text></TouchableOpacity>
            </View>)}
          
        </>
    )
}