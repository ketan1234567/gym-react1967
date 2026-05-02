<?php
include('mailer_config/mailerConfig.php'); 
require "DataCurlNodeApi/DataCurlNodeApiFunctions.php";

// Enable error reporting for debugging
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */



$ENDURL = "https://www.salesforce.com/de/resources/articles/agentforce-guide-conf/";
 
$fields = [
    "Firstname" => "firstname",
    "Lastname" => 0,
    "Email" => 1,
	"jobtitle" => 2,
   "Company" => 3,
   "Company Size" => 4,
   //"Industry" => 5,
   "Phone" => 6,
   "Address" => 7,
   "Zip code" => 8,
	"Country" => 9,
	"State" => 10,
		"Industry" => 101,
	//"Province" => 11,
	//"Other country" => 12,
	"optin1" => 13

     
];
$mapped_data = [];
foreach ($fields as $key => $value) {
    $mapped_data[$key] = is_numeric($value) ? $_POST["data"][$value] : $_POST[$value];
}
$camp_id = $_POST["camp_id"];
//DON'T CHANGE THIS CODE (Data Get From LP)
$URL = ($_SERVER['HTTP_REFERER']);
$firstname = $_POST["firstname"];
$temp=json_encode(   utf8_converter( array('Field Count' => count($mapped_data)) +  $mapped_data ));
$pattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
preg_match_all($pattern, $temp, $matches);
$email = array_shift($matches[0]);
//DON'T CHANGE THIS CODE END







$country =$mapped_data["Country"];
$ENDURL = "";
if (in_array($country, [
	"Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "The Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "United Kingdom"
])) {
    $ENDURL = "https://resource.nexttechtoday.com/whitepapers/LP-VMC-Salesforce-FY-2026-Q1-DE-2nd-1-thankyou.html";
} else {
    $ENDURL = "https://www.salesforce.com/de/resources/articles/agentforce-guide-conf/";
}
 




/*-------  API CALL ------------*/
$data = [
    'camp_id' => $camp_id,
    'tempdata' => $temp,
    'ip_address' => getClientIp(),
    'URL' => ['URL' => $URL, 'END_URL' => $ENDURL]
];
dataCurlAPI(_VIBE_, $data);


                   
                             
$mail->From = "creatives@nexttechtoday.com";
$mail->FromName = "NextTech Today";
$mail->addAddress($email, $firstname);

$mail->isHTML(true);

$mail->Subject = '=?UTF-8?B?VmllbGVuIERhbmsgZsO8ciBJaHIgSW50ZXJlc3NlIGFu?= "=?UTF-8?B?V2llIEFnZW50aWMgQXV0b21hdGlvbiBJaG5lbiBoaWxmdCwgZGF1ZXJoYWZ0ZSBLdW5kZW5iZXppZWh1bmdlbiBhdWZ6dWJhdWVu?="';
$mail->Body = "<table>
				
				 <tr><td>Liebling&nbsp;$firstname,</td></tr>
				 <tr><td>&nbsp;</td></tr>
				<tr><td><p style='text-align: justify; font-size: 14px;'>Vielen Dank f&#252;r Ihre Anfrage <b>'Wie Agentic Automation Ihnen hilft, dauerhafte Kundenbeziehungen aufzubauen'</b> Sie k&#246;nnen es sofort anzeigen, indem Sie auf klicken <a href='https://www.salesforce.com/de/resources/articles/agentforce-guide-conf/'>HIER</a>!</p>
</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 
				
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>Beste gr&#252;&#223;e,</td></tr>
				 <tr><td>NextTech Today</td></tr>
				 
				 
				 
				 </table>";
							
$mail->AltBody = "";

try {
    $mail->send();
	// exit();
    // echo "Message has been sent successfully";
	// header('Location: https://www.google.com/');
	
	
	echo "<script>
	window.location.href = '$ENDURL';
	</script>";
} catch (Exception $e) {
    // echo "Mailer Error: " . $mail->ErrorInfo;
}

?>
