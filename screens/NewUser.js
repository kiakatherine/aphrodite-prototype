import React, { useRef, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Styles from "../style.js";
import PhoneInput from "react-native-phone-number-input";
import { getDatabase, ref, onValue, set } from 'firebase/database';

function NewUser({ navigation }) {
    const [value, setValue] = useState('');
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(PhoneInput);

    const [screen, setScreen] = useState('Phone');

    // const [phoneNumberInput, onChangePhoneNumberInput] = useState(null);
    const [validationCode, onChangeValidationCode] = useState(null);
    const [firstName, onChangeFirstName] = useState(null);
    const [lastName, onChangeLastName] = useState(null);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(null);
    const [birthdayDay, onChangeBirthdayDay] = useState(null);
    const [birthdayYear, onChangeBirthdayYear] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [identity, onChangeIdentity] = useState(null);

    function handleNextClick() {
        if(screen == 'Phone') {
            setScreen('Validation');
        } else if(screen == 'Validation') {
            if(validationCode && validationCode.length === 4) {
                setScreen('FirstName');
            }
        } else if(screen == 'FirstName') {
            if(firstName && firstName.length) {
                setScreen('LastName');
            }
        } else if(screen == 'LastName') {
            if(lastName && lastName.length) {
                setScreen('Birthday');
            }
        } else if(screen == 'Birthday') {
            if(birthdayMonth && birthdayDay && birthdayYear) {
                setScreen('Email');
            }
        } else if(screen == 'Email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if(reg.test(email) === false) {
                onChangeEmail(email);
                return false;
            } else {
                onChangeEmail(email);
                setScreen('Gender');
            }
        } else if(screen == 'Gender') {
            setScreen('Identity');
        } else if(screen == 'Identity') {
            setScreen('Terms');
        } else if(screen == 'Terms') {
            setScreen('Creating');
        } else if(screen == 'Creating') {
            navigation.navigate('Dashboard');
        }
    }
    
    function createUser() {
        const db = getDatabase();
        const reference = ref(db, 'users/' + value);
        set(reference, {
            value,
            validationCode,
            firstName,
            lastName,
            birthdayMonth,
            birthdayDay,
            birthdayYear,
            email,
            gender,
            identity
        });
    }

    return (
        <SafeAreaView style={Styles.centerContainer}>
            {screen === 'Phone' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Phone number</Text>
                    <View>
                        <SafeAreaView>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus
                        />
                        </SafeAreaView>
                    </View>

                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={() => {
                            const checkValid = phoneInput.current?.isValidNumber(value);
                            setValid(checkValid ? checkValid : false);
                            if(checkValid) {
                                setScreen('Validation');
                            }
                        }}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}

            {screen === 'Validation' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Validation code</Text>
                    <View style={Styles.displayFlex}>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            value={validationCode}
                            onChangeText={(text) => {
                                onChangeValidationCode(text);
                            }}
                            keyboardType='numeric'
                            maxLength={4}/>
                    </View>
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'FirstName' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>First name</Text>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={(text) => {
                            onChangeFirstName(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'LastName' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Last name</Text>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={(text) => {
                            onChangeLastName(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'Birthday' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Birthday</Text>
                    <View style={Styles.displayFlex}>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            keyboardType='numeric'
                            placeholder="XX"
                            value={birthdayMonth}
                            onChangeText={(text) => {
                                onChangeBirthdayMonth(text);
                            }}
                            maxLength={2}/>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            keyboardType='numeric'
                            placeholder="XX"
                            value={birthdayDay}
                            onChangeText={(text) => {
                                onChangeBirthdayDay(text);
                            }}
                            maxLength={2}/>
                        <TextInput
                            style={[Styles.textInput, Styles.validationCodeInput, { flex: 2 }]}
                            keyboardType='numeric'
                            placeholder="XXXX"
                            value={birthdayYear}
                            onChangeText={(text) => {
                                onChangeBirthdayYear(text);
                            }}
                            maxLength={4}/>
                    </View>
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'Email' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Email</Text>
                    <TextInput
                        style={Styles.textInput}
                        value={email}
                        onChangeText={(text) => {
                            onChangeEmail(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'Gender' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Gender</Text>
                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeGender('female');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Female</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeGender('male');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Male</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeGender('transgenderFemale');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Transgender female</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeGender('transgenderMale');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Transgender male</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeGender('nonBinaryNonConforming');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Non-binary/Non-conforming</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'Identity' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>I identify as</Text>
                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeIdentity('heterosexual');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Heterosexual</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeIdentity('gayOrLesbian');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Gay or lesbian</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeIdentity('bisexual');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Bisexual</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangeIdentity('preferNotToAnswer');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Prefer not to answer</Text>
                    </Pressable>
                </SafeAreaView>}

            {screen === 'Terms' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>Terms & Conditions</Text>
                    <Text style={Styles.bodyText}>Text here</Text>
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>I agree</Text>
                    </Pressable>
                </SafeAreaView>}
            
            {screen === 'Creating' &&
                <SafeAreaView>
                    <Text style={Styles.allCapsHeading}>Creating account</Text>
                    <Pressable
                        style={[Styles.button, Styles.buttonFullWidth]}
                        onPress={createUser}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </SafeAreaView>}
         </SafeAreaView>
    );
};

export default NewUser;