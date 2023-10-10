import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Post } from "./Post";

@Entity("likes")
export class Like {

    @PrimaryColumn()
    id: String;

    @Column()
    user_id: String;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    post_id: String;

    @ManyToOne(() => Post)
    @JoinColumn({name: "post_id"})
    post: Post;

    @Column()
    active: Boolean;

    @CreateDateColumn()
    create_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}