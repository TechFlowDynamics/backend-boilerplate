import { subjectBody } from "../constants/email.constants";
import validationInterface from "../constants/validation.interface";
import { EmailParams } from "../../core/interface/email.interface";
import config from "src/config";

export const userVerifyAccountTemplate = (
  to: string,
  code: string,
): EmailParams => {
  console.log("🚀 ~ code:userverfiyAccountTemplate", code);

  return {
    to: [to],
    subject: subjectBody.userRegisterEmail,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {width: 600px;margin: 0 auto;}
          table {border-collapse: collapse;}
          table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
          img {-ms-interpolation-mode: bicubic;}
        </style>
      <![endif]-->
            <style type="text/css">
          body, p, div {
            font-family: arial,helvetica,sans-serif;
            font-size: 17px;
          }
          body {
            color: #000000;
          }
          body a {
            color: #FF6525;
            text-decoration: none;
          }
          p { margin: 0; padding: 0; }
          table.wrapper {
            width:100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          ul ul ul ul  {
            list-style-type: disc !important;
          }
          ol ol {
            list-style-type: lower-roman !important;
          }
          ol ol ol {
            list-style-type: lower-latin !important;
          }
          ol ol ol ol {
            list-style-type: decimal !important;
          }
          @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
              text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 100% !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .social-icon-column {
              display: inline-block !important;
            }
          }
        </style>
            <!--user entered Head Start--><!--End Head user entered-->
          </head>
          <body>
            <center class="wrapper" data-link-color="#FF6525" data-body-style="font-size:17px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#ffffff;">
              <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                  <tr>
                    <td valign="top" bgcolor="#ffffff" width="100%">
                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td>
                                  <!--[if mso]>
          <center>
          <table><tr><td width="600">
        <![endif]-->
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                            <tr>
                                              <td role="modules-container" style="padding:0px 20px 20px 20px; color:#000000; text-align:left;" bgcolor="#F5EDE8" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
          <tr>
            <td role="module-content">
              <p>2 Factor Authentication Email for login</p>
            </td>
          </tr>
        </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2491792e-0051-4710-a6a1-17d236020a64">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:15px 0px 15px 0px;" valign="top" align="center">
                
              <a href="https://dev.weloveland.us/"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="189" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/2d89c19342a876a4/6290c8f3-0fe8-4b6b-b5d3-c5c6d41446d8/189x30.png" height="30"></a></td>
            </tr>
          </tbody>
        </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#ffffff" data-distribution="1">
          <tbody>
            <tr role="module-content">
              <td height="100%" valign="top"><table width="560" style="width:560px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
            <tbody>
              <tr>
                <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cc7d8f4f-e241-4164-95ea-5140a83f78cb">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:50px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="137" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/2d89c19342a876a4/0fa5002b-c27c-4b4b-a28e-a25706b0ee4b/137x137.png" height="137"></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ed7bd78f-3216-4f05-b1a6-ec01b1b8ca35" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:30px 0px 25px 0px; line-height:24px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="white-space-collapse: preserve; text-wrap: wrap; font-size: 30px"><strong>Your Authentication Code</strong></span></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e0bbfa43-b087-4478-9490-94e1eb931d9d" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:0px 30px 18px 30px; line-height:26px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="white-space-collapse: preserve; text-wrap: wrap">To confirm it's you, please enter the verification code in your WeLoveLand account.</span></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b0bf2fdd-300e-4bd1-a108-a97c128db038" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 0px 35px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="white-space-collapse: preserve; text-wrap: wrap; font-size: 36px; color: #ff6525">${code}</span></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="041c88a8-7f06-464c-817f-f086d6b9d2c8">
          <tbody>
            <tr>
              <td style="padding:0px 35px 0px 35px;" role="module-content" height="100%" valign="top" bgcolor="">
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="2px" style="line-height:2px; font-size:2px;">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 2px 0px;" bgcolor="#000000"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f9b882b3-4f65-4df5-bdf9-698f3b245597" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 30px 30px 30px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="white-space-collapse: preserve; text-wrap: wrap">Note: </span><span style="white-space-collapse: preserve; text-wrap: wrap; color: #838383">If you suspect unauthorized access, reach out to our security team to protect your account.</span></div><div></div></div></td>
            </tr>
          </tbody>
        </table></td>
              </tr>
            </tbody>
          </table></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8eaacdb8-6943-4e9f-a081-b49032f57034" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 0px 10px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center; font-size: 17px"><span style="white-space-collapse: preserve; text-wrap: wrap; font-family: arial, helvetica, sans-serif"><strong>We Love Land | Copyright © 2024</strong></span></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0e161806-aad4-4baf-a71c-59552943c403" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:0px 0px 5px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 14px">All rights reserved.</span></div>
      <div style="font-family: inherit; text-align: center"><span style="font-size: 14px">You are receiving this email because you opted in via our website. &nbsp;</span></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dc36693b-9295-4d86-b3bd-024b39113b34" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:0px 0px 0px 0px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center; width: 100%"><a href="https://dev.weloveland.us/"><span style="white-space-collapse: preserve; text-wrap: wrap; font-family: arial, helvetica, sans-serif; font-size: 14px; color: #ff6525">Unsubscribe</span></a></div><div></div></div></td>
            </tr>
          </tbody>
        </table></td>
                                            </tr>
                                          </table>
                                          <!--[if mso]>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>
      `,
  };
};
