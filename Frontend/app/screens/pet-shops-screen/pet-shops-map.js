import React from 'react';
import {View, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {setUserNearbyPetShops} from '../../redux/actions/user-info'
import * as Linking from 'expo-linking'
import {getPreciseDistance} from 'geolib'
import MapView, { Callout, Marker } from "react-native-maps";
import {styles} from './css'
import {getUserPetShops} from '../../services'

export default function PetShopsMap() {
    const {userNearbyPetShops, userLatitude, userLongitude} = useSelector(state => state.userReducer)
    const dispatch= useDispatch()

    React.useEffect(async ()=> {
        let result = await getUserPetShops()
        
        const nearby_pet_shops = result.filter(value => (getPreciseDistance({ latitude: value.latitude, longitude: value.longitude }, { latitude: userLatitude, longitude: userLongitude }))/1000 <= 1 )
        dispatch(setUserNearbyPetShops(nearby_pet_shops))
        
      }, []);

      const nps_items = userNearbyPetShops


    function locatePetShop(nps_item) {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${nps_item.latitude},${nps_item.longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });
       
        Linking.openURL(url);
    }

    return (
        <View>
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: parseFloat(userLatitude),
                    longitude: parseFloat(userLongitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    }}
                    provider="google"
                    showsUserLocation= {true}
                    loadingEnabled= {true}>
                
                    {nps_items.map((nps_item, nps_index) => (                 
                        <View key= {nps_index}>
                            <Marker coordinate={{latitude: parseFloat(nps_item.latitude), longitude: parseFloat(nps_item.longitude)}} 
                            pinColor="red" 
                            onPress= {()=>locatePetShop(nps_item)}>                                                            
                                <Callout style={{width: 100, alignItems:'center'}}>   
                                    <Text>{nps_item.first_name}</Text>   
                                </Callout>
                            </Marker>
                        </View>
                    ))}              
                </MapView>
            </View>
        </View>
    );
}

