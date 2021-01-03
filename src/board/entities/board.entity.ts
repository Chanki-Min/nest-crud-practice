import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    author: string;

    @Column({type: 'varchar', length: 50})
    title: string;

    @Column({type: 'varchar'})
    content: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    constructor(author?: string, title?: string, content?: string, createAt?: Date, updateAt?: Date) {
        this.author = author || '';
        this.title = title || '';
        this.content = content || '';
        this.createAt = createAt || new Date();
        this.updateAt = updateAt || new Date();

    }
}