
import React, { useState,useEffect } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, Image } from "react-native-elements";
import User from '../imagens/Use.png'
import Moedas from  '../imagens/moedas.png'
import Users_Followers from '../imagens/UserFollowers.png'
import Followings_Icom from '../imagens/following.png'
import { SafeAreaView } from "react-native-safe-area-context";
import Edit_user_Icon from  '../imagens/Edit_User.png'
import Voltar_Icon from '../imagens/back.png'
import Montinho_moedas from '../imagens/MoedasMonte.png'
import { useNavigation } from "@react-navigation/native";
import AreaMoedas from "../../Pagamento";
import { StackPromiseListImage } from "../../Pagamento/routescreateuser.app";
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { axiosApi } from "../../services/api";
import InAppBrowser from "react-native-inappbrowser-reborn";



export default function Settings(){

      const[buyMoedas,setBuyMoedas] = useState(true)
      const navigation = useNavigation<NativeStackNavigationProp<StackPromiseListImage>>();
      const [data,setData] = useState([])
      const [init_point,setinit_point] = useState('')
      const [mostuset,setMostuser] = useState([])

    function AbrirComp_Moedas(){
        setBuyMoedas(false);
    }
    function FecharComp_Moedas(){
        setBuyMoedas(true)
    }
    async function setSeguidores(){
        const response = await axiosApi.post('/setseguidores') 
           console.log(response.data)
    }
    async function MostrarUser(){
      const response = await axiosApi.get('/MostrarUser')
      setMostuser(response.data)
      console.log(mostuset)
    }
    useEffect(() =>{
            MostrarUser()
    },[])
   
    return(
         <>
         {buyMoedas ? (
        <>
         <View style={{width:50,height:50,backgroundColor:'#C0C0C0',marginLeft:'80%',borderRadius:10}}><Image source={Edit_user_Icon} style={{width:50,height:50}}/></View>
         <View style={{width:'100%', height:'100%',alignItems:'center',justifyContent:'center',marginTop:-50}}>
           <Image source={User} style={{width:150, height:150, borderRadius:200/2}}/>
            <View>
                <Text style={{color:'black'}}>{}</Text>
            </View>
            <View style={{width:'90%', height:100, backgroundColor:'gray',borderRadius:20, top:30,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{left:20}}>
               <Image source={Moedas} style={{width:30,height:30}}/>
               <Text>200</Text>
             </View>   
             <View>
               <Image source={Users_Followers} style={{width:30,height:30}}/>
               <Text>200</Text>
             </View>

             <View style={{right:20}}>
                  
              </View>
            </View>
            <View  style={{width:'90%',height:250,borderWidth:1,borderColor:'black',top:50, borderRadius:10}}>
                <ScrollView>
                    <TouchableOpacity onPress={()=>AbrirComp_Moedas()} style={{width:'80%',height:50,backgroundColor:'#C0C0C0',left:35,borderRadius:10, marginTop:10,alignItems:'center',justifyContent:'center'}}><Text>Comprar Moedas</Text></TouchableOpacity>
                     <TouchableOpacity style={{width:'80%',height:50,backgroundColor:'#C0C0C0',left:35,borderRadius:10, marginTop:10,alignItems:'center',justifyContent:'center'}}><Text>Trocar as Moedas</Text></TouchableOpacity>
                </ScrollView>
            </View>
         </View>
         </>
         ):(<View>
                <TouchableOpacity onPress={()=>FecharComp_Moedas()}>
                   <Text>Fechar</Text>
                   <AreaMoedas/>
                </TouchableOpacity>       
            </View>)}
        
        </>
    )
}