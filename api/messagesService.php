<?php
    $origins = explode(',', $_POST['origins']);
    $list = [];
    $incounter = 0;
    $index = 0;
    foreach ($origins as $element) {
        if ($incounter == 2) {
            $incounter = 0;
            $index++;
        }
        $list[$index][$incounter] = $element;
        $incounter++;
    }
    $origins = $list;

    
    // Import PHPMailer classes into the global namespace
    // These must be at the top of your script, not inside a function
    require 'PHPMailer-master/src/Exception.php';
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //Server settings
        $mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'elkarouani@gmail.com';                 // SMTP username
        $mail->Password = 'UCHIHApass';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        //Recipients
        $user = simplexml_load_file('../database/users.xml');

        $mail->setFrom('elkarouani@gmail.com', 'Mailer');
        $mail->addAddress($user->email, $user->name);     // Add a recipient
        $mail->addReplyTo('elkarouani@gmail.com', 'Information');
        $mail->addCC('elkarouani@gmail.com');
        $mail->addBCC('elkarouani@gmail.com');

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Résultat de vente : ';
        $mail->Body = '
            <ul>
                <li>vous gagne : '. $_POST['totalPrice'] .' </li>
                <li>
                    vous vendez : <br>';
                    foreach ($origins as $origin) {$mail->Body .= '<ul><li>Origin : '.$origin[0].'</li><li>Quantité : '.$origin[1].'</li></ul>';}
        $mail->Body .='
                </li>
            </ul>
            ';
        $mail->CharSet = 'UTF-8';
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
?>