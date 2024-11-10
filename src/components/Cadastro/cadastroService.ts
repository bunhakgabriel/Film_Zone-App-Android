import { app } from '../../firebase/firebase';
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, query, where } from 'firebase/firestore'

import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(app);

type user = {
    nomeUsuario: string,
    senha: string
}

export const cadastrarUsuarioService = async (usuario: user): Promise<{ value: boolean, msg: string }> => {
    const resposta = {value: false, msg: ""};
    const usuariosCollection = collection(db, 'usuarios');
    const q = query(usuariosCollection, where('nomeUsuario', '==', usuario.nomeUsuario));
    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty){
        resposta.msg = "Já existe um usuário com esse nome" 
        return resposta;    
    }

    try{
        await addDoc(usuariosCollection, usuario);
        resposta.value = true;
        resposta.msg = "Cadastro realizado com sucesso"  
    } catch (e) {
        console.log('ERROR: ', e)
        resposta.msg = 'Erro ao cadastrar usuário, aguarde e tente novamente';
    }

    return resposta
}

export const autenticarUsuarioService =
    async (usuario: user): Promise<{ value: boolean, msg: string }> => {
        try {
            const usuariosCollection = collection(db, 'usuarios');
            const q = query(usuariosCollection, where('nomeUsuario', '==', usuario.nomeUsuario));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                if (usuario.senha != userData.senha) return { value: false, msg: 'Senha incorreta' }
                await AsyncStorage.setItem('User', JSON.stringify({ user: usuario.nomeUsuario }))
            } else {
                return { value: false, msg: "Usuário não encontrado" };
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }

        return { value: true, msg: "Login realizado com sucesso!" }
    }
