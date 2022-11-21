import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Styles from "../style.js";

function NotificationsScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentVal, setCurrentVal] = useState(null);

  function handleSaveText(text) {
    // FIX
    // update(currentUserRef, {
    //   [currentField]: text
    // });
    setCurrentField(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setCurrentField(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  return (
    <View style={[Styles.centerContainer, Styles.textAlignCenter, Styles.lightBackground]}>
      <Image source={require('../assets/images/yinyang.png')} style={{width: 200, height: 200, marginBottom: 20, alignSelf: 'center'}} />
      <Text style={[Styles.heading1, Styles.textAlignCenter, { fontFamily: 'Poppins_600SemiBold' }]}>Notifications</Text>
      <Text style={[Styles.bodyText, Styles.textAlignCenter, { fontFamily: 'Poppins_400Regular' }]}>Set your alarm once a day, morning or evening, and visualize your dream relationship for 7 minutes.</Text>



      {/* {isModalVisible &&
          <AddTextModal value={currentVal} onSave={handleSaveText} onCancel={handleCancel} />}

      {!isModalVisible &&
        <View style={[Styles.containerPadding, {marginTop: 20}]}><Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Notifications</Text>
        
        <View style={Styles.accountInfoLine}>
          <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_500Medium' }]}>Morning affirmations</Text>
          <Pressable
            style={Styles.accountInfoButton}
            onPress={() => setIsModalVisible(true)}>
              <Ionicons name='create-outline' size={24} />
            </Pressable>
        </View>

        <View style={Styles.accountInfoLine}>
          <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_500Medium' }]}>Evening affirmations</Text>
          <Pressable
            style={Styles.accountInfoButton}
            onPress={() => setIsModalVisible(true)}>
              <Ionicons name='create-outline' size={24} />
            </Pressable>
        </View>
      </View>} */}
    </View>
  )
};

export default NotificationsScreen;