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
    } from 'react-native';
    import {PermissionsAndroid, Platform} from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import Fechar_iocn from '../Pages/imagens/fechar.png'
    import Video_icon from '../Pages/imagens/icone_video.png'
    import OpenLive from '../Teste/teste';


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
   
const appId = '09b5182161ab4fd292a61a0fc51b9ff2';
const channelName = 'teste';
const token = '';
const uid = 0;


function Live(){
    
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(true); // Indicates if the local user has joined the channel
    const [isHost, setIsHost] = useState(true); // Client role
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [opLive, setOplive] = useState(false)
    const [limp , setLImp] = useState(true)

    function showMessage(msg: string) {
      setMessage(msg);
    }
    useEffect(() => {
      // Initialize Agora engine when the app starts
      setupVideoSDKEngine();
   });
   
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
}



 function liveOPen(){
    setOplive(false)
 }
 function close_aba(){
    setLImp(false)
 }
 function Open_Aba(){
    setLImp(true)
 }
  
 
 
  const data = [{key:'teste'},{key:'teste dois '},{key:'teste trew'},{key:'teste trew'},{key:'qutro'},{key:'qutro'},{key:'qutro'},{key:'567qutro'},{key:'567qutro'},{key:'567qutro'},{key:'567qutro'}]
    return (
        <>
        
      <View style={styles.main}>
              {isJoined && isHost ? (
              <React.Fragment key={0}>
                <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView}/>
                <Text>Local user uid: {uid}</Text>
               
                  <TouchableOpacity onPress={() =>createlive()}><Text>Criar live</Text></TouchableOpacity>

             {opLive && (
             <View style={{justifyContent:'center', alignItems:'center'}}>

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
                             placeholder='Descricao'/>

            </View>

                <View style={{width:350, height:150,
                             top:70,borderRadius:10,
                             alignItems:'center',justifyContent: 'center'}}>
                                <Text>Não será permitido em live pessoas menores de 18 anos
                                       , uso de drogas, tabagismo, bebidas e conteudo sexual explicito e implicito.
                                       Tambem não sera permitido fazer publicidades de apps de terceiros.
                                       Caso venha violação das normas o broadcaster perderá a conta com todos os itens salvos.
                                </Text>
                            <TouchableOpacity onPress={() => liveOPen()}style={{width:200,height:40, borderRadius:20,
                                                       backgroundColor:'pink',top:20, 
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                     flexDirection:'row'}}><Image source={Video_icon} style={{width:20,height:20}}/><Text style={{color:'black',left:10}}>Create live</Text></TouchableOpacity>
         
                </View>
             </View>  
             ) || limp ?(
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
                             {data.map((item =>(<Text style={{width:250,height:'auto',borderRadius:10,left:5, backgroundColor:'rgba(101, 40, 243, 0.459)', padding:10,marginTop:5}}>{item.key}</Text>)))}
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
                  <Text>{isHost ? 'Join a channel' : ''}</Text>
              )}
              {isJoined && !isHost && remoteUid !== 0 ? (
                  <React.Fragment key={remoteUid}>
                      <RtcSurfaceView
                          canvas={{uid: remoteUid}} style={styles.videoView}/>
                      <Text>Remote user uid: {remoteUid}</Text>
                  </React.Fragment>
              ) : (
                  <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
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