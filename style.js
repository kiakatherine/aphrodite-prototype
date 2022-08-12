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
        marginBottom: 30
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
      }
});