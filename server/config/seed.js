/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Country = require('../api/country/country.model')

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Country.find({}).remove(function(){
  Country.create(

  			{
  				"country_code": "AD",
  				"country_name": "Andorra",
  				"currency_code": "EUR",
  				"population": "84000",
  				"capital": "Andorra la Vella",
  				"continent": "Europe",
  				"area": "468.0",
  				"languages": "ca"
  			},
  			{
  				"country_code": "AE",
  				"country_name": "United Arab Emirates",
  				"currency_code": "AED",
  				"population": "4975593",
  				"capital": "Abu Dhabi",
  				"continent": "Asia",
  				"area": "82880.0",
  				"languages": "ar-AE,fa,en,hi,ur"
  			},
  			{
  				"country_code": "AF",
  				"country_name": "Afghanistan",
  				"currency_code": "AFN",
  				"population": "29121286",
  				"capital": "Kabul",
  				"continent": "Asia",
  				"area": "647500.0",
  				"languages": "fa-AF,ps,uz-AF,tk"
  			},
  			{
  				"country_code": "AG",
  				"country_name": "Antigua and Barbuda",
  				"currency_code": "XCD",
  				"population": "86754",
  				"capital": "St. John's",
  				"continent": "North America",
  				"area": "443.0",
  				"languages": "en-AG"
  			},
  			{
  				"country_code": "AI",
  				"country_name": "Anguilla",
  				"currency_code": "XCD",
  				"population": "13254",
  				"capital": "The Valley",
  				"continent": "North America",
  				"area": "102.0",
  				"languages": "en-AI"
  			},
  			{
  				"country_code": "AL",
  				"country_name": "Albania",
  				"currency_code": "ALL",
  				"population": "2986952",
  				"capital": "Tirana",
  				"continent": "Europe",
  				"area": "28748.0",
  				"languages": "sq,el"
  			},
  			{
  				"country_code": "AM",
  				"country_name": "Armenia",
  				"currency_code": "AMD",
  				"population": "2968000",
  				"capital": "Yerevan",
  				"continent": "Asia",
  				"area": "29800.0",
  				"languages": "hy"
  			},
  			{
  				"country_code": "AO",
  				"country_name": "Angola",
  				"currency_code": "AOA",
  				"population": "13068161",
  				"capital": "Luanda",
  				"continent": "Africa",
  				"area": "1246700.0",
  				"languages": "pt-AO"
  			},
  			{
  				"country_code": "AQ",
  				"country_name": "Antarctica",
  				"currency_code": "",
  				"population": "0",
  				"capital": "",
  				"continent": "Antarctica",
  				"area": "1.4E7",
  				"languages": ""
  			},
  			{
  				"country_code": "AR",
  				"country_name": "Argentina",
  				"currency_code": "ARS",
  				"population": "41343201",
  				"capital": "Buenos Aires",
  				"continent": "South America",
  				"area": "2766890.0",
  				"languages": "es-AR,en,it,de,fr,gn"
  			},
  			{
  				"country_code": "AS",
  				"country_name": "American Samoa",
  				"currency_code": "USD",
  				"population": "57881",
  				"capital": "Pago Pago",
  				"continent": "Oceania",
  				"area": "199.0",
  				"languages": "en-AS,sm,to"
  			},
  			{
  				"country_code": "AT",
  				"country_name": "Austria",
  				"currency_code": "EUR",
  				"population": "8205000",
  				"capital": "Vienna",
  				"continent": "Europe",
  				"area": "83858.0",
  				"languages": "de-AT,hr,hu,sl"
  			},
  			{
  				"country_code": "AU",
  				"country_name": "Australia",
  				"currency_code": "AUD",
  				"population": "21515754",
  				"capital": "Canberra",
  				"continent": "Oceania",
  				"area": "7686850.0",
  				"languages": "en-AU"
  			},
  			{
  				"country_code": "AW",
  				"country_name": "Aruba",
  				"currency_code": "AWG",
  				"population": "71566",
  				"capital": "Oranjestad",
  				"continent": "North America",
  				"area": "193.0",
  				"languages": "nl-AW,es,en"
  			},
  			{
  				"country_code": "AX",
  				"country_name": "Åland",
  				"currency_code": "EUR",
  				"population": "26711",
  				"capital": "Mariehamn",
  				"continent": "Europe",
  				"area": "1580.0",
  				"languages": "sv-AX"
  			},
  			{
  				"country_code": "AZ",
  				"country_name": "Azerbaijan",
  				"currency_code": "AZN",
  				"population": "8303512",
  				"capital": "Baku",
  				"continent": "Asia",
  				"area": "86600.0",
  				"languages": "az,ru,hy"
  			},
  			{
  				"country_code": "BA",
  				"country_name": "Bosnia and Herzegovina",
  				"currency_code": "BAM",
  				"population": "4590000",
  				"capital": "Sarajevo",
  				"continent": "Europe",
  				"area": "51129.0",
  				"languages": "bs,hr-BA,sr-BA"
  			},
  			{
  				"country_code": "BB",
  				"country_name": "Barbados",
  				"currency_code": "BBD",
  				"population": "285653",
  				"capital": "Bridgetown",
  				"continent": "North America",
  				"area": "431.0",
  				"languages": "en-BB"
  			},
  			{
  				"country_code": "BD",
  				"country_name": "Bangladesh",
  				"currency_code": "BDT",
  				"population": "156118464",
  				"capital": "Dhaka",
  				"continent": "Asia",
  				"area": "144000.0",
  				"languages": "bn-BD,en"
  			},
  			{
  				"country_code": "BE",
  				"country_name": "Belgium",
  				"currency_code": "EUR",
  				"population": "10403000",
  				"capital": "Brussels",
  				"continent": "Europe",
  				"area": "30510.0",
  				"languages": "nl-BE,fr-BE,de-BE"
  			},
  			{
  				"country_code": "BF",
  				"country_name": "Burkina Faso",
  				"currency_code": "XOF",
  				"population": "16241811",
  				"capital": "Ouagadougou",
  				"continent": "Africa",
  				"area": "274200.0",
  				"languages": "fr-BF"
  			},
  			{
  				"country_code": "BG",
  				"country_name": "Bulgaria",
  				"currency_code": "BGN",
  				"population": "7148785",
  				"capital": "Sofia",
  				"continent": "Europe",
  				"area": "110910.0",
  				"languages": "bg,tr-BG,rom"
  			},
  			{
  				"country_code": "BH",
  				"country_name": "Bahrain",
  				"currency_code": "BHD",
  				"population": "738004",
  				"capital": "Manama",
  				"continent": "Asia",
  				"area": "665.0",
  				"languages": "ar-BH,en,fa,ur"
  			},
  			{
  				"country_code": "BI",
  				"country_name": "Burundi",
  				"currency_code": "BIF",
  				"population": "9863117",
  				"capital": "Bujumbura",
  				"continent": "Africa",
  				"area": "27830.0",
  				"languages": "fr-BI,rn"
  			},
  			{
  				"country_code": "BJ",
  				"country_name": "Benin",
  				"currency_code": "XOF",
  				"population": "9056010",
  				"capital": "Porto-Novo",
  				"continent": "Africa",
  				"area": "112620.0",
  				"languages": "fr-BJ"
  			},
  			{
  				"country_code": "BL",
  				"country_name": "Saint Barthélemy",
  				"currency_code": "EUR",
  				"population": "8450",
  				"capital": "Gustavia",
  				"continent": "North America",
  				"area": "21.0",
  				"languages": "fr"
  			},
  			{
  				"country_code": "BM",
  				"country_name": "Bermuda",
  				"currency_code": "BMD",
  				"population": "65365",
  				"capital": "Hamilton",
  				"continent": "North America",
  				"area": "53.0",
  				"languages": "en-BM,pt"
  			},
  			{
  				"country_code": "BN",
  				"country_name": "Brunei",
  				"currency_code": "BND",
  				"population": "395027",
  				"capital": "Bandar Seri Begawan",
  				"continent": "Asia",
  				"area": "5770.0",
  				"languages": "ms-BN,en-BN"
  			},
  			{
  				"country_code": "BO",
  				"country_name": "Bolivia",
  				"currency_code": "BOB",
  				"population": "9947418",
  				"capital": "Sucre",
  				"continent": "South America",
  				"area": "1098580.0",
  				"languages": "es-BO,qu,ay"
  			},
  			{
  				"country_code": "BQ",
  				"country_name": "Bonaire",
  				"currency_code": "USD",
  				"population": "18012",
  				"capital": "",
  				"continent": "North America",
  				"area": "328.0",
  				"languages": "nl,pap,en"
  			},
  			{
  				"country_code": "BR",
  				"country_name": "Brazil",
  				"currency_code": "BRL",
  				"population": "201103330",
  				"capital": "Brasília",
  				"continent": "South America",
  				"area": "8511965.0",
  				"languages": "pt-BR,es,en,fr"
  			},
  			{
  				"country_code": "BS",
  				"country_name": "Bahamas",
  				"currency_code": "BSD",
  				"population": "301790",
  				"capital": "Nassau",
  				"continent": "North America",
  				"area": "13940.0",
  				"languages": "en-BS"
  			},
  			{
  				"country_code": "BT",
  				"country_name": "Bhutan",
  				"currency_code": "BTN",
  				"population": "699847",
  				"capital": "Thimphu",
  				"continent": "Asia",
  				"area": "47000.0",
  				"languages": "dz"
  			},
  			{
  				"country_code": "BV",
  				"country_name": "Bouvet Island",
  				"currency_code": "NOK",
  				"population": "0",
  				"capital": "",
  				"continent": "Antarctica",
  				"area": "49.0",
  				"languages": ""
  			},
  			{
  				"country_code": "BW",
  				"country_name": "Botswana",
  				"currency_code": "BWP",
  				"population": "2029307",
  				"capital": "Gaborone",
  				"continent": "Africa",
  				"area": "600370.0",
  				"languages": "en-BW,tn-BW"
  			},
  			{
  				"country_code": "BY",
  				"country_name": "Belarus",
  				"currency_code": "BYR",
  				"population": "9685000",
  				"capital": "Minsk",
  				"continent": "Europe",
  				"area": "207600.0",
  				"languages": "be,ru"
  			},
  			{
  				"country_code": "BZ",
  				"country_name": "Belize",
  				"currency_code": "BZD",
  				"population": "314522",
  				"capital": "Belmopan",
  				"continent": "North America",
  				"area": "22966.0",
  				"languages": "en-BZ,es"
  			},
  			{
  				"country_code": "CA",
  				"country_name": "Canada",
  				"currency_code": "CAD",
  				"population": "33679000",
  				"capital": "Ottawa",
  				"continent": "North America",
  				"area": "9984670.0",
  				"languages": "en-CA,fr-CA,iu"
  			},
  			{
  				"country_code": "CC",
  				"country_name": "Cocos [Keeling] Islands",
  				"currency_code": "AUD",
  				"population": "628",
  				"capital": "West Island",
  				"continent": "Asia",
  				"area": "14.0",
  				"languages": "ms-CC,en"
  			},
  			{
  				"country_code": "CD",
  				"country_name": "Democratic Republic of the Congo",
  				"currency_code": "CDF",
  				"population": "70916439",
  				"capital": "Kinshasa",
  				"continent": "Africa",
  				"area": "2345410.0",
  				"languages": "fr-CD,ln,kg"
  			},
  			{
  				"country_code": "CF",
  				"country_name": "Central African Republic",
  				"currency_code": "XAF",
  				"population": "4844927",
  				"capital": "Bangui",
  				"continent": "Africa",
  				"area": "622984.0",
  				"languages": "fr-CF,sg,ln,kg"
  			},
  			{
  				"country_code": "CG",
  				"country_name": "Republic of the Congo",
  				"currency_code": "XAF",
  				"population": "3039126",
  				"capital": "Brazzaville",
  				"continent": "Africa",
  				"area": "342000.0",
  				"languages": "fr-CG,kg,ln-CG"
  			},
  			{
  				"country_code": "CH",
  				"country_name": "Switzerland",
  				"currency_code": "CHF",
  				"population": "7581000",
  				"capital": "Berne",
  				"continent": "Europe",
  				"area": "41290.0",
  				"languages": "de-CH,fr-CH,it-CH,rm"
  			},
  			{
  				"country_code": "CI",
  				"country_name": "Ivory Coast",
  				"currency_code": "XOF",
  				"population": "21058798",
  				"capital": "Yamoussoukro",
  				"continent": "Africa",
  				"area": "322460.0",
  				"languages": "fr-CI"
  			},
  			{
  				"country_code": "CK",
  				"country_name": "Cook Islands",
  				"currency_code": "NZD",
  				"population": "21388",
  				"capital": "Avarua",
  				"continent": "Oceania",
  				"area": "240.0",
  				"languages": "en-CK,mi"
  			},
  			{
  				"country_code": "CL",
  				"country_name": "Chile",
  				"currency_code": "CLP",
  				"population": "16746491",
  				"capital": "Santiago",
  				"continent": "South America",
  				"area": "756950.0",
  				"languages": "es-CL"
  			},
  			{
  				"country_code": "CM",
  				"country_name": "Cameroon",
  				"currency_code": "XAF",
  				"population": "19294149",
  				"capital": "Yaoundé",
  				"continent": "Africa",
  				"area": "475440.0",
  				"languages": "en-CM,fr-CM"
  			},
  			{
  				"country_code": "CN",
  				"country_name": "China",
  				"currency_code": "CNY",
  				"population": "1330044000",
  				"capital": "Beijing",
  				"continent": "Asia",
  				"area": "9596960.0",
  				"languages": "zh-CN,yue,wuu,dta,ug,za"
  			},
  			{
  				"country_code": "CO",
  				"country_name": "Colombia",
  				"currency_code": "COP",
  				"population": "47790000",
  				"capital": "Bogotá",
  				"continent": "South America",
  				"area": "1138910.0",
  				"languages": "es-CO"
  			},
  			{
  				"country_code": "CR",
  				"country_name": "Costa Rica",
  				"currency_code": "CRC",
  				"population": "4516220",
  				"capital": "San José",
  				"continent": "North America",
  				"area": "51100.0",
  				"languages": "es-CR,en"
  			},
  			{
  				"country_code": "CU",
  				"country_name": "Cuba",
  				"currency_code": "CUP",
  				"population": "11423000",
  				"capital": "Havana",
  				"continent": "North America",
  				"area": "110860.0",
  				"languages": "es-CU"
  			},
  			{
  				"country_code": "CV",
  				"country_name": "Cape Verde",
  				"currency_code": "CVE",
  				"population": "508659",
  				"capital": "Praia",
  				"continent": "Africa",
  				"area": "4033.0",
  				"languages": "pt-CV"
  			},
  			{
  				"country_code": "CW",
  				"country_name": "Curacao",
  				"currency_code": "ANG",
  				"population": "141766",
  				"capital": "Willemstad",
  				"continent": "North America",
  				"area": "444.0",
  				"languages": "nl,pap"
  			},
  			{
  				"country_code": "CX",
  				"country_name": "Christmas Island",
  				"currency_code": "AUD",
  				"population": "1500",
  				"capital": "The Settlement",
  				"continent": "Asia",
  				"area": "135.0",
  				"languages": "en,zh,ms-CC"
  			},
  			{
  				"country_code": "CY",
  				"country_name": "Cyprus",
  				"currency_code": "EUR",
  				"population": "1102677",
  				"capital": "Nicosia",
  				"continent": "Europe",
  				"area": "9250.0",
  				"languages": "el-CY,tr-CY,en"
  			},
  			{
  				"country_code": "CZ",
  				"country_name": "Czech Republic",
  				"currency_code": "CZK",
  				"population": "10476000",
  				"capital": "Prague",
  				"continent": "Europe",
  				"area": "78866.0",
  				"languages": "cs,sk"
  			},
  			{
  				"country_code": "DE",
  				"country_name": "Germany",
  				"currency_code": "EUR",
  				"population": "81802257",
  				"capital": "Berlin",
  				"continent": "Europe",
  				"area": "357021.0",
  				"languages": "de"
  			},
  			{
  				"country_code": "DJ",
  				"country_name": "Djibouti",
  				"currency_code": "DJF",
  				"population": "740528",
  				"capital": "Djibouti",
  				"continent": "Africa",
  				"area": "23000.0",
  				"languages": "fr-DJ,ar,so-DJ,aa"
  			},
  			{
  				"country_code": "DK",
  				"country_name": "Denmark",
  				"currency_code": "DKK",
  				"population": "5484000",
  				"capital": "Copenhagen",
  				"continent": "Europe",
  				"area": "43094.0",
  				"languages": "da-DK,en,fo,de-DK"
  			},
  			{
  				"country_code": "DM",
  				"country_name": "Dominica",
  				"currency_code": "XCD",
  				"population": "72813",
  				"capital": "Roseau",
  				"continent": "North America",
  				"area": "754.0",
  				"languages": "en-DM"
  			},
  			{
  				"country_code": "DO",
  				"country_name": "Dominican Republic",
  				"currency_code": "DOP",
  				"population": "9823821",
  				"capital": "Santo Domingo",
  				"continent": "North America",
  				"area": "48730.0",
  				"languages": "es-DO"
  			},
  			{
  				"country_code": "DZ",
  				"country_name": "Algeria",
  				"currency_code": "DZD",
  				"population": "34586184",
  				"capital": "Algiers",
  				"continent": "Africa",
  				"area": "2381740.0",
  				"languages": "ar-DZ"
  			},
  			{
  				"country_code": "EC",
  				"country_name": "Ecuador",
  				"currency_code": "USD",
  				"population": "14790608",
  				"capital": "Quito",
  				"continent": "South America",
  				"area": "283560.0",
  				"languages": "es-EC"
  			},
  			{
  				"country_code": "EE",
  				"country_name": "Estonia",
  				"currency_code": "EUR",
  				"population": "1291170",
  				"capital": "Tallinn",
  				"continent": "Europe",
  				"area": "45226.0",
  				"languages": "et,ru"
  			},
  			{
  				"country_code": "EG",
  				"country_name": "Egypt",
  				"currency_code": "EGP",
  				"population": "80471869",
  				"capital": "Cairo",
  				"continent": "Africa",
  				"area": "1001450.0",
  				"languages": "ar-EG,en,fr"
  			},
  			{
  				"country_code": "EH",
  				"country_name": "Western Sahara",
  				"currency_code": "MAD",
  				"population": "273008",
  				"capital": "El Aaiún",
  				"continent": "Africa",
  				"area": "266000.0",
  				"languages": "ar,mey"
  			},
  			{
  				"country_code": "ER",
  				"country_name": "Eritrea",
  				"currency_code": "ERN",
  				"population": "5792984",
  				"capital": "Asmara",
  				"continent": "Africa",
  				"area": "121320.0",
  				"languages": "aa-ER,ar,tig,kun,ti-ER"
  			},
  			{
  				"country_code": "ES",
  				"country_name": "Spain",
  				"currency_code": "EUR",
  				"population": "46505963",
  				"capital": "Madrid",
  				"continent": "Europe",
  				"area": "504782.0",
  				"languages": "es-ES,ca,gl,eu,oc"
  			},
  			{
  				"country_code": "ET",
  				"country_name": "Ethiopia",
  				"currency_code": "ETB",
  				"population": "88013491",
  				"capital": "Addis Ababa",
  				"continent": "Africa",
  				"area": "1127127.0",
  				"languages": "am,en-ET,om-ET,ti-ET,so-ET,sid"
  			},
  			{
  				"country_code": "FI",
  				"country_name": "Finland",
  				"currency_code": "EUR",
  				"population": "5244000",
  				"capital": "Helsinki",
  				"continent": "Europe",
  				"area": "337030.0",
  				"languages": "fi-FI,sv-FI,smn"
  			},
  			{
  				"country_code": "FJ",
  				"country_name": "Fiji",
  				"currency_code": "FJD",
  				"population": "875983",
  				"capital": "Suva",
  				"continent": "Oceania",
  				"area": "18270.0",
  				"languages": "en-FJ,fj"
  			},
  			{
  				"country_code": "FK",
  				"country_name": "Falkland Islands",
  				"currency_code": "FKP",
  				"population": "2638",
  				"capital": "Stanley",
  				"continent": "South America",
  				"area": "12173.0",
  				"languages": "en-FK"
  			},
  			{
  				"country_code": "FM",
  				"country_name": "Micronesia",
  				"currency_code": "USD",
  				"population": "107708",
  				"capital": "Palikir",
  				"continent": "Oceania",
  				"area": "702.0",
  				"languages": "en-FM,chk,pon,yap,kos,uli,woe,nkr,kpg"
  			},
  			{
  				"country_code": "FO",
  				"country_name": "Faroe Islands",
  				"currency_code": "DKK",
  				"population": "48228",
  				"capital": "Tórshavn",
  				"continent": "Europe",
  				"area": "1399.0",
  				"languages": "fo,da-FO"
  			},
  			{
  				"country_code": "FR",
  				"country_name": "France",
  				"currency_code": "EUR",
  				"population": "64768389",
  				"capital": "Paris",
  				"continent": "Europe",
  				"area": "547030.0",
  				"languages": "fr-FR,frp,br,co,ca,eu,oc"
  			},
  			{
  				"country_code": "GA",
  				"country_name": "Gabon",
  				"currency_code": "XAF",
  				"population": "1545255",
  				"capital": "Libreville",
  				"continent": "Africa",
  				"area": "267667.0",
  				"languages": "fr-GA"
  			},
  			{
  				"country_code": "GB",
  				"country_name": "United Kingdom",
  				"currency_code": "GBP",
  				"population": "62348447",
  				"capital": "London",
  				"continent": "Europe",
  				"area": "244820.0",
  				"languages": "en-GB,cy-GB,gd"
  			},
  			{
  				"country_code": "GD",
  				"country_name": "Grenada",
  				"currency_code": "XCD",
  				"population": "107818",
  				"capital": "St. George's",
  				"continent": "North America",
  				"area": "344.0",
  				"languages": "en-GD"
  			},
  			{
  				"country_code": "GE",
  				"country_name": "Georgia",
  				"currency_code": "GEL",
  				"population": "4630000",
  				"capital": "Tbilisi",
  				"continent": "Asia",
  				"area": "69700.0",
  				"languages": "ka,ru,hy,az"
  			},
  			{
  				"country_code": "GF",
  				"country_name": "French Guiana",
  				"currency_code": "EUR",
  				"population": "195506",
  				"capital": "Cayenne",
  				"continent": "South America",
  				"area": "91000.0",
  				"languages": "fr-GF"
  			},
  			{
  				"country_code": "GG",
  				"country_name": "Guernsey",
  				"currency_code": "GBP",
  				"population": "65228",
  				"capital": "St Peter Port",
  				"continent": "Europe",
  				"area": "78.0",
  				"languages": "en,fr"
  			},
  			{
  				"country_code": "GH",
  				"country_name": "Ghana",
  				"currency_code": "GHS",
  				"population": "24339838",
  				"capital": "Accra",
  				"continent": "Africa",
  				"area": "239460.0",
  				"languages": "en-GH,ak,ee,tw"
  			},
  			{
  				"country_code": "GI",
  				"country_name": "Gibraltar",
  				"currency_code": "GIP",
  				"population": "27884",
  				"capital": "Gibraltar",
  				"continent": "Europe",
  				"area": "6.5",
  				"languages": "en-GI,es,it,pt"
  			},
  			{
  				"country_code": "GL",
  				"country_name": "Greenland",
  				"currency_code": "DKK",
  				"population": "56375",
  				"capital": "Nuuk",
  				"continent": "North America",
  				"area": "2166086.0",
  				"languages": "kl,da-GL,en"
  			},
  			{
  				"country_code": "GM",
  				"country_name": "Gambia",
  				"currency_code": "GMD",
  				"population": "1593256",
  				"capital": "Banjul",
  				"continent": "Africa",
  				"area": "11300.0",
  				"languages": "en-GM,mnk,wof,wo,ff"
  			},
  			{
  				"country_code": "GN",
  				"country_name": "Guinea",
  				"currency_code": "GNF",
  				"population": "10324025",
  				"capital": "Conakry",
  				"continent": "Africa",
  				"area": "245857.0",
  				"languages": "fr-GN"
  			},
  			{
  				"country_code": "GP",
  				"country_name": "Guadeloupe",
  				"currency_code": "EUR",
  				"population": "443000",
  				"capital": "Basse-Terre",
  				"continent": "North America",
  				"area": "1780.0",
  				"languages": "fr-GP"
  			},
  			{
  				"country_code": "GQ",
  				"country_name": "Equatorial Guinea",
  				"currency_code": "XAF",
  				"population": "1014999",
  				"capital": "Malabo",
  				"continent": "Africa",
  				"area": "28051.0",
  				"languages": "es-GQ,fr"
  			},
  			{
  				"country_code": "GR",
  				"country_name": "Greece",
  				"currency_code": "EUR",
  				"population": "11000000",
  				"capital": "Athens",
  				"continent": "Europe",
  				"area": "131940.0",
  				"languages": "el-GR,en,fr"
  			},
  			{
  				"country_code": "GS",
  				"country_name": "South Georgia and the South Sandwich Islands",
  				"currency_code": "GBP",
  				"population": "30",
  				"capital": "Grytviken",
  				"continent": "Antarctica",
  				"area": "3903.0",
  				"languages": "en"
  			},
  			{
  				"country_code": "GT",
  				"country_name": "Guatemala",
  				"currency_code": "GTQ",
  				"population": "13550440",
  				"capital": "Guatemala City",
  				"continent": "North America",
  				"area": "108890.0",
  				"languages": "es-GT"
  			},
  			{
  				"country_code": "GU",
  				"country_name": "Guam",
  				"currency_code": "USD",
  				"population": "159358",
  				"capital": "Hagåtña",
  				"continent": "Oceania",
  				"area": "549.0",
  				"languages": "en-GU,ch-GU"
  			},
  			{
  				"country_code": "GW",
  				"country_name": "Guinea-Bissau",
  				"currency_code": "XOF",
  				"population": "1565126",
  				"capital": "Bissau",
  				"continent": "Africa",
  				"area": "36120.0",
  				"languages": "pt-GW,pov"
  			},
  			{
  				"country_code": "GY",
  				"country_name": "Guyana",
  				"currency_code": "GYD",
  				"population": "748486",
  				"capital": "Georgetown",
  				"continent": "South America",
  				"area": "214970.0",
  				"languages": "en-GY"
  			},
  			{
  				"country_code": "HK",
  				"country_name": "Hong Kong",
  				"currency_code": "HKD",
  				"population": "6898686",
  				"capital": "Hong Kong",
  				"continent": "Asia",
  				"area": "1092.0",
  				"languages": "zh-HK,yue,zh,en"
  			},
  			{
  				"country_code": "HM",
  				"country_name": "Heard Island and McDonald Islands",
  				"currency_code": "AUD",
  				"population": "0",
  				"capital": "",
  				"continent": "Antarctica",
  				"area": "412.0",
  				"languages": ""
  			},
  			{
  				"country_code": "HN",
  				"country_name": "Honduras",
  				"currency_code": "HNL",
  				"population": "7989415",
  				"capital": "Tegucigalpa",
  				"continent": "North America",
  				"area": "112090.0",
  				"languages": "es-HN"
  			},
  			{
  				"country_code": "HR",
  				"country_name": "Croatia",
  				"currency_code": "HRK",
  				"population": "4491000",
  				"capital": "Zagreb",
  				"continent": "Europe",
  				"area": "56542.0",
  				"languages": "hr-HR,sr"
  			},
  			{
  				"country_code": "HT",
  				"country_name": "Haiti",
  				"currency_code": "HTG",
  				"population": "9648924",
  				"capital": "Port-au-Prince",
  				"continent": "North America",
  				"area": "27750.0",
  				"languages": "ht,fr-HT"
  			},
  			{
  				"country_code": "HU",
  				"country_name": "Hungary",
  				"currency_code": "HUF",
  				"population": "9982000",
  				"capital": "Budapest",
  				"continent": "Europe",
  				"area": "93030.0",
  				"languages": "hu-HU"
  			},
  			{
  				"country_code": "ID",
  				"country_name": "Indonesia",
  				"currency_code": "IDR",
  				"population": "242968342",
  				"capital": "Jakarta",
  				"continent": "Asia",
  				"area": "1919440.0",
  				"languages": "id,en,nl,jv"
  			},
  			{
  				"country_code": "IE",
  				"country_name": "Ireland",
  				"currency_code": "EUR",
  				"population": "4622917",
  				"capital": "Dublin",
  				"continent": "Europe",
  				"area": "70280.0",
  				"languages": "en-IE,ga-IE"
  			},
  			{
  				"country_code": "IL",
  				"country_name": "Israel",
  				"currency_code": "ILS",
  				"population": "7353985",
  				"capital": "",
  				"continent": "Asia",
  				"area": "20770.0",
  				"languages": "he,ar-IL,en-IL,"
  			},
  			{
  				"country_code": "IM",
  				"country_name": "Isle of Man",
  				"currency_code": "GBP",
  				"population": "75049",
  				"capital": "Douglas",
  				"continent": "Europe",
  				"area": "572.0",
  				"languages": "en,gv"
  			},
  			{
  				"country_code": "IN",
  				"country_name": "India",
  				"currency_code": "INR",
  				"population": "1173108018",
  				"capital": "New Delhi",
  				"continent": "Asia",
  				"area": "3287590.0",
  				"languages": "en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc"
  			},
  			{
  				"country_code": "IO",
  				"country_name": "British Indian Ocean Territory",
  				"currency_code": "USD",
  				"population": "4000",
  				"capital": "",
  				"continent": "Asia",
  				"area": "60.0",
  				"languages": "en-IO"
  			},
  			{
  				"country_code": "IQ",
  				"country_name": "Iraq",
  				"currency_code": "IQD",
  				"population": "29671605",
  				"capital": "Baghdad",
  				"continent": "Asia",
  				"area": "437072.0",
  				"languages": "ar-IQ,ku,hy"
  			},
  			{
  				"country_code": "IR",
  				"country_name": "Iran",
  				"currency_code": "IRR",
  				"population": "76923300",
  				"capital": "Tehran",
  				"continent": "Asia",
  				"area": "1648000.0",
  				"languages": "fa-IR,ku"
  			},
  			{
  				"country_code": "IS",
  				"country_name": "Iceland",
  				"currency_code": "ISK",
  				"population": "308910",
  				"capital": "Reykjavik",
  				"continent": "Europe",
  				"area": "103000.0",
  				"languages": "is,en,de,da,sv,no"
  			},
  			{
  				"country_code": "IT",
  				"country_name": "Italy",
  				"currency_code": "EUR",
  				"population": "60340328",
  				"capital": "Rome",
  				"continent": "Europe",
  				"area": "301230.0",
  				"languages": "it-IT,de-IT,fr-IT,sc,ca,co,sl"
  			},
  			{
  				"country_code": "JE",
  				"country_name": "Jersey",
  				"currency_code": "GBP",
  				"population": "90812",
  				"capital": "Saint Helier",
  				"continent": "Europe",
  				"area": "116.0",
  				"languages": "en,pt"
  			},
  			{
  				"country_code": "JM",
  				"country_name": "Jamaica",
  				"currency_code": "JMD",
  				"population": "2847232",
  				"capital": "Kingston",
  				"continent": "North America",
  				"area": "10991.0",
  				"languages": "en-JM"
  			},
  			{
  				"country_code": "JO",
  				"country_name": "Jordan",
  				"currency_code": "JOD",
  				"population": "6407085",
  				"capital": "Amman",
  				"continent": "Asia",
  				"area": "92300.0",
  				"languages": "ar-JO,en"
  			},
  			{
  				"country_code": "JP",
  				"country_name": "Japan",
  				"currency_code": "JPY",
  				"population": "127288000",
  				"capital": "Tokyo",
  				"continent": "Asia",
  				"area": "377835.0",
  				"languages": "ja"
  			},
  			{
  				"country_code": "KE",
  				"country_name": "Kenya",
  				"currency_code": "KES",
  				"population": "40046566",
  				"capital": "Nairobi",
  				"continent": "Africa",
  				"area": "582650.0",
  				"languages": "en-KE,sw-KE"
  			},
  			{
  				"country_code": "KG",
  				"country_name": "Kyrgyzstan",
  				"currency_code": "KGS",
  				"population": "5776500",
  				"capital": "Bishkek",
  				"continent": "Asia",
  				"area": "198500.0",
  				"languages": "ky,uz,ru"
  			},
  			{
  				"country_code": "KH",
  				"country_name": "Cambodia",
  				"currency_code": "KHR",
  				"population": "14453680",
  				"capital": "Phnom Penh",
  				"continent": "Asia",
  				"area": "181040.0",
  				"languages": "km,fr,en"
  			},
  			{
  				"country_code": "KI",
  				"country_name": "Kiribati",
  				"currency_code": "AUD",
  				"population": "92533",
  				"capital": "Tarawa",
  				"continent": "Oceania",
  				"area": "811.0",
  				"languages": "en-KI,gil"
  			},
  			{
  				"country_code": "KM",
  				"country_name": "Comoros",
  				"currency_code": "KMF",
  				"population": "773407",
  				"capital": "Moroni",
  				"continent": "Africa",
  				"area": "2170.0",
  				"languages": "ar,fr-KM"
  			},
  			{
  				"country_code": "KN",
  				"country_name": "Saint Kitts and Nevis",
  				"currency_code": "XCD",
  				"population": "51134",
  				"capital": "Basseterre",
  				"continent": "North America",
  				"area": "261.0",
  				"languages": "en-KN"
  			},
  			{
  				"country_code": "KP",
  				"country_name": "North Korea",
  				"currency_code": "KPW",
  				"population": "22912177",
  				"capital": "Pyongyang",
  				"continent": "Asia",
  				"area": "120540.0",
  				"languages": "ko-KP"
  			},
  			{
  				"country_code": "KR",
  				"country_name": "South Korea",
  				"currency_code": "KRW",
  				"population": "48422644",
  				"capital": "Seoul",
  				"continent": "Asia",
  				"area": "98480.0",
  				"languages": "ko-KR,en"
  			},
  			{
  				"country_code": "KW",
  				"country_name": "Kuwait",
  				"currency_code": "KWD",
  				"population": "2789132",
  				"capital": "Kuwait City",
  				"continent": "Asia",
  				"area": "17820.0",
  				"languages": "ar-KW,en"
  			},
  			{
  				"country_code": "KY",
  				"country_name": "Cayman Islands",
  				"currency_code": "KYD",
  				"population": "44270",
  				"capital": "George Town",
  				"continent": "North America",
  				"area": "262.0",
  				"languages": "en-KY"
  			},
  			{
  				"country_code": "KZ",
  				"country_name": "Kazakhstan",
  				"currency_code": "KZT",
  				"population": "15340000",
  				"capital": "Astana",
  				"continent": "Asia",
  				"area": "2717300.0",
  				"languages": "kk,ru"
  			},
  			{
  				"country_code": "LA",
  				"country_name": "Laos",
  				"currency_code": "LAK",
  				"population": "6368162",
  				"capital": "Vientiane",
  				"continent": "Asia",
  				"area": "236800.0",
  				"languages": "lo,fr,en"
  			},
  			{
  				"country_code": "LB",
  				"country_name": "Lebanon",
  				"currency_code": "LBP",
  				"population": "4125247",
  				"capital": "Beirut",
  				"continent": "Asia",
  				"area": "10400.0",
  				"languages": "ar-LB,fr-LB,en,hy"
  			},
  			{
  				"country_code": "LC",
  				"country_name": "Saint Lucia",
  				"currency_code": "XCD",
  				"population": "160922",
  				"capital": "Castries",
  				"continent": "North America",
  				"area": "616.0",
  				"languages": "en-LC"
  			},
  			{
  				"country_code": "LI",
  				"country_name": "Liechtenstein",
  				"currency_code": "CHF",
  				"population": "35000",
  				"capital": "Vaduz",
  				"continent": "Europe",
  				"area": "160.0",
  				"languages": "de-LI"
  			},
  			{
  				"country_code": "LK",
  				"country_name": "Sri Lanka",
  				"currency_code": "LKR",
  				"population": "21513990",
  				"capital": "Colombo",
  				"continent": "Asia",
  				"area": "65610.0",
  				"languages": "si,ta,en"
  			},
  			{
  				"country_code": "LR",
  				"country_name": "Liberia",
  				"currency_code": "LRD",
  				"population": "3685076",
  				"capital": "Monrovia",
  				"continent": "Africa",
  				"area": "111370.0",
  				"languages": "en-LR"
  			},
  			{
  				"country_code": "LS",
  				"country_name": "Lesotho",
  				"currency_code": "LSL",
  				"population": "1919552",
  				"capital": "Maseru",
  				"continent": "Africa",
  				"area": "30355.0",
  				"languages": "en-LS,st,zu,xh"
  			},
  			{
  				"country_code": "LT",
  				"country_name": "Lithuania",
  				"currency_code": "EUR",
  				"population": "2944459",
  				"capital": "Vilnius",
  				"continent": "Europe",
  				"area": "65200.0",
  				"languages": "lt,ru,pl"
  			},
  			{
  				"country_code": "LU",
  				"country_name": "Luxembourg",
  				"currency_code": "EUR",
  				"population": "497538",
  				"capital": "Luxembourg",
  				"continent": "Europe",
  				"area": "2586.0",
  				"languages": "lb,de-LU,fr-LU"
  			},
  			{
  				"country_code": "LV",
  				"country_name": "Latvia",
  				"currency_code": "EUR",
  				"population": "2217969",
  				"capital": "Riga",
  				"continent": "Europe",
  				"area": "64589.0",
  				"languages": "lv,ru,lt"
  			},
  			{
  				"country_code": "LY",
  				"country_name": "Libya",
  				"currency_code": "LYD",
  				"population": "6461454",
  				"capital": "Tripoli",
  				"continent": "Africa",
  				"area": "1759540.0",
  				"languages": "ar-LY,it,en"
  			},
  			{
  				"country_code": "MA",
  				"country_name": "Morocco",
  				"currency_code": "MAD",
  				"population": "31627428",
  				"capital": "Rabat",
  				"continent": "Africa",
  				"area": "446550.0",
  				"languages": "ar-MA,fr"
  			},
  			{
  				"country_code": "MC",
  				"country_name": "Monaco",
  				"currency_code": "EUR",
  				"population": "32965",
  				"capital": "Monaco",
  				"continent": "Europe",
  				"area": "1.95",
  				"languages": "fr-MC,en,it"
  			},
  			{
  				"country_code": "MD",
  				"country_name": "Moldova",
  				"currency_code": "MDL",
  				"population": "4324000",
  				"capital": "Chişinău",
  				"continent": "Europe",
  				"area": "33843.0",
  				"languages": "ro,ru,gag,tr"
  			},
  			{
  				"country_code": "ME",
  				"country_name": "Montenegro",
  				"currency_code": "EUR",
  				"population": "666730",
  				"capital": "Podgorica",
  				"continent": "Europe",
  				"area": "14026.0",
  				"languages": "sr,hu,bs,sq,hr,rom"
  			},
  			{
  				"country_code": "MF",
  				"country_name": "Saint Martin",
  				"currency_code": "EUR",
  				"population": "35925",
  				"capital": "Marigot",
  				"continent": "North America",
  				"area": "53.0",
  				"languages": "fr"
  			},
  			{
  				"country_code": "MG",
  				"country_name": "Madagascar",
  				"currency_code": "MGA",
  				"population": "21281844",
  				"capital": "Antananarivo",
  				"continent": "Africa",
  				"area": "587040.0",
  				"languages": "fr-MG,mg"
  			},
  			{
  				"country_code": "MH",
  				"country_name": "Marshall Islands",
  				"currency_code": "USD",
  				"population": "65859",
  				"capital": "Majuro",
  				"continent": "Oceania",
  				"area": "181.3",
  				"languages": "mh,en-MH"
  			},
  			{
  				"country_code": "MK",
  				"country_name": "Macedonia",
  				"currency_code": "MKD",
  				"population": "2062294",
  				"capital": "Skopje",
  				"continent": "Europe",
  				"area": "25333.0",
  				"languages": "mk,sq,tr,rmm,sr"
  			},
  			{
  				"country_code": "ML",
  				"country_name": "Mali",
  				"currency_code": "XOF",
  				"population": "13796354",
  				"capital": "Bamako",
  				"continent": "Africa",
  				"area": "1240000.0",
  				"languages": "fr-ML,bm"
  			},
  			{
  				"country_code": "MM",
  				"country_name": "Myanmar [Burma]",
  				"currency_code": "MMK",
  				"population": "53414374",
  				"capital": "Nay Pyi Taw",
  				"continent": "Asia",
  				"area": "678500.0",
  				"languages": "my"
  			},
  			{
  				"country_code": "MN",
  				"country_name": "Mongolia",
  				"currency_code": "MNT",
  				"population": "3086918",
  				"capital": "Ulan Bator",
  				"continent": "Asia",
  				"area": "1565000.0",
  				"languages": "mn,ru"
  			},
  			{
  				"country_code": "MO",
  				"country_name": "Macao",
  				"currency_code": "MOP",
  				"population": "449198",
  				"capital": "Macao",
  				"continent": "Asia",
  				"area": "254.0",
  				"languages": "zh,zh-MO,pt"
  			},
  			{
  				"country_code": "MP",
  				"country_name": "Northern Mariana Islands",
  				"currency_code": "USD",
  				"population": "53883",
  				"capital": "Saipan",
  				"continent": "Oceania",
  				"area": "477.0",
  				"languages": "fil,tl,zh,ch-MP,en-MP"
  			},
  			{
  				"country_code": "MQ",
  				"country_name": "Martinique",
  				"currency_code": "EUR",
  				"population": "432900",
  				"capital": "Fort-de-France",
  				"continent": "North America",
  				"area": "1100.0",
  				"languages": "fr-MQ"
  			},
  			{
  				"country_code": "MR",
  				"country_name": "Mauritania",
  				"currency_code": "MRO",
  				"population": "3205060",
  				"capital": "Nouakchott",
  				"continent": "Africa",
  				"area": "1030700.0",
  				"languages": "ar-MR,fuc,snk,fr,mey,wo"
  			},
  			{
  				"country_code": "MS",
  				"country_name": "Montserrat",
  				"currency_code": "XCD",
  				"population": "9341",
  				"capital": "Plymouth",
  				"continent": "North America",
  				"area": "102.0",
  				"languages": "en-MS"
  			},
  			{
  				"country_code": "MT",
  				"country_name": "Malta",
  				"currency_code": "EUR",
  				"population": "403000",
  				"capital": "Valletta",
  				"continent": "Europe",
  				"area": "316.0",
  				"languages": "mt,en-MT"
  			},
  			{
  				"country_code": "MU",
  				"country_name": "Mauritius",
  				"currency_code": "MUR",
  				"population": "1294104",
  				"capital": "Port Louis",
  				"continent": "Africa",
  				"area": "2040.0",
  				"languages": "en-MU,bho,fr"
  			},
  			{
  				"country_code": "MV",
  				"country_name": "Maldives",
  				"currency_code": "MVR",
  				"population": "395650",
  				"capital": "Malé",
  				"continent": "Asia",
  				"area": "300.0",
  				"languages": "dv,en"
  			},
  			{
  				"country_code": "MW",
  				"country_name": "Malawi",
  				"currency_code": "MWK",
  				"population": "15447500",
  				"capital": "Lilongwe",
  				"continent": "Africa",
  				"area": "118480.0",
  				"languages": "ny,yao,tum,swk"
  			},
  			{
  				"country_code": "MX",
  				"country_name": "Mexico",
  				"currency_code": "MXN",
  				"population": "112468855",
  				"capital": "Mexico City",
  				"continent": "North America",
  				"area": "1972550.0",
  				"languages": "es-MX"
  			},
  			{
  				"country_code": "MY",
  				"country_name": "Malaysia",
  				"currency_code": "MYR",
  				"population": "28274729",
  				"capital": "Kuala Lumpur",
  				"continent": "Asia",
  				"area": "329750.0",
  				"languages": "ms-MY,en,zh,ta,te,ml,pa,th"
  			},
  			{
  				"country_code": "MZ",
  				"country_name": "Mozambique",
  				"currency_code": "MZN",
  				"population": "22061451",
  				"capital": "Maputo",
  				"continent": "Africa",
  				"area": "801590.0",
  				"languages": "pt-MZ,vmw"
  			},
  			{
  				"country_code": "NA",
  				"country_name": "Namibia",
  				"currency_code": "NAD",
  				"population": "2128471",
  				"capital": "Windhoek",
  				"continent": "Africa",
  				"area": "825418.0",
  				"languages": "en-NA,af,de,hz,naq"
  			},
  			{
  				"country_code": "NC",
  				"country_name": "New Caledonia",
  				"currency_code": "XPF",
  				"population": "216494",
  				"capital": "Noumea",
  				"continent": "Oceania",
  				"area": "19060.0",
  				"languages": "fr-NC"
  			},
  			{
  				"country_code": "NE",
  				"country_name": "Niger",
  				"currency_code": "XOF",
  				"population": "15878271",
  				"capital": "Niamey",
  				"continent": "Africa",
  				"area": "1267000.0",
  				"languages": "fr-NE,ha,kr,dje"
  			},
  			{
  				"country_code": "NF",
  				"country_name": "Norfolk Island",
  				"currency_code": "AUD",
  				"population": "1828",
  				"capital": "Kingston",
  				"continent": "Oceania",
  				"area": "34.6",
  				"languages": "en-NF"
  			},
  			{
  				"country_code": "NG",
  				"country_name": "Nigeria",
  				"currency_code": "NGN",
  				"population": "154000000",
  				"capital": "Abuja",
  				"continent": "Africa",
  				"area": "923768.0",
  				"languages": "en-NG,ha,yo,ig,ff"
  			},
  			{
  				"country_code": "NI",
  				"country_name": "Nicaragua",
  				"currency_code": "NIO",
  				"population": "5995928",
  				"capital": "Managua",
  				"continent": "North America",
  				"area": "129494.0",
  				"languages": "es-NI,en"
  			},
  			{
  				"country_code": "NL",
  				"country_name": "Netherlands",
  				"currency_code": "EUR",
  				"population": "16645000",
  				"capital": "Amsterdam",
  				"continent": "Europe",
  				"area": "41526.0",
  				"languages": "nl-NL,fy-NL"
  			},
  			{
  				"country_code": "NO",
  				"country_name": "Norway",
  				"currency_code": "NOK",
  				"population": "5009150",
  				"capital": "Oslo",
  				"continent": "Europe",
  				"area": "324220.0",
  				"languages": "no,nb,nn,se,fi"
  			},
  			{
  				"country_code": "NP",
  				"country_name": "Nepal",
  				"currency_code": "NPR",
  				"population": "28951852",
  				"capital": "Kathmandu",
  				"continent": "Asia",
  				"area": "140800.0",
  				"languages": "ne,en"
  			},
  			{
  				"country_code": "NR",
  				"country_name": "Nauru",
  				"currency_code": "AUD",
  				"population": "10065",
  				"capital": "",
  				"continent": "Oceania",
  				"area": "21.0",
  				"languages": "na,en-NR"
  			},
  			{
  				"country_code": "NU",
  				"country_name": "Niue",
  				"currency_code": "NZD",
  				"population": "2166",
  				"capital": "Alofi",
  				"continent": "Oceania",
  				"area": "260.0",
  				"languages": "niu,en-NU"
  			},
  			{
  				"country_code": "NZ",
  				"country_name": "New Zealand",
  				"currency_code": "NZD",
  				"population": "4252277",
  				"capital": "Wellington",
  				"continent": "Oceania",
  				"area": "268680.0",
  				"languages": "en-NZ,mi"
  			},
  			{
  				"country_code": "OM",
  				"country_name": "Oman",
  				"currency_code": "OMR",
  				"population": "2967717",
  				"capital": "Muscat",
  				"continent": "Asia",
  				"area": "212460.0",
  				"languages": "ar-OM,en,bal,ur"
  			},
  			{
  				"country_code": "PA",
  				"country_name": "Panama",
  				"currency_code": "PAB",
  				"population": "3410676",
  				"capital": "Panama City",
  				"continent": "North America",
  				"area": "78200.0",
  				"languages": "es-PA,en"
  			},
  			{
  				"country_code": "PE",
  				"country_name": "Peru",
  				"currency_code": "PEN",
  				"population": "29907003",
  				"capital": "Lima",
  				"continent": "South America",
  				"area": "1285220.0",
  				"languages": "es-PE,qu,ay"
  			},
  			{
  				"country_code": "PF",
  				"country_name": "French Polynesia",
  				"currency_code": "XPF",
  				"population": "270485",
  				"capital": "Papeete",
  				"continent": "Oceania",
  				"area": "4167.0",
  				"languages": "fr-PF,ty"
  			},
  			{
  				"country_code": "PG",
  				"country_name": "Papua New Guinea",
  				"currency_code": "PGK",
  				"population": "6064515",
  				"capital": "Port Moresby",
  				"continent": "Oceania",
  				"area": "462840.0",
  				"languages": "en-PG,ho,meu,tpi"
  			},
  			{
  				"country_code": "PH",
  				"country_name": "Philippines",
  				"currency_code": "PHP",
  				"population": "99900177",
  				"capital": "Manila",
  				"continent": "Asia",
  				"area": "300000.0",
  				"languages": "tl,en-PH,fil"
  			},
  			{
  				"country_code": "PK",
  				"country_name": "Pakistan",
  				"currency_code": "PKR",
  				"population": "184404791",
  				"capital": "Islamabad",
  				"continent": "Asia",
  				"area": "803940.0",
  				"languages": "ur-PK,en-PK,pa,sd,ps,brh"
  			},
  			{
  				"country_code": "PL",
  				"country_name": "Poland",
  				"currency_code": "PLN",
  				"population": "38500000",
  				"capital": "Warsaw",
  				"continent": "Europe",
  				"area": "312685.0",
  				"languages": "pl"
  			},
  			{
  				"country_code": "PM",
  				"country_name": "Saint Pierre and Miquelon",
  				"currency_code": "EUR",
  				"population": "7012",
  				"capital": "Saint-Pierre",
  				"continent": "North America",
  				"area": "242.0",
  				"languages": "fr-PM"
  			},
  			{
  				"country_code": "PN",
  				"country_name": "Pitcairn Islands",
  				"currency_code": "NZD",
  				"population": "46",
  				"capital": "Adamstown",
  				"continent": "Oceania",
  				"area": "47.0",
  				"languages": "en-PN"
  			},
  			{
  				"country_code": "PR",
  				"country_name": "Puerto Rico",
  				"currency_code": "USD",
  				"population": "3916632",
  				"capital": "San Juan",
  				"continent": "North America",
  				"area": "9104.0",
  				"languages": "en-PR,es-PR"
  			},
  			{
  				"country_code": "PS",
  				"country_name": "Palestine",
  				"currency_code": "ILS",
  				"population": "3800000",
  				"capital": "",
  				"continent": "Asia",
  				"area": "5970.0",
  				"languages": "ar-PS"
  			},
  			{
  				"country_code": "PT",
  				"country_name": "Portugal",
  				"currency_code": "EUR",
  				"population": "10676000",
  				"capital": "Lisbon",
  				"continent": "Europe",
  				"area": "92391.0",
  				"languages": "pt-PT,mwl"
  			},
  			{
  				"country_code": "PW",
  				"country_name": "Palau",
  				"currency_code": "USD",
  				"population": "19907",
  				"capital": "Melekeok - Palau State Capital",
  				"continent": "Oceania",
  				"area": "458.0",
  				"languages": "pau,sov,en-PW,tox,ja,fil,zh"
  			},
  			{
  				"country_code": "PY",
  				"country_name": "Paraguay",
  				"currency_code": "PYG",
  				"population": "6375830",
  				"capital": "Asunción",
  				"continent": "South America",
  				"area": "406750.0",
  				"languages": "es-PY,gn"
  			},
  			{
  				"country_code": "QA",
  				"country_name": "Qatar",
  				"currency_code": "QAR",
  				"population": "840926",
  				"capital": "Doha",
  				"continent": "Asia",
  				"area": "11437.0",
  				"languages": "ar-QA,es"
  			},
  			{
  				"country_code": "RE",
  				"country_name": "Réunion",
  				"currency_code": "EUR",
  				"population": "776948",
  				"capital": "Saint-Denis",
  				"continent": "Africa",
  				"area": "2517.0",
  				"languages": "fr-RE"
  			},
  			{
  				"country_code": "RO",
  				"country_name": "Romania",
  				"currency_code": "RON",
  				"population": "21959278",
  				"capital": "Bucharest",
  				"continent": "Europe",
  				"area": "237500.0",
  				"languages": "ro,hu,rom"
  			},
  			{
  				"country_code": "RS",
  				"country_name": "Serbia",
  				"currency_code": "RSD",
  				"population": "7344847",
  				"capital": "Belgrade",
  				"continent": "Europe",
  				"area": "88361.0",
  				"languages": "sr,hu,bs,rom"
  			},
  			{
  				"country_code": "RU",
  				"country_name": "Russia",
  				"currency_code": "RUB",
  				"population": "140702000",
  				"capital": "Moscow",
  				"continent": "Europe",
  				"area": "1.71E7",
  				"languages": "ru,tt,xal,cau,ady,kv,ce,tyv,cv,udm,tut,mns,bua,myv,mdf,chm,ba,inh,tut,kbd,krc,ava,sah,nog"
  			},
  			{
  				"country_code": "RW",
  				"country_name": "Rwanda",
  				"currency_code": "RWF",
  				"population": "11055976",
  				"capital": "Kigali",
  				"continent": "Africa",
  				"area": "26338.0",
  				"languages": "rw,en-RW,fr-RW,sw"
  			},
  			{
  				"country_code": "SA",
  				"country_name": "Saudi Arabia",
  				"currency_code": "SAR",
  				"population": "25731776",
  				"capital": "Riyadh",
  				"continent": "Asia",
  				"area": "1960582.0",
  				"languages": "ar-SA"
  			},
  			{
  				"country_code": "SB",
  				"country_name": "Solomon Islands",
  				"currency_code": "SBD",
  				"population": "559198",
  				"capital": "Honiara",
  				"continent": "Oceania",
  				"area": "28450.0",
  				"languages": "en-SB,tpi"
  			},
  			{
  				"country_code": "SC",
  				"country_name": "Seychelles",
  				"currency_code": "SCR",
  				"population": "88340",
  				"capital": "Victoria",
  				"continent": "Africa",
  				"area": "455.0",
  				"languages": "en-SC,fr-SC"
  			},
  			{
  				"country_code": "SD",
  				"country_name": "Sudan",
  				"currency_code": "SDG",
  				"population": "35000000",
  				"capital": "Khartoum",
  				"continent": "Africa",
  				"area": "1861484.0",
  				"languages": "ar-SD,en,fia"
  			},
  			{
  				"country_code": "SE",
  				"country_name": "Sweden",
  				"currency_code": "SEK",
  				"population": "9555893",
  				"capital": "Stockholm",
  				"continent": "Europe",
  				"area": "449964.0",
  				"languages": "sv-SE,se,sma,fi-SE"
  			},
  			{
  				"country_code": "SG",
  				"country_name": "Singapore",
  				"currency_code": "SGD",
  				"population": "4701069",
  				"capital": "Singapore",
  				"continent": "Asia",
  				"area": "692.7",
  				"languages": "cmn,en-SG,ms-SG,ta-SG,zh-SG"
  			},
  			{
  				"country_code": "SH",
  				"country_name": "Saint Helena",
  				"currency_code": "SHP",
  				"population": "7460",
  				"capital": "Jamestown",
  				"continent": "Africa",
  				"area": "410.0",
  				"languages": "en-SH"
  			},
  			{
  				"country_code": "SI",
  				"country_name": "Slovenia",
  				"currency_code": "EUR",
  				"population": "2007000",
  				"capital": "Ljubljana",
  				"continent": "Europe",
  				"area": "20273.0",
  				"languages": "sl,sh"
  			},
  			{
  				"country_code": "SJ",
  				"country_name": "Svalbard and Jan Mayen",
  				"currency_code": "NOK",
  				"population": "2550",
  				"capital": "Longyearbyen",
  				"continent": "Europe",
  				"area": "62049.0",
  				"languages": "no,ru"
  			},
  			{
  				"country_code": "SK",
  				"country_name": "Slovakia",
  				"currency_code": "EUR",
  				"population": "5455000",
  				"capital": "Bratislava",
  				"continent": "Europe",
  				"area": "48845.0",
  				"languages": "sk,hu"
  			},
  			{
  				"country_code": "SL",
  				"country_name": "Sierra Leone",
  				"currency_code": "SLL",
  				"population": "5245695",
  				"capital": "Freetown",
  				"continent": "Africa",
  				"area": "71740.0",
  				"languages": "en-SL,men,tem"
  			},
  			{
  				"country_code": "SM",
  				"country_name": "San Marino",
  				"currency_code": "EUR",
  				"population": "31477",
  				"capital": "San Marino",
  				"continent": "Europe",
  				"area": "61.2",
  				"languages": "it-SM"
  			},
  			{
  				"country_code": "SN",
  				"country_name": "Senegal",
  				"currency_code": "XOF",
  				"population": "12323252",
  				"capital": "Dakar",
  				"continent": "Africa",
  				"area": "196190.0",
  				"languages": "fr-SN,wo,fuc,mnk"
  			},
  			{
  				"country_code": "SO",
  				"country_name": "Somalia",
  				"currency_code": "SOS",
  				"population": "10112453",
  				"capital": "Mogadishu",
  				"continent": "Africa",
  				"area": "637657.0",
  				"languages": "so-SO,ar-SO,it,en-SO"
  			},
  			{
  				"country_code": "SR",
  				"country_name": "Suriname",
  				"currency_code": "SRD",
  				"population": "492829",
  				"capital": "Paramaribo",
  				"continent": "South America",
  				"area": "163270.0",
  				"languages": "nl-SR,en,srn,hns,jv"
  			},
  			{
  				"country_code": "SS",
  				"country_name": "South Sudan",
  				"currency_code": "SSP",
  				"population": "8260490",
  				"capital": "Juba",
  				"continent": "Africa",
  				"area": "644329.0",
  				"languages": "en"
  			},
  			{
  				"country_code": "ST",
  				"country_name": "São Tomé and Príncipe",
  				"currency_code": "STD",
  				"population": "175808",
  				"capital": "São Tomé",
  				"continent": "Africa",
  				"area": "1001.0",
  				"languages": "pt-ST"
  			},
  			{
  				"country_code": "SV",
  				"country_name": "El Salvador",
  				"currency_code": "USD",
  				"population": "6052064",
  				"capital": "San Salvador",
  				"continent": "North America",
  				"area": "21040.0",
  				"languages": "es-SV"
  			},
  			{
  				"country_code": "SX",
  				"country_name": "Sint Maarten",
  				"currency_code": "ANG",
  				"population": "37429",
  				"capital": "Philipsburg",
  				"continent": "North America",
  				"area": "21.0",
  				"languages": "nl,en"
  			},
  			{
  				"country_code": "SY",
  				"country_name": "Syria",
  				"currency_code": "SYP",
  				"population": "22198110",
  				"capital": "Damascus",
  				"continent": "Asia",
  				"area": "185180.0",
  				"languages": "ar-SY,ku,hy,arc,fr,en"
  			},
  			{
  				"country_code": "SZ",
  				"country_name": "Swaziland",
  				"currency_code": "SZL",
  				"population": "1354051",
  				"capital": "Mbabane",
  				"continent": "Africa",
  				"area": "17363.0",
  				"languages": "en-SZ,ss-SZ"
  			},
  			{
  				"country_code": "TC",
  				"country_name": "Turks and Caicos Islands",
  				"currency_code": "USD",
  				"population": "20556",
  				"capital": "Cockburn Town",
  				"continent": "North America",
  				"area": "430.0",
  				"languages": "en-TC"
  			},
  			{
  				"country_code": "TD",
  				"country_name": "Chad",
  				"currency_code": "XAF",
  				"population": "10543464",
  				"capital": "N'Djamena",
  				"continent": "Africa",
  				"area": "1284000.0",
  				"languages": "fr-TD,ar-TD,sre"
  			},
  			{
  				"country_code": "TF",
  				"country_name": "French Southern Territories",
  				"currency_code": "EUR",
  				"population": "140",
  				"capital": "Port-aux-Français",
  				"continent": "Antarctica",
  				"area": "7829.0",
  				"languages": "fr"
  			},
  			{
  				"country_code": "TG",
  				"country_name": "Togo",
  				"currency_code": "XOF",
  				"population": "6587239",
  				"capital": "Lomé",
  				"continent": "Africa",
  				"area": "56785.0",
  				"languages": "fr-TG,ee,hna,kbp,dag,ha"
  			},
  			{
  				"country_code": "TH",
  				"country_name": "Thailand",
  				"currency_code": "THB",
  				"population": "67089500",
  				"capital": "Bangkok",
  				"continent": "Asia",
  				"area": "514000.0",
  				"languages": "th,en"
  			},
  			{
  				"country_code": "TJ",
  				"country_name": "Tajikistan",
  				"currency_code": "TJS",
  				"population": "7487489",
  				"capital": "Dushanbe",
  				"continent": "Asia",
  				"area": "143100.0",
  				"languages": "tg,ru"
  			},
  			{
  				"country_code": "TK",
  				"country_name": "Tokelau",
  				"currency_code": "NZD",
  				"population": "1466",
  				"capital": "",
  				"continent": "Oceania",
  				"area": "10.0",
  				"languages": "tkl,en-TK"
  			},
  			{
  				"country_code": "TL",
  				"country_name": "East Timor",
  				"currency_code": "USD",
  				"population": "1154625",
  				"capital": "Dili",
  				"continent": "Oceania",
  				"area": "15007.0",
  				"languages": "tet,pt-TL,id,en"
  			},
  			{
  				"country_code": "TM",
  				"country_name": "Turkmenistan",
  				"currency_code": "TMT",
  				"population": "4940916",
  				"capital": "Ashgabat",
  				"continent": "Asia",
  				"area": "488100.0",
  				"languages": "tk,ru,uz"
  			},
  			{
  				"country_code": "TN",
  				"country_name": "Tunisia",
  				"currency_code": "TND",
  				"population": "10589025",
  				"capital": "Tunis",
  				"continent": "Africa",
  				"area": "163610.0",
  				"languages": "ar-TN,fr"
  			},
  			{
  				"country_code": "TO",
  				"country_name": "Tonga",
  				"currency_code": "TOP",
  				"population": "122580",
  				"capital": "Nuku'alofa",
  				"continent": "Oceania",
  				"area": "748.0",
  				"languages": "to,en-TO"
  			},
  			{
  				"country_code": "TR",
  				"country_name": "Turkey",
  				"currency_code": "TRY",
  				"population": "77804122",
  				"capital": "Ankara",
  				"continent": "Asia",
  				"area": "780580.0",
  				"languages": "tr-TR,ku,diq,az,av"
  			},
  			{
  				"country_code": "TT",
  				"country_name": "Trinidad and Tobago",
  				"currency_code": "TTD",
  				"population": "1228691",
  				"capital": "Port of Spain",
  				"continent": "North America",
  				"area": "5128.0",
  				"languages": "en-TT,hns,fr,es,zh"
  			},
  			{
  				"country_code": "TV",
  				"country_name": "Tuvalu",
  				"currency_code": "AUD",
  				"population": "10472",
  				"capital": "Funafuti",
  				"continent": "Oceania",
  				"area": "26.0",
  				"languages": "tvl,en,sm,gil"
  			},
  			{
  				"country_code": "TW",
  				"country_name": "Taiwan",
  				"currency_code": "TWD",
  				"population": "22894384",
  				"capital": "Taipei",
  				"continent": "Asia",
  				"area": "35980.0",
  				"languages": "zh-TW,zh,nan,hak"
  			},
  			{
  				"country_code": "TZ",
  				"country_name": "Tanzania",
  				"currency_code": "TZS",
  				"population": "41892895",
  				"capital": "Dodoma",
  				"continent": "Africa",
  				"area": "945087.0",
  				"languages": "sw-TZ,en,ar"
  			},
  			{
  				"country_code": "UA",
  				"country_name": "Ukraine",
  				"currency_code": "UAH",
  				"population": "45415596",
  				"capital": "Kyiv",
  				"continent": "Europe",
  				"area": "603700.0",
  				"languages": "uk,ru-UA,rom,pl,hu"
  			},
  			{
  				"country_code": "UG",
  				"country_name": "Uganda",
  				"currency_code": "UGX",
  				"population": "33398682",
  				"capital": "Kampala",
  				"continent": "Africa",
  				"area": "236040.0",
  				"languages": "en-UG,lg,sw,ar"
  			},
  			{
  				"country_code": "UM",
  				"country_name": "U.S. Minor Outlying Islands",
  				"currency_code": "USD",
  				"population": "0",
  				"capital": "",
  				"continent": "Oceania",
  				"area": "0.0",
  				"languages": "en-UM"
  			},
  			{
  				"country_code": "US",
  				"country_name": "United States",
  				"currency_code": "USD",
  				"population": "310232863",
  				"capital": "Washington",
  				"continent": "North America",
  				"area": "9629091.0",
  				"languages": "en-US,es-US,haw,fr"
  			},
  			{
  				"country_code": "UY",
  				"country_name": "Uruguay",
  				"currency_code": "UYU",
  				"population": "3477000",
  				"capital": "Montevideo",
  				"continent": "South America",
  				"area": "176220.0",
  				"languages": "es-UY"
  			},
  			{
  				"country_code": "UZ",
  				"country_name": "Uzbekistan",
  				"currency_code": "UZS",
  				"population": "27865738",
  				"capital": "Tashkent",
  				"continent": "Asia",
  				"area": "447400.0",
  				"languages": "uz,ru,tg"
  			},
  			{
  				"country_code": "VA",
  				"country_name": "Vatican City",
  				"currency_code": "EUR",
  				"population": "921",
  				"capital": "Vatican",
  				"continent": "Europe",
  				"area": "0.44",
  				"languages": "la,it,fr"
  			},
  			{
  				"country_code": "VC",
  				"country_name": "Saint Vincent and the Grenadines",
  				"currency_code": "XCD",
  				"population": "104217",
  				"capital": "Kingstown",
  				"continent": "North America",
  				"area": "389.0",
  				"languages": "en-VC,fr"
  			},
  			{
  				"country_code": "VE",
  				"country_name": "Venezuela",
  				"currency_code": "VEF",
  				"population": "27223228",
  				"capital": "Caracas",
  				"continent": "South America",
  				"area": "912050.0",
  				"languages": "es-VE"
  			},
  			{
  				"country_code": "VG",
  				"country_name": "British Virgin Islands",
  				"currency_code": "USD",
  				"population": "21730",
  				"capital": "Road Town",
  				"continent": "North America",
  				"area": "153.0",
  				"languages": "en-VG"
  			},
  			{
  				"country_code": "VI",
  				"country_name": "U.S. Virgin Islands",
  				"currency_code": "USD",
  				"population": "108708",
  				"capital": "Charlotte Amalie",
  				"continent": "North America",
  				"area": "352.0",
  				"languages": "en-VI"
  			},
  			{
  				"country_code": "VN",
  				"country_name": "Vietnam",
  				"currency_code": "VND",
  				"population": "89571130",
  				"capital": "Hanoi",
  				"continent": "Asia",
  				"area": "329560.0",
  				"languages": "vi,en,fr,zh,km"
  			},
  			{
  				"country_code": "VU",
  				"country_name": "Vanuatu",
  				"currency_code": "VUV",
  				"population": "221552",
  				"capital": "Port Vila",
  				"continent": "Oceania",
  				"area": "12200.0",
  				"languages": "bi,en-VU,fr-VU"
  			},
  			{
  				"country_code": "WF",
  				"country_name": "Wallis and Futuna",
  				"currency_code": "XPF",
  				"population": "16025",
  				"capital": "Mata-Utu",
  				"continent": "Oceania",
  				"area": "274.0",
  				"languages": "wls,fud,fr-WF"
  			},
  			{
  				"country_code": "WS",
  				"country_name": "Samoa",
  				"currency_code": "WST",
  				"population": "192001",
  				"capital": "Apia",
  				"continent": "Oceania",
  				"area": "2944.0",
  				"languages": "sm,en-WS"
  			},
  			{
  				"country_code": "XK",
  				"country_name": "Kosovo",
  				"currency_code": "EUR",
  				"population": "1800000",
  				"capital": "Pristina",
  				"continent": "Europe",
  				"area": "10908.0",
  				"languages": "sq,sr"
  			},
  			{
  				"country_code": "YE",
  				"country_name": "Yemen",
  				"currency_code": "YER",
  				"population": "23495361",
  				"capital": "Sanaa",
  				"continent": "Asia",
  				"area": "527970.0",
  				"languages": "ar-YE"
  			},
  			{
  				"country_code": "YT",
  				"country_name": "Mayotte",
  				"currency_code": "EUR",
  				"population": "159042",
  				"capital": "Mamoutzou",
  				"continent": "Africa",
  				"area": "374.0",
  				"languages": "fr-YT"
  			},
  			{
  				"country_code": "ZA",
  				"country_name": "South Africa",
  				"currency_code": "ZAR",
  				"population": "49000000",
  				"capital": "Pretoria",
  				"continent": "Africa",
  				"area": "1219912.0",
  				"languages": "zu,xh,af,nso,en-ZA,tn,st,ts,ss,ve,nr"
  			},
  			{
  				"country_code": "ZM",
  				"country_name": "Zambia",
  				"currency_code": "ZMW",
  				"population": "13460305",
  				"capital": "Lusaka",
  				"continent": "Africa",
  				"area": "752614.0",
  				"languages": "en-ZM,bem,loz,lun,lue,ny,toi"
  			},
  			{
  				"country_code": "ZW",
  				"country_name": "Zimbabwe",
  				"currency_code": "ZWL",
  				"population": "11651858",
  				"capital": "Harare",
  				"continent": "Africa",
  				"area": "390580.0",
  				"languages": "en-ZW,sn,nr,nd"
  			}
  );
});
