import React from "react";
import { FlatList,View } from "react-native";
import { Image, Text } from "react-native-elements";



export default function Chat(){

    const List_chat_User = [{Nome:'Marcos_2090',Image_user:'canvaai.png'}]

    return(
         <View>
              <FlatList style={{width:'100%',height:100}} data={List_chat_User} renderItem={({item}) => <><View style={{width:'90%',borderRadius:10,marginTop:10,marginLeft:10,height:70,borderWidth:1,borderColor:'gray',flexDirection:"row",alignItems:"center"}}><Image style={{width:60,height:60,marginLeft:10,borderRadius:200/2}}source={{uri:'https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/'+item.Image_user}}/><Text style={{color:'black',marginLeft:20}}>{item.Nome}</Text></View></>}/> 
         </View>
    )
}