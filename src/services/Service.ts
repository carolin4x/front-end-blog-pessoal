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

export const busca = async(url: any, setDados: any, header: any) =>  { 
    const resposta = await api.get(url, header)
    setDados(resposta.data) // a resposta é um obj que tem dentro varios objs. Nesse caso vamos acessar os atributos da model Tema (id e descrição)
}

export const buscaId = async(url: any, setDados: any, header: any) =>  { 
    const resposta = await api.get(url, header)
    setDados(resposta.data) // a resposta é um obj que tem dentro varios objs. Nesse caso vamos acessar os atributos da model Tema (id e descrição)
}

export const post = async(url: any, dados: any, setDados: any, header: any) =>  { 
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data) // a resposta é um obj que tem dentro varios objs. Nesse caso vamos acessar os atributos da model Tema (id e descrição)
}

export const put = async(url: any, dados: any, setDados: any, header: any) =>  { 
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data) 
}

export const deleteId = async(url: any, header: any) =>  { 
    const resposta = await api.delete(url, header)
} // não vamos ter retorno (setDados)