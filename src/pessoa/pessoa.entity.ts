import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    idade: number;

    @Column()
    endereco: string;

    @Column()
    githubId: number;

    @Column()
    githubUser: string;

    @Column()
    githubAvatar: string;
}
