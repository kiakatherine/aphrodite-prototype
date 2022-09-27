import React, { useRef, useState } from 'react';
import { Button, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';

import PhoneInput, {isValidNumber} from "react-native-phone-number-input";
import { sendSmsVerification } from "../api/verify";

function NewUser({ navigation }) {
    const [phone, setPhone] = useState('');
    const [formattedValue, setFormattedValue] = useState('');

    // https://www.twilio.com/blog/phone-verification-react-native
    const sendCode = () => {
        sendSmsVerification(formattedValue).then((sent) => {
            navigation.navigate("Otp", { phoneNumber: formattedValue });
          });
    };

    return (
        <SafeAreaView style={[Styles.centerContainer, Styles.fullScreen]}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => navigation.navigate('FirstScreen')}>
                <Ionicons name="close-outline" size={48}></Ionicons>
            </Pressable>

            <View>
                {/* <View>
                    <Text style={[CStyle.baseText, {marginBottom: 20, maxWidth: 300}]}>
                        Your cell phone number will be used for account verification and
                        notifications. Standard rates will apply.
                    </Text>
                </View>*/}

                <View style={{marginBottom: 20, alignSelf: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Phone number</Text>
                        
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={phone}
                            onChangeFormattedText={text => {
                                setFormattedValue(text);
                                setPhone(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus />

                        <Pressable
                            style={[Styles.modalBottomButton, { marginTop: 50 }]}
                            onPress={sendCode}>
                                <Text style={Styles.buttonText}>Send code</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
         </SafeAreaView>
    );
};

export default NewUser;