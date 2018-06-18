<?php
    $str = file_get_contents('clipboard.json');
    $json = json_decode($str);
    if(isset($_GET["cat"]) && !empty($_GET["cat"]))
    {
        $new->category = $_GET["cat"];
        array_push($json,$new);
    }
    file_put_contents('clipboard.json',json_encode($json,JSON_UNESCAPED_SLASHES));
?>