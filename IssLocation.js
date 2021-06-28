import { response } from 'express';
import { makeRe } from 'micromatch';
import { styleSheets } from 'min-document';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Text,
         View,
         StyleSheet,
         ImageBackground,
         StatusBar,
         SafeAreaView, 
         Image,
         Alert,
         Platform}from 'react-native';   
import MapView, {MakeRe} from 'react-native-maps'; 

export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.State = {
            location : {},
        }
    }
    
}

ComponentDidMount(
    this.getIssLocation()
)
getIssLocation= () => {
    axios
    .get("https://api.wheretheiss.at/v1/satellites/25544")
    .then(response => {
        this.setState({
            location : response.data
        })
    })

    .catch(error => {
        Alert.alert(error.message)
    })

}

render(){
    if(Object.keys(this.State.location).length === 0){
        return(
            <View 
              style = {{
                flex : 1,
                justifyContent : 'center',
                alignItems : 'center'
            }}>
            <Text>Loading</Text>    
            </View>
        )
    }else{
        return(
            <View style = {styles.container}>
            <SafeAreaView style = {styles.droidSafeArea}/>
            <ImageBackground source = {require("../assets/bg.png")}>
            <View style = {styles.titleConatainer}>
            <Text style = {styles.titleText}>Iss Location</Text>    
            </View>
            <View style = {styles.mapConatainer}>
            <MapView style = {styles.map}
            region = {{
                latitude : this.State.location.latitude,
                longitude : this.state.location.longitude,
                latitudeDelta : 100,
                longitudeDelta : 100,
            }}
            >
            <Marker 
            coordinate={{latitude : this.state.location.latitude, longitude: this.state.location.longitude}}
            >
            <Image source={require("../assets/iss_icon")} style = {{height : 50, width : 50}}/>
            </Marker>
            </MapView>  
            </View>
            <View style = {styles.infoContainer}>
                <Text style={styles.infoText}>latitude:{this.state.location.latitude}</Text>
                <Text style={styles.infoText}>longitude:{this.state.location.longitude}</Text>
                <Text style={styles.infoText}>Altitude (KM):{this.state.location.altitude}</Text>
                <Text style={styles.infoText}>Velocity (KM/H):{this.state.location.velocity}</Text>
            </View>
            </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    droidSafeArea:{
        marginTop : Platform.OS === "android" ? statusbar.currentHeight : 0,
    },
    backgroundImage : {
        flex : 1,
        resizeMode : 'cover',
    },
    titleConatainer:{
        flex : 0.1,
        justifyContent : "center",
        alignItems : "center",
    },
    titleText:{
        fontSize : 30,
        fontWeight : "bold",
        color : "white",
    },
    mapConatainer:{
        flex : 0.7,
    },
    map:{
        width:"100%",
        height:"100%",
    },
    infoContainer:{
        flex:0.2,
        backgroundColor:'white',
        marginTop: -10,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        padding: 30, 
    },
    infoText:{
        fontSize: 15,
        Color: "black",
        fontWeight: "bold",
    },
})

