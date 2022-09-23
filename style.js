import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 30,
      background: 'pink'
    },
    container: {
      flex: 1,
      margin: 10,
    },
    scrollView: {
      paddingBottom: 75,
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    heading: {
      fontSize: 24,
      marginBottom: 20
    },
    heading1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30
    },
    heading2: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 40
    },
    leftHeading1: {
      textAlign: 'left',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20
    },
    allCapsHeading: {
      textTransform: 'uppercase',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1
    },
    bodyText: {
        textAlign: 'left',
        fontSize: 18,
        marginBottom: 40
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    flexOne: {
        flex: 1
    },
    buttonFullWidth: {
        width: '100%'
    },
    button: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 100
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonInverted: {
        background: 'white',
        borderWidth: 2,
        borderColor: 'black',
        padding: 20,
        borderRadius: 100
    },
    buttonInvertedText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    buttonModalBottom: {
      backgroundColor: 'black',
      padding: 20,
      justifyContent: 'flex-end'
    },
    buttonDisabled: {
        backgroundColor: '#ddd',
        color: 'gray'
    },
    buttonSmall: {
        width: 100,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100
    },
    buttonSmallText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    textInput: {
        fontSize: 28,
        marginBottom: 30,
        borderBottomColor: '#8A8C9B',
        borderBottomWidth: 1
    },
    modalTextInput: {
      fontSize: 28,
      marginBottom: 30
    },
    bottomDrawer: {
        padding: 25
    },
    bottomDrawerHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25
    },
    bottomDrawerText: {
        fontSize: 20,
        marginBottom: 25
    },
    validationCodeInput: {
      marginRight: 15,
      borderBottomColor: '#D8D8D8',
      borderBottomWidth: 2
    },
    Card: {
        flex: '0 1 auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 165,
        width: '45%',
        marginBottom: 20,
        padding: 25,
        backgroundColor: '#F2EDE4',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F4ECDF'
      },
      CardText: {
        fontSize: 20
      },
      CardSelected: {
        borderColor: 'black'
      },
      RemovableCardButton: {
        zIndex: 1,
        position: 'absolute',
        top: 10,
        right: 10
      },
      RemovableCardButtonText: {
        color: 'white',
        fontWeight: 'bold'
      },
      VisionViewContainer: {
        background: '#2E2F36'
      },
      VisionViewCard: {
        background: 'pink'
      },
      VisionViewCardText: {
        fontSize: 36,
        textAlign: 'center',
        color: 'white'
      },
      CardWithImage: {
        display: 'flex',
        padding: 0
      },
      progressDotBar: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50
      },
      progressDot: {
        // flex: 1,
        fontSize: 48,
        padding: 3,
        color: 'white',
        opacity: 0.3,
        borderRadius: 100
      },
      progressDotSelected: {
        color: 'white'
      },
      accountInfoLine: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C3C4CE'
      },
      accountInfoText: {
        flex: 4,
        fontSize: 16
      },
      accountInfoButton: {
        flex: 1,
        alignItems: 'flex-end'
      }
});