import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("") /*vai pegar info que usuario ta digitando */
    const [user, setUser] = useState<User>( 
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    const [userResult, setUserResult] = useState<User>( /*vai armazenar os valores e retorna a resposta da requisição ao backend */
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert('Usuario cadastrado com sucesso')
        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="imagemCadastro"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                    <form onSubmit={cadastrar}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center"
                            className="textosCadastro">Cadastre-se</Typography>
                        <TextField
                            value={user.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="nome"
                            label="nome"
                            variant="outlined"
                            name="nome"
                            margin="normal"
                            fullWidth required />

                        <TextField
                            value={user.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="usuario"
                            label="usuario"
                            variant="outlined"
                            name="usuario"
                            margin="normal"
                            fullWidth required />

                        <TextField
                            value={user.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="senha"
                            label="senha"
                            variant="outlined"
                            name="senha"
                            margin="normal"
                            type="password"
                            fullWidth required />

                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id="confirmarSenha"
                            label="confirmarSenha"
                            variant="outlined"
                            name="confirmarSenha"
                            margin="normal"
                            type="password"
                            fullWidth required />

                        <TextField
                            value={user.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="foto"
                            label="foto"
                            variant="outlined"
                            name="foto"
                            margin="normal"
                            fullWidth />

                        <Box marginTop={2} textAlign="center">
                            <Link to='/login' className="text-decorator-none">
                                <Button variant="contained" color="secondary" className="botaoCancelar">
                                    Cancelar
                                </Button>
                            </Link>
                                <Button type="submit" variant="contained" color="primary" className="botaoCadastrar">
                                Cadastrar
                                </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );

}

export default CadastroUsuario;
