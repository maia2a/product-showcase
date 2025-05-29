import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') //Auto genera um UUID para a chave primaria
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string; // Campo para o nome do produto

  @Column({ type: 'text', length: 255, nullable: false })
  description: string; // Campo para a descrição do produto

  @Column({ type: 'decimal', nullable: false })
  price: number; // Campo para o preço do produto

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl?: string; // Campo para a imagem do produto

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date; // Campo para a data de criação do produto

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; // Campo para a data de atualização do produto
}
