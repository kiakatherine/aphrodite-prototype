import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
      padding: 30
    },
    containerPadding: {
      padding: 30,
      paddingTop: 0
    },
    containerWithoutHeader: {
      paddingTop: 55,
      height: '100%'
    },
    customHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center', // vertically centers content
      borderBottomWidth: 1,
      borderBottomColor: '#C3C4CE',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20
    },
    fullScreen: {
      display: 'flex',
      flexDirection: 'column',
    },
    lightBackground: {
      backgroundColor: 'white'
    },
    darkBackground: {
      backgroundColor: '#2E2F36'
    },
    heading: {
      fontSize: 24,
      marginBottom: 20
    },
    heading1: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10
    },
    heading2: {
      fontSize: 18,
      marginBottom: 40
    },
    heading3: {
      textTransform: 'uppercase',
      letterSpacing: 3,
      fontSize: 14,
      marginBottom: 10
    },
    inner: {
      padding: 24,
      flex: 1
    },
    textAlignCenter: {
      textAlign: 'center',
      alignItems: 'center'
    },
    textAlignLeft: {
      textAlign: 'left'
    },
    textAlignRight: {
      textAlign: 'right'
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
    textWhite: {
      color: 'white'
    },
    message: {
      textAlign: 'center',
      // marginTop: 25,
      marginBottom: 25,
      fontSize: 16
    },
    error: {
      backgroundColor: 'pink',
      color: 'red',
      textAlign: 'center',
      fontSize: 20,
      padding: 15,
      borderRadius: 50
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    flexOne: {
        flex: 1
    },
    button: {
        backgroundColor: '#2E2F36',
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
        borderColor: '#2E2F36',
        padding: 20,
        borderRadius: 100,
        marginBottom: 12
    },
    buttonInvertedText: {
      color: '#2E2F36',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    buttonWhite: {
      backgroundColor: 'white'
    },
    buttonWhiteText: {
      color: '#2E2F36',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    },
    buttonOutline: {
      borderWidth: 2,
      borderColor: 'white',
      padding: 20,
      borderRadius: 100
    },
    buttonLink: {
      padding: 25
    },
    buttonDisabled: {
        backgroundColor: '#ddd',
        color: 'gray'
    },
    buttonSmall: {
        width: 100,
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
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    topRightCloseButton: {
      position: 'absolute',
      top: 50,
      right: 30
    },
    modalTextInput: {
      flexGrow: 1,
      fontSize: 28,
      marginTop: 100,
      marginBottom: 30
    },
    modalBottomButton: {
      backgroundColor: '#2E2F36',
      padding: 20,
      borderRadius: 0,
      marginLeft: -50,
      marginRight: -50,
      // justifyContent: 'flex-end'
    },
    bottomDrawer: {
        padding: 25
    },
    bottomDrawerHeader: {
        fontSize: 24,
        marginBottom: 25
    },
    bottomDrawerText: {
        fontSize: 20,
        marginBottom: 25,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 2
    },
    validationCodeInput: {
      marginRight: 15,
      borderBottomColor: '#D8D8D8',
      borderBottomWidth: 2
    },
    Card: {
        width: '45%',
        justifyContent: 'space-around', // vertically centers content
        alignItems: 'center',
        height: 215,
        marginBottom: 20,
        marginRight: 20,
        padding: 25,
        backgroundColor: '#F2EDE4',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#F4ECDF'
      },
      CardText: {
        fontSize: 18,
        lineHeight: 24
      },
      CardSelected: {
        borderColor: '#2E2F36'
      },
      darkCard: {
        backgroundColor: '#4F505A',
        borderWidth: 0
      },
      DashboardVisionView: {
        margin: 20,
        marginTop: 100,
        backgroundColor: '#2E2F36',
        padding: 10,
        borderRadius: 15
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
      PreviewFullScreenCard: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 30,
        backgroundColor: '#2E2F36'
      },
      PreviewFullScreenCardText: {
        fontSize: 34,
        lineHeight: 44,
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
        fontSize: 48,
        color: 'white',
        opacity: 0.3,
        borderRadius: 100
      },
      progressDotSelected: {
        color: 'white',
        opacity: 1
      },
      accountInfoLine: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 25,
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