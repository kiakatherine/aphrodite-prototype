import React, { useRef, useState } from 'react';
import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from "../style.js";
import PhoneInput, {isValidNumber} from "react-native-phone-number-input";
import { getDatabase, ref, onValue, set } from 'firebase/database';

function NewUser({ navigation }) {
    // This is going to be your local ip address and the port you are running your server if you 
    // are testing locally with your server running on the same computer and you are using
    // android studio's emulator.
    // If you are implementing this in your production build your base url should be where you are hosting your
    // server program.
    const BaseURL = 'https://verify.twilio.com/v2';

    const [phoneInserted, setPhoneInserted] = useState(false);
    const [phone, setPhone] = useState('');
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [verfication, setverfication] = useState('');
    // const [waitMessage, setwaitMessage] = useState(false);
    const [checkedNumber, setCheckedNumber] = useState('');
    const [retry, setretry] = useState(false);
    const phoneInput = useRef(PhoneInput);

    const reset = () => {
        setPhoneInserted(false);
        setPhone('');
        setverfication('');
        // setwaitMessage(false);
        setCheckedNumber('');
    };

    const retryCode = () => {
        setverfication('');
    };

    // This is the important part of the code
    // That asks the node backend to send verication code to
    // user phone number but before that it checks if the phone number
    // inserted is a valid number
    const sendCode = () => {
        setPhoneInserted(true);
        // setwaitMessage(true);
        // console.log('formattedValue:', formattedValue)
        if (!isValidNumber(formattedValue)) {
            alert('Invalid phone number');
            return;
        } else {
            console.log(`${BaseURL}/verify/${phone}`);
            // send verfication code to phone number
            fetch(`${BaseURL}/verify/${phone}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(res => {
                console.log(res);
                if (res.status === 'pending') {
                    alert('set checked number')
                    setCheckedNumber(phone);
                    // setwaitMessage(false);
                }
                })
                .catch(err => {
                setPhoneInserted(false);
                // setwaitMessage(false);
                setPhone('');
                console.log(err);
                alert(err);
            });
        }
    };

    const verifyCode = () => {
        console.log('checkedNumber:', checkedNumber)
        if (!isValidNumber(checkedNumber)){
            return false;
        }
    
        // Now check if the verfication inserted was the same as 
        // the one sent
        fetch(`${BaseURL}/check/${checkedNumber}/${verfication}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 'approved') {
                alert('Phone Verfied');
                // Navigate to another page  once phone is verfied
                navigation.navigate('Validation');
            } else {
                // Handle other error cases like network connection problems
                alert('Verfication failed try again!!');
                // reset();
                // If not network error like wrong number try again
                setretry(true);
            }
        });
    };

    const [screen, setScreen] = useState('Phone');
    const [validationCode, onChangeValidationCode] = useState(null);
    const [firstName, onChangeFirstName] = useState(null);
    const [lastName, onChangeLastName] = useState(null);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(null);
    const [birthdayDay, onChangeBirthdayDay] = useState(null);
    const [birthdayYear, onChangeBirthdayYear] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [pronouns, onChangePronouns] = useState(null);
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
                setScreen('Pronouns');
            }
        } else if(screen == 'Pronouns') {
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
        const reference = ref(db, 'users/' + phone);
        set(reference, {
            phone,
            validationCode,
            firstName,
            lastName,
            birthdayMonth,
            birthdayDay,
            birthdayYear,
            email,
            pronouns,
            identity
        });
    }

    return (
        <SafeAreaView style={Styles.centerContainer}>
            {screen === 'Phone' &&
                <View>
                    <View>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => navigation.navigate('FirstScreen')}
                        style={{marginBottom: 20}}
                    >
                        <Text style={{textDecorationLine: 'underline'}}>Back</Text>
                    </TouchableHighlight>
                    {/* <Text style={[CStyle.baseText, {marginBottom: 20, maxWidth: 300}]}>
                        Your cell phone number will be used for account verification and
                        notifications. Standard rates will apply.
                    </Text> */}
                    </View>

                    <View style={{marginBottom: 20, alignSelf: 'center'}}>
                        {!phoneInserted ? (
                            <View style={{alignSelf: 'center'}}>
                                <Text style={[Styles.heading1, {marginBottom: 20}]}>Phone number</Text>
                                <PhoneInput
                                    defaultCode="US"
                                    layout="first"
                                    disabled={phoneInserted}
                                    value={phone}
                                    onChangeText={text => {
                                        setPhone(text);
                                    }}
                                    onChangeFormattedText={text => {
                                        setFormattedValue(text);
                                    }}
                                    withDarkTheme
                                    withShadow
                                    autoFocus />
                                <Button title="Send Code" onPress={sendCode} />
                            </View>
                            ) : (
                                <View>
                                    <Text style={[Styles.heading1, {marginBottom: 20}]}>Verification code</Text>
                                    <TextInput
                                        style={Styles.textInput}
                                        onChangeText={setverfication}
                                        value={verfication}
                                        keyboardType="numeric" />

                                    <Pressable
                                        style={[Styles.button, Styles.buttonFullWidth]}
                                        onPress={verifyCode}>
                                            <Text style={Styles.buttonText}>Verify</Text>
                                    </Pressable>
                                </View>
                            )}
                    </View>
                </View>}

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
            
            {screen === 'Pronouns' &&
                <SafeAreaView>
                    <Text style={Styles.leftHeading1}>What pronouns do you use?</Text>
                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('she/her/hers');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>she/her/hers</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('he/him/his');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>he/him/his</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('they/them/theirs');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>they/them/theirs</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('ze/hir/hirs');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>ze/hir/hirs</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('noPreference');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>No preference</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('notListed');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Not listed</Text>
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                        onPress={() => {
                            onChangePronouns('preferNotToSay');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Prefer not to say</Text>
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