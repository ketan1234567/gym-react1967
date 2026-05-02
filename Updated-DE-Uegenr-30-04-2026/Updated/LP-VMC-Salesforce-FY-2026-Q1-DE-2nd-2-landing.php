



<!DOCTYPE html>
<html lang="en">

<head>
    <title> Marketing leicht gemacht - mit Agentforce Kampagnen erstellen.
    </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">



<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XHFB4720HX"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-XHFB4720HX');
</script>


    <style>
        body {
            font-family: Calibre, Helvetica, sans-serif;
            font-style: normal;
            line-height: 1.4;
            -webkit-font-smoothing: antialiased;
            padding: 0;
            margin: 0;
            cursor: arrow-down;
        }

        .col-md-12 {
            background-color: #F5F5F5F5;
        }

        /*.contact-title {
    font-family: 'PT Serif', serif;
    font-size: 50px;
    font-style: italic;
    margin-bottom: 40px;
    line-height:80px;
}*/

        .contact-caption-text {
            font-size: 23px;
            color: #272d2c;
        }

        #contact-map {
            height: 450px;
            width: 100%;
            position: relative;
        }

        .contact-form {
            background-color: #fafaff00;
            color: #fff;
            padding: 30px;
            text-align: center;
            position: relative;
            bottom: 0px;
            /* -webkit-box-shadow: 1px 2px 14px 0px rgba(0, 0, 0, 0.29); */
            -moz-box-shadow: 1px 2px 14px 0px rgba(0, 0, 0, 0.29);
            box-shadow: 1px 2px 14px 0px #4C4084;
        }

        .contact-section {
            margin-bottom: 40px;
            margin-top: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e4e9e8;
        }

        .contact-section .contact-icon {
            float: left;
            margin-bottom: 20px;
            display: inline-block;
            font-size: 25px;
            color: #34b2a4;
            padding-right: 20px;
            position: initial;
        }

        .contact-section .contact-info {
            padding-top: 10px;
            font-weight: 700;
        }

        .contact-social {}

        .contact-social ul {}

        .contact-social ul li {
            float: left;
        }

        .contact-social ul li a {
            font-size: 16px;
            padding-right: 10px;
            color: #6b6c6d;
        }

        .contact-social ul li a:hover {
            color: #0084bf;
        }

        .location-block {
            border-radius: 2px;
            border: 1px solid #eaeaea;
            padding: 30px;
            margin-bottom: 20px;
            background-color: #fff;
        }

        .location-content {}

        .location-block ul {}

        .location-block ul li {
            line-height: 2.2;
            font-size: 15px;
        }

        .location-icon {
            color: #0084bf;
            padding-right: 10px;
            font-size: 15px;
        }

        .fa {
            padding: 5px;
            font-size: 20px;
            width: 30px;
            text-align: center;
            text-decoration: none;
            border-radius: 50%;
        }

        .fa:hover {
            opacity: 0.7;
        }

        .fa-facebook {
            background: #3B5998;
            color: white;
        }

        .fa-twitter {
            background: #55ACEE;
            color: white;
        }

        .fa-google {
            background: #dd4b39;
            color: white;
        }

        .fa-linkedin {
            background: #007bb5;
            color: white;
        }

        .cform {
            position: relative;
        }

        @media only screen and (max-width: 600px) {
            .cform {
                top: 10px;
                position: relative;
            }
        }

        /* On screens that are 992px wide or less, the background color is blue */
        @media screen and (max-width: 992px) {
            .cform {
                position: relative;
            }
        }

        .box-shadow {
            -webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
            -moz-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
            box-shadow: 0px 10px 20px 16px rgba(50, 50, 50, 0.52)
        }

        #lp-pom-box-150 {
            display: block;
            background: #ff4f1f;
            -pie-background: rgba(37, 156, 167, 1);
            border-style: none;
            behavior: url(//d9hhrg4mnvzow.cloudfront.net/PIE.htc);
            border-radius: 0px;
            left: 0px;
            top: 0px;
            z-index: 36;
            width: 100%;
            height: 73px;
            position: absolute;
        }

        .well {
            background-color: #fff;
        }

        .arrow-down {
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid #ff4f1f;
        }

        button,
        html input[type="button"],
        input[type="reset"],
        input[type="submit"] {
            -webkit-appearance: button;
            cursor: pointer;
        }

        .btn {
            display: inline-block;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
            background-color: #ff4f1f;
        }

        .btn-default {
            color: #fff;
            background-color:#3608d5;
            border-color: #4C4084;
        }

        .btn-default:hover {
            color: #fff;
            background-color: #3608d5;
            border-color: #4C4084;
        }

        .btn-lg,
        .btn-group-lg>.btn {
            font-family: futura_maxi_cg_demiregular, tahoma, arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            border-radius: 6px;
        }

        .btn-default,
        .btn-primary,
        .btn-success,
        .btn-info,
        .btn-warning,
        .btn-danger {
            text-shadow: 0 -1px 0 rgba(0, 0, 0, .2);
            -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
        }

        @media screen and (max-width: 992px) {
            .col-md-offset-2 {
                margin-left: 12.666667%;
            }
        }

        @media screen and (max-width: 600px) {
            .col-md-offset-2 {
                margin-left: -0.333333%;
            }
        }


        .col-md-8 {
            width: 76.666667%;
        }


        ul {
            list-style: none;
        }
		
		ul li{
			margin-bottom:8px;
		}

        ul li::before {
            content: "\2022";
            color: #000;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }

        hr {
            margin-top: 20px;
            margin-bottom: 20px;
            border: 0;
            border-top: 1px solid #4C4084;
        }
		span.error {
        color: #f00;
		float: left;
       }
	   
	   .cq{
		   
		   color:black;
		   font-size:12px;
		   float:left;
		   font-weight: bold;
		   text-align: left;
		   
	   }
    </style>
	
		<script src="https://resource.nexttechtoday.com/whitepapers/jquery-3.7.1.min.js"></script>
		<script src="https://resource.nexttechtoday.com/whitepapers/jquery.validate.min.js" ></script>

	<script type="text/javascript" charset="utf-8">
	$(document).ready(function() { 
	
	jQuery.validator.addMethod(
    "email",
    function(value, element) {
        // Regular expression for email validation
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    },
    "Please enter a valid email address."
);
	
	// validate signup form on keyup and submit
			$("#signup_form").validate({
			errorElement: 'span',
			errorPlacement: function (error, element) {
				if (element.attr("type") == "radio") {
							error.appendTo(element.closest(".check-group"));
						} else if (element.attr("type") == "checkbox") {
							error.appendTo(element.closest(".check-group"));
						} else {
							error.appendTo($(element).parent());
						} 
					
					},
			
				rules: {
					firstname: {
						required: true,
					},
					lastname: {
						required: true,
					},
					job_function: {
						required: true,
					},
					email: {
						required: true,
						nofreeemail: true,
						email: true
					},
					work_phone: {
						required: true,
						number: true
					},
					company: {
						required: true,
					},
					std1: {
						required: true,
					},
					city: {
						required: true,
					},
					state: {
						required: true,
					},
					country: {
						required: true,
					},
					address_street1: {
						required: true,
					},
					std2: {
						required: true,
					},
					std3: {
						required: true,
					},
					std4: {
						required: true,
					},
					std5: {
						required: true,
					},
					zip: {
						required: true,
					},
					Industry: {
						required: true,
					}
					,
					cust1: {
						required: true,
					},
					cust2: {
						required: true,
					},
					cust3: {
						required: true,
					},
					cust4: {
						required: true,
					},
					cust5: {
						required: true,
					},
					cust1_1: {
						required: true,
					},
					cust1_2: {
						required: true,
					},
					cust1_3: {
						required: true,
					}
					
				},
				messages: {
					firstname: {
						required: "This field is required."
					},
					lastname: {
						required: "The details are incorrect/incomplete"
					},
					job_function: {
						required: "The details are incorrect/incomplete"
					},
					email: {
						required: "Please enter an email address",
						nofreeemail: "Please enter your business email, generic email not allowed",
						email: "Please enter a valid email address"
					},
					work_phone: {
						required: "The details are incorrect/incomplete",
						number : "Phone number must contain digits only"
					},
					company: {
						required: "The details are incorrect/incomplete"
					},
					std1: {
						required: "The details are incorrect/incomplete"
					},
					Industry: {
						required: "The details are incorrect/incomplete"
					},
					city: {
						required: "The details are incorrect/incomplete"
					},
					state: {
						required: "The details are incorrect/incomplete"
					},
					country: {
						required: "The details are incorrect/incomplete"
					},
					zip: {
						required: "The details are incorrect/incomplete",
						number: "Zip code must contain digits only",
						rangelength : "Zip code must have between 3 to 5 digits"
					},
					address_street1: {
						required: "The details are incorrect/incomplete"
					},
					std2: {
						required: "The details are incorrect/incomplete"
					},
					std3: {
						required: "The details are incorrect/incomplete"
					},
					std4: {
						required: "The details are incorrect/incomplete"
					},
					std5: {
						required: "The details are incorrect/incomplete"
					},
					Industry: {
						required: "The details are incorrect/incomplete"
					},
					cust1: {
						required: "The details are incorrect/incomplete"
					},
					cust2: {
						required: "The details are incorrect/incomplete"
					},
					cust3: {
						required: "The details are incorrect/incomplete"
					},
					cust4: {
						required: "The details are incorrect/incomplete"
					},
					cust5: {
						required: "The details are incorrect/incomplete"
					},
					cust1_1: {
						required: "The details are incorrect/incomplete"
					},
					cust1_2: {
						required: "The details are incorrect/incomplete"
					},
					cust1_3: {
						required: "The details are incorrect/incomplete"
					}
				}
			});
			
			$(".cust1_1_div,.cust1_2_div,.cust1_3_div").hide();

			$("#cust1").change(function(){
				if(this.value == "No Solution")
				{
					$(".cust1_1_div").show();
				}
				else{
					$(".cust1_1_div").hide();
				}
				
				if(this.value == "In-house solution")
				{
					$(".cust1_2_div").show();
				}
				else{
					$(".cust1_2_div").hide();
				}
				
				if(this.value == "3rd-party solution")
				{
					$(".cust1_3_div").show();
				}
				else{
					$(".cust1_3_div").hide();
				}
			});
			
			
	});
	</script> 
	
	<!--<script type="text/javascript" charset="utf-8">
			$(document).ready(function() { 
			
				$('#country').on('change', function() {
				  if ( this.value == 'United States of America')
				  {
					$("#us").show();
					$("#allstate").hide();
					$("#province").hide();
				  } else if(this.value == 'Canada') {
						$("#us").hide();
					  $("#province").show();
					  $("#allstate").hide();
					
				  } else {
						$("#us").hide();
						$("#province").hide();
					  $("#allstate").hide();
					
				  }
				});
			
			});
	</script> -->
	
	
</head>

<body>

    <div class="container col-md-12">
        <div style='background-color:#dcdcdc; '>
            <div>
                <a href='https://nexttechtoday.com/' style='float:left;width: 192px;' target="_blank">
                    <img src="https://resource.nexttechtoday.com/whitepapers/NTT-Logo.png" alt="itechseries" target="_blank" class="img-responsive" style="margin: 55px 25px 0px 15px;"/>
                    </a>
                
              
                    <img src="https://resource.nexttechtoday.com/whitepapers/VMC_Salesforce11.png" class="img-responsive"
                        style="width: 133px;
                        float: right;
                       margin: 55px 25px 0px 0px;">
             
            </div>
        </div>

        <div class='clearfix'></div>
        <hr style='border-color:#4C4084; border-width: 1px 0;;'>
        <div class='row' >
            <center>
                <h1 class="lplh-43">
                    <span style="font-size:25px;">
                        <strong>
                            <span style="color:#5D3E5D">
                                <h1
                                    style="color:#000;font-weight: bold;  font-family: Merriweather,Georgia,serif;font-size: 26px;font-weight: 500;">
                                    <strong> Marketing leicht gemacht - mit Agentforce Kampagnen erstellen.</strong>
                                </h1>
                                <!-- <h3
                                    style="color:#FFFF;font-weight: bold;font-size: 20px;padding-bottom: 20px;font-family: Merriweather,Georgia,serif;font-weight: 500;">
                                    <strong></strong>
                                </h3> -->
                            </span>
                        </strong>
                    </span>
                </h1>

                <!--<image src = "https://resources.martechseries.com/mts-whitepapers/A competitive CMS platform for a competitive market._banner.jpg" style ="width : 100%;" > -->
            </center>

        </div>

        
        <hr style='border-color:#4C4084; border-width: 1px 0;;'>

        <div class="col-md-offset-2 col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div class="contact-caption">
                <div style='border:thin;  margin-top:40px;'>


 <!--<h3 style="color:#000;font-weight: bold;font-family: Merriweather,Georgia,serif;font-weight: 500;font-size:21px;">
    
	</h3>-->
<!--<p>
<b> Ein moderner Tech-Stack verhilft Ihnen zu effizienteren Betriebsabl&#228;ufen, Kosteneinsparungen und st&#228;rkerer Kundentreue.  </b>
</p>-->


 <p><b>Entdecken Sie, wie Agentforce die Kampagnenerstellung beschleunigt.</b><br><br>
Das Erstellen und Skalieren von Kampagnen muss nicht kompliziert sein. Sehen Sie im Demo-Video, wie Marketingprofis mit Agentforce:


 </p>
 <ul>
  <li>Kampagnen, Briefings und Assets per Prompt erstellen</li>
  <li>Workflows automatisieren und die Personalisierung optimieren</li>
  <li>Zeit sparen und bessere Marketing-Ergebnisse erzielen
</li>
</ul>
 <p>
Sie haben Fragen? Rufen Sie uns an unter +49 800 0010546.



 </p>
 


                      <ul style="width: 100%;font-size: 16px; font-family: Merriweather,Georgia,serif;">
 
                            
                         </ul> 
						 
					
                        
                    </p>
                    <br>
                </div>
                <img class="fb-image-lg img-responsive"
                    src="https://resource.nexttechtoday.com/whitepapers/LP-VMC-Salesforce-FY-2026-Q1-DE-2nd-2.png"
                    style="height: auto;border:0px solid gray;width:80%;"> 
            </div>
            <div class='clearfix'></div><br />
        </div>

        <div class="col-md-offset-1 col-md-3 col-sm-12 col-xs-12 cform">
            <div class="contact-form" style="margin-right: 15px; border-radius:10px; width: 337px; margin-bottom:25px; margin-top: 40px;">
                <div class="row" style='margin:0px;'>
                    <center>
                        <!-- <h5 style=" color:#000;font-weight: bold; ">DON'T MISS OUT</h5> -->
                        <h4 style=" color:#000;font-weight: bold; ">Gleich anmelden und Demo ansehen.</h4>
                        <hr />
                        <center>
                            <form METHOD="POST" action="LP-VMC-Salesforce-FY-2026-Q1-DE-2nd-2-sendemail.php"class="signup_form" id="signup_form" name="signup_form" >
							  <!--XXX ... DON'T CHANGE THIS CODE ... XXX-->
                         <input type="hidden" name="action" id="action" value="insert" />                       
                         <input type="hidden" name="camp_id" id="camp_id" value="nexttechtoday-LP-VMC-Salesforce-FY-2026-Q1-DE-2nd-2" />
                         <!--XXX ... DON'T CHANGE THIS CODE ... XXX-->
                         <div class="Jumbotron">
                                    <center>
                                        <div>
                                            <div class="row">
                                                <input id="name" class="form-control" type="text" name="firstname"
                                                    placeholder="Vorname" required="required" />
                                            </div>
                                        </div><br />
                                        <div>
                                            <div class="row">
                                                <input id="lastname" class="form-control" type="text" name="data[0]"
                                                    placeholder="Nachname" required="required" />
                                            </div>
                                        </div><br />
                                        
										 <div class="row">
                                            <input id="jobtitle" class="form-control" type="text" name='data[2]'
                                                placeholder="Berufsbezeichnung" required="required" />
                                        </div><br />
										
										<div class="row">
                                            <input id="email" class="form-control" type="email" name="data[1]"
                                                placeholder="E-Mail" required="required" />
                                        </div><br />
										
										 <div class="row">
                                            <input id="Company" class="form-control" type="text" name="data[3]"
                                                placeholder="Name der Firma" required="required" />
                                        </div><br />
										
												

 <div class="row">
                                            <select name="data[4]" class="form-control" id="Employees" size="1"
                                                required="required">
                                                <option value="" selected>Unternehmensgr&#246;&#223;e</option>
                                                      
													  <option value="1-20 employees">1&#8211;20 Mitarbeiter</option>
<option value="21-100 employees">21&#8211;100 Mitarbeiter</option>
<option value="101-500 employees">101&#8211;500 Mitarbeiter</option>
<option value="501-3500 employees">501&#8211;3500 Mitarbeiter</option>
<option  value="3501+ employees">3501 oder mehr Mitarbeiter</option>
                                            </select>
                                        </div> 
<br />


 <!--<div class="row">
                                            <select name="data[5]" class="form-control" id="Industry" size="1"
                                                required="required">
												<option value="" selected>Industrie</option>
<option value="Landwirtschaft & Bergbau">Landwirtschaft & Bergbau</option>
<option value="Kommunikation & Medien">Kommunikation & Medien</option>
<option value="Bildung">Bildung</option>
<option value="Ingenieurwesen, Bauwesen & Immobilien">Ingenieurwesen, Bauwesen & Immobilien</option>
<option value="Finanzdienstleistungen">Finanzdienstleistungen</option>
<option value="Gesundheitswesen & Biowissenschaften">Gesundheitswesen & Biowissenschaften</option>
<option value="Fertigung, Automobilindustrie & Energie">Fertigung, Automobilindustrie & Energie</option>
<option value="Gemeinnützige Organisationen">Gemeinnützige Organisationen</option>
<option value="Sonstige">Sonstige</option>
<option value="Professionelle Dienstleistungen">Professionelle Dienstleistungen</option>
<option value="Öffentlicher Sektor">Öffentlicher Sektor</option>
<option value="Einzelhandel & Konsumgüter">Einzelhandel & Konsumgüter</option>
<option value="Technologie">Technologie</option>
<option value="Reisen, Transport & Gastgewerbe">Reisen, Transport & Gastgewerbe</option>


                                            </select>
                                        </div> <br />-->
										
										                
														
														<div class="row">
                                            <input id="phone" class="form-control" type="text" name="data[6]"
                                                placeholder="Telefon" required="required" />
                                        </div><br />
										


										 <div class="row">
                                            <input id="Address" class="form-control" type="text" name="data[7]"
                                                placeholder="Adresszeile 1" required="required" />
                                        </div><br />
										
										
										 <div class="row">
                                            <input id="Postcode" class="form-control" type="text" name="data[8]"
                                                placeholder="Postleitzahl" required="required"/>
                                        </div><br />
										
										
										
										 
										
										
										
                                        <div class="row">
                                            <select name="data[9]" class="form-control" id="Country" size="1"
                                                required="required">
                                                <option value="" selected> Land</option>
                                                      
													  
													  
													<option label="USA" value="US">USA</option>
    <option label="Afghanistan" value="AF">Afghanistan</option>
    <option label="Ålandinseln" value="AX">Ålandinseln</option>
    <option label="Albanien" value="AL">Albanien</option>
    <option label="Algerien" value="DZ">Algerien</option>
    <option label="Amerikanisch-Samoa" value="AS">Amerikanisch-Samoa</option>
    <option label="Andorra" value="AD">Andorra</option>
    <option label="Angola" value="AO">Angola</option>
    <option label="Anguilla" value="AI">Anguilla</option>
    <option label="Antarktis" value="AQ">Antarktis</option>
    <option label="Antigua und Barbuda" value="AG">Antigua und Barbuda</option>
    <option label="Argentinien" value="AR">Argentinien</option>
    <option label="Armenien" value="AM">Armenien</option>
    <option label="Aruba" value="AW">Aruba</option>
    <option label="Australien" value="AU">Australien</option>
    <option label="Austria" value="Austria">Österreich</option>
    <option label="Aserbaidschan" value="AZ">Aserbaidschan</option>
    <option label="Bahamas" value="BS">Bahamas</option>
    <option label="Bahrain" value="BH">Bahrain</option>
    <option label="Bangladesch" value="BD">Bangladesch</option>
    <option label="Barbados" value="BB">Barbados</option>
    <option label="Belarus" value="BY">Belarus</option>
    <option label="Belgium" value="Belgium">Belgien</option>
    <option label="Belize" value="BZ">Belize</option>
    <option label="Benin" value="BJ">Benin</option>
    <option label="Bermuda" value="BM">Bermuda</option>
    <option label="Bhutan" value="BT">Bhutan</option>
    <option label="Bolivien" value="BO">Bolivien</option>
    <option label="Bonaire, Sint Eustatius und Saba" value="BQ">Bonaire, Sint Eustatius und Saba</option>
    <option label="Bosnien und Herzegowina" value="BA">Bosnien und Herzegowina</option>
    <option label="Botswana" value="BW">Botswana</option>
    <option label="Bouvetinsel" value="BV">Bouvetinsel</option>
    <option label="Brasilien" value="BR">Brasilien</option>
    <option label="Britisches Territorium im Indischen Ozean" value="IO">Britisches Territorium im Indischen Ozean</option>
    <option label="Brunei Darussalam" value="BN">Brunei Darussalam</option>
    <option label="Bulgarien" value="Bulgaria">Bulgarien</option>
    <option label="Burkina Faso" value="BF">Burkina Faso</option>
    <option label="Burundi" value="BI">Burundi</option>
    <option label="Kambodscha" value="KH">Kambodscha</option>
    <option label="Kamerun" value="CM">Kamerun</option>
    <option label="Kanada" value="CA">Kanada</option>
    <option label="Kap Verde" value="CV">Kap Verde</option>
    <option label="Kaimaninseln" value="KY">Kaimaninseln</option>
    <option label="Zentralafrikanische Republik" value="CF">Zentralafrikanische Republik</option>
    <option label="Tschad" value="TD">Tschad</option>
    <option label="Chile" value="CL">Chile</option>
    <option label="China" value="CN">China</option>
    <option label="Weihnachtsinsel" value="CX">Weihnachtsinsel</option>
    <option label="Kokosinseln (Keeling)" value="CC">Kokosinseln (Keeling)</option>
    <option label="Kolumbien" value="CO">Kolumbien</option>
    <option label="Komoren" value="KM">Komoren</option>
    <option label="Kongo" value="CG">Kongo</option>
    <option label="Demokratische Republik Kongo" value="CD">Demokratische Republik Kongo</option>
    <option label="Cookinseln" value="CK">Cookinseln</option>
    <option label="Costa Rica" value="CR">Costa Rica</option>
    <option label="Côte d'Ivoire" value="CI">Côte d'Ivoire</option>
    <option label="Kroatien" value="Croatia">Kroatien</option>
    <option label="Curaçao" value="CW">Curaçao</option>
    <option label="Cyprus" value="CY">Zypern</option>
    <option label="Tschechische Republik" value="Czech Republic">Tschechische Republik</option>
    <option label="Dänemark" value="Denmark">Dänemark</option>
    <option label="Dschibuti" value="DJ">Dschibuti</option>
    <option label="Dominica" value="DM">Dominica</option>
    <option label="Dominikanische Republik" value="DO">Dominikanische Republik</option>
    <option label="Ecuador" value="EC">Ecuador</option>
    <option label="Ägypten" value="EG">Ägypten</option>
    <option label="El Salvador" value="SV">El Salvador</option>
    <option label="Äquatorialguinea" value="GQ">Äquatorialguinea</option>
    <option label="Eritrea" value="ER">Eritrea</option>
    <option label="Estland" value="Estonia">Estland</option>
    <option label="Äthiopien" value="ET">Äthiopien</option>
    <option label="Falklandinseln (Malwinen)" value="FK">Falklandinseln (Malwinen)</option>
    <option label="Färöer" value="FO">Färöer</option>
    <option label="Fidschi" value="FJ">Fidschi</option>
    <option label="Finnland" value="Finland">Finnland</option>
    <option label="Frankreich" value="France">Frankreich</option>
    <option label="Französisch-Guayana" value="GF">Französisch-Guayana</option>
    <option label="Französisch-Polynesien" value="PF">Französisch-Polynesien</option>
    <option label="Französische Süd- und Antarktisgebiete" value="TF">Französische Süd- und Antarktisgebiete</option>
    <option label="Gabun" value="GA">Gabun</option>
    <option label="Gambia" value="GM">Gambia</option>
    <option label="Georgien" value="GE">Georgien</option>
    <option label="Deutschland" value="Germany">Deutschland</option>
    <option label="Ghana" value="GH">Ghana</option>
    <option label="Gibraltar" value="GI">Gibraltar</option>
    <option label="Griechenland" value="Greece">Griechenland</option>
    <option label="Grönland" value="GL">Grönland</option>
    <option label="Grenada" value="GD">Grenada</option>
    <option label="Guadeloupe" value="GP">Guadeloupe</option>
    <option label="Guam" value="GU">Guam</option>
    <option label="Guatemala" value="GT">Guatemala</option>
    <option label="Guernsey" value="GG">Guernsey</option>
    <option label="Guinea" value="GN">Guinea</option>
    <option label="Guinea-Bissau" value="GW">Guinea-Bissau</option>
    <option label="Guyana" value="GY">Guyana</option>
    <option label="Haiti" value="HT">Haiti</option>
    <option label="Heard und McDonaldinseln" value="HM">Heard und McDonaldinseln</option>
    <option label="Heiliger Stuhl (Vatikanstadt)" value="VA">Heiliger Stuhl (Vatikanstadt)</option>
    <option label="Honduras" value="HN">Honduras</option>
    <option label="Hongkong" value="HK">Hongkong</option>
    <option label="Ungarn" value="Hungary">Ungarn</option>
    <option label="Island" value="IS">Island</option>
    <option label="Indien" value="IN" selected="">Indien</option>
    <option label="Indonesien" value="ID">Indonesien</option>
    <option label="Irak" value="IQ">Irak</option>
    <option label="Irland" value="Ireland">Irland</option>
    <option label="Isle of Man" value="IM">Isle of Man</option>
    <option label="Israel" value="IL">Israel</option>
    <option label="Italien" value="Italy">Italien</option>
    <option label="Jamaika" value="JM">Jamaika</option>
    <option label="Japan" value="JP">Japan</option>
    <option label="Jersey" value="JE">Jersey</option>
    <option label="Jordanien" value="JO">Jordanien</option>
    <option label="Kasachstan" value="KZ">Kasachstan</option>
    <option label="Kenia" value="KE">Kenia</option>
    <option label="Kiribati" value="KI">Kiribati</option>
    <option label="Republik Korea" value="KR">Republik Korea</option>
    <option label="Kuwait" value="KW">Kuwait</option>
    <option label="Kirgisistan" value="KG">Kirgisistan</option>
    <option label="Laos" value="LA">Laos</option>
    <option label="Lettland" value="Latvia">Lettland</option>
    <option label="Libanon" value="LB">Libanon</option>
    <option label="Lesotho" value="LS">Lesotho</option>
    <option label="Liberia" value="LR">Liberia</option>
    <option label="Libyen" value="LY">Libyen</option>
    <option label="Liechtenstein" value="LI">Liechtenstein</option>
    <option label="Litauen" value="Lithuania">Litauen</option>
    <option label="Luxemburg" value="Luxembourg">Luxemburg</option>
    <option label="Macau" value="MO">Macau</option>
    <option label="Nordmazedonien" value="MK">Nordmazedonien</option>
    <option label="Madagaskar" value="MG">Madagaskar</option>
    <option label="Malawi" value="MW">Malawi</option>
    <option label="Malaysia" value="MY">Malaysia</option>
    <option label="Malediven" value="MV">Malediven</option>
    <option label="Mali" value="ML">Mali</option>
    <option label="Malta" value="Malta">Malta</option>
    <option label="Marshallinseln" value="MH">Marshallinseln</option>
    <option label="Martinique" value="MQ">Martinique</option>
    <option label="Mauretanien" value="MR">Mauretanien</option>
    <option label="Mauritius" value="MU">Mauritius</option>
    <option label="Mayotte" value="YT">Mayotte</option>
    <option label="Mexiko" value="MX">Mexiko</option>
    <option label="Mikronesien" value="FM">Mikronesien</option>
    <option label="Republik Moldau" value="MD">Republik Moldau</option>
    <option label="Monaco" value="MC">Monaco</option>
    <option label="Mongolei" value="MN">Mongolei</option>
    <option label="Montenegro" value="ME">Montenegro</option>
    <option label="Montserrat" value="MS">Montserrat</option>
    <option label="Marokko" value="MA">Marokko</option>
    <option label="Mosambik" value="MZ">Mosambik</option>
    <option label="Myanmar" value="MM">Myanmar</option>
    <option label="Namibia" value="NA">Namibia</option>
    <option label="Nauru" value="NR">Nauru</option>
    <option label="Nepal" value="NP">Nepal</option>
    <option label="Niederlande" value="The Netherlands">Niederlande</option>
    <option label="Niederländische Antillen" value="AN">Niederländische Antillen</option>
    <option label="Neukaledonien" value="NC">Neukaledonien</option>
    <option label="Neuseeland" value="NZ">Neuseeland</option>
    <option label="Nicaragua" value="NI">Nicaragua</option>
    <option label="Niger" value="NE">Niger</option>
    <option label="Nigeria" value="NG">Nigeria</option>
    <option label="Niue" value="NU">Niue</option>
    <option label="Norfolkinsel" value="NF">Norfolkinsel</option>
    <option label="Nördliche Marianen" value="MP">Nördliche Marianen</option>
    <option label="Norwegen" value="NO">Norwegen</option>
    <option label="Oman" value="OM">Oman</option>
    <option label="Pakistan" value="PK">Pakistan</option>
    <option label="Palau" value="PW">Palau</option>
    <option label="Palästina" value="PS">Palästina</option>
    <option label="Panama" value="PA">Panama</option>
    <option label="Papua-Neuguinea" value="PG">Papua-Neuguinea</option>
    <option label="Paraguay" value="PY">Paraguay</option>
    <option label="Peru" value="PE">Peru</option>
    <option label="Philippinen" value="PH">Philippinen</option>
    <option label="Pitcairn" value="PN">Pitcairn</option>
    <option label="Polen" value="Poland">Polen</option>
    <option label="Portugal" value="Portugal">Portugal</option>
    <option label="Puerto Rico" value="PR">Puerto Rico</option>
    <option label="Katar" value="QA">Katar</option>
    <option label="Réunion" value="RE">Réunion</option>
    <option label="Rumänien" value="Romania">Rumänien</option>
    <option label="Ruanda" value="RW">Ruanda</option>
    <option label="Saint-Barthélemy" value="BL">Saint-Barthélemy</option>
    <option label="St. Helena, Ascension und Tristan da Cunha" value="SH">St. Helena, Ascension und Tristan da Cunha</option>
    <option label="St. Kitts und Nevis" value="KN">St. Kitts und Nevis</option>
    <option label="St. Lucia" value="LC">St. Lucia</option>
    <option label="Saint-Martin (französischer Teil)" value="MF">Saint-Martin (französischer Teil)</option>
    <option label="Saint-Pierre und Miquelon" value="PM">Saint-Pierre und Miquelon</option>
    <option label="St. Vincent und die Grenadinen" value="VC">St. Vincent und die Grenadinen</option>
    <option label="Samoa" value="WS">Samoa</option>
    <option label="San Marino" value="SM">San Marino</option>
    <option label="São Tomé und Príncipe" value="ST">São Tomé und Príncipe</option>
    <option label="Saudi-Arabien" value="SA">Saudi-Arabien</option>
    <option label="Senegal" value="SN">Senegal</option>
    <option label="Serbien" value="RS">Serbien</option>
    <option label="Seychellen" value="SC">Seychellen</option>
    <option label="Sierra Leone" value="SL">Sierra Leone</option>
    <option label="Singapur" value="SG">Singapur</option>
    <option label="Sint Maarten (niederländischer Teil)" value="SX">Sint Maarten (niederländischer Teil)</option>
    <option label="Slowakei" value="Slovakia">Slowakei</option>
    <option label="Slowenien" value="Slovenia">Slowenien</option>
    <option label="Salomonen" value="SB">Salomonen</option>
    <option label="Somalia" value="SO">Somalia</option>
    <option label="Südafrika" value="ZA">Südafrika</option>
    <option label="Südgeorgien und die Südlichen Sandwichinseln" value="GS">Südgeorgien und die Südlichen Sandwichinseln</option>
    <option label="Südsudan" value="SS">Südsudan</option>
    <option label="Spanien" value="Spain">Spanien</option>
    <option label="Sri Lanka" value="LK">Sri Lanka</option>
    <option label="Suriname" value="SR">Suriname</option>
    <option label="Svalbard und Jan Mayen" value="SJ">Svalbard und Jan Mayen</option>
    <option label="Eswatini" value="SZ">Eswatini</option>
    <option label="Schweden" value="Sweden">Schweden</option>
    <option label="Schweiz" value="CH">Schweiz</option>
    <option label="Taiwan" value="TW">Taiwan</option>
    <option label="Tadschikistan" value="TJ">Tadschikistan</option>
    <option label="Tansania, Vereinigte Republik" value="TZ">Tansania, Vereinigte Republik</option>
    <option label="Thailand" value="TH">Thailand</option>
    <option label="Timor-Leste" value="TL">Timor-Leste</option>
    <option label="Togo" value="TG">Togo</option>
    <option label="Tokelau" value="TK">Tokelau</option>
    <option label="Tonga" value="TO">Tonga</option>
    <option label="Trinidad und Tobago" value="TT">Trinidad und Tobago</option>
    <option label="Tunesien" value="TN">Tunesien</option>
    <option label="Türkei" value="TR">Türkei</option>
    <option label="Turkmenistan" value="TM">Turkmenistan</option>
    <option label="Turks- und Caicosinseln" value="TC">Turks- und Caicosinseln</option>
    <option label="Tuvalu" value="TV">Tuvalu</option>
    <option label="Uganda" value="UG">Uganda</option>
    <option label="Ukraine" value="UA">Ukraine</option>
    <option label="Vereinigte Arabische Emirate" value="AE">Vereinigte Arabische Emirate</option>
    <option label="Vereinigtes Königreich" value="United Kingdom">Vereinigtes Königreich</option>
    <option label="Amerikanische Überseeinseln" value="UM">Amerikanische Überseeinseln</option>
    <option label="Uruguay" value="UY">Uruguay</option>
    <option label="Usbekistan" value="UZ">Usbekistan</option>
    <option label="Vanuatu" value="VU">Vanuatu</option>
    <option label="Venezuela, Bolivarische Republik" value="VE">Venezuela, Bolivarische Republik</option>
    <option label="Vietnam" value="VN">Vietnam</option>
    <option label="Britische Jungferninseln" value="VG">Britische Jungferninseln</option>
    <option label="Amerikanische Jungferninseln" value="VI">Amerikanische Jungferninseln</option>
    <option label="Wallis und Futuna" value="WF">Wallis und Futuna</option>
    <option label="Westsahara" value="EH">Westsahara</option>
    <option label="Jemen" value="YE">Jemen</option>
    <option label="Sambia" value="ZM">Sambia</option>
    <option label="Simbabwe" value="ZW">Simbabwe</option>



                                            </select>
                                        </div> <br />
										
										                
										
									   <div class="row">
							
										<select name="data[10]"  class="form-control"  id="us" >
							<option value="">Bundesland/Provinz/Landkreis</option>
							<option value="N/A">N/A</option>
<option value="Alabama">Alabama</option>
<option value="Alaska">Alaska</option>
<option value="Amerikanisch-Samoa">Amerikanisch-Samoa</option>
<option value="Arizona">Arizona</option>
<option value="Arkansas">Arkansas</option>
<option value="Kalifornien">Kalifornien</option>
<option value="Colorado">Colorado</option>
<option value="Connecticut">Connecticut</option>
<option value="Delaware">Delaware</option>
<option value="District of Columbia">District of Columbia</option>
<option value="F&#246;derierte Staaten von Mikronesien">F&#246;derierte Staaten von Mikronesien</option>
<option value="Florida">Florida</option>
<option value="Georgia">Georgia</option>
<option value="Guam">Guam</option>
<option value="Hawaii">Hawaii</option>
<option value="Idaho">Idaho</option>
<option value="Illinois">Illinois</option>
<option value="Indiana">Indiana</option>
<option value="Iowa">Iowa</option>
<option value="Kansas">Kansas</option>
<option value="Kentucky">Kentucky</option>
<option value="Louisiana">Louisiana</option>
<option value="Maine">Maine</option>
<option value="Marshallinseln">Marshallinseln</option>
<option value="Maryland">Maryland</option>
<option value="Massachusetts">Massachusetts</option>
<option value="Michigan">Michigan</option>
<option value="Minnesota">Minnesota</option>
<option value="Mississippi">Mississippi</option>
<option value="Missouri">Missouri</option>
<option value="Montana">Montana</option>
<option value="Nebraska">Nebraska</option>
<option value="Nevada">Nevada</option>
<option value="New Hampshire">New Hampshire</option>
<option value="New Jersey">New Jersey</option>
<option value="New Mexico">New Mexico</option>
<option value="New York">New York</option>
<option value="North Carolina">North Carolina</option>
<option value="North Dakota">North Dakota</option>
<option value="N&#246;rdliche Marianen">N&#246;rdliche Marianen</option>
<option value="Ohio">Ohio</option>
<option value="Oklahoma">Oklahoma</option>
<option value="Oregon">Oregon</option>
<option value="Palau">Palau</option>
<option value="Pennsylvania">Pennsylvania</option>
<option value="Puerto Rico">Puerto Rico</option>
<option value="Rhode Island">Rhode Island</option>
<option value="South Carolina">South Carolina</option>
<option value="South Dakota">South Dakota</option>
<option value="Tennessee">Tennessee</option>
<option value="Texas">Texas</option>
<option value="Utah">Utah</option>
<option value="Vermont">Vermont</option>
<option value="Jungferninseln">Jungferninseln</option>
<option value="Virginia">Virginia</option>
<option value="Washington">Washington</option>
<option value="West Virginia">West Virginia</option>
<option value="Wisconsin">Wisconsin</option>
<option value="Wyoming">Wyoming</option>
<option value="Alberta">Alberta</option>
<option value="British Columbia">British Columbia</option>
<option value="Manitoba">Manitoba</option>
<option value="New Brunswick">New Brunswick</option>
<option value="Neufundland und Labrador">Neufundland und Labrador</option>
<option value="Nova Scotia">Nova Scotia</option>
<option value="Nordwest-Territorien">Nordwest-Territorien</option>
<option value="Nunavut">Nunavut</option>
<option value="Ontario">Ontario</option>
<option value="Prince Edward Island">Prince Edward Island</option>
<option value="Quebec">Quebec</option>
<option value="Saskatchewan">Saskatchewan</option>
<option value="Yukon">Yukon</option>

						</select>
						
						</div> 
						
						<br/>
						
						
																
									   <div class="row">
							
										<select name="data[101]" required  class="form-control"  id="industry" >
										                   <option value="" selected> Industrie</option>
							<option value="Landwirtschaft & Bergbau">Landwirtschaft & Bergbau</option>
<option value="Kommunikation & Medien">Kommunikation & Medien</option>
<option value="Bildungswesen">Bildungswesen</option>
<option value="Ingenieurwesen, Bau & Immobilien">Ingenieurwesen, Bau & Immobilien</option>
<option value="Finanzdienstleistungen">Finanzdienstleistungen</option>
<option value="Gesundheitswesen & Biowissenschaften">Gesundheitswesen & Biowissenschaften</option>
<option value="Fertigung, Automobil & Energie">Fertigung, Automobil & Energie</option>
<option value="Non-Profit-Organisationen">Non-Profit-Organisationen</option>
<option value="Sonstige">Sonstige</option>
<option value="Professionelle Dienstleistungen">Professionelle Dienstleistungen</option>
<option value="&#214;ffentlicher Sektor">&#214;ffentlicher Sektor</option>
<option value="Einzelhandel & Konsumg&#252;ter">Einzelhandel & Konsumg&#252;ter</option>
<option value="Technologie">Technologie</option>
<option value="Reisen, Transport & Gastgewerbe">Reisen, Transport & Gastgewerbe</option>

						</select>
						
						</div> 
						<!-- </div> -->
						
						
					<!--	  <div class="row">
						<select name="data[11]" class="form-control" id="province" style="display:none;" >
						<option selected="selected" value="">--State/Province--</option>
							<option value="Alberta">Alberta</option><option value="British Columbia">British Columbia</option><option value="Manitoba">Manitoba</option><option value="New Brunswick">New Brunswick</option><option value="Newfoundland and Labrador">Newfoundland and Labrador</option><option value="Nova Scotia">Nova Scotia</option><option value="Northwest Territories">Northwest Territories</option><option value="Nunavut">Nunavut</option><option value="Ontario">Ontario</option><option value="Prince Edward Island">Prince Edward Island</option><option value="Quebec">Quebec</option><option value="Saskatchewan">Saskatchewan</option><option value="Yukon">Yukon</option>
						</select>
						  </div>-->
						
						
						
							<!--  <div class="row">
						<select name="data[12]" id="allstate" class="form-control" style="display:none;" >
						<option selected="selected" value="">--State/Province--</option>
							<option value="NA">NA</option>
						
						</select>
						  </div>-->
						
                                    
										
										  
										
										
										
										<!-- <div class="row">
                                            <input id="city" class="form-control" type="text" name='data[5]'
                                                placeholder="City" required="required" />
                                        </div> <br />-->
										
										
						
										
										   <!--<div class="row">
                                            <input id="zip" class="form-control" type="text" name='data[7]'
                                                placeholder="Zip" required="required" />
                                        </div><br />-->
										
                                        

								 	<!--<div  class="row">
											<label class="cq">Country</label>
											</div>-->
											
					
								
				 <!--

		<div class="row">
    <label class="cq" for="cq4">
        <b>
            CQ
        </b>
    </label>
    <select name="data[9]" class="form-control" id="cq1" size="1" required="required">
        <option value=""> -- &#65279;Select --</option>

        <option value="Yes">Yes</option>
        <option value="No">No</option>


    </select>
	</div><br />-->
										
 
											
											
											
											
											
                               <div class="row check-group" style="/* width: 10; */ "><br />
                                            <p style="display: flex;font-size:14px;line-height: 25px;text-align:left;color:#6d6d66;font-family: Merriweather,Georgia,serif;align-items: flex-start;gap: 10px;">

                                         <input id="optin" name="data[13]" type="checkbox"
                                                    value="opt-in-yes1" required>
													
													<span style="font-size:12px;line-height: 25px;text-align:left;color:#6d6d66; font-family: Calibre, Helvetica, sans-serif;"> 
													
													Ja, ich möchte Marketingmitteilungen über Salesforce Produkte, Services und Veranstaltungen erhalten. Ich kann dieses Abonnement jederzeit kündigen.<a href="https://www.salesforce.com/de/company/privacy/" target="_blank">Datenschutzrichtlinie</a>


													<!--
													Yes, I would like to receive marketing communications regarding Salesforce products, services, and events.  I can unsubscribe at any time.<a href="https://www.salesforce.com/de/company/privacy/" target="_blank">Privacy Policy</a>-->
                                                       <br><br>
													<!--By submitting this form, you agree to have your contact information, including email, passed on to Salesforce for the purpose of following up on your interests.-->
													<!--Mit dem Absenden dieses Formulars erklären Sie sich damit einverstanden, dass Ihre Kontaktinformationen, einschließlich E-Mail, zur Weiterverfolgung Ihrer Interessen an {{Salesforce/MuleSoft, ein Salesforce-Unternehmen/Tableau, ein Salesforce-Unternehmen}} weitergegeben werden.-->
													
													Mit dem Absenden dieses Formulars erklären Sie sich damit einverstanden, dass Ihre Kontaktdaten, einschließlich Ihrer E-Mail-Adresse, an Salesforce weitergegeben werden, um Ihre Interessen zu verfolgen.
													</span>

                                            </p> 
                                        </div>
										
										

										
										   <div><br />
                                            <div class="row">
                                                <center><input type="submit" value="Jetzt ansehen" name="subscribe"
                                                        id="download" class="btn btn-default btn-lg form-control"
                                                        style='width: 100%;height: 50px; border: none;border-radius: 1rem;font-weight: 600;cursor: pointer;'>
                                            </div>
                                    </center>
                                </div>
								

                                 
                </div><br />
                </center>
                </form>
            </div>
        </div>
    </div>

    <div class="row" style="background-color: #f2f5f8;">
        <div class="col-sm-12 col-xs-12" style='background-color:#403e3e;padding: 30px 0px 30px;'>
             <center>
             <span class="col-sm-12" style='float:left; font-size:14px; color:#fff;'> &#169; Vibe Media Corporation. All rights reserved.<br><br> <a href="https://nexttechtoday.com/privacy-policy/" style="color:#fff" target="_BLANK">NextTech Today Privacy Policy</a><br></span>
             </center>
         </div>
    </div>
    </div>



    <script type="text/javascript">
        $(document).ready(function (e) {
            $('#download').click(function () {
                var email = $('#email').val();
                var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!me.com)(?!msn.com)(?!ymail.com)(?!123.com)(?!0-9.com)([\w-]+\.)+[\w-]{2,4})?$/;
                if (reg.test(email)) {
                    return 0;
                }
                else {
                    alert('Please Enter Business Email Address');
                    return false;
                }
            });
        });
    </script>
</body>

</html>