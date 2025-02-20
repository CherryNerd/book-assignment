<?php

namespace app\controllers;

use app\services\BookService;
use app\models\Book;
use Yii;
use yii\db\ActiveRecord;
use yii\db\Exception;
use yii\filters\Cors;

class BookController extends \yii\rest\ActiveController
{
    public $modelClass = 'app\models\Book';

    public static function allowedDomains()
    {
        return [
            '*',
        ];
    }

    public function behaviors()
    {
        return array_merge(parent::behaviors(), [

            // For cross-domain AJAX request
            'corsFilter'  => [
                'class' => Cors::className(),
                'cors'  => [
                    // restrict access to domains:
                    'Origin'=> static::allowedDomains(),
                    'Access-Control-Request-Method'    => ['POST','GET','PUT','OPTIONS'],
                    'Access-Control-Allow-Credentials' => false,
                    'Access-Control-Max-Age'           => 3600,// Cache (seconds)
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Origin' => false,

                ],
            ],

        ]);
    }

    /**
     * @param string $input
     * @return array|string|ActiveRecord[]
     * @throws Exception
     */
    public function actionSearch(string $input): array|string
    {
        $service = new BookService();
        $result = false;
        return $service->getBooksByInput($input);
    }
}
