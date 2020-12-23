QRCode = require('qrcode')

const data = {
    username: 'dmitry',
    range: 3,
    subs: ['angelaMercel','Joe Biden']
}
 
QRCode.toDataURL(data, { errorCorrectionLevel: 'H' }, function (err, url) {
    console.log(url)
  })