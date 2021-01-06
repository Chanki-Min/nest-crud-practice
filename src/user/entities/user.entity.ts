import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

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
}