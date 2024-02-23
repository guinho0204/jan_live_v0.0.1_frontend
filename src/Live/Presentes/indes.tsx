import React, { useState ,useEffect} from 'react'
import { Text,View } from 'react-native'
import { axiosApi } from '../../services/api'
import { Image } from 'react-native-elements'
import Coin from '../../Pages/imagens/moedas.png'
import { TouchableOpacity } from 'react-native'


type UserProps = {
  Followers :string,
  Following:string,
  Image_user:string,
  Moedas :string,
  Nivel:string,
  Nome:string,
  Numero_celular:string,
  User:string,
  visualisacoes:string,
}

export default function Presente(){
    
  const [presente,setPresenteData] = useState([])
   const [moedas ,setMoedas] = useState()
     

    const[listuser,setListUser]  = useState<UserProps>(); 

    async function darPrsenete(){

      const response  = await axiosApi.get('/MostrarUser',{
        params:{
          user_id:"46f4c26b-43e8-41bb-bc88-4921b8012572"
        }
         
      })

     setListUser(response.data)
     

     console.log(response.data[0].Moedas)
     setMoedas(response.data[0].Moedas)
     

      
    }
   
    

    return(
        <>
          {presente.map(data => {return(<>
           
          </>)})}
          <View style={{width:80,height:80,borderWidth:1,borderColor:'white',alignItems:'center',justifyContent:'center',marginLeft:10}}>
          <Image source={{uri:'https://cdn.s9eepjvdsjw.link/misc/gifts/heart.png'}} style={{width:30,height:30}}/>
            <View style={{alignItems:'center',flexDirection:'row',marginTop:10}}>
              <TouchableOpacity onPress={() => darPrsenete()}><Text>Teste</Text></TouchableOpacity>
                <Image style={{width:20,height:20,marginRight:5}}source={Coin}/>
              <Text>100</Text>
            </View> 
          </View>
          
        </>
    )
}