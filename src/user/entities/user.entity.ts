import { Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { Board } from '../../board/entities/board.entity';

@Entity()
export class User {
    @PrimaryColumn({type: 'varchar', length: 20})
    username: string;

    @Column()
    name: string;

    @Column({unique: true})
    emailAddress: string;

    @Column()
    password: string;

    @OneToMany((type: any) => Board, board => board.id, {
        cascade: false,
    })
    boards: Board[];
}