import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 30
    },
    scrollView: {
        // justifyContent: "center",
        // alignItems: "center",
        // textAlign: "center",
        paddingBottom: 75,
        justifyContent: "space-around",
        flexDirection:"row",
        flexWrap: "wrap",
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
    leftHeading2: {
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 40
    },
    button: {
        backgroundColor: 'black',
        fontSize: 24,
        padding: 20,
        width: '100%',
        borderRadius: 100
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    buttonDisabled: {
        backgroundColor: '#ddd',
        color: 'gray'
    },
    fullWidthButton: {
        borderRadius: 0,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
        width: '45%',
        marginBottom: 20,
        padding: 25,
        backgroundColor: '#F4ECDF',
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
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: 28,
        padding: 10,
        paddingRight: 14,
        paddingLeft: 14,
        backgroundColor: 'black',
        borderRadius: 100
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
      }
});