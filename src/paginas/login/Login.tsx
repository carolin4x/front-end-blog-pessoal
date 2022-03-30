import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserLogin from '../../models/UserLogin';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import './Login.css';


function Login() {

    // redireciona o usuário para determinada pagina
    let history = useHistory()

    // hooks que vão manipular o nosso Local Storage para gravar o Token
    const [token, setToken] = useLocalStorage('token')

    // useState define como uma determinada variavel será inicializada quando o Comp. for renderizado
    const [userLogin, setUserLogin] = useState<UserLogin>({

        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })



    // função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
    function updatedModel(e: ChangeEvent<HTMLInputElement>) { //updatedModel: trabalha em conjunto com o useState
        setUserLogin({
            ...userLogin, //spread operator: ... 
            [e.target.name]: e.target.value //1º lado: se referencia à propriedade que será captada, o 2º lado são os valores capturados.
        })
    }

    useEffect(() => {
        if (token != "") {
            history.push("/home")
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) { //vai olhar o form como um todo
        e.preventDefault(); //previne que o botão onSubmt atualize a tela, mantendo assim o padrão de SPA
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert("Usuário logado com suscesso!")
        } catch (error) {
            alert("Dados inconsistentes!")
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems="center">
            <Grid item xs={6} alignItems="center">
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center"
                            className="textosLogin">Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
                        <Box marginTop={2} textAlign="center">

                            <Button type='submit' variant='contained' color='primary' className="botaoLogin">
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center">
                                Ainda não tem uma conta?
                            </Typography>
                        </Box>
                        <Link to="/cadastrousuario">
                            <Typography variant="subtitle1" gutterBottom align="center" className="textosLogin">Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} className="imagem">
            </Grid>
        </Grid>
    );

}

export default Login;