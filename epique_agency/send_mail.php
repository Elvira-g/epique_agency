<?php

$inputJSON = file_get_contents('php://input');
if($inputJSON !== null){
    $result = json_decode($inputJSON, TRUE);
    $recepient = "elvira_27@mail.ru";
    $name = $result["name"];
    $phone = $result["tel"];
    $mail = $result["email"];
    $address = $result["address"];
    $text = $result["textarea"];
    $message = "Имя: $name Телефон: $phone Почта: $mail Адрес сайта: $address Сообщение: $text";
    $pagetitle = "Lead from EPIQUE";
    $headers = "From: no-reply@epique-agency.ru";
    if (mail($recepient, $pagetitle, $message, $headers)) {
        echo json_encode(array($message));
    }  else {
        return false;  
    } 
}else{
    return false;
}
