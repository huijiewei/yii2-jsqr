<?php


namespace huijiewei\jsqr;

use yii\base\Widget;

class JsQrWidget extends Widget
{
    public $callback = 'function(data){ console.log(data) }';

    public function init()
    {
        parent::init();

        JsQRAsset::register($this->getView());

        $js = <<<EOD
$.jsQR($('#$this->id'), $this->callback);
EOD;

        $this->getView()->registerJs($js);
    }

    public function run()
    {
        $html = '<div id="' . $this->id . '" class="jsqr">';

        $html .= '<div class="jsqr-start">';

        $html .= '<button class="btn btn-sm btn-default jsqr-btn-start">打开摄像头扫描二维码</button>';

        $html .= '</div>';

        $html .= '<div class="jsqr-wrap hidden">';

        $html .= '<canvas class="jsqr-canvas"></canvas>';

        $html .= '<div class="jsqr-toolbar clearfix">';

        $html .= '<div class="jsqr-message pull-left">请把二维码对准摄像头</div>';

        $html .= '<div class="pull-right jsqr-buttons">';

        $html .= '<button class="btn btn-sm btn-warning jsqr-btn-close">关闭</button>';

        $html .= '</div>';

        $html .= '</div>';

        $html .= '</div>';

        $html .= '</div>';

        return $html;
    }
}
