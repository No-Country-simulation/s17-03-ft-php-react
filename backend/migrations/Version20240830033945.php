<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240830033945 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE pet_post (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, gender VARCHAR(1) NOT NULL, age INT DEFAULT NULL, description LONGTEXT NOT NULL, size INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pet_post_image (id INT AUTO_INCREMENT NOT NULL, pet_post_id INT NOT NULL, image_path VARCHAR(255) NOT NULL, image_kit_file_id VARCHAR(255) NOT NULL, main BOOLEAN NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_55AED06055C783CA (pet_post_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE pet_post_image ADD CONSTRAINT FK_55AED06055C783CA FOREIGN KEY (pet_post_id) REFERENCES pet_post (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pet_post_image DROP FOREIGN KEY FK_55AED06055C783CA');
        $this->addSql('DROP TABLE pet_post');
        $this->addSql('DROP TABLE pet_post_image');
    }
}
