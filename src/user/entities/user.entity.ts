import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({type: 'varchar', length: 20})
    username: string;

    @Column()
    passwordHash: string;
}