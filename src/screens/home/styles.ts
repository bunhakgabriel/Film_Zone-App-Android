import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242A32",
    },
    header: {
        paddingTop: 50,
        padding: 25
    },
    headerText: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 45,
        color: "#FFF"
    },
    input: {
        backgroundColor: "#67686D",
        height: 42,
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 0,
        color: "#FFF"
    },
    containerInput: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noResult: {
        marginTop: 30,
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10
    },
})