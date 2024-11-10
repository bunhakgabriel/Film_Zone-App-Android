import { useEffect, useState } from "react"
import { Text, View, StyleSheet, TextInput, Image, Button, TouchableOpacity } from "react-native"

import imageUsuario from '../../assets/usuariologin.png'
import { autenticarUsuarioService } from "../Cadastro/cadastroService"
import AsyncStorage from "@react-native-async-storage/async-storage"

type user = {
    nomeUsuario: string,
    senha: string,
}

export const Login = ({ navigation }) => {
    const [nome, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('User');
            console.log(user)
            if(user){
                navigation.navigate('Home');
            }
        }
        fetchUser();
    }, [])

    const autenticarUsuario = async () => {
        if (!nome.length || !senha.length) return alert('Preencha todos os campos')
        let validacao: { value: boolean, msg: string };

        const usuario: user = {
            nomeUsuario: nome,
            senha: senha,
        }

        try {
            validacao = await autenticarUsuarioService(usuario);
            alert(validacao.msg)
            if (validacao.value) {
                navigation.navigate('Home')
            }
        } catch (error) {
            alert("Erro ao fazer login, aguarde e tente novamente")
        }
    }

    return (
        <View style={{
            alignItems: 'center',
            borderColor: 'red',
            borderWidth: 0,
            height: '100%',
            backgroundColor: '#fff'
        }} >
            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderColor: 'red',
                borderWidth: 0,
                height: '42%'
            }}>
                <Image source={imageUsuario} />
            </View>
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
                }}>
                    Login</Text>
                <Text style={{ color: "#D3D3D3", fontSize: 20 }}>Usuário</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setNome(text)}
                    value={nome}
                />

                <Text style={{ color: "#D3D3D3", fontSize: 20 }}>Senha</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSenha(text)}
                    value={senha}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={autenticarUsuario}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff' }} >Entrar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }} >
                    <Text style={{
                        color: "black",
                        fontSize: 18,
                        textAlign: 'center',
                        paddingTop: 20
                    }}>Não possui conta?&nbsp;&nbsp;</Text>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', height: 25 }}
                        onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={{ color: "#1976D2", fontSize: 16 }} >Inscrever-se</Text>
                    </TouchableOpacity>
                </View>

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