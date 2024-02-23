import { TouchableOpacity } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { View,Text } from 'react-native';
import { Image } from 'react-native-elements';
import Logo_janlive from './../Pages/imagens/logo_janlive.png'
import  Moeda from './../Pages/imagens/moedas.png'
import Logo_visa from './../Pages/imagens/visa.png'
import Logo_hipercard from './../Pages/imagens/hipercard_icon.png'
import Logo_boleto from './../Pages/imagens/boleto_icon.png'
import Logo_mastercard from './../Pages/imagens/mastercard_icon.png'
import Logo_american from './../Pages/imagens/america_express_icon.png'
import Logo_elo from './../Pages/imagens/elo_icon.png'
import Logo_pix from './../Pages/imagens/pix_icon.png'
import { axiosApi } from '../services/api';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackParamsList } from '../Pages/routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface pagementoUrlRequest{
	uuid_user:string;
	moedas:string;
}
const dataMoedas = [{nome:'Moedas',quantidade:100,valor:6.99},{nome:'Moedas',quantidade:120, valor:9.6+"0"},{nome:'Moedas',quantidade:500,valor:40.+",00"}]



function AreaMoedas({uuid_user, moedas}:pagementoUrlRequest){
          
	const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

       const[fomrPag,setFormPag] = useState(true);
       const [paginaMoeda,setPagMoeda] = useState(true)
		return (
			<>
		    <View style={{width:'100%',height:300,alignItems:'center'}}>
				<Text style={{fontSize:19,marginTop:10}}>Loja de moedas</Text>
              <View style={{width:350,height:200,backgroundColor:'gray',borderRadius:20,marginTop:10,alignItems:'center',justifyContent:'center'}}> 
			  <Image source={Moeda} style={{width:90,height:90}}/>
              <Text  style={{fontSize:30,marginTop:10}}>0</Text>
			  </View>
				{dataMoedas.map(item => {return(<>
				     
				                             <TouchableOpacity onPress={()  =>{
												                               var nome = item.nome
											                                   var quantidade = JSON.stringify(item.quantidade);
																			   var valor = JSON.stringify(item.valor)
																		          
																				 console.log(nome,quantidade,valor)
																				 async function teste(){
																					navigation.navigate('Comprar_moedas',{valor:valor,quantidade:quantidade,uuid_user:uuid_user})
																				}
																				teste()
																				 }} style={{width:200,height:40,borderWidth:1,borderColor:'black',flexDirection:'row',alignItems:'center',marginTop:20,borderRadius:20}}>
												<Image source={Moeda} style={{width:20,height:20,marginLeft:35}}/>
												<Text style={{color:'black', marginLeft:10}}>{item.quantidade}</Text>
												<Text style={{color:'black',marginLeft:20}}>R$ {item.valor}</Text>
										    </TouchableOpacity></>)})}
				</View>		
			</>
			
			);
		};
export default AreaMoedas;