YII2 jsQR 二维码扫描扩展

大部分浏览器需要开启 https 才可以正常使用，Firefox 可以不使用 https

同一二维码每5秒才会 callback 一次

演示地址：https://huijiewei.github.io/yii2-jsqr/

```php
<?= \huijiewei\jsqr\JsQrWidget::widget([
    'id' => 'jsQR',
    'callback' => 'function(code) { console.log(code); }'
]) ?>
```