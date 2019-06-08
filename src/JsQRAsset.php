<?php
/**
 * Created by PhpStorm.
 * User: huijiewei
 * Date: 6/8/15
 * Time: 12:19
 */

namespace huijiewei\jsqr;

use yii\bootstrap\BootstrapAsset;
use yii\web\AssetBundle;
use yii\web\JqueryAsset;

class JsQRAsset extends AssetBundle
{
    public $sourcePath = '@huijiewei/jsqr/assets';

    public $js = [
        'jsQR.min.js',
        'jsQR.scan.js',
    ];

    public $css = [
        'jsQR.scan.css',
    ];

    public $depends = [
        JqueryAsset::class,
        BootstrapAsset::class,
    ];
}
