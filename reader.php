<?php
    $str = file_get_contents('clipboard.json');
    $json = json_decode($str,true);
    echo json_encode($json);
?>