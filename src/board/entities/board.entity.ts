import { use } from "passport";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type: any) => User, user => user.boards, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
    )    //한 유져는 많은 글과의 관계를 맺고 있다
    username: string; 

    @Column({type: 'varchar', length: 50})
    title: string;

    @Column({type: 'varchar'})
    content: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    constructor(title?: string, content?: string, createAt?: Date, updateAt?: Date) {
        this.title = title || '';
        this.content = content || '';
        this.createAt = createAt || new Date();
        this.updateAt = updateAt || new Date();
    }
}