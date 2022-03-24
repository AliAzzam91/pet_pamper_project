import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Avatar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux'

function CreateCommunityScreen({navigation}) {
    const {userToken} = useSelector(state => state.userReducer)
    const [image, setImage] = React.useState(null);
    const [image_base64, setImageBase64] = React.useState(null);
    const [name, onChangeName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const url = 'http://192.168.1.107:3000/community/create_community'

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        })();
      }, []);

      const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            base64: true,
            quality: 0.5,
        });
        
        setImageBase64(result.base64);
        setImage(result.uri)
      };

    
    async function createCommunity() {
 
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                token: userToken,
                image: image_base64, 
                latitude: latitude, 
                longitude: longitude, 
                
            })
        })

        result = await result.json()
        
        setStatus(result.message) //add message in backend response
        
    }


    return (
        <View style={styles.background}>
            <View style={styles.header_area}>
                <View style={styles.header}>              
                    <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                        <Avatar.Icon style={styles.header_icon} color='black' size={60} icon="chevron-left" />
                    </TouchableOpacity>

                    <View style={styles.header_text_area}>
                        <Text style={styles.header_text}>Create Community</Text>
                        <Icon style={styles.header_icon_arrow} size={20} name="chevron-down"/>
                    </View>

                    <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
                        <Avatar.Icon style={styles.header_icon} size={40} icon="bell" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.header_sub_title}></Text>
            </View>

            <View style= {styles.backgroudArea}>

                <View style={styles.edit_form}>

                    <Text>{status}</Text>

                    <TextInput
                        style= {styles.name_input}
                        mode="outlined"
                        label="Community Name"
                        placeholder="Enter Community Name"
                        onChangeText={newText => onChangeName(newText)}
                    /> 

                    <View style={styles.picked_image_area}>
                        <TouchableOpacity onPress={pickImage} style={styles.picked_image_button}>
                            <Text style={styles.picked_image_text}>Choose an image</Text>
                        </TouchableOpacity>
                        {/* {image &&<Text>{image}</Text>} */}
                        {image && <Image source={{ uri: image}} style={styles.picked_image} />}
                    </View>

                    <View  style={styles.button_area_create}>
                        <TouchableOpacity style={styles.button_create} onPress={()=> createCommunity()}>
                            <Text style={styles.text_create}>CREATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.nav_bar}>
                <View style={styles.nav_icon_area}>

                    <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Explore')}>
                        <Icon style={styles.nav_icon_discover} color= "#80f7e3" size={30} name="group"/>
                        <Text style= {{color:'#80f7e3'}}>Discover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1.1}} onPress={() => navigation.navigate('Veterinaries')}>
                        <Icon  style={styles.nav_icon_vet} color= "#80f7e3" size={30} name="medkit"/>
                        <Text style= {{color:'#80f7e3'}}>Veterinary</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1.02}} onPress={() => navigation.navigate('Pet Shops')}>
                        <Icon style={styles.nav_icon_shop} color= "#80f7e3" size={30} name="paw"/>
                        <Text style= {{color:'#80f7e3'}}>Pet Shop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1.}} onPress={()=>navigation.navigate('Profile')}>
                        <Icon style={styles.nav_icon_profile} color= "#80f7e3" size={30} name="user-circle-o"/>
                        <Text style= {{color:'#80f7e3'}}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1
    },

    header_area: {
        borderColor: 'white',
        width: '100%',
        height: 100,
    },
    
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',   
    },

    header_text_area: {
        flex:3,
        paddingLeft: 50,
        paddingTop: 10       
    },

    header_text: {
        fontSize: 17,
        color: '#004b67',
        fontWeight: 'bold',
    },

    header_image_area: {
        marginLeft: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    header_image: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        borderRadius: 200
    },

    header_icon: {
        flex:1,
        backgroundColor: 'white',

    },

    header_icon_arrow: {
        color: '#004b67',
        marginLeft: 50,
        marginTop: 0
    },

    header_sub_title:{
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 19,
        color: 'black'
    },

    backgroudArea: {
        backgroundColor: "white",
        alignItems: 'center',
        
    },

    edit_form: {   
        backgroundColor: "white",
        alignItems: 'center',
        width: '100%'
    },

    name_input: {
        width: '80%',
        height: 45,
        marginTop: 10 ,
        textTransform: 'lowercase',
        
    },
  

    button_area_create: {
        borderWidth: 1,
        borderColor: '#518ef8',
        borderRadius: 7,
        width: '40%',
        height: 50,
        textTransform: 'capitalize',
        marginTop: 30
    },
    
    button_create: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#004b67',
        width: '100%',
        alignItems: 'center',   
    },

    text_create: {
        fontSize: 17,
        color: '#80f7e3',
        fontWeight: 'bold',
    },

    nav_bar:{
        position: 'absolute',
        top: 650,
        width: '100%',
        height: 60,
        backgroundColor: '#004b67'
    },

    nav_icon_area: {
        flexDirection:'row',
        flex:1,
        marginLeft: 35,
        marginTop: 8
    },

    nav_icon_discover: {
        marginLeft: 12
    },

    nav_icon_vet: {
        marginLeft: 17
    },

    nav_icon_shop: {
        marginLeft: 13,
    },

    nav_icon_profile: {
        marginLeft: 5
    },

    picked_image_area: {
        marginTop: 40, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    picked_image_button:{
        color: 'white',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#80f7e3',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },

    picked_image_text:{
        color: 'black',
        fontWeight: 'bold',
    },

    picked_image:{
        borderWidth: 5,
        width:200,
        height: 200
    }

})

export default CreateCommunityScreen;