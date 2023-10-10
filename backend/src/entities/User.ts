import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
    @PrimaryColumn()
    id: String

    @Column()
    name: String

    @Column()
    biograph: String

    @Column()
    photo: String

    @Column()
    email: String

    @Column()
    password: String //hash

    @CreateDateColumn()
    create_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
