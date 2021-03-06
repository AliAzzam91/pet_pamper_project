import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import {useDispatch} from 'react-redux'
import {userSignIn, usercurrentLocation} from '../../services'
import {styles} from './css'

export default function InputForm({navigation}) {
    const dispatch = useDispatch()
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [status, setStatus] = React.useState("")
 

    useEffect(async () => {
          let location = await usercurrentLocation()
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);  
      }, []);

      useEffect(()=> {
        if (status == "Successful login!") {
            navigation.navigate('Explore')
        }
      }, [status])

    async function signin(email, password, latitude, longitude, dispatch) {
        let result = await userSignIn(email, password, latitude, longitude, dispatch)
        setStatus(result.message)      
    }

    return (
        <View style={styles.signin_form}>
            <Avatar.Icon style={styles.icon} size={50} icon="lock" />

            <Text style= {styles.text_header}>Sign In</Text>

            <Text>{status}</Text>

            <TextInput
                style= {styles.email_input}
                mode="outlined"
                label="Email"
                placeholder="Enter Email"
                onChangeText={newText => onChangeEmail(newText)}
            />

            <TextInput
                style= {styles.password_input}
                label="Password"
                mode="outlined"
                secureTextEntry= {true}
                onChangeText= {newText => onChangePassword(newText)}
                placeholder="Enter Password"
            />

            <View  style={styles.button_area_signin}>
                <TouchableOpacity style={styles.button_signin} onPress={async ()=> {await signin(email, password, latitude, longitude, dispatch)}}>
                    <Text style={styles.text_signin}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
