import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User'

@Entity('posts')
export class Post {
    @PrimaryColumn()
    id: String

    @Column()
    user_id: String

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    title: String

    @Column()
    description: String

    @Column()
    photo: String

    @CreateDateColumn()
    create_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
