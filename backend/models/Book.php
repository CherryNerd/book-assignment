<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Book extends ActiveRecord
{
    const DB_DATABASE1 = 'db';
    const DB_DATABASE2 = 'secondDb';
    private static string $db = self::DB_DATABASE1;

    public static function tableName()
    {
        return '{{books}}';
    }

    // Function within class to switch between the 2 databases, with exception when not chosen
    public static function getDb()
    {
        switch (self::$db) {
            case self::DB_DATABASE1:
                return Yii::$app->db;
            case self::DB_DATABASE2:
                return Yii::$app->secondDb;
            default:
                throw new \Exception("Database is not selected");
        }
    }

    /**
     * @param $db
     * @return void
     */
    public static function setDb($db)
    {
        self::$db = $db;
    }

    /**
     * @return array
     */
    public function rules()
    {
        return [
            [['pages'], 'integer'],
            [['isbn'], 'string', 'max' => 17],
            [['title'], 'string', 'max' => 50],
            [['author'], 'string', 'max' => 50],
            [['language'], 'string', 'max' => 2]
        ];
    }
}