import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'author' })
class Author {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  public users: UserEntity[];

}

export default Author;