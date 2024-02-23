import React,{useState,createContext,ReactNode, useEffect} from "react"
import { axiosApi } from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Settings from "../../Settings";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type AuthContextData = {

    user: UserProps;
    isAuthenticated: boolean;
    Login:(credentials:LoginProps) => Promise<void>
    loadingAuth:boolean
    loading:boolean

}

type UserProps = {
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
    token:string;

}
type LoginProps = {
   numero_celular:string;
   password:string;
}

type AuthProviderProps = {
    children:ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProviderProps){

    const [user,setUser] = useState<UserProps>({
        uuid_user:'',
        image_user:'',
        nome:'',
        user:'',
        numero_celular:'',
        password:'',
        followers:'',
        following:'',
        nivel:'',
        visualisacoes:'',
        moedas:'',
        token:''
    })
    const [loadingAuth,setLoadingAuth] = useState(false)

    const [loading,setLoading] = useState(false)

    const isAuthenticated = !!user.numero_celular;
     
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function Login({numero_celular,password}:LoginProps){
      setLoadingAuth(true)
       
      try{

        const response  = await axiosApi.post('/Login',{
            numero_celular,
            password
        })
        
        const {  
            uuid_user,   
            image_user,
            nome,
            user,
            followers,
            following,
            nivel,
            token,
            visualisacoes,
            moedas
        } = response.data

        const data = {
            ...response.data
        }

        await  AsyncStorage.setItem('@jan_live', JSON.stringify(data))
        

        
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setUser({
            uuid_user,
            image_user,
            nome,
            user,
            followers,
            numero_celular,
            password,
            following,
            nivel,
            visualisacoes,
            moedas,
            token,
        })

        setLoadingAuth(false);
        
        
    
        console.log(response.data)
        

      }catch(err){
        console.log('erro ao acessas',err)
        setLoadingAuth(false)
      }

        console.log(numero_celular)
        console.log(password)
    }

    return(
        <AuthContext.Provider value={{loading,loadingAuth,user,isAuthenticated,Login}}>
          {children}
        </AuthContext.Provider>
    )
}