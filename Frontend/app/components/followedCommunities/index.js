import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const items = [
    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 1"
    },

    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 2"
    },

    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 3"
    },

    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 4"
    },

    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 5"
    },

    {
        image: require('../../assets/Pet_Pamper_signIn.png'),
        text: "Community 6"
    },

    
];

function FollowedCommunties(props) {
    return (
        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((item,index) => (
                <View key= {index} >
                    <TouchableOpacity>
                        <Image style= {styles.image} source= {item.image}/>

                        <Text style= {styles.text}>{item.text}</Text>
                        <View style={styles.button_area}>
                            <View style={styles.button}>
                                <Text style={styles.button_text}>PING</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}         
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        opacity: 0.6,
        borderColor: '#004b67',
        borderWidth: 3,
        marginTop: 10,
        marginLeft: 10,
    },

    text: {
        marginLeft: 17,
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#004b67'
    },

    button_area: {
        paddingHorizontal: 20
    },
    
    button: {
        backgroundColor: '#004b67',
        borderRadius: 5,
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        top: -86,
        left: 5,
        paddingVertical: 3
    },

    button_text: {
        color: 'white'
    }

})
export default FollowedCommunties;