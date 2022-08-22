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
    scrollView: {
        paddingBottom: 75,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        margin: 30,
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
        flex: '0 1 auto'
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
      VisionViewCard: {
        background: 'pink'
      },
      VisionViewCardText: {
        fontSize: 36,
        textAlign: 'center'
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
        color: '#aaa',
        borderRadius: 100
      },
      progressDotSelected: {
        color: 'black'
      }
});