import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Button, TouchableOpacity } from "react-native"
import { cadastrarUsuarioService } from "./cadastroService";

type user = {
    nomeUsuario: string,
    senha: string,
}

export const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');

    const cadastrarUsuario = async (): Promise<void> => {
        type resp = { value: boolean, msg: string }
        if (
            senha != confirmarSenha ||
            nome.length < 3 ||
            !confirmarSenha ||
            !senha
        ) {
            return alert("verifique todos os campos");
        }

        try {
            let resposta: resp = await cadastrarUsuarioService({nomeUsuario: nome, senha: senha});
            alert(resposta.msg);
            if(!resposta.value) return;
        } catch (error) {
            console.log('ERROR: ' + error);
            alert("Falha ao cadastrar usuário, aguarde e tente novamente");
        }

        setNome('');
        setSenha('');
        setConfirmarSenha('');
        navigation.navigate('Login');
    }

    return (
        <View style={{
            alignItems: 'center',
            borderColor: 'red',
            borderWidth: 0,
            height: '100%',
            backgroundColor: '#fff',
            paddingVertical: '30%'
        }} >
            <View style={{
                borderColor: 'red',
                borderWidth: 0,
                width: '85%'
            }} >
                <Text style={{
                    color: '#36454F',
                    fontSize: 35,
                    borderColor: 'red',
                    borderWidth: 0,
                    textAlign: 'center',
                    marginBottom: 20
                }}>Registrar-se</Text>

                <Text style={{ color: "#D3D3D3", fontSize: 20 }}>Usuário</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                />

                <Text style={{ color: "#D3D3D3", fontSize: 20 }} >Senha</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text => setSenha(text))}
                    value={senha}
                    secureTextEntry={true}
                />

                <Text style={{ color: "#D3D3D3", fontSize: 20 }}>Confirmar Senha</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setConfirmarSenha(text)}
                    value={confirmarSenha}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={cadastrarUsuario}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff' }} >Criar conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems: 'center'
    },

    input: {
        marginVertical: 15,
        borderRadius: 15,
        height: 45,
        paddingLeft: 10,
        backgroundColor: '#D3D3D3'
    },

    button: {
        borderRadius: 10,
        color: '#fff',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#1976D2'
    }

})