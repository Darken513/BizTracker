const nodemailer = require('nodemailer');
const fs = require("fs");
const puppeteer = require('puppeteer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'biztracker33@gmail.com', //generate new mail new pass key
    pass: 'oxvaptmwbhtroycf'
  }
});
function getBanknotes(data) {
  let toret = ''
  for (let idx = 0; idx < data.banknotesDetails.length; idx++) {
    const banknote = data.banknotesDetails[idx];
    toret += `<tr><td>${banknote.value} CHF</td><td style="text-align: center;">${banknote.nbr}</td><td style="text-align: end;">${banknote.initialVal ? banknote.initialVal.toFixed(2) : "0.00"} CHF</td><td style="text-align: end;">${banknote.finalVal ? banknote.finalVal.toFixed(2) : "0.00"} CHF</td></tr>`
  }
  return toret
}
function getChargesRows(chargesArray) {
  let toret = ''
  for (let idx = 0; idx < chargesArray.length; idx++) {
    const charge = chargesArray[idx];
    toret += `<tr style="background-color: #eeeeee50;"><td></td><td>${charge.label}</td><td style="text-align: end;">${charge.value ? charge.value.toFixed(2) : "0.00"} CHF</td></tr>`
  }
  return toret
}
function sendDetails(data, forPdf) {
  return `
    <div style="background: white; font-family: 'Roboto', sans-serif; width: 700px;"> <div style="padding: 0; margin: 0;"> <div style="border: 1px solid black; border-bottom: none; padding: 5px 15px; padding-bottom: 10px; background: #2065a8; color: white; border-top-left-radius: 15px; border-top-right-radius: 15px;"> <div> <h1 style="font-size: 1.7rem; margin: 15px 5px; text-align: end; ${forPdf?'color: black':''}">Facture</h1> </div><div> <h2 style="color:white; font-size: 1.2rem; margin: 5px; text-align: end;${forPdf?'color: black':''}">Restaurant : ${data.restaurantName}</h2> <h2 style="color:white; font-size: 1.2rem; margin: 5px; text-align: end;${forPdf?'color: black':''}">Employé : ${data.username}</h2> <h2 style="color:white; font-size: 1.2rem; margin: 5px; text-align: end;${forPdf?'color: black':''}">Date&amp;Heure : ${data.dateTime}</h2> </div></div><div style="border: 1px solid black; border-top: none; border-bottom: none; padding: 20px 15px; color: black;"> <div> <table style="margin-bottom: 10px; width: 100%"> <tr> <th style="text-align: start;">Monnaie</th> <th style="text-align: center;">Nombre de pièces</th> <th style="text-align: end;">Valeur Initial</th> 
    <th style="text-align: end;">Valeur Restant</th> </tr>${getBanknotes(data)}<tr style="position: relative; top: 10px;"> <td style="overflow-wrap: anywhere; width: 15%;"></td><td style="overflow-wrap: anywhere; width: 25%;"></td><td style="text-align: end; font-weight: 600; overflow-wrap: anywhere; width: 30%;">Total restant</td><td style="text-align: end; font-weight: 600; overflow-wrap: anywhere; width: 30%;"> ${parseFloat(data.totalLeftBanknotesVal) ? parseFloat(data.totalLeftBanknotesVal).toFixed(2) : "0.00"}CHF</td></tr></table> </div><hr> <div> <table style="width: 100%"> <tr> <td style="overflow-wrap: anywhere;width: 45%;">Total <strong>Initial</strong></td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.totalInitialBanknotesVal) ? parseFloat(data.totalInitialBanknotesVal).toFixed(2) : "0.00"}CHF</td></tr>
    <tr> <td style="overflow-wrap: anywhere;width: 45%;">Total <strong>Fonds de caisse</strong></td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.totalFondDeCaisse) ? parseFloat(data.totalFondDeCaisse).toFixed(2) : "0.00"}CHF</td></tr><tr> <td style="overflow-wrap: anywhere;width: 45%;">Total <strong>Restant</strong></td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.totalLeftBanknotesVal) ? parseFloat(data.totalLeftBanknotesVal).toFixed(2) : "0.00"}CHF</td></tr><tr> <td style="overflow-wrap: anywhere;width: 45%;">Total site internet</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;">${parseFloat(data.websiteTotal) ? parseFloat(data.websiteTotal).toFixed(2) : "0.00"}CHF</td></tr><tr> <td style="overflow-wrap: anywhere;width: 45%;">Total Justeat en espèce</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;">${parseFloat(data.totalJusteat) ? parseFloat(data.totalJusteat).toFixed(2) : "0.00"}CHF</td></tr>
    <tr> <td style="overflow-wrap: anywhere;width: 45%;">Total TPE1</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;">${parseFloat(data.tpe1Total) ? parseFloat(data.tpe1Total).toFixed(2) : "0.00"}CHF</td></tr><tr> <td style="overflow-wrap: anywhere;width: 45%;">Total TPE2</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="overflow-wrap: anywhere;width: 15%; text-align:end;">${parseFloat(data.tpe2Total) ? parseFloat(data.tpe2Total).toFixed(2) : "0.00"}CHF</td></tr><tr style="background-color: #2065a810;"> <td style="font-weight: 600; overflow-wrap: anywhere;width: 45%;">Total commission</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="font-weight: 600; overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.chargesTotal) ? parseFloat(data.chargesTotal).toFixed(2) : "0.00"}CHF </td></tr>${getChargesRows(data.chargesDetails)}<tr style="background-color: #2065a810;"> <td style="font-weight: 600; overflow-wrap: anywhere;width: 45%;">Total avance employé</td><td style="overflow-wrap: anywhere;width: 40%;"></td><td style="font-weight: 600; overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.advancesTotal) ? parseFloat(data.advancesTotal).toFixed(2) : "0.00"}CHF </td></tr>${getChargesRows(data.advancesDetails)}<tr style="background-color: #2065a810;"> <td style="font-weight: 600; overflow-wrap: anywhere;width: 45%;">Total paiement sans facture </td>
    <td style="overflow-wrap: anywhere;width: 40%;"></td><td style="font-weight: 600; overflow-wrap: anywhere;width: 15%; text-align:end;"> ${parseFloat(data.nonFacturesTotal) ? parseFloat(data.nonFacturesTotal).toFixed(2) : "0.00"}CHF </td></tr>${getChargesRows(data.nonFacturesDetails)}</table> </div></div><div style="border: 1px solid black; border-top: none; padding: 15px 15px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; box-sizing: border-box; background: #2065a8; color: white;"> <div> <h2 style="font-size: 1.2rem; margin: 5px; text-align: end;${forPdf?'color: black':''}">Total Restant : ${parseFloat(data.totalLeftBanknotesVal) ? parseFloat(data.totalLeftBanknotesVal).toFixed(2) : "0.00"}CHF</h2> </div></div></div></div> 
  `
}
function generatePDF(data) {
  return (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of your HTML template
    const htmlContent = sendDetails(data, true);

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate the PDF
    await page.pdf({ path: 'output.pdf', format: 'A4' });

    await browser.close();
  })();
}
exports.sendMail = async (data) => {
  //await generatePDF(data);
  const reportName = "Rapport Journalier " + data.restaurantName + ` ${data.dateTime}`;
  //const pdfAttachment = fs.readFileSync("output.pdf");
  const mailOptions = {
    from: "BizTracker",
    to: 'ghassen.hentati@hotmail.com',
    subject: reportName,
    html: sendDetails(data),
    /* attachments: [
      {
        filename: reportName+'.pdf', 
        content: pdfAttachment, 
        contentType: 'application/pdf', 
      },
    ] */
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};