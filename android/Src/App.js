import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './Components/Common';
import LoginForm from './Components/LoginForm';



class App extends Component {
    state = {loggedIn: null};

componentWillMount (){
    firebase.initializeApp(
        {
            apiKey: 'AIzaSyDnwvTRqHjZVO8oiiN4gIHT4VpxJ2lJWvY',
            authDomain: 'newapp-800aa.firebaseapp.com',
            databaseURL: 'https://newapp-800aa.firebaseio.com',
            projectId: "newapp-800aa",
            storageBucket: 'newapp-800aa.appspot.com',
            messagingSenderId: '826734020203'
          }
    );

    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            this.setState({loggedIn: true});
        } else {
            this.setState({loggedIn: false});
        }
    });

}

renderContent(){
    switch(this.state.loggedIn){
        case true:
        return( 

        <TouchableOpacity style={styles.logOutStyle} onPress={() => firebase.auth().signOut()}>
        <Text style={styles.logOutTextStyle}>Log out</Text>
        </TouchableOpacity>
        );
        case false:
        return <LoginForm />;
        default:
        return <Spinner size= "large"/>;
    }

}

    render () {
        return (
            <View>
            <Header headerText= "Authentication"/>
                {this.renderContent()} 
            </View>
        );
    }
};


const styles = {
    logOutStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#007',
        margin:10,
        elevation: 2,
        position: 'relative'
    },
    logOutTextStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#007',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }  
    };

export default App;