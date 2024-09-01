<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240901212404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pet_post ADD author_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE pet_post ADD CONSTRAINT FK_41C289E7F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_41C289E7F675F31B ON pet_post (author_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pet_post DROP FOREIGN KEY FK_41C289E7F675F31B');
        $this->addSql('DROP INDEX IDX_41C289E7F675F31B ON pet_post');
        $this->addSql('ALTER TABLE pet_post DROP author_id');
    }
}
