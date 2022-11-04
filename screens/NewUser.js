import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, set, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';
import {app, auth, db, storage } from '../firebase.js';
import ProgressBar from '../components/ProgressBar.js';

function NewUser(props) {
    // const [screen, setScreen] = useState('FirstName');
    const [firstName, onChangeFirstName] = useState(null);
    const [lastName, onChangeLastName] = useState(null);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(null);
    const [birthdayDay, onChangeBirthdayDay] = useState(null);
    const [birthdayYear, onChangeBirthdayYear] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [pronouns, onChangePronouns] = useState(null);
    const [identity, onChangeIdentity] = useState(null);
    const [currentStep, setCurrentStep] = useState(3);
    const [phoneNumber, setPhoneNumber] = useState(props.route.params ? props.route.params.phoneNumber : null);

    function handleNextClick() {
        if(currentStep === 6) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if(reg.test(email) === false) {
                onChangeEmail(email);
                return false;
            } else {
                onChangeEmail(email);
                setCurrentStep(7);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    function handleBackClick() {
        if(currentStep === 3) {
            props.navigation.navigate('PhoneNumber', {currentStep: 2});
        } else {
            setCurrentStep(currentStep - 1);
        }
    }
    
    function saveUser() {
        const userData = {
            firstName,
            lastName,
            birthdayMonth,
            birthdayDay,
            birthdayYear,
            email,
            phoneNumber,
            pronouns,
            identity
        };
        const db = getDatabase();
        const reference = ref(db, 'users/' + auth.currentUser.uid);
        update(reference, userData).then(() => {
            props.navigation.navigate('Sending', {text: 'Creating account', hasCards: false});
        }).catch((error) => {
            alert('Error');
        });
    }

    return (
        <View style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
            <View style={[Styles.customHeader, {borderBottomWidth: 0 }]}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={handleBackClick}>
                        <Ionicons name='arrow-back-outline' size={24} />
                </Pressable>

                <Pressable
                    onPress={() => props.navigation.navigate('Landing')}>
                        <Ionicons name="close-outline" size={32}></Ionicons>
                </Pressable>
            </View>

            <ProgressBar currentStep={currentStep} />
                
            <View style={[currentStep > 6 ? Styles.containerPadding : Styles.centerContainer, {paddingBottom: currentStep === 9 ? 100 : 155}]}>

                {currentStep === 3 &&
                    <View>
                        <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>First name</Text>
                        <TextInput
                            style={Styles.textInput}
                            autoFocus={true}
                            value={firstName}
                            onChangeText={(text) => {
                                onChangeFirstName(text);
                            }} />
                        <Pressable
                            style={[Styles.button, Styles.modalBottomButton, (!firstName) ? Styles.buttonDisabled : null]}
                            onPress={handleNextClick}>
                            <Text style={Styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>}
                
                {currentStep === 4 &&
                    <View>
                        <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>Last name</Text>
                        <TextInput
                            style={Styles.textInput}
                            autoFocus={true}
                            value={lastName}
                            onChangeText={(text) => {
                                onChangeLastName(text);
                            }} />
                        <Pressable
                            style={[Styles.button, Styles.modalBottomButton, (!lastName) ? Styles.buttonDisabled : null]}
                            onPress={handleNextClick}>
                            <Text style={Styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>}
                
                {currentStep === 5 &&
                    <View>
                        <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>Birthday</Text>
                        <View style={Styles.displayFlex}>
                            <TextInput
                                style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                                autoFocus={true}
                                keyboardType='numeric'
                                placeholder="MM"
                                value={birthdayMonth}
                                maxLength={2}
                                onBlur={() => {
                                    if(birthdayMonth.length === 1) {
                                        onChangeBirthdayMonth('0' + birthdayMonth);
                                    }
                                }}
                                onChangeText={(text) => {
                                    onChangeBirthdayMonth(text);
                                }}/>
                            <TextInput
                                style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                                keyboardType='numeric'
                                placeholder="DD"
                                maxLength={2}
                                value={birthdayDay}
                                onBlur={() => {
                                    if(birthdayDay.length === 1) {
                                        onChangeBirthdayDay('0' + birthdayDay);
                                    }
                                }}
                                onChangeText={(text) => {
                                    onChangeBirthdayDay(text);
                                }}/>
                            <TextInput
                                style={[Styles.textInput, Styles.validationCodeInput, { flex: 2 }]}
                                keyboardType='numeric'
                                placeholder="YYYY"
                                maxLength={4}
                                value={birthdayYear}
                                onChangeText={(text) => {
                                    onChangeBirthdayYear(text);
                                }}/>
                        </View>
                        <Pressable
                            style={[Styles.button, Styles.modalBottomButton, (!birthdayMonth || !birthdayDay || !birthdayYear || birthdayYear.length < 4) ? Styles.buttonDisabled : null]}
                            onPress={handleNextClick}>
                            <Text style={Styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>}
                
                {currentStep === 6 &&
                    <View>
                        <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>Email</Text>
                        <TextInput
                            style={Styles.textInput}
                            autoFocus={true}
                            value={email}
                            onChangeText={(text) => {
                                onChangeEmail(text);
                            }} />

                        <Text style={[Styles.message, {fontFamily: 'Poppins_400Regular'}]}>We promise we won't spam you.</Text>

                        <Pressable
                            style={[Styles.button, Styles.modalBottomButton, (!email) ? Styles.buttonDisabled : null]}
                            onPress={handleNextClick}>
                            <Text style={Styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>}
                
                {currentStep === 7 &&
                    <View style={{ paddingTop: 45 }}>
                        <Text style={[Styles.heading1, {marginBottom: 25, fontFamily: 'Poppins_500Medium'}]}>What pronouns do you use?</Text>
                        <Pressable
                            style={[Styles.buttonInverted, pronouns === 'she/her/hers' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangePronouns('she/her/hers');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>she/her/hers</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, pronouns === 'he/him/his' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangePronouns('he/him/his');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>he/him/his</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, pronouns === 'they/them/theirs' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangePronouns('they/them/theirs');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>they/them/theirs</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, pronouns === 'ze/hir/hirs' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangePronouns('ze/hir/hirs');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>ze/hir/hirs</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, pronouns === 'preferNotToSay' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangePronouns('preferNotToSay');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>Prefer not to say</Text>
                        </Pressable>
                    </View>}
                
                {currentStep === 8 &&
                    <View style={{ paddingTop: 45 }}>
                        <Text style={[Styles.heading1, {marginBottom: 25, fontFamily: 'Poppins_500Medium'}]}>I identify as</Text>
                        <Pressable
                            style={[Styles.buttonInverted, identity === 'heterosexual' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangeIdentity('heterosexual');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>Heterosexual</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, identity === 'gayOrLesbian' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangeIdentity('gayOrLesbian');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>Gay or lesbian</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, identity === 'bisexual' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangeIdentity('bisexual');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>Bisexual</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, identity === 'preferNotToAnswer' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => {
                                onChangeIdentity('preferNotToAnswer');
                                handleNextClick();
                            }}>
                            <Text style={Styles.buttonInvertedText}>Prefer not to answer</Text>
                        </Pressable>
                    </View>}

                {currentStep === 9 &&
                    <><ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 45 }}>
                        <Text style={[Styles.heading1, {marginBottom: 25, fontFamily: 'Poppins_500Medium'}]}>Terms and conditions</Text>
                        <Text style={[Styles.bodyText, Styles.paragraph, {fontFamily: 'Poppins_400Regular'}]}>Jelly-o candy jelly caramels carrot cake apple pie bear claw. Pudding chocolate cake shortbread lemon drops danish cake. Biscuit ice cream sugar plum donut lollipop. Pie marzipan cotton candy jujubes tootsie roll biscuit pie. Cupcake gummi bears brownie marshmallow gummi bears. Lollipop cake oat cake gummies gummies cheesecake tart. Toffee donut tiramisu muffin biscuit dessert cake chupa chups brownie.</Text>
                        <Text style={[Styles.bodyText, Styles.paragraph, {fontFamily: 'Poppins_400Regular'}]}>Lollipop toffee tart lollipop donut muffin cake. Croissant lollipop jujubes cookie carrot cake cheesecake icing cake topping. Cheesecake cookie sweet tootsie roll tootsie roll chocolate cookie halvah. Cotton candy chocolate bar cotton candy bear claw soufflé cupcake chocolate bar gummies dessert. Sweet roll lemon drops marzipan muffin tart chocolate dessert. Pie pudding brownie jujubes dessert. Chupa chups cotton candy shortbread marshmallow bonbon sesame snaps croissant dragée. Cake sesame snaps halvah marshmallow jujubes danish.</Text>
                        <Text style={[Styles.bodyText, Styles.paragraph, {marginBottom: 150, fontFamily: 'Poppins_400Regular'}]}>Chocolate cake bear claw soufflé chocolate bar chupa chups cheesecake pastry jelly gummi bears. Pie shortbread sugar plum jelly beans jelly dessert. Wafer toffee icing croissant pudding cake icing sweet roll ice cream. Jujubes cake halvah cookie cheesecake croissant icing cake. Macaroon lollipop pastry liquorice icing. Sweet soufflé gummi bears candy candy brownie carrot cake. Jelly-o jelly beans jujubes candy icing. Soufflé cotton candy chocolate bar donut halvah croissant. Gummies lollipop icing chocolate cake apple pie lollipop jelly carrot cake jelly beans.</Text>
                    </ScrollView>
                    <Pressable
                        style={[Styles.button, {position: 'absolute', bottom: 110, left: 30, right: 30, justifyContent: 'flex-end'}]}
                        onPress={saveUser}>
                        <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>I agree</Text>
                    </Pressable></>}
            </View>
        </View>
    );
};

export default NewUser;