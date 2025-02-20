<?php

use yii\db\Migration;

class m250217_234639_books extends Migration
{
    public $db;

    public function getDbConnection(string $db)
    {
        return $this->db = Yii::$app->get($db);
    }

    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Running migration on first database
        $this->getDbConnection('db');
        $this->createBooksTable();

        // Run same migration on second database
        $this->getDbConnection('secondDb');
        $this->createBooksTable();

        $this->populateTable2();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->getDbConnection('db');
        $this->dropTable('books');

        $this->getDbConnection('secondDb');
        $this->dropTable('books');
    }

    /**
     * @return void
     */
    private function createBooksTable()
    {
        $this->createTable('books', [
            'id' => $this->primaryKey(),
            'isbn' => $this->string(17)->notNull()->unique(),
            'title' => $this->string(50)->notNull()->unique(),
            'author' => $this->string(50)->notNull(),
            'pages' => $this->integer()->notNull()->defaultValue(0),
            'language' => $this->string(2)->notNull()->defaultValue('nl')
        ]);

        $this->createIndex('idx_books_isbn', 'books', 'isbn');
        $this->createIndex('idx_books_title', 'books', 'title');
        $this->createIndex('idx_books_author', 'books', 'author');
    }

    private function populateTable2()
    {
        $columns = ['id', 'isbn', 'title', 'author', 'pages', 'language'];
        $books = [
            [
                1,
                '9789049202576',
                'De vergeten vrouwen',
                'Kristin Hannah',
                '108',
                'nl'
            ],
            [
                2,
                '9789025476670',
                'James',
                'Percival Everett',
                '29',
                'en',
            ],
            [
                3,
                '9780241624142',
                'Funny Story',
                'Emily Henry',
                '229',
                'en',
            ],
            [
                4,
                '9780008663803',
                'The God of the Woods',
                'Liz Moore',
                '362',
                'en',
            ],
        ];

        $this->db = $this->getDbConnection('secondDb');
        $this->batchInsert('books', $columns, $books);
    }
}
