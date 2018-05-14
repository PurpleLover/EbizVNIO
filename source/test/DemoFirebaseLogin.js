import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//native base
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

//firebase
import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../common/constant.js';

//config firebase
firebase.initializeApp(FIREBASE_CONFIG);

export default class DemoFirebaseLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    signUpUser(email, password) {
        try {
            if (this.state.email.length < 6) {
                alert('Please enter atlease 6 characters.');
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        } catch (error) {
            
        }
    }

    loginUser(email, password) {
        try {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            });
        } catch (error) {
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input autoCorrect={false}
                            onChangeText={(value) => this.setState({
                                email: value
                            })}
                            autoCapitalize="none" />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry={true}
                            onChangeText={(value) => this.setState({
                                password: value
                            })}
                            autoCorrect={false} autoCapitalize="none" />
                    </Item>

                    <Button full success style={{ marginTop: 10 }} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                        <Text style={{ color: '#fff' }}>Login</Text>
                    </Button>

                    <Button full primary style={{ marginTop: 10 }} onPress={() => this.signUpUser(this.state.email, this.state.password)}>
                        <Text style={{ color: '#fff' }}>SignUp</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})