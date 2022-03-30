import axios from 'axios'; /* axios vai interceptar toda requisição */

export const api = axios.create({ /*inicializo criando um Objeto chamado API */
    baseURL: "https://blogdaxeron.herokuapp.com"
    // enderço da api da gen https://bloggeneration.herokuapp.com
})

export const cadastroUsuario = async (url: any, dados: any, setDados: any) => { /* crio metodo de cadastroUsuaro */
    const resposta = await api.post(url, dados) //recebe uma resposta await(aguarde) e aciona a api acima com 2 parametros: url e dados
    setDados(resposta.data) //
}

export const login = async (url: any, dados: any, setDados: any) => { /* crio metodo de login */
    const resposta = await api.post(url, dados)
    setDados(resposta.data.token)
}
