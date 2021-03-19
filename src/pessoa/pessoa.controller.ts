import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Pessoa } from './pessoa.entity';
import { PessoaService } from './pessoa.service';

@Controller('api/pessoa')
export class PessoaController {

    constructor(private pessoaService: PessoaService){}

    @Get()
    async all(): Promise<Pessoa[]>{
        return this.pessoaService.all();
    }

    @Post()
    async create(@Body() pessoa: Pessoa){
        var temp = await this.pessoaService.prepararEndereco(pessoa);
        temp = await this.pessoaService.prepararUsuarioGithub(temp);
        return this.pessoaService.create(temp);
    }

    @Get(':id')
    async getOne(@Param('id') id): Promise<Pessoa> {
        return this.pessoaService.getOne(id);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() pessoa: Pessoa){
        return this.pessoaService.update(id, pessoa);
    }

    @Delete (':id')
    async delete(@Param('id') id){
        return this.pessoaService.delete(id);
    }
}
