// import React, { useState } from "react";
// import { View, StyleSheet, Button, Text } from "react-native";
// import { checkVerification } from "../api/verify";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import Styles from "../style.js";

// const Otp = ({ route, navigation }) => {
//  const { phoneNumber } = route.params;
//  const [invalidCode, setInvalidCode] = useState(false);
//  return (
//    <View style={[Styles.containerWithoutHeader, Styles.containerPadding, Styles.fullScreen]}>
//      <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Verify your phone</Text>
//      <Text style={[Styles.bodyText, {fontFamily: 'Poppins_400Regular'}]}>
//        {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
//      </Text>
//      <Button
//        title="Edit Phone Number"
//        onPress={() => navigation.replace("PhoneNumber")}
//      />
//      <OTPInputView
//        style={{ width: "100%", height: 200 }}
//        pinCount={6}
//        autoFocusOnLoad
//        codeInputFieldStyle={styles.underlineStyleBase}
//        codeInputHighlightStyle={styles.underlineStyleHighLighted}
//        onCodeFilled={(code) => {
//          checkVerification(phoneNumber, code).then((success) => {
//            if (!success) setInvalidCode(true);
//            success && navigation.replace("NewUser", {phoneNumber});
//          });
//        }}
//      />
//      {invalidCode && <Text style={[Styles.error, {fontFamily: 'Poppins_500Medium'}]}>Incorrect code.</Text>}
//    </View>
//  );
// };

// const styles = StyleSheet.create({
//  wrapper: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },

//  borderStyleBase: {
//    width: 30,
//    height: 45,
//  },

//  borderStyleHighLighted: {
//    borderColor: "#03DAC6",
//  },

//  underlineStyleBase: {
//    width: 30,
//    height: 45,
//    borderWidth: 0,
//    borderBottomWidth: 1,
//    color: "black",
//    fontSize: 20,
//  },

//  underlineStyleHighLighted: {
//    borderColor: "#03DAC6",
//  },

//  prompt: {
//    fontSize: 24,
//    paddingHorizontal: 30,
//    paddingBottom: 20,
//  },

//  message: {
//    fontSize: 16,
//    paddingHorizontal: 30,
//  },

//  error: {
//    color: "red",
//  },
// });

// export default Otp;