import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
const axios = require('axios');

@Injectable()
export class PessoaService {
    constructor(
        @InjectRepository(Pessoa) private pessoaRepository: Repository<Pessoa>,
    ) { }

    async all(): Promise<Pessoa[]> {
        return this.pessoaRepository.find();
    }

    async create(data: Pessoa): Promise<Pessoa>{
        return this.pessoaRepository.save(data);
    }

    async getOne(id: number): Promise<Pessoa>{
        return this.pessoaRepository.findOne(id);
    }

    async update(id: number, data: Pessoa) {
        data.id = id;
        return this.pessoaRepository.update(id, data);
    }

    async delete(id: number) {
        return this.pessoaRepository.delete(id);
    }

    async prepararEndereco(pessoa: Pessoa): Promise<Pessoa> {
        let endereco = await axios.get(`https://viacep.com.br/ws/${pessoa.endereco}/json/`)
        .then(resp => {
            let dados = resp.data;
            var retorno = `${dados.logradouro},`;
            if(dados.complemento != '') {
                retorno += `${dados.complemento}`;
            }
            retorno += ` ${dados.bairro}, ${dados.localidade} - ${dados.uf}, CEP: ${dados.cep}`;
            return retorno;
        });
        pessoa.endereco = endereco;
        return pessoa;
    }

    async prepararUsuarioGithub(pessoa: Pessoa): Promise<Pessoa> {
        let githubUser = await axios.get(`https://api.github.com/search/users?q=${pessoa.githubUser}`)
        .then(resp => {
            let dados = resp.data.items[0];
            return dados;
        });

        //id
        pessoa.githubId = githubUser.id;
        //user
        pessoa.githubUser = githubUser.login;
        //avatar
        pessoa.githubAvatar = githubUser.avatar_url;
        return pessoa;
    }
}