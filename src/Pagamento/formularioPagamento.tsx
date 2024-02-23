import React, { useState } from "react"
import { Text,TextInput,View ,Image, TouchableOpacity} from "react-native"
import Image_moeda from './../Pages/imagens/MoedasMonte.png'
import { ScrollView } from "react-native"
import Logo_visa from './../Pages/imagens/visa.png'
import Logo_elo from   './../Pages/imagens/elo_icon.png'
import Logo_hipercard from './../Pages/imagens/hipercard_icon.png'
import Logo_american from './../Pages/imagens/america_express_icon.png'
import Logo_boleto from    './../Pages/imagens/boleto_icon.png'
import Logo_mastercard from   './../Pages/imagens/mastercard_icon.png'
import Logo_pix from './../Pages/imagens/pix_icon.png'
import { useRoute,RouteProp } from "@react-navigation/native"
import { axiosApi } from "../services/api"

type RoutePagProp = {
    Comprar_moedas:{
       valor:string;
       quantidade:string;
       uuid_user:string;
    }
}
type PagRouteProps = RouteProp<RoutePagProp,'Comprar_moedas'>;

export default function PagamentoForm(){

     const route = useRoute<PagRouteProps>()

      const [nome,setNome] = useState('');
      const [card_number,setCard_number] = useState('');
      const [bandeira,setBanadeira] = useState('');
      const [cvv,setCvv] = useState('');
      const [day,setDay] = useState('');
      const [year ,setYear] = useState('')

      async function Pagar(){
         const response = await axiosApi.post('/createpagamento',{
            uuid_user:route.params.uuid_user,
            nome_user:nome,
            moedas:route.params.quantidade,
            valor:route.params.valor,
            brand:bandeira,
            number_card:card_number,
            cvv:cvv,
            expirationMonth:day,
            expirationYear:year,
         })
         console.log(response.data)
      }
      
    return(
        <View style={{flex:1,backgroundColor:'orange'}}>
            <View style={{width:'auto',height:650,backgroundColor:'#fff',marginTop:150,borderTopLeftRadius:40,borderTopRightRadius:40,alignItems:'center'}}>
                <ScrollView>
                    <View style={{width:200,height:40,borderWidth:1,marginTop:30,borderRadius:10,marginLeft:100,flexDirection:'row',justifyContent:'space-between',paddingLeft:10,alignItems:"center"}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={Image_moeda} style={{width:20,height:20}}/>
                            <Text style={{color:'black'}}>{route.params.quantidade}</Text> 
                        </View> 
                        <Text style={{color:'black'}}>Valor {route.params.valor} </Text>
                    </View>
                    <View style={{marginLeft:30}}>
                        <TextInput placeholder="nome completo" placeholderTextColor="black" style={{width:300,height:40,borderWidth:1,color:'black',borderColor:'black',marginLeft:10,backgroundColor:'white',marginTop:20,borderRadius:10}} onChangeText={setNome}/>
                        <TextInput placeholderTextColor="black" placeholder="card number" style={{width:300,height:40,borderWidth:1,color:'black',borderColor:'black',marginLeft:10,backgroundColor:'white',marginTop:20,borderRadius:10}} onChangeText={setCard_number}/>
                        <TextInput  placeholder="bandeira" placeholderTextColor="black" style={{width:300,height:40,borderWidth:1,color:'black',borderColor:'black',marginLeft:10,backgroundColor:'white',marginTop:20,borderRadius:10}} onChangeText={setBanadeira}/>
                        <TextInput placeholder="cvv" placeholderTextColor="black" style={{width:300,height:40,borderWidth:1,color:'black',borderColor:'black',marginLeft:10,backgroundColor:'white',marginTop:20,borderRadius:10}} onChangeText={setCvv}/>
                        <Text style={{color:'black',marginLeft:7,marginTop:20}}>Data vencimento</Text>
                        <View style={{flexDirection:'row',top:2}}>
                            <TextInput placeholder="Day"  placeholderTextColor="black" style={{width:60,height:40,borderWidth:1,borderColor:'black',borderRadius:10,marginTop:5,marginLeft:7}} onChangeText={setDay}/>
                            <Text style={{color:'black',fontSize:35}}>/</Text>
                            <TextInput placeholder="Year" placeholderTextColor="black" style={{width:60,height:40,borderWidth:1,borderColor:'black',borderRadius:10,marginTop:5}} onChangeText={setYear}/>
                        </View>
                        <TouchableOpacity onPress={()=>Pagar()}style={{width:300,height:60,backgroundColor:'gray',marginLeft:20,marginTop:10,borderRadius:30,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:20,color:'white'}}>Pagar</Text></TouchableOpacity>
                        
                    </View>
                    <Text style={{fontSize:15,marginTop:20,marginLeft:25,color:'black'}}>Aceitamos todos esse tipos de bandeira e forma de pagamento</Text>
							<View style={{flexDirection:'row',flexWrap:'wrap', justifyContent:'space-evenly',marginTop:30}}>
									<Image source={Logo_visa} style={{width:50,height:25}}/>
									  <Image source={Logo_boleto} style={{width:50,height:25,marginLeft:10}}/>
									    <Image source={Logo_american} style={{width:50,height:25,marginLeft:10}}/>
									      <Image source={Logo_elo} style={{width:50,height:25,marginLeft:10}}/>
									       <Image source={Logo_mastercard} style={{width:50,height:25,marginLeft:10}}/>
									     <Image source={Logo_hipercard} style={{width:50,height:25,marginLeft:10,marginTop:10}}/> 
									<Image source={Logo_pix} style={{width:50,height:50,marginTop:10}}/> 
							</View>	

                </ScrollView>

            </View>
        </View>
    )
}