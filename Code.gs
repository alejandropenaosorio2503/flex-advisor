function doGet(e) {
  // Si viene con ?cust_id=X, es la llamada AJAX para obtener datos
  if (e && e.parameter && e.parameter.cust_id) {
    var data = fetchSellerData(e.parameter.cust_id);
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }
  // Si no, servir el HTML
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Flex Advisor — Mercado Libre Growth Colombia')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function fetchSellerData(custId) {
  var url = 'https://web.furycloud.io/api/proxy/verdi_flows/webhook/flex-advisor?cust_id=' + custId;
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      followRedirects: false,
      muteHttpExceptions: true
    });
    var code = response.getResponseCode();
    var body = response.getContentText();

    if (code === 200) {
      var parsed = JSON.parse(body);
      // Verdiflow respondWith allIncomingItems devuelve array
      if (Array.isArray(parsed)) return parsed[0];
      return parsed;
    }

    return { error: 'Verdiflow respondio con HTTP ' + code };
  } catch (err) {
    return { error: err.message || String(err) };
  }
}
