import { StyleSheet } from "react-native"
import {color} from '../../constants'

export const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1
    },

    header_area: {
        borderColor: 'white',
        width: '100%',
        height: 100,
        marginBottom: 10
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
        paddingLeft: 90,
        paddingTop: 10       
    },

    header_text: {
        fontSize: 17,
        color: color.primary,
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

    header_image_nav: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },

    header_icon: {
        flex:1,
        backgroundColor: 'white',
        color: '#eee',
    },

    header_icon_arrow: {
        color: color.primary,
        marginLeft: 24,
        marginTop: 0
    },

    header_sub_title:{
        fontWeight: 'bold',
        fontSize: 19,
        marginTop: 10,
        marginLeft: 15,
        color: 'black',
    },

    fc_image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        opacity: 0.6,
        borderColor: color.primary,
        borderWidth: 3,
        marginTop: 10,
        marginLeft: 10,
    },

    fc_text: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: color.primary
    },

    fc_button_area: {
        paddingHorizontal: 20
    },
    
    fc_button: {
        backgroundColor: color.primary,
        borderRadius: 5,
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        top: -86,
        left: 5,
        paddingVertical: 3,
        paddingHorizontal: 15
    },

    fc_button_text: {
        color: 'white'
    },

    sub_title:{
        fontWeight: 'bold',
        fontSize: 19,
        marginLeft: 15,
        color: 'black',
        marginBottom: 10
    },

    nc_image: {
        flexBasis: '10%',
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: color.primary,
        borderWidth: 2,
        marginTop: 10,
        marginLeft: 10,
    },

    nc_text: {
        flexBasis: '60%',
        marginLeft: 17,
        marginTop: 5,
    },

    nc_text_title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: color.primary
    },

    nc_text_members: {
        fontSize: 12,
        color: color.grey
    },
    
    nc_button: {
        backgroundColor: color.primary,
        marginRight: 10,
        flexBasis: '20%',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 5,
        
    },

    nc_button_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },

})