data: {
    restaurantName: ''
    username: ''
    dateTime: ''
    banknotesDetails: [{ value: '', initial: '', kept: '', finalValue: '' }]
    totalBanknotesVal: ''
    websiteTotal: ''
    tpe1Total: ''
    tpe2Total: ''
    chargesTotal: ''
    chargesDetails: [{ label: '', value: '' }]
    advancesTotal: ''
    advancesDetails: [{ label: '', value: '' }]
    nonFacturesTotal: ''
    nonFacturesDetails: [{ label: '', value: '' }]
    totalRes: ''
}

function getBanknotes(data) {
    let toret = ''
    for (let idx = 0; idx < data.banknotesDetails.length; idx++) {
        const banknote = data.banknotesDetails[idx];
        toret += `<tr><td>${banknote.value}CHF</td><td>${banknote.initial}</td><td>${banknote.kept}</td><td>${banknote.finalValue}CHF</td></tr>`
    }
}
function getChargesRows(chargesArray) {
    let toret = ''
    for (let idx = 0; idx < chargesArray.length; idx++) {
        const charge = chargesArray[idx];
        toret += `<tr style="background-color: #eeeeee50;"><td></td><td>${charge.label}</td><td>${charge.value}CHF</td></tr>`
    }
}
function sendDetails(data) {
    return `
    <style>h1{font-size: 1.7rem; margin: 15px 5px; text-align: end;}h2{font-size: 1.2rem; margin: 5px; text-align: end;}.custom-card{background: white; font-family: 'Roboto', sans-serif; width: 700px;}.custom-card-body{padding: 0; margin: 0;}.custom-card-header{border: 1px solid black; border-bottom: none; padding: 5px 15px; padding-bottom: 10px; background: #2065a8; color: white; border-top-left-radius: 15px; border-top-right-radius: 15px;}.body-card-inner{border: 1px solid black; border-top: none; border-bottom: none; padding: 20px 15px;}.custom-card-footer{border: 1px solid black; border-top: none; padding: 15px 15px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; box-sizing: border-box; background: #2065a8; color: white;}.custom-card-body .body-card-inner table{width: 100%;}td{overflow-wrap: anywhere;}tr td:nth-child(1){width: 45%;}tr td:nth-child(2){width: 35%;}tr td:nth-child(3){width: 15%;}.banknote-CHFs table{width: 100%;}.banknote-CHFs table th{text-align: start;}.banknote-CHFs table td{overflow-wrap: anywhere;}.banknote-CHFs table tr td:nth-child(1){width: 34%;}.banknote-CHFs table tr td:nth-child(2){width: 25%;}.banknote-CHFs table tr td:nth-child(3){width: 25%;}.banknote-CHFs table tr td:nth-child(4){width: 20%;}</style>
    <div class="custom-card"> <div class="custom-card-body"> <div class="custom-card-header"> <div class="invoice-icon"><i aria-hidden="true" class="fa fa-credit-card"></i> <h1>Facture</h1> </div><div class="invoice-details"> <h2>Restaurant : ${data.restaurantName}</h2> <h2>Employé : ${data.username}</h2> <h2>Date&amp;Heure : ${data.dateTime}</h2> </div></div><div class="body-card-inner"> <div class="banknote-CHFs"> <table style="margin-bottom: 10px;"> <tr> <th>Monnaie</th> <th>Initiale</th> <th>Gardé</th> <th>Valeur totale</th> </tr>${getBanknotes(data)}<tr style="position: relative; top: 10px;"> <td></td><td></td><td style="font-weight: 600;">Valeur totale</td><td style="font-weight: 600;">${data.totalBanknotesVal}CHF</td></tr></table> </div><hr> <div class="totals-wrapper"> <table> <tr> <td>total du fonds en espéce restant</td><td></td><td>${data.totalBanknotesVal}CHF</td></tr><tr> <td>Total site internet</td><td></td><td>${data.websiteTotal}CHF</td></tr><tr> <td>Total TPE1</td><td></td><td>${data.tpe1Total}CHF</td></tr><tr> <td>Total TPE2</td><td></td><td>${data.tpe2Total}CHF</td></tr><tr style="background-color: #2065a810;"> <td style="font-weight: 600;">Total commission</td><td></td><td style="font-weight: 600;">${data.chargesTotal}CHF</td></tr>${getChargesRows(data.chargesDetails)}<tr style="background-color: #2065a810;"> <td style="font-weight: 600;">Total avance employé</td><td></td><td style="font-weight: 600;">${data.advancesTotal}CHF</td></tr>${getChargesRows(data.advancesDetails)}<tr style="background-color: #2065a810;"> <td style="font-weight: 600;">Total paiement sans facture</td><td></td><td style="font-weight: 600;">${data.nonFacturesTotal}CHF</td></tr>${getChargesRows(data.nonFacturesDetails)}</table> </div></div><div class="custom-card-footer"> <div class="invoice-details"> <h2><i aria-hidden="true" class="fa fa-money" style="margin-right: 10px;"></i> TOTAL : ${data.totalRes}CHF</h2> </div></div></div></div>
    `
}