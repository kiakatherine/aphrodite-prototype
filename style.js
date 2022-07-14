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
    }
});