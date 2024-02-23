import React, {useRef, useState, useEffect} from 'react';
    import {
        SafeAreaView,
        ScrollView,
        StyleSheet,
        Text,
        View,
        Switch,
        Button,
        Touchable,
        TouchableOpacity,
        Image,
        TextInput,
        FlatList,
        Alert,
    } from 'react-native';
    import {PermissionsAndroid, Platform} from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import Fechar_iocn from '../Pages/imagens/fechar.png'
    import Video_icon from '../Pages/imagens/icone_video.png'
    import OpenLive from '../../Teste/teste';
    import Chat from '../Pages/imagens/chat.png'
    import Users_Followers from '../Pages/imagens/UserFollowers.png'
    import AreaMoedas from '../Pagamento';
    import {
        ClientRoleType,
        createAgoraRtcEngine,
        IRtcEngine,
        RtcSurfaceView,
        ChannelProfileType,
    } from 'react-native-agora';
    import Presente from '../Pages/imagens/christmas_gift_box_present_icon_171303.png'
    import Enviar from '../Pages/imagens/send_icon_send.png'
    import Moedas from '../Pages/imagens/moedas.png'
    import Olhos from '../Pages/imagens/olhos.png'

import App from '../../App';
import Logo_janlive from '../Pages/imagens/logo_janlive.png'
import Search from '../Pages/imagens/search.png'
import Notification from  '../Pages/imagens/notification.png'
import Home from '../Pages/imagens/Home.png'
import User from '../Pages/imagens/Use.png'
import Settings from '../Pages/Settings';
import { axiosApi } from '../services/api';
import Edit_user_Icon from  '../Pages/imagens/Edit_User.png'

import { useRoute,RouteProp } from '@react-navigation/native';


const appId = '09b5182161ab4fd292a61a0fc51b9ff2';
const channelName = 'teste';
const token = '';
const uid = 0;

type userProps = {
            Uuid_user:string;
            Image_user:string;
            Nome:string;
            User:string,
            Numero_celular:string;
            Followers:string;
            Following:string;
            Nivel:string;
            Visualisacoes:string;
            Data_create:string;
            Moedas:string;
}
type UserDatailProp ={
    Live:{
        uuid_user:string;
        image_user:string;
        nome:string;
        user:string;
        numero_celular:string;
        password:string;
        followers:string;
        following:string;
        nivel:string;
        visualisacoes:string;
        moedas:string;
    }
}
type userparamsprop = RouteProp<UserDatailProp,'Live'>


function Live(){

    const route = useRoute<userparamsprop>()

    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [isHost, setIsHost] = useState(false); // Client role
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [opLive, setOplive] = useState(false)
    const [limp , setLImp] = useState(true)
    const [menu,setMenu] = useState(true)
    const [infolive,setInfolive] = useState(false)
    const [opSettings,setOpSettings] = useState(false)
    const [opChat, setOpChat] =  useState(false)
    const [opLives, setOpLive] = useState(true)
    const [listLive ,setListLive] = useState([])
    const[data,setData] = useState([])
    const [descricao, setDescricao] = useState('')
    const [presentedata,setPresenteData] = useState([])
    const [mostuser,setMostuser] = useState<userProps[]>([])
    const[buyMoedas,setBuyMoedas] = useState(true)

    const dataTest = [{itemum:'testeChatum'},{itemum:'testedois'}]

    function showMessage(msg: string) {
      setMessage(msg);
    }
    useEffect(() => {
      // Initialize Agora engine when the app starts
      setupVideoSDKEngine();
   });
   const Tab = createBottomTabNavigator();
   const setupVideoSDKEngine = async () => {
      try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') { await getPermission()};
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
          onJoinChannelSuccess: () => {
              setIsJoined(true);
          },
          onUserJoined: (_connection, Uid) => {
              showMessage('Remote user joined with uid ' + Uid);
              setRemoteUid(Uid);
          },
          onUserOffline: (_connection, Uid) => {
              showMessage('Remote user left the channel. uid: ' + Uid);
              setRemoteUid(0);
          },
      });
      agoraEngine.initialize({
          appId: appId,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
      } catch (e) {
          console.log(e);
      }
   };
   async function join(){
    if (isJoined) {
        return;
    }
    try {
        agoraEngineRef.current?.setChannelProfile(
            ChannelProfileType.ChannelProfileLiveBroadcasting,
        );
        if (isHost) {
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster});
        } else {
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleAudience});
        }
    } catch (e) {
        console.log(e);
    }
};
const leave = () => {
    try {
        agoraEngineRef.current?.leaveChannel();
        setRemoteUid(0);
        setIsJoined(false);
        showMessage('You left the channel');
        setMenu(true)
    } catch (e) {
        console.log(e);
    }
};

function abrirlive (){

    setIsHost(false);
    if (isJoined) {
    leave();
    }
    join(); 
   
 } 
 
 function createlive(){

    
    agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
    );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster});

     setMenu(false) 
     setIsHost(true)
     setInfolive(true)
     setOplive(false)
     setIsJoined(false)
}

 function liveOpen(){
    setInfolive(false)
 }
 async function setPresente(){

     const response  = await axiosApi.get('/MostrarPresentes')
     setPresenteData(response.data)
     console.log(response.data)

 }

  
 useEffect(() =>{
    async function MostrarUser(){

        const response = await axiosApi.get('/MostrarUser',{
          params:{
             uuid_user: route.params.uuid_user
          }
           
        })
     
        setMostuser(response.data)
        console.log(response.data)
      } 
 },[])

 function close_aba(){
    setLImp(false)
 }
 function Open_Aba(){
    setLImp(true)
 }
  async function LiveStart(){
    setInfolive(false)
    setDescricao(descricao)
    console.log(uid+" "+channelName+" "+ descricao)
    
    await axiosApi.post('/createlive', {
        uidlive:uid,
        descricao:descricao,
    })

 }

 function OpenSettings(){
    setOpSettings(true)
    setOpLive(false)
    setOpChat(false)
 }
 function OpenListLive(){
    setOpLive(true)
    setOpChat(false)
    setOpSettings(false)
 }
function OpenChat(){
    setOpChat(true)
    setOpSettings(false)
    setOpLive(false)
}
function AbrirComp_Moedas(){
    setBuyMoedas(false);
}
function FecharComp_Moedas(){
    setBuyMoedas(true)
}
 async function ListLive(){
    const response = await axiosApi.get('/mostrartodos')
     setData(response.data)
    
}
useEffect(()=>{
    ListLive()
},[])


 

    return (
     <>
        
      <View style={styles.main}>
              {isJoined && isHost ? (
              <React.Fragment key={0}>
                <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView}/>
                <Text>Local user uid: {uid}</Text>

             {infolive ? (<View style={{justifyContent:'center', alignItems:'center'}}>

                    <Text style={{fontSize:20, top:30}}>Ao clicar em Create live você estará iniciando uma trasmição ao vivo</Text>
                    <View style={{width:300,
                                height:150,
                                borderColor:'white',
                                borderWidth:1,top:40, 
                                borderRadius:10,
                                alignItems:'center',
                                justifyContent: 'center'}}>

                            <Text>O que esta pensando ?</Text>        
                            <TextInput style={{
                                                borderColor:'white', 
                                                width:180,
                                                top:10, 
                                                height:40,
                                                borderWidth:1,
                                                borderRadius:5 
                                            }}
                                placeholder='Descricao' onChangeText={setDescricao}/>

                    </View>

                    <View style={{width:350, height:150,
                                top:70,borderRadius:10,
                                alignItems:'center',justifyContent: 'center'}}>
                                    <Text>Não será permitido em live pessoas menores de 18 anos
                                        , uso de drogas, tabagismo, bebidas e conteudo sexual explicito e implicito.
                                        Tambem não sera permitido fazer publicidades de apps de terceiros.
                                        Caso venha violação das normas o broadcaster perderá a conta com todos os itens salvos.
                                    </Text>
                                <TouchableOpacity onPress={()=>LiveStart()}><Text>Abrir Live</Text></TouchableOpacity>   
                            
                    </View>
                    </View> 
             ):(
                   <SafeAreaView style={{flex:1,width:'100%'}}>
                   <TouchableOpacity onPress={() =>leave()}>
                          <Image source={Fechar_iocn} style={{
                                                              width:20,
                                                              height:20,
                                                              left:360,
                                                              top:5}}/></TouchableOpacity>
                   <View style={{width:150, top:-20,height:50,flexDirection:'row',backgroundColor:'rgba(243, 40, 108, 0.432)',borderRadius:200/2,}}>
                      <Image source={{}} style={{backgroundColor:'gray', borderRadius:200/2,width:50, height:48, left:1}}/>
                       <Text style={{left:10}}>{channelName}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                          <View style={{width:'30%',height:30, backgroundColor:'rgba(255, 62, 62, 0.432)',borderRadius:20,paddingLeft:10,paddingTop:5,alignContent:'center',flexDirection:'row'}}><Image source={Moedas} style={{width:20, height:20}}/><Text>0</Text></View>
                          <View style={{width:'20%',height:30, backgroundColor:'rgba(255, 62, 62, 0.432)',borderRadius:20,paddingLeft:10,paddingTop:5,alignContent:'center',flexDirection:'row',marginLeft:10}}><Image source={Olhos} style={{width:20, height:20}}/><Text>0</Text></View>
                   </View>
                    <TouchableOpacity style={{width:'auto',height:300}} onPress={() => close_aba()}></TouchableOpacity>
                      <View style={{width:300, height:300}}>
                        <ScrollView>
                        <Text style={{width:250,height:'auto',borderRadius:10,left:5, backgroundColor:'rgba(101, 40, 243, 0.459)', padding:10,marginTop:5}}>AVISO: Não será permitido em live pessoas menores de 18 anos
                                     , uso de drogas, tabagismo, bebidas e conteudo sexual explicito e implicito.
                                     Tambem não sera permitido fazer publicidades de apps de terceiros.
                                     Caso venha violação das normas o broadcaster perderá a conta com todos os itens salvos.</Text>
                           {data.map((item =>(<Text style={{width:250,height:'auto',borderRadius:10,left:5, backgroundColor:'rgba(101, 40, 243, 0.459)', padding:10,marginTop:5}}></Text>)))}
                        </ScrollView>
                      </View>
                      <View style={{flexDirection:'row', width:375, height:50,top:7 }}>
                          <TextInput style={{backgroundColor:'white', width:200, height:40, paddingLeft:10,borderTopLeftRadius:20,borderBottomLeftRadius:20, color:'black'}} placeholder='Digite'/>
                              <TouchableOpacity style={{width:70,height:40,alignItems:'center',justifyContent:'center', backgroundColor:'white',borderTopRightRadius:20,borderBottomRightRadius:20}}><Image source={Enviar} style={{width:20, height:20}}/></TouchableOpacity>
                              <TouchableOpacity style={{width:50,height:50,borderRadius:200/2, alignItems:'center',left:50,backgroundColor:'pink'}}><Image source={Presente} style={{width:40,height:40}}/></TouchableOpacity>
                      </View>
              </SafeAreaView>             
          
             ) && limp ?(
                <SafeAreaView style={{flex:1,width:'100%'}}>
                     <TouchableOpacity onPress={() =>leave()}>
                            <Image source={Fechar_iocn} style={{
                                                                width:20,
                                                                height:20,
                                                                left:360,
                                                                top:5}}/></TouchableOpacity>
                     <View style={{width:150, top:-20,height:50,flexDirection:'row',backgroundColor:'rgba(243, 40, 108, 0.432)',borderRadius:200/2,}}>
                        <Image source={{}} style={{backgroundColor:'gray', borderRadius:200/2,width:50, height:48, left:1}}/>
                         <Text style={{left:10}}>{channelName}</Text>
                     </View>
                     <View style={{flexDirection:'row'}}>
                            <View style={{width:'30%',height:30, backgroundColor:'rgba(255, 62, 62, 0.432)',borderRadius:20,paddingLeft:10,paddingTop:5,alignContent:'center',flexDirection:'row'}}><Image source={Moedas} style={{width:20, height:20}}/><Text>0</Text></View>
                            <View style={{width:'20%',height:30, backgroundColor:'rgba(255, 62, 62, 0.432)',borderRadius:20,paddingLeft:10,paddingTop:5,alignContent:'center',flexDirection:'row',marginLeft:10}}><Image source={Olhos} style={{width:20, height:20}}/><Text>0</Text></View>
                     </View>
                      <TouchableOpacity style={{width:'auto',height:300}} onPress={() => close_aba()}></TouchableOpacity>
                        <View style={{width:300, height:300}}>
                          <ScrollView>
                          <Text style={{width:250,height:'auto',borderRadius:10,left:5, backgroundColor:'rgba(101, 40, 243, 0.459)', padding:10,marginTop:5}}>AVISO: Não será permitido em live pessoas menores de 18 anos
                                       , uso de drogas, tabagismo, bebidas e conteudo sexual explicito e implicito.
                                       Tambem não sera permitido fazer publicidades de apps de terceiros.
                                       Caso venha violação das normas o broadcaster perderá a conta com todos os itens salvos.</Text>
                             {data.map((item =>(<Text style={{width:250,height:'auto',borderRadius:10,left:5, backgroundColor:'rgba(101, 40, 243, 0.459)', padding:10,marginTop:5}}></Text>)))}
                          </ScrollView>
                        </View>
                        <View style={{flexDirection:'row', width:375, height:50,top:7 }}>
                            <TextInput style={{backgroundColor:'white', width:200, height:40, paddingLeft:10,borderTopLeftRadius:20,borderBottomLeftRadius:20, color:'black'}} placeholder='Digite'/>
                                <TouchableOpacity style={{width:70,height:40,alignItems:'center',justifyContent:'center', backgroundColor:'white',borderTopRightRadius:20,borderBottomRightRadius:20}}><Image source={Enviar} style={{width:20, height:20}}/></TouchableOpacity>
                                <TouchableOpacity style={{width:50,height:50,borderRadius:200/2, alignItems:'center',left:50,backgroundColor:'pink'}}><Image source={Presente} style={{width:40,height:40}}/></TouchableOpacity>
                        </View>
                </SafeAreaView>             
                ):(<><TouchableOpacity style={{width:'100%',height:'100%'}} onPress={() => Open_Aba()}></TouchableOpacity></>)}   
              </React.Fragment>
              ) : (
                <>
                
                   
                </>
               
              )}
              {isJoined && !isHost && remoteUid !== 0 ? (
                  <React.Fragment key={remoteUid}>
                      <RtcSurfaceView
                          canvas={{uid: remoteUid}} style={styles.videoView}/>
                      <Text>Remote user uid: {remoteUid}</Text>
               
                  </React.Fragment>
              ) : (
                
              <>
              
              </>
              )}
               
                {menu &&(
                  <> 
                   <View style={{width:'100%',height:80,backgroundColor:'#fff',justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
                           <TouchableOpacity><Image source={Notification} style={{width:20,height:20,left:10}}/></TouchableOpacity>
                          <Image source={Logo_janlive} style={{width:60,height:60, borderRadius:10}}/> 
                          <TouchableOpacity><Image source={Search} style={{width:20,height:20,right:20}}/></TouchableOpacity> 

                    </View>
                  <View style={{flex:1,width:'99%'}}>
                        <View style={{height:'90%',borderWidth:1,borderColor:'black'}}>
                            {opSettings && ( 
        <>                        
        {buyMoedas ? (
        <>
         <View style={{width:50,height:50,backgroundColor:'#C0C0C0',marginLeft:'80%',borderRadius:10}}><Image source={Edit_user_Icon} style={{width:50,height:50}}/></View>
         <View style={{width:'100%', height:'100%',alignItems:'center',justifyContent:'center',marginTop:-50}}>
            
           <Image source={User} style={{width:150, height:150, borderRadius:200/2}}/>
           
           <Text style={{color:'black'}}>{route.params.nome}</Text>
            <View style={{width:'90%', height:100, backgroundColor:'gray',borderRadius:20, top:30,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{left:20}}>
               <Image source={Moedas} style={{width:30,height:30}}/>
               <Text style={{marginLeft:15,marginTop:10}}>{route.params.moedas}</Text>
             </View>   
             <View>
               <Image source={Users_Followers} style={{width:30,height:30}}/>
               <Text>{route.params.followers}</Text>
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
                   <AreaMoedas uuid_user={route.params.uuid_user} moedas={route.params.moedas}/>
                </TouchableOpacity>       
            </View>)}
        
        </>)}
                            {opChat && ( <View>
                                            <FlatList data={dataTest} renderItem={({item}) => <Text>{item.itemum}</Text>}/>
                                         </View>)}
                            {opLives &&(
                            
                            <ScrollView style={{width:'100%',height:'100%', top:10}}>
                                <View style={{width:'100%',height:'100%',flexDirection:'row',flexWrap:'wrap'}}>
                                   <Text style={{color:'black'}}>teste: {route.params.uuid_user}</Text>
                                            {data.map((item)=>
                                                       <View style={{width:180,height:180,borderWidth:1,borderColor:'black',marginLeft:10,borderRadius:5}}>
                                                         <Text style={{marginTop:140,marginLeft:10}}>{item.Descricao}</Text>
                                                       </View>
                                                   )}
                             </View>  
                            </ScrollView>)}

                        </View>
                        <TouchableOpacity style={{width:70,height:70,backgroundColor:'gray',borderRadius:200/2,top:-100,left:140,alignItems:'center',justifyContent:'center'}} onPress={()=> createlive()}><Image source={Video_icon} style={{width:20,height:20}}/></TouchableOpacity>
                        <View style={{backgroundColor:'white', width:'100%',height:80,flexDirection:'row',justifyContent:'space-around',top:-78}}>
                            <TouchableOpacity onPress={()=>OpenListLive()} style={{width:70,height:80,left:-30, alignItems:'center',justifyContent:'center'}}><Image source={Home} style={{width:30,height:30}}/></TouchableOpacity>
                            <TouchableOpacity onPress={()=>OpenChat()}style={{width:70,height:80, left:-20,alignItems:'center',justifyContent:'center'}}><Image source={Chat} style={{width:30,height:30}}/></TouchableOpacity>
                            <TouchableOpacity onPress={()=>OpenSettings()}style={{width:70,height:80,alignItems:'center',justifyContent:'center'}}><Image source={User} style={{width:30,height:30}}/></TouchableOpacity>    
                        </View>
                   </View>
                  </>  
                )}
              <Text style={styles.info}>{message}</Text>   
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: {flex: 1,height:'auto', alignItems: 'center'},
    scroll: {flex: 1,backgroundColor: '#ddeeff', width: '100%',height:800},
    scrollContainer: {alignItems: 'center', height:800},
    videoView: {flex:1,width:'100%', height: 800,position:'absolute'},
    btnContainer: {flexDirection: 'row', justifyContent: 'center', },
    head: {fontSize: 20},
    info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff', display:'none'},
    popUp:{width:200,height:200,backgroundColor:'gray', marginTop:200}
});

const getPermission = async () => {
  if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
  }
};


export default Live;