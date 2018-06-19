<?php
    $str = file_get_contents('clipboard.json');
    $json = json_decode($str);
    if(isset($_GET["cat"]) && !empty($_GET["cat"]))
    {
        $key = $_GET["cat"];
        if(value_exist($json,$key))
        {
            $json_index = get_element($json,$key);
            if(isset($_GET["subCateg"]) && !empty($_GET["subCateg"]))
            {
                $subCateg = $_GET["subCateg"];
                if(subCateg_exist($json[$json_index]->value,$subCateg))
                {
                    $sub_index = get_sub($json[$json_index]->value,$subCateg);
                    if(isset($_GET["clip"]) && !empty($_GET["clip"]))
                    {
                        if($json[$json_index]->value[$sub_index]->text===null)
                            $json[$json_index]->value[$sub_index]->text=[];
                        array_push($json[$json_index]->value[$sub_index]->text,$_GET["clip"]);
                    }
                }else{
                    $newSub->subCategory = $subCateg;
                    if($json[$json_index]->value===null)
                    {
                        $json[$json_index]->value=[];
                    }
                    array_push($json[$json_index]->value,$newSub);
                }
            }
        }else{
            $new->category = $_GET["cat"];
            array_push($json,$new);
        }
    }
    file_put_contents('clipboard.json',json_encode($json,JSON_UNESCAPED_SLASHES));

    function value_exist($jsonarray,$expected)
    {
       for($i=0;$i<count($jsonarray);$i++)
       {
           $json = $jsonarray[$i];
           if(strcmp($json->category,$expected)===0)
            return true;
       }
       return false;
    }

    function subCateg_exist($jsonArray,$expected)
    {
        for($i=0;$i<count($jsonArray);$i++)
       {
           $json = $jsonArray[$i];
           if(strcmp($json->subCategory,$expected)===0)
            return true;
       }
       return false;
    }

    function get_element($jsonarray,$expected)
    {
        for($i=0;$i<count($jsonarray);$i++)
       {
           $json = $jsonarray[$i];
           if(strcmp($json->category,$expected)===0)
            return $i;
       }
       return -1;
    }

    function get_sub($jsonarray, $expected)
    {
        for($i=0;$i<count($jsonarray);$i++)
       {
           $json = $jsonarray[$i];
           if(strcmp($json->subCategory,$expected)===0)
            return $i;
       }
       return -1;
    }

?>