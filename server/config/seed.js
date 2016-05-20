/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Country = require('../api/country/country.model');
var Company = require('../api/company/company.model');
var Transport = require('../api/transport/transport.model');
var TransportType = require('../api/transportType/transportType.model');
var TransportComparator = require('../api/comparators/comparators.model');
var Travel = require('../api/travel/travel.model');
var Location = require('../api/location/location.model');
var Rate = require('../api/rate/rate.model');
var Timeline = require('../api/timeline/timeline.model');
var Operation = require('../api/operation/operation.model');

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

var transportTypeId = "";
var transportTypeId2 = "";
TransportType.find({}).remove(function() {
    TransportType.create({
            name: 'plane',
            img: 'fa-plane'
        }, {
            name: 'Car',
            img: 'fa-car'
        },
        function(err, ttype, ttype2) {
            // if(err)console.error(err);
            transportTypeId = ttype._id;
            transportTypeId2 = ttype2._id;
        });
});

Country.find({}).remove(function() {
    Country.create({
            "calling_code": "93",
            "area": 647500,
            "cca3": "AFG",
            "languages": ["fa-AF", "ps", "uz-AF", "tk"],
            "country_code": "AF",
            "capital": "Kabul",
            "country_name": "Afghanistan",
            "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
            "continent": "Asia",
            "currency_code": "AFN",
            "population": 29121286
        }, {
            "calling_code": "355",
            "area": 28748,
            "cca3": "ALB",
            "languages": ["sq,el"],
            "country_code": "AL",
            "capital": "Tirana",
            "country_name": "Albania",
            "borders": ["MNE", "GRC", "MKD", "UNK"],
            "continent": "Europe",
            "currency_code": "ALL",
            "population": 2986952
        }, {
            "calling_code": "213",
            "area": 2381740,
            "cca3": "DZA",
            "languages": ["ar-DZ"],
            "country_code": "DZ",
            "capital": "Algiers",
            "country_name": "Algeria",
            "borders": ["TUN", "LBY", "NER", "ESH", "MRT", "MLI", "MAR"],
            "continent": "Africa",
            "currency_code": "DZD",
            "population": 34586184
        }, {
            "calling_code": "1684",
            "area": 199,
            "cca3": "ASM",
            "languages": ["en-AS", "sm", "to"],
            "country_code": "AS",
            "capital": "Pago Pago",
            "country_name": "American Samoa",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 57881
        }, {
            "calling_code": "376",
            "area": 468,
            "cca3": "AND",
            "languages": ["ca"],
            "country_code": "AD",
            "capital": "Andorra la Vella",
            "country_name": "Andorra",
            "borders": ["FRA", "ESP"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 84000
        }, {
            "calling_code": "244",
            "area": 1246700,
            "cca3": "AGO",
            "languages": ["pt-AO"],
            "country_code": "AO",
            "capital": "Luanda",
            "country_name": "Angola",
            "borders": ["COG", "COD", "ZMB", "NAM"],
            "continent": "Africa",
            "currency_code": "AOA",
            "population": 13068161
        }, {
            "calling_code": "1264",
            "area": 102,
            "cca3": "AIA",
            "languages": ["en-AI"],
            "country_code": "AI",
            "capital": "The Valley",
            "country_name": "Anguilla",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 13254
        }, {
            "calling_code": "1268",
            "area": 443,
            "cca3": "ATG",
            "languages": ["en-AG"],
            "country_code": "AG",
            "capital": "St. John's",
            "country_name": "Antigua and Barbuda",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 86754
        }, {
            "calling_code": "54",
            "area": 2766890,
            "cca3": "ARG",
            "languages": ["es-AR", "en", "it", "de", "fr", "gn"],
            "country_code": "AR",
            "capital": "Buenos Aires",
            "country_name": "Argentina",
            "borders": ["BOL", "BRA", "CHL", "PRY", "URY"],
            "continent": "South America",
            "currency_code": "ARS",
            "population": 41343201
        }, {
            "calling_code": "374",
            "area": 29800,
            "cca3": "ARM",
            "languages": ["hy"],
            "country_code": "AM",
            "capital": "Yerevan",
            "country_name": "Armenia",
            "borders": ["AZE", "GEO", "IRN", "TUR"],
            "continent": "Asia",
            "currency_code": "AMD",
            "population": 2968000
        }, {
            "calling_code": "297",
            "area": 193,
            "cca3": "ABW",
            "languages": ["nl-AW", "es", "en"],
            "country_code": "AW",
            "capital": "Oranjestad",
            "country_name": "Aruba",
            "borders": [],
            "continent": "North America",
            "currency_code": "AWG",
            "population": 71566
        }, {
            "calling_code": "61",
            "area": 7686850,
            "cca3": "AUS",
            "languages": ["en-AU"],
            "country_code": "AU",
            "capital": "Canberra",
            "country_name": "Australia",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "AUD",
            "population": 21515754
        }, {
            "calling_code": "43",
            "area": 83858,
            "cca3": "AUT",
            "languages": ["de-AT", "hr", "hu", "sl"],
            "country_code": "AT",
            "capital": "Vienna",
            "country_name": "Austria",
            "borders": ["CZE", "DEU", "HUN", "ITA", "LIE", "SVK", "SVN", "CHE"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 8205000
        }, {
            "calling_code": "994",
            "area": 86600,
            "cca3": "AZE",
            "languages": ["az", "ru", "hy"],
            "country_code": "AZ",
            "capital": "Baku",
            "country_name": "Azerbaijan",
            "borders": ["ARM", "GEO", "IRN", "RUS", "TUR"],
            "continent": "Asia",
            "currency_code": "AZN",
            "population": 8303512
        }, {
            "calling_code": "1242",
            "area": 13940,
            "cca3": "BHS",
            "languages": ["en-BS"],
            "country_code": "BS",
            "capital": "Nassau",
            "country_name": "Bahamas",
            "borders": [],
            "continent": "North America",
            "currency_code": "BSD",
            "population": 301790
        }, {
            "calling_code": "973",
            "area": 665,
            "cca3": "BHR",
            "languages": ["ar-BH", "en", "fa", "ur"],
            "country_code": "BH",
            "capital": "Manama",
            "country_name": "Bahrain",
            "borders": [],
            "continent": "Asia",
            "currency_code": "BHD",
            "population": 738004
        }, {
            "calling_code": "880",
            "area": 144000,
            "cca3": "BGD",
            "languages": ["bn-BD", "en"],
            "country_code": "BD",
            "capital": "Dhaka",
            "country_name": "Bangladesh",
            "borders": ["MMR", "IND"],
            "continent": "Asia",
            "currency_code": "BDT",
            "population": 156118464
        }, {
            "calling_code": "1246",
            "area": 431,
            "cca3": "BRB",
            "languages": ["en-BB"],
            "country_code": "BB",
            "capital": "Bridgetown",
            "country_name": "Barbados",
            "borders": [],
            "continent": "North America",
            "currency_code": "BBD",
            "population": 285653
        }, {
            "calling_code": "375",
            "area": 207600,
            "cca3": "BLR",
            "languages": ["be", "ru"],
            "country_code": "BY",
            "capital": "Minsk",
            "country_name": "Belarus",
            "borders": ["LVA", "LTU", "POL", "RUS", "UKR"],
            "continent": "Europe",
            "currency_code": "BYR",
            "population": 9685000
        }, {
            "calling_code": "32",
            "area": 30510,
            "cca3": "BEL",
            "languages": ["nl-BE", "fr-BE", "de-BE"],
            "country_code": "BE",
            "capital": "Brussels",
            "country_name": "Belgium",
            "borders": ["FRA", "DEU", "LUX", "NLD"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 10403000
        }, {
            "calling_code": "501",
            "area": 22966,
            "cca3": "BLZ",
            "languages": ["en-BZ", "es"],
            "country_code": "BZ",
            "capital": "Belmopan",
            "country_name": "Belize",
            "borders": ["GTM", "MEX"],
            "continent": "North America",
            "currency_code": "BZD",
            "population": 314522
        }, {
            "calling_code": "229",
            "area": 112620,
            "cca3": "BEN",
            "languages": ["fr-BJ"],
            "country_code": "BJ",
            "capital": "Porto-Novo",
            "country_name": "Benin",
            "borders": ["BFA", "NER", "NGA", "TGO"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 9056010
        }, {
            "calling_code": "1441",
            "area": 53,
            "cca3": "BMU",
            "languages": ["en-BM", "pt"],
            "country_code": "BM",
            "capital": "Hamilton",
            "country_name": "Bermuda",
            "borders": [],
            "continent": "North America",
            "currency_code": "BMD",
            "population": 65365
        }, {
            "calling_code": "975",
            "area": 47000,
            "cca3": "BTN",
            "languages": ["dz"],
            "country_code": "BT",
            "capital": "Thimphu",
            "country_name": "Bhutan",
            "borders": ["CHN", "IND"],
            "continent": "Asia",
            "currency_code": "BTN",
            "population": 699847
        }, {
            "calling_code": "591",
            "area": 1098580,
            "cca3": "BOL",
            "languages": ["es-BO", "qu", "ay"],
            "country_code": "BO",
            "capital": "Sucre",
            "country_name": "Bolivia",
            "borders": ["ARG", "BRA", "CHL", "PRY", "PER"],
            "continent": "South America",
            "currency_code": "BOB",
            "population": 9947418
        }, {
            "calling_code": "387",
            "area": 51129,
            "cca3": "BIH",
            "languages": ["bs", "hr-BA", "sr-BA"],
            "country_code": "BA",
            "capital": "Sarajevo",
            "country_name": "Bosnia and Herzegovina",
            "borders": ["HRV", "MNE", "SRB"],
            "continent": "Europe",
            "currency_code": "BAM",
            "population": 4590000
        }, {
            "calling_code": "267",
            "area": 600370,
            "cca3": "BWA",
            "languages": ["en-BW", "tn-BW"],
            "country_code": "BW",
            "capital": "Gaborone",
            "country_name": "Botswana",
            "borders": ["NAM", "ZAF", "ZMB", "ZWE"],
            "continent": "Africa",
            "currency_code": "BWP",
            "population": 2029307
        }, {
            "calling_code": "55",
            "area": 8511965,
            "cca3": "BRA",
            "languages": ["pt-BR", "es", "en", "fr"],
            "country_code": "BR",
            "capital": "Bras\u00edlia",
            "country_name": "Brazil",
            "borders": ["ARG", "BOL", "COL", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
            "continent": "South America",
            "currency_code": "BRL",
            "population": 201103330
        }, {
            "calling_code": "1284",
            "area": 153,
            "cca3": "VGB",
            "languages": ["en-VG"],
            "country_code": "VG",
            "capital": "Road Town",
            "country_name": "British Virgin Islands",
            "borders": [],
            "continent": "North America",
            "currency_code": "USD",
            "population": 21730
        }, {
            "calling_code": "673",
            "area": 5770,
            "cca3": "BRN",
            "languages": ["ms-BN", "en-BN"],
            "country_code": "BN",
            "capital": "Bandar Seri Begawan",
            "country_name": "Brunei",
            "borders": ["MYS"],
            "continent": "Asia",
            "currency_code": "BND",
            "population": 395027
        }, {
            "calling_code": "359",
            "area": 110910,
            "cca3": "BGR",
            "languages": ["bg", "tr-BG", "rom"],
            "country_code": "BG",
            "capital": "Sofia",
            "country_name": "Bulgaria",
            "borders": ["GRC", "MKD", "ROU", "SRB", "TUR"],
            "continent": "Europe",
            "currency_code": "BGN",
            "population": 7148785
        }, {
            "calling_code": "226",
            "area": 274200,
            "cca3": "BFA",
            "languages": ["fr-BF"],
            "country_code": "BF",
            "capital": "Ouagadougou",
            "country_name": "Burkina Faso",
            "borders": ["BEN", "CIV", "GHA", "MLI", "NER", "TGO"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 16241811
        }, {
            "calling_code": "257",
            "area": 27830,
            "cca3": "BDI",
            "languages": ["fr-BI", "rn"],
            "country_code": "BI",
            "capital": "Bujumbura",
            "country_name": "Burundi",
            "borders": ["COD", "RWA", "TZA"],
            "continent": "Africa",
            "currency_code": "BIF",
            "population": 9863117
        }, {
            "calling_code": "855",
            "area": 181040,
            "cca3": "KHM",
            "languages": ["km", "fr", "en"],
            "country_code": "KH",
            "capital": "Phnom Penh",
            "country_name": "Cambodia",
            "borders": ["LAO", "THA", "VNM"],
            "continent": "Asia",
            "currency_code": "KHR",
            "population": 14453680
        }, {
            "calling_code": "237",
            "area": 475440,
            "cca3": "CMR",
            "languages": ["en-CM", "fr-CM"],
            "country_code": "CM",
            "capital": "Yaound\u00e9",
            "country_name": "Cameroon",
            "borders": ["CAF", "TCD", "COG", "GNQ", "GAB", "NGA"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 19294149
        }, {
            "calling_code": "1",
            "area": 9984670,
            "cca3": "CAN",
            "languages": ["en-CA", "fr-CA", "iu"],
            "country_code": "CA",
            "capital": "Ottawa",
            "country_name": "Canada",
            "borders": ["USA"],
            "continent": "North America",
            "currency_code": "CAD",
            "population": 33679000
        }, {
            "calling_code": "238",
            "area": 4033,
            "cca3": "CPV",
            "languages": ["pt-CV"],
            "country_code": "CV",
            "capital": "Praia",
            "country_name": "Cape Verde",
            "borders": [],
            "continent": "Africa",
            "currency_code": "CVE",
            "population": 508659
        }, {
            "calling_code": "1345",
            "area": 262,
            "cca3": "CYM",
            "languages": ["en-KY"],
            "country_code": "KY",
            "capital": "George Town",
            "country_name": "Cayman Islands",
            "borders": [],
            "continent": "North America",
            "currency_code": "KYD",
            "population": 44270
        }, {
            "calling_code": "236",
            "area": 622984,
            "cca3": "CAF",
            "languages": ["fr-CF", "sg", "ln", "kg"],
            "country_code": "CF",
            "capital": "Bangui",
            "country_name": "Central African Republic",
            "borders": ["CMR", "TCD", "COD", "COG", "SSD", "SDN"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 4844927
        }, {
            "calling_code": "235",
            "area": 1284000,
            "cca3": "TCD",
            "languages": ["fr-TD", "ar-TD", "sre"],
            "country_code": "TD",
            "capital": "N'Djamena",
            "country_name": "Chad",
            "borders": ["CMR", "CAF", "LBY", "NER", "NGA", "SSD"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 10543464
        }, {
            "calling_code": "56",
            "area": 756950,
            "cca3": "CHL",
            "languages": ["es-CL"],
            "country_code": "CL",
            "capital": "Santiago",
            "country_name": "Chile",
            "borders": ["ARG", "BOL", "PER"],
            "continent": "South America",
            "currency_code": "CLP",
            "population": 16746491
        }, {
            "calling_code": "86",
            "area": 9596960,
            "cca3": "CHN",
            "languages": ["zh-CN", "yue", "wuu", "dta", "ug", "za"],
            "country_code": "CN",
            "capital": "Beijing",
            "country_name": "China",
            "borders": ["AFG", "BTN", "MMR", "HKG", "IND", "KAZ", "PRK", "KGZ", "LAO", "MAC", "MNG", "PAK", "RUS", "TJK", "VNM"],
            "continent": "Asia",
            "currency_code": "CNY",
            "population": 1330044000
        }, {
            "calling_code": "61",
            "area": 135,
            "cca3": "CXR",
            "languages": ["en", "zh", "ms-CC"],
            "country_code": "CX",
            "capital": "The Settlement",
            "country_name": "Christmas Island",
            "borders": [],
            "continent": "Asia",
            "currency_code": "AUD",
            "population": 1500
        }, {
            "calling_code": "61",
            "area": 14,
            "cca3": "CCK",
            "languages": ["ms-CC", "en"],
            "country_code": "CC",
            "capital": "West Island",
            "country_name": "Cocos [Keeling] Islands",
            "borders": [],
            "continent": "Asia",
            "currency_code": "AUD",
            "population": 628
        }, {
            "calling_code": "57",
            "area": 1138910,
            "cca3": "COL",
            "languages": ["es-CO"],
            "country_code": "CO",
            "capital": "Bogot\u00e1",
            "country_name": "Colombia",
            "borders": ["BRA", "ECU", "PAN", "PER", "VEN"],
            "continent": "South America",
            "currency_code": "COP",
            "population": 47790000
        }, {
            "calling_code": "269",
            "area": 2170,
            "cca3": "COM",
            "languages": ["ar", "fr-KM"],
            "country_code": "KM",
            "capital": "Moroni",
            "country_name": "Comoros",
            "borders": [],
            "continent": "Africa",
            "currency_code": "KMF",
            "population": 773407
        }, {
            "calling_code": "682",
            "area": 240,
            "cca3": "COK",
            "languages": ["en-CK", "mi"],
            "country_code": "CK",
            "capital": "Avarua",
            "country_name": "Cook Islands",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "NZD",
            "population": 21388
        }, {
            "calling_code": "506",
            "area": 51100,
            "cca3": "CRI",
            "languages": ["es-CR", "en"],
            "country_code": "CR",
            "capital": "San Jos\u00e9",
            "country_name": "Costa Rica",
            "borders": ["NIC", "PAN"],
            "continent": "North America",
            "currency_code": "CRC",
            "population": 4516220
        }, {
            "calling_code": "385",
            "area": 56542,
            "cca3": "HRV",
            "languages": ["hr-HR", "sr"],
            "country_code": "HR",
            "capital": "Zagreb",
            "country_name": "Croatia",
            "borders": ["BIH", "HUN", "MNE", "SRB", "SVN"],
            "continent": "Europe",
            "currency_code": "HRK",
            "population": 4491000
        }, {
            "calling_code": "53",
            "area": 110860,
            "cca3": "CUB",
            "languages": ["es-CU"],
            "country_code": "CU",
            "capital": "Havana",
            "country_name": "Cuba",
            "borders": [],
            "continent": "North America",
            "currency_code": "CUP",
            "population": 11423000
        }, {
            "calling_code": "5999",
            "area": 444,
            "cca3": "CUW",
            "languages": ["nl", "pap"],
            "country_code": "CW",
            "capital": "Willemstad",
            "country_name": "Curacao",
            "borders": [],
            "continent": "North America",
            "currency_code": "ANG",
            "population": 141766
        }, {
            "calling_code": "357",
            "area": 9250,
            "cca3": "CYP",
            "languages": ["el-CY", "tr-CY", "en"],
            "country_code": "CY",
            "capital": "Nicosia",
            "country_name": "Cyprus",
            "borders": ["GBR"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 1102677
        }, {
            "calling_code": "420",
            "area": 78866,
            "cca3": "CZE",
            "languages": ["cs", "sk"],
            "country_code": "CZ",
            "capital": "Prague",
            "country_name": "Czech Republic",
            "borders": ["AUT", "DEU", "POL", "SVK"],
            "continent": "Europe",
            "currency_code": "CZK",
            "population": 10476000
        }, {
            "calling_code": "243",
            "area": 2345410,
            "cca3": "COD",
            "languages": ["fr-CD", "ln", "kg"],
            "country_code": "CD",
            "capital": "Kinshasa",
            "country_name": "Democratic Republic of the Congo",
            "borders": ["AGO", "BDI", "CAF", "COG", "RWA", "SSD", "TZA", "UGA", "ZMB"],
            "continent": "Africa",
            "currency_code": "CDF",
            "population": 70916439
        }, {
            "calling_code": "45",
            "area": 43094,
            "cca3": "DNK",
            "languages": ["da-DK", "en", "fo", "de-DK"],
            "country_code": "DK",
            "capital": "Copenhagen",
            "country_name": "Denmark",
            "borders": ["DEU"],
            "continent": "Europe",
            "currency_code": "DKK",
            "population": 5484000
        }, {
            "calling_code": "253",
            "area": 23000,
            "cca3": "DJI",
            "languages": ["fr-DJ", "ar", "so-DJ", "aa"],
            "country_code": "DJ",
            "capital": "Djibouti",
            "country_name": "Djibouti",
            "borders": ["ERI", "ETH", "SOM"],
            "continent": "Africa",
            "currency_code": "DJF",
            "population": 740528
        }, {
            "calling_code": "1767",
            "area": 754,
            "cca3": "DMA",
            "languages": ["en-DM"],
            "country_code": "DM",
            "capital": "Roseau",
            "country_name": "Dominica",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 72813
        }, {
            "calling_code": "1809",
            "area": 48730,
            "cca3": "DOM",
            "languages": ["es-DO"],
            "country_code": "DO",
            "capital": "Santo Domingo",
            "country_name": "Dominican Republic",
            "borders": ["HTI"],
            "continent": "North America",
            "currency_code": "DOP",
            "population": 9823821
        }, {
            "calling_code": "670",
            "area": 15007,
            "cca3": "TLS",
            "languages": ["tet", "pt-TL", "id", "en"],
            "country_code": "TL",
            "capital": "Dili",
            "country_name": "East Timor",
            "borders": ["IDN"],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 1154625
        }, {
            "calling_code": "593",
            "area": 283560,
            "cca3": "ECU",
            "languages": ["es-EC"],
            "country_code": "EC",
            "capital": "Quito",
            "country_name": "Ecuador",
            "borders": ["COL", "PER"],
            "continent": "South America",
            "currency_code": "USD",
            "population": 14790608
        }, {
            "calling_code": "20",
            "area": 1001450,
            "cca3": "EGY",
            "languages": ["ar-EG", "en", "fr"],
            "country_code": "EG",
            "capital": "Cairo",
            "country_name": "Egypt",
            "borders": ["ISR", "LBY", "SDN"],
            "continent": "Africa",
            "currency_code": "EGP",
            "population": 80471869
        }, {
            "calling_code": "503",
            "area": 21040,
            "cca3": "SLV",
            "languages": ["es-SV"],
            "country_code": "SV",
            "capital": "San Salvador",
            "country_name": "El Salvador",
            "borders": ["GTM", "HND"],
            "continent": "North America",
            "currency_code": "USD",
            "population": 6052064
        }, {
            "calling_code": "240",
            "area": 28051,
            "cca3": "GNQ",
            "languages": ["es-GQ", "fr"],
            "country_code": "GQ",
            "capital": "Malabo",
            "country_name": "Equatorial Guinea",
            "borders": ["CMR", "GAB"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 1014999
        }, {
            "calling_code": "291",
            "area": 121320,
            "cca3": "ERI",
            "languages": ["aa-ER", "ar", "tig", "kun", "ti-ER"],
            "country_code": "ER",
            "capital": "Asmara",
            "country_name": "Eritrea",
            "borders": ["DJI", "ETH", "SDN"],
            "continent": "Africa",
            "currency_code": "ERN",
            "population": 5792984
        }, {
            "calling_code": "372",
            "area": 45226,
            "cca3": "EST",
            "languages": ["et", "ru"],
            "country_code": "EE",
            "capital": "Tallinn",
            "country_name": "Estonia",
            "borders": ["LVA", "RUS"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 1291170
        }, {
            "calling_code": "251",
            "area": 1127127,
            "cca3": "ETH",
            "languages": ["am", "en-ET", "om-ET", "ti-ET", "so-ET", "sid"],
            "country_code": "ET",
            "capital": "Addis Ababa",
            "country_name": "Ethiopia",
            "borders": ["DJI", "ERI", "KEN", "SOM", "SSD", "SDN"],
            "continent": "Africa",
            "currency_code": "ETB",
            "population": 88013491
        }, {
            "calling_code": "500",
            "area": 12173,
            "cca3": "FLK",
            "languages": ["en-FK"],
            "country_code": "FK",
            "capital": "Stanley",
            "country_name": "Falkland Islands",
            "borders": [],
            "continent": "South America",
            "currency_code": "FKP",
            "population": 2638
        }, {
            "calling_code": "298",
            "area": 1399,
            "cca3": "FRO",
            "languages": ["fo", "da-FO"],
            "country_code": "FO",
            "capital": "T\u00f3rshavn",
            "country_name": "Faroe Islands",
            "borders": [],
            "continent": "Europe",
            "currency_code": "DKK",
            "population": 48228
        }, {
            "calling_code": "679",
            "area": 18270,
            "cca3": "FJI",
            "languages": ["en-FJ", "fj"],
            "country_code": "FJ",
            "capital": "Suva",
            "country_name": "Fiji",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "FJD",
            "population": 875983
        }, {
            "calling_code": "358",
            "area": 337030,
            "cca3": "FIN",
            "languages": ["fi-FI", "sv-FI", "smn"],
            "country_code": "FI",
            "capital": "Helsinki",
            "country_name": "Finland",
            "borders": ["NOR", "SWE", "RUS"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 5244000
        }, {
            "calling_code": "33",
            "area": 547030,
            "cca3": "FRA",
            "languages": ["fr-FR", "frp", "br", "co", "ca", "eu", "oc"],
            "country_code": "FR",
            "capital": "Paris",
            "country_name": "France",
            "borders": ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 64768389
        }, {
            "calling_code": "594",
            "area": 91000,
            "cca3": "GUF",
            "languages": ["fr-GF"],
            "country_code": "GF",
            "capital": "Cayenne",
            "country_name": "French Guiana",
            "borders": ["BRA", "SUR"],
            "continent": "South America",
            "currency_code": "EUR",
            "population": 195506
        }, {
            "calling_code": "689",
            "area": 4167,
            "cca3": "PYF",
            "languages": ["fr-PF", "ty"],
            "country_code": "PF",
            "capital": "Papeete",
            "country_name": "French Polynesia",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "XPF",
            "population": 270485
        }, {
            "calling_code": "",
            "area": 7829,
            "cca3": "ATF",
            "languages": ["fr"],
            "country_code": "TF",
            "capital": "Port-aux-Fran\u00e7ais",
            "country_name": "French Southern Territories",
            "borders": [],
            "continent": "Antarctica",
            "currency_code": "EUR",
            "population": 140
        }, {
            "calling_code": "241",
            "area": 267667,
            "cca3": "GAB",
            "languages": ["fr-GA"],
            "country_code": "GA",
            "capital": "Libreville",
            "country_name": "Gabon",
            "borders": ["CMR", "COG", "GNQ"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 1545255
        }, {
            "calling_code": "220",
            "area": 11300,
            "cca3": "GMB",
            "languages": ["en-GM", "mnk", "wof", "wo", "ff"],
            "country_code": "GM",
            "capital": "Banjul",
            "country_name": "Gambia",
            "borders": ["SEN"],
            "continent": "Africa",
            "currency_code": "GMD",
            "population": 1593256
        }, {
            "calling_code": "995",
            "area": 69700,
            "cca3": "GEO",
            "languages": ["ka", "ru", "hy", "az"],
            "country_code": "GE",
            "capital": "Tbilisi",
            "country_name": "Georgia",
            "borders": ["ARM", "AZE", "RUS", "TUR"],
            "continent": "Asia",
            "currency_code": "GEL",
            "population": 4630000
        }, {
            "calling_code": "49",
            "area": 357021,
            "cca3": "DEU",
            "languages": ["de"],
            "country_code": "DE",
            "capital": "Berlin",
            "country_name": "Germany",
            "borders": ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 81802257
        }, {
            "calling_code": "233",
            "area": 239460,
            "cca3": "GHA",
            "languages": ["en-GH", "ak", "ee", "tw"],
            "country_code": "GH",
            "capital": "Accra",
            "country_name": "Ghana",
            "borders": ["BFA", "CIV", "TGO"],
            "continent": "Africa",
            "currency_code": "GHS",
            "population": 24339838
        }, {
            "calling_code": "350",
            "area": 6.5,
            "cca3": "GIB",
            "languages": ["en-GI", "es", "it", "pt"],
            "country_code": "GI",
            "capital": "Gibraltar",
            "country_name": "Gibraltar",
            "borders": ["ESP"],
            "continent": "Europe",
            "currency_code": "GIP",
            "population": 27884
        }, {
            "calling_code": "30",
            "area": 131940,
            "cca3": "GRC",
            "languages": ["el-GR", "en", "fr"],
            "country_code": "GR",
            "capital": "Athens",
            "country_name": "Greece",
            "borders": ["ALB", "BGR", "TUR", "MKD"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 11000000
        }, {
            "calling_code": "299",
            "area": 2166086,
            "cca3": "GRL",
            "languages": ["kl", "da-GL", "en"],
            "country_code": "GL",
            "capital": "Nuuk",
            "country_name": "Greenland",
            "borders": [],
            "continent": "North America",
            "currency_code": "DKK",
            "population": 56375
        }, {
            "calling_code": "1473",
            "area": 344,
            "cca3": "GRD",
            "languages": ["en-GD"],
            "country_code": "GD",
            "capital": "St. George's",
            "country_name": "Grenada",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 107818
        }, {
            "calling_code": "590",
            "area": 1780,
            "cca3": "GLP",
            "languages": ["fr-GP"],
            "country_code": "GP",
            "capital": "Basse-Terre",
            "country_name": "Guadeloupe",
            "borders": [],
            "continent": "North America",
            "currency_code": "EUR",
            "population": 443000
        }, {
            "calling_code": "1671",
            "area": 549,
            "cca3": "GUM",
            "languages": ["en-GU", "ch-GU"],
            "country_code": "GU",
            "capital": "Hag\u00e5t\u00f1a",
            "country_name": "Guam",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 159358
        }, {
            "calling_code": "502",
            "area": 108890,
            "cca3": "GTM",
            "languages": ["es-GT"],
            "country_code": "GT",
            "capital": "Guatemala City",
            "country_name": "Guatemala",
            "borders": ["BLZ", "SLV", "HND", "MEX"],
            "continent": "North America",
            "currency_code": "GTQ",
            "population": 13550440
        }, {
            "calling_code": "44",
            "area": 78,
            "cca3": "GGY",
            "languages": ["en", "fr"],
            "country_code": "GG",
            "capital": "St Peter Port",
            "country_name": "Guernsey",
            "borders": [],
            "continent": "Europe",
            "currency_code": "GBP",
            "population": 65228
        }, {
            "calling_code": "224",
            "area": 245857,
            "cca3": "GIN",
            "languages": ["fr-GN"],
            "country_code": "GN",
            "capital": "Conakry",
            "country_name": "Guinea",
            "borders": ["CIV", "GNB", "LBR", "MLI", "SEN", "SLE"],
            "continent": "Africa",
            "currency_code": "GNF",
            "population": 10324025
        }, {
            "calling_code": "245",
            "area": 36120,
            "cca3": "GNB",
            "languages": ["pt-GW", "pov"],
            "country_code": "GW",
            "capital": "Bissau",
            "country_name": "Guinea-Bissau",
            "borders": ["GIN", "SEN"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 1565126
        }, {
            "calling_code": "592",
            "area": 214970,
            "cca3": "GUY",
            "languages": ["en-GY"],
            "country_code": "GY",
            "capital": "Georgetown",
            "country_name": "Guyana",
            "borders": ["BRA", "SUR", "VEN"],
            "continent": "South America",
            "currency_code": "GYD",
            "population": 748486
        }, {
            "calling_code": "509",
            "area": 27750,
            "cca3": "HTI",
            "languages": ["ht", "fr-HT"],
            "country_code": "HT",
            "capital": "Port-au-Prince",
            "country_name": "Haiti",
            "borders": ["DOM"],
            "continent": "North America",
            "currency_code": "HTG",
            "population": 9648924
        }, {
            "calling_code": "504",
            "area": 112090,
            "cca3": "HND",
            "languages": ["es-HN"],
            "country_code": "HN",
            "capital": "Tegucigalpa",
            "country_name": "Honduras",
            "borders": ["GTM", "SLV", "NIC"],
            "continent": "North America",
            "currency_code": "HNL",
            "population": 7989415
        }, {
            "calling_code": "852",
            "area": 1092,
            "cca3": "HKG",
            "languages": ["zh-HK", "yue", "zh", "en"],
            "country_code": "HK",
            "capital": "Hong Kong",
            "country_name": "Hong Kong",
            "borders": ["CHN"],
            "continent": "Asia",
            "currency_code": "HKD",
            "population": 6898686
        }, {
            "calling_code": "36",
            "area": 93030,
            "cca3": "HUN",
            "languages": ["hu-HU"],
            "country_code": "HU",
            "capital": "Budapest",
            "country_name": "Hungary",
            "borders": ["AUT", "HRV", "ROU", "SRB", "SVK", "SVN", "UKR"],
            "continent": "Europe",
            "currency_code": "HUF",
            "population": 9982000
        }, {
            "calling_code": "354",
            "area": 103000,
            "cca3": "ISL",
            "languages": ["is", "en", "de", "da", "sv", "no"],
            "country_code": "IS",
            "capital": "Reykjavik",
            "country_name": "Iceland",
            "borders": [],
            "continent": "Europe",
            "currency_code": "ISK",
            "population": 308910
        }, {
            "calling_code": "91",
            "area": 3287590,
            "cca3": "IND",
            "languages": ["en-IN", "hi", "bn", "te", "mr", "ta", "ur", "gu", "kn", "ml", "or", "pa", "as", "bh", "sat", "ks", "ne", "sd", "kok", "doi", "mni", "sit", "sa", "fr", "lus", "inc"],
            "country_code": "IN",
            "capital": "New Delhi",
            "country_name": "India",
            "borders": ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"],
            "continent": "Asia",
            "currency_code": "INR",
            "population": 1173108018
        }, {
            "calling_code": "62",
            "area": 1919440,
            "cca3": "IDN",
            "languages": ["id", "en", "nl", "jv"],
            "country_code": "ID",
            "capital": "Jakarta",
            "country_name": "Indonesia",
            "borders": ["TLS", "MYS", "PNG"],
            "continent": "Asia",
            "currency_code": "IDR",
            "population": 242968342
        }, {
            "calling_code": "98",
            "area": 1648000,
            "cca3": "IRN",
            "languages": ["fa-IR", "ku"],
            "country_code": "IR",
            "capital": "Tehran",
            "country_name": "Iran",
            "borders": ["AFG", "ARM", "AZE", "IRQ", "PAK", "TUR", "TKM"],
            "continent": "Asia",
            "currency_code": "IRR",
            "population": 76923300
        }, {
            "calling_code": "964",
            "area": 437072,
            "cca3": "IRQ",
            "languages": ["ar-IQ", "ku", "hy"],
            "country_code": "IQ",
            "capital": "Baghdad",
            "country_name": "Iraq",
            "borders": ["IRN", "JOR", "KWT", "SAU", "SYR", "TUR"],
            "continent": "Asia",
            "currency_code": "IQD",
            "population": 29671605
        }, {
            "calling_code": "353",
            "area": 70280,
            "cca3": "IRL",
            "languages": ["en-IE", "ga-IE"],
            "country_code": "IE",
            "capital": "Dublin",
            "country_name": "Ireland",
            "borders": ["GBR"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 4622917
        }, {
            "calling_code": "44",
            "area": 572,
            "cca3": "IMN",
            "languages": ["en", "gv"],
            "country_code": "IM",
            "capital": "Douglas",
            "country_name": "Isle of Man",
            "borders": [],
            "continent": "Europe",
            "currency_code": "GBP",
            "population": 75049
        }, {
            "calling_code": "39",
            "area": 301230,
            "cca3": "ITA",
            "languages": ["it-IT", "de-IT", "fr-IT", "sc", "ca", "co", "sl"],
            "country_code": "IT",
            "capital": "Rome",
            "country_name": "Italy",
            "borders": ["AUT", "FRA", "SMR", "SVN", "CHE", "VAT"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 60340328
        }, {
            "calling_code": "225",
            "area": 322460,
            "cca3": "CIV",
            "languages": ["fr-CI"],
            "country_code": "CI",
            "capital": "Yamoussoukro",
            "country_name": "Ivory Coast",
            "borders": ["BFA", "GHA", "GIN", "LBR", "MLI"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 21058798
        }, {
            "calling_code": "1876",
            "area": 10991,
            "cca3": "JAM",
            "languages": ["en-JM"],
            "country_code": "JM",
            "capital": "Kingston",
            "country_name": "Jamaica",
            "borders": [],
            "continent": "North America",
            "currency_code": "JMD",
            "population": 2847232
        }, {
            "calling_code": "81",
            "area": 377835,
            "cca3": "JPN",
            "languages": ["ja"],
            "country_code": "JP",
            "capital": "Tokyo",
            "country_name": "Japan",
            "borders": [],
            "continent": "Asia",
            "currency_code": "JPY",
            "population": 127288000
        }, {
            "calling_code": "44",
            "area": 116,
            "cca3": "JEY",
            "languages": ["en", "pt"],
            "country_code": "JE",
            "capital": "Saint Helier",
            "country_name": "Jersey",
            "borders": [],
            "continent": "Europe",
            "currency_code": "GBP",
            "population": 90812
        }, {
            "calling_code": "962",
            "area": 92300,
            "cca3": "JOR",
            "languages": ["ar-JO", "en"],
            "country_code": "JO",
            "capital": "Amman",
            "country_name": "Jordan",
            "borders": ["IRQ", "ISR", "SAU", "SYR"],
            "continent": "Asia",
            "currency_code": "JOD",
            "population": 6407085
        }, {
            "calling_code": "76",
            "area": 2717300,
            "cca3": "KAZ",
            "languages": ["kk", "ru"],
            "country_code": "KZ",
            "capital": "Astana",
            "country_name": "Kazakhstan",
            "borders": ["CHN", "KGZ", "RUS", "TKM", "UZB"],
            "continent": "Asia",
            "currency_code": "KZT",
            "population": 15340000
        }, {
            "calling_code": "254",
            "area": 582650,
            "cca3": "KEN",
            "languages": ["en-KE", "sw-KE"],
            "country_code": "KE",
            "capital": "Nairobi",
            "country_name": "Kenya",
            "borders": ["ETH", "SOM", "SSD", "TZA", "UGA"],
            "continent": "Africa",
            "currency_code": "KES",
            "population": 40046566
        }, {
            "calling_code": "686",
            "area": 811,
            "cca3": "KIR",
            "languages": ["en-KI", "gil"],
            "country_code": "KI",
            "capital": "Tarawa",
            "country_name": "Kiribati",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "AUD",
            "population": 92533
        }, {
            "calling_code": "383",
            "area": 10908,
            "cca3": "UNK",
            "languages": ["sq", "sr"],
            "country_code": "XK",
            "capital": "Pristina",
            "country_name": "Kosovo",
            "borders": ["ALB", "MKD", "MNE", "SRB"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 1800000
        }, {
            "calling_code": "965",
            "area": 17820,
            "cca3": "KWT",
            "languages": ["ar-KW", "en"],
            "country_code": "KW",
            "capital": "Kuwait City",
            "country_name": "Kuwait",
            "borders": ["IRQ", "SAU"],
            "continent": "Asia",
            "currency_code": "KWD",
            "population": 2789132
        }, {
            "calling_code": "996",
            "area": 198500,
            "cca3": "KGZ",
            "languages": ["ky", "uz", "ru"],
            "country_code": "KG",
            "capital": "Bishkek",
            "country_name": "Kyrgyzstan",
            "borders": ["CHN", "KAZ", "TJK", "UZB"],
            "continent": "Asia",
            "currency_code": "KGS",
            "population": 5776500
        }, {
            "calling_code": "856",
            "area": 236800,
            "cca3": "LAO",
            "languages": ["lo", "fr", "en"],
            "country_code": "LA",
            "capital": "Vientiane",
            "country_name": "Laos",
            "borders": ["MMR", "KHM", "CHN", "THA", "VNM"],
            "continent": "Asia",
            "currency_code": "LAK",
            "population": 6368162
        }, {
            "calling_code": "371",
            "area": 64589,
            "cca3": "LVA",
            "languages": ["lv", "ru", "lt"],
            "country_code": "LV",
            "capital": "Riga",
            "country_name": "Latvia",
            "borders": ["BLR", "EST", "LTU", "RUS"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 2217969
        }, {
            "calling_code": "961",
            "area": 10400,
            "cca3": "LBN",
            "languages": ["ar-LB", "fr-LB", "en", "hy"],
            "country_code": "LB",
            "capital": "Beirut",
            "country_name": "Lebanon",
            "borders": ["ISR", "SYR"],
            "continent": "Asia",
            "currency_code": "LBP",
            "population": 4125247
        }, {
            "calling_code": "266",
            "area": 30355,
            "cca3": "LSO",
            "languages": ["en-LS", "st", "zu", "xh"],
            "country_code": "LS",
            "capital": "Maseru",
            "country_name": "Lesotho",
            "borders": ["ZAF"],
            "continent": "Africa",
            "currency_code": "LSL",
            "population": 1919552
        }, {
            "calling_code": "231",
            "area": 111370,
            "cca3": "LBR",
            "languages": ["en-LR"],
            "country_code": "LR",
            "capital": "Monrovia",
            "country_name": "Liberia",
            "borders": ["GIN", "CIV", "SLE"],
            "continent": "Africa",
            "currency_code": "LRD",
            "population": 3685076
        }, {
            "calling_code": "218",
            "area": 1759540,
            "cca3": "LBY",
            "languages": ["ar-LY", "it", "en"],
            "country_code": "LY",
            "capital": "Tripoli",
            "country_name": "Libya",
            "borders": ["DZA", "TCD", "EGY", "NER", "SDN", "TUN"],
            "continent": "Africa",
            "currency_code": "LYD",
            "population": 6461454
        }, {
            "calling_code": "423",
            "area": 160,
            "cca3": "LIE",
            "languages": ["de-LI"],
            "country_code": "LI",
            "capital": "Vaduz",
            "country_name": "Liechtenstein",
            "borders": ["AUT", "CHE"],
            "continent": "Europe",
            "currency_code": "CHF",
            "population": 35000
        }, {
            "calling_code": "370",
            "area": 65200,
            "cca3": "LTU",
            "languages": ["lt", "ru", "pl"],
            "country_code": "LT",
            "capital": "Vilnius",
            "country_name": "Lithuania",
            "borders": ["BLR", "LVA", "POL", "RUS"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 2944459
        }, {
            "calling_code": "352",
            "area": 2586,
            "cca3": "LUX",
            "languages": ["lb", "de-LU", "fr-LU"],
            "country_code": "LU",
            "capital": "Luxembourg",
            "country_name": "Luxembourg",
            "borders": ["BEL", "FRA", "DEU"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 497538
        }, {
            "calling_code": "853",
            "area": 254,
            "cca3": "MAC",
            "languages": ["zh", "zh-MO", "pt"],
            "country_code": "MO",
            "capital": "Macao",
            "country_name": "Macao",
            "borders": ["CHN"],
            "continent": "Asia",
            "currency_code": "MOP",
            "population": 449198
        }, {
            "calling_code": "389",
            "area": 25333,
            "cca3": "MKD",
            "languages": ["mk", "sq", "tr", "rmm", "sr"],
            "country_code": "MK",
            "capital": "Skopje",
            "country_name": "Macedonia",
            "borders": ["ALB", "BGR", "GRC", "UNK", "SRB"],
            "continent": "Europe",
            "currency_code": "MKD",
            "population": 2062294
        }, {
            "calling_code": "261",
            "area": 587040,
            "cca3": "MDG",
            "languages": ["fr-MG", "mg"],
            "country_code": "MG",
            "capital": "Antananarivo",
            "country_name": "Madagascar",
            "borders": [],
            "continent": "Africa",
            "currency_code": "MGA",
            "population": 21281844
        }, {
            "calling_code": "265",
            "area": 118480,
            "cca3": "MWI",
            "languages": ["ny", "yao", "tum", "swk"],
            "country_code": "MW",
            "capital": "Lilongwe",
            "country_name": "Malawi",
            "borders": ["MOZ", "TZA", "ZMB"],
            "continent": "Africa",
            "currency_code": "MWK",
            "population": 15447500
        }, {
            "calling_code": "60",
            "area": 329750,
            "cca3": "MYS",
            "languages": ["ms-MY", "en", "zh", "ta", "te", "ml", "pa", "th"],
            "country_code": "MY",
            "capital": "Kuala Lumpur",
            "country_name": "Malaysia",
            "borders": ["BRN", "IDN", "THA"],
            "continent": "Asia",
            "currency_code": "MYR",
            "population": 28274729
        }, {
            "calling_code": "960",
            "area": 300,
            "cca3": "MDV",
            "languages": ["dv", "en"],
            "country_code": "MV",
            "capital": "Mal\u00e9",
            "country_name": "Maldives",
            "borders": [],
            "continent": "Asia",
            "currency_code": "MVR",
            "population": 395650
        }, {
            "calling_code": "223",
            "area": 1240000,
            "cca3": "MLI",
            "languages": ["fr-ML", "bm"],
            "country_code": "ML",
            "capital": "Bamako",
            "country_name": "Mali",
            "borders": ["DZA", "BFA", "GIN", "CIV", "MRT", "NER", "SEN"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 13796354
        }, {
            "calling_code": "356",
            "area": 316,
            "cca3": "MLT",
            "languages": ["mt", "en-MT"],
            "country_code": "MT",
            "capital": "Valletta",
            "country_name": "Malta",
            "borders": [],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 403000
        }, {
            "calling_code": "692",
            "area": 181.3,
            "cca3": "MHL",
            "languages": ["mh", "en-MH"],
            "country_code": "MH",
            "capital": "Majuro",
            "country_name": "Marshall Islands",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 65859
        }, {
            "calling_code": "596",
            "area": 1100,
            "cca3": "MTQ",
            "languages": ["fr-MQ"],
            "country_code": "MQ",
            "capital": "Fort-de-France",
            "country_name": "Martinique",
            "borders": [],
            "continent": "North America",
            "currency_code": "EUR",
            "population": 432900
        }, {
            "calling_code": "222",
            "area": 1030700,
            "cca3": "MRT",
            "languages": ["ar-MR", "fuc", "snk", "fr", "mey", "wo"],
            "country_code": "MR",
            "capital": "Nouakchott",
            "country_name": "Mauritania",
            "borders": ["DZA", "MLI", "SEN", "ESH"],
            "continent": "Africa",
            "currency_code": "MRO",
            "population": 3205060
        }, {
            "calling_code": "230",
            "area": 2040,
            "cca3": "MUS",
            "languages": ["en-MU", "bho", "fr"],
            "country_code": "MU",
            "capital": "Port Louis",
            "country_name": "Mauritius",
            "borders": [],
            "continent": "Africa",
            "currency_code": "MUR",
            "population": 1294104
        }, {
            "calling_code": "262",
            "area": 374,
            "cca3": "MYT",
            "languages": ["fr-YT"],
            "country_code": "YT",
            "capital": "Mamoutzou",
            "country_name": "Mayotte",
            "borders": [],
            "continent": "Africa",
            "currency_code": "EUR",
            "population": 159042
        }, {
            "calling_code": "52",
            "area": 1972550,
            "cca3": "MEX",
            "languages": ["es-MX"],
            "country_code": "MX",
            "capital": "Mexico City",
            "country_name": "Mexico",
            "borders": ["BLZ", "GTM", "USA"],
            "continent": "North America",
            "currency_code": "MXN",
            "population": 112468855
        }, {
            "calling_code": "691",
            "area": 702,
            "cca3": "FSM",
            "languages": ["en-FM", "chk", "pon", "yap", "kos", "uli", "woe", "nkr", "kpg"],
            "country_code": "FM",
            "capital": "Palikir",
            "country_name": "Micronesia",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 107708
        }, {
            "calling_code": "373",
            "area": 33843,
            "cca3": "MDA",
            "languages": ["ro", "ru", "gag", "tr"],
            "country_code": "MD",
            "capital": "Chi\u015fin\u0103u",
            "country_name": "Moldova",
            "borders": ["ROU", "UKR"],
            "continent": "Europe",
            "currency_code": "MDL",
            "population": 4324000
        }, {
            "calling_code": "377",
            "area": 1.95,
            "cca3": "MCO",
            "languages": ["fr-MC", "en", "it"],
            "country_code": "MC",
            "capital": "Monaco",
            "country_name": "Monaco",
            "borders": ["FRA"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 32965
        }, {
            "calling_code": "976",
            "area": 1565000,
            "cca3": "MNG",
            "languages": ["mn", "ru"],
            "country_code": "MN",
            "capital": "Ulan Bator",
            "country_name": "Mongolia",
            "borders": ["CHN", "RUS"],
            "continent": "Asia",
            "currency_code": "MNT",
            "population": 3086918
        }, {
            "calling_code": "382",
            "area": 14026,
            "cca3": "MNE",
            "languages": ["sr", "hu", "bs", "sq", "hr", "rom"],
            "country_code": "ME",
            "capital": "Podgorica",
            "country_name": "Montenegro",
            "borders": ["ALB", "BIH", "HRV", "UNK", "SRB"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 666730
        }, {
            "calling_code": "1664",
            "area": 102,
            "cca3": "MSR",
            "languages": ["en-MS"],
            "country_code": "MS",
            "capital": "Plymouth",
            "country_name": "Montserrat",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 9341
        }, {
            "calling_code": "212",
            "area": 446550,
            "cca3": "MAR",
            "languages": ["ar-MA", "fr"],
            "country_code": "MA",
            "capital": "Rabat",
            "country_name": "Morocco",
            "borders": ["DZA", "ESH", "ESP"],
            "continent": "Africa",
            "currency_code": "MAD",
            "population": 31627428
        }, {
            "calling_code": "258",
            "area": 801590,
            "cca3": "MOZ",
            "languages": ["pt-MZ", "vmw"],
            "country_code": "MZ",
            "capital": "Maputo",
            "country_name": "Mozambique",
            "borders": ["MWI", "ZAF", "SWZ", "TZA", "ZMB", "ZWE"],
            "continent": "Africa",
            "currency_code": "MZN",
            "population": 22061451
        }, {
            "calling_code": "95",
            "area": 678500,
            "cca3": "MMR",
            "languages": ["my"],
            "country_code": "MM",
            "capital": "Nay Pyi Taw",
            "country_name": "Myanmar [Burma]",
            "borders": ["BGD", "CHN", "IND", "LAO", "THA"],
            "continent": "Asia",
            "currency_code": "MMK",
            "population": 53414374
        }, {
            "calling_code": "264",
            "area": 825418,
            "cca3": "NAM",
            "languages": ["en-NA", "af", "de", "hz", "naq"],
            "country_code": "NA",
            "capital": "Windhoek",
            "country_name": "Namibia",
            "borders": ["AGO", "BWA", "ZAF", "ZMB"],
            "continent": "Africa",
            "currency_code": "NAD",
            "population": 2128471
        }, {
            "calling_code": "977",
            "area": 140800,
            "cca3": "NPL",
            "languages": ["ne", "en"],
            "country_code": "NP",
            "capital": "Kathmandu",
            "country_name": "Nepal",
            "borders": ["CHN", "IND"],
            "continent": "Asia",
            "currency_code": "NPR",
            "population": 28951852
        }, {
            "calling_code": "31",
            "area": 41526,
            "cca3": "NLD",
            "languages": ["nl-NL", "fy-NL"],
            "country_code": "NL",
            "capital": "Amsterdam",
            "country_name": "Netherlands",
            "borders": ["BEL", "DEU"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 16645000
        }, {
            "calling_code": "687",
            "area": 19060,
            "cca3": "NCL",
            "languages": ["fr-NC"],
            "country_code": "NC",
            "capital": "Noumea",
            "country_name": "New Caledonia",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "XPF",
            "population": 216494
        }, {
            "calling_code": "64",
            "area": 268680,
            "cca3": "NZL",
            "languages": ["en-NZ", "mi"],
            "country_code": "NZ",
            "capital": "Wellington",
            "country_name": "New Zealand",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "NZD",
            "population": 4252277
        }, {
            "calling_code": "505",
            "area": 129494,
            "cca3": "NIC",
            "languages": ["es-NI", "en"],
            "country_code": "NI",
            "capital": "Managua",
            "country_name": "Nicaragua",
            "borders": ["CRI", "HND"],
            "continent": "North America",
            "currency_code": "NIO",
            "population": 5995928
        }, {
            "calling_code": "227",
            "area": 1267000,
            "cca3": "NER",
            "languages": ["fr-NE", "ha", "kr", "dje"],
            "country_code": "NE",
            "capital": "Niamey",
            "country_name": "Niger",
            "borders": ["DZA", "BEN", "BFA", "TCD", "LBY", "MLI", "NGA"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 15878271
        }, {
            "calling_code": "234",
            "area": 923768,
            "cca3": "NGA",
            "languages": ["en-NG", "ha", "yo", "ig", "ff"],
            "country_code": "NG",
            "capital": "Abuja",
            "country_name": "Nigeria",
            "borders": ["BEN", "CMR", "TCD", "NER"],
            "continent": "Africa",
            "currency_code": "NGN",
            "population": 154000000
        }, {
            "calling_code": "683",
            "area": 260,
            "cca3": "NIU",
            "languages": ["niu", "en-NU"],
            "country_code": "NU",
            "capital": "Alofi",
            "country_name": "Niue",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "NZD",
            "population": 2166
        }, {
            "calling_code": "672",
            "area": 34.6,
            "cca3": "NFK",
            "languages": ["en-NF"],
            "country_code": "NF",
            "capital": "Kingston",
            "country_name": "Norfolk Island",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "AUD",
            "population": 1828
        }, {
            "calling_code": "850",
            "area": 120540,
            "cca3": "PRK",
            "languages": ["ko-KP"],
            "country_code": "KP",
            "capital": "Pyongyang",
            "country_name": "North Korea",
            "borders": ["CHN", "KOR", "RUS"],
            "continent": "Asia",
            "currency_code": "KPW",
            "population": 22912177
        }, {
            "calling_code": "1670",
            "area": 477,
            "cca3": "MNP",
            "languages": ["fil", "tl", "zh", "ch-MP", "en-MP"],
            "country_code": "MP",
            "capital": "Saipan",
            "country_name": "Northern Mariana Islands",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 53883
        }, {
            "calling_code": "47",
            "area": 324220,
            "cca3": "NOR",
            "languages": ["no", "nb", "nn", "se", "fi"],
            "country_code": "NO",
            "capital": "Oslo",
            "country_name": "Norway",
            "borders": ["FIN", "SWE", "RUS"],
            "continent": "Europe",
            "currency_code": "NOK",
            "population": 5009150
        }, {
            "calling_code": "968",
            "area": 212460,
            "cca3": "OMN",
            "languages": ["ar-OM", "en", "bal", "ur"],
            "country_code": "OM",
            "capital": "Muscat",
            "country_name": "Oman",
            "borders": ["SAU", "ARE", "YEM"],
            "continent": "Asia",
            "currency_code": "OMR",
            "population": 2967717
        }, {
            "calling_code": "92",
            "area": 803940,
            "cca3": "PAK",
            "languages": ["ur-PK", "en-PK", "pa", "sd", "ps", "brh"],
            "country_code": "PK",
            "capital": "Islamabad",
            "country_name": "Pakistan",
            "borders": ["AFG", "CHN", "IND", "IRN"],
            "continent": "Asia",
            "currency_code": "PKR",
            "population": 184404791
        }, {
            "calling_code": "680",
            "area": 458,
            "cca3": "PLW",
            "languages": ["pau", "sov", "en-PW", "tox", "ja", "fil", "zh"],
            "country_code": "PW",
            "capital": "Melekeok - Palau State Capital",
            "country_name": "Palau",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "USD",
            "population": 19907
        }, {
            "calling_code": "507",
            "area": 78200,
            "cca3": "PAN",
            "languages": ["es-PA", "en"],
            "country_code": "PA",
            "capital": "Panama City",
            "country_name": "Panama",
            "borders": ["COL", "CRI"],
            "continent": "North America",
            "currency_code": "PAB",
            "population": 3410676
        }, {
            "calling_code": "675",
            "area": 462840,
            "cca3": "PNG",
            "languages": ["en-PG", "ho", "meu", "tpi"],
            "country_code": "PG",
            "capital": "Port Moresby",
            "country_name": "Papua New Guinea",
            "borders": ["IDN"],
            "continent": "Oceania",
            "currency_code": "PGK",
            "population": 6064515
        }, {
            "calling_code": "595",
            "area": 406750,
            "cca3": "PRY",
            "languages": ["es-PY", "gn"],
            "country_code": "PY",
            "capital": "Asunci\u00f3n",
            "country_name": "Paraguay",
            "borders": ["ARG", "BOL", "BRA"],
            "continent": "South America",
            "currency_code": "PYG",
            "population": 6375830
        }, {
            "calling_code": "51",
            "area": 1285220,
            "cca3": "PER",
            "languages": ["es-PE", "qu", "ay"],
            "country_code": "PE",
            "capital": "Lima",
            "country_name": "Peru",
            "borders": ["BOL", "BRA", "CHL", "COL", "ECU"],
            "continent": "South America",
            "currency_code": "PEN",
            "population": 29907003
        }, {
            "calling_code": "63",
            "area": 300000,
            "cca3": "PHL",
            "languages": ["tl", "en-PH", "fil"],
            "country_code": "PH",
            "capital": "Manila",
            "country_name": "Philippines",
            "borders": [],
            "continent": "Asia",
            "currency_code": "PHP",
            "population": 99900177
        }, {
            "calling_code": "64",
            "area": 47,
            "cca3": "PCN",
            "languages": ["en-PN"],
            "country_code": "PN",
            "capital": "Adamstown",
            "country_name": "Pitcairn Islands",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "NZD",
            "population": 46
        }, {
            "calling_code": "48",
            "area": 312685,
            "cca3": "POL",
            "languages": ["pl"],
            "country_code": "PL",
            "capital": "Warsaw",
            "country_name": "Poland",
            "borders": ["BLR", "CZE", "DEU", "LTU", "RUS", "SVK", "UKR"],
            "continent": "Europe",
            "currency_code": "PLN",
            "population": 38500000
        }, {
            "calling_code": "351",
            "area": 92391,
            "cca3": "PRT",
            "languages": ["pt-PT", "mwl"],
            "country_code": "PT",
            "capital": "Lisbon",
            "country_name": "Portugal",
            "borders": ["ESP"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 10676000
        }, {
            "calling_code": "1787",
            "area": 9104,
            "cca3": "PRI",
            "languages": ["en-PR", "es-PR"],
            "country_code": "PR",
            "capital": "San Juan",
            "country_name": "Puerto Rico",
            "borders": [],
            "continent": "North America",
            "currency_code": "USD",
            "population": 3916632
        }, {
            "calling_code": "974",
            "area": 11437,
            "cca3": "QAT",
            "languages": ["ar-QA", "es"],
            "country_code": "QA",
            "capital": "Doha",
            "country_name": "Qatar",
            "borders": ["SAU"],
            "continent": "Asia",
            "currency_code": "QAR",
            "population": 840926
        }, {
            "calling_code": "242",
            "area": 342000,
            "cca3": "COG",
            "languages": ["fr-CG", "kg", "ln-CG"],
            "country_code": "CG",
            "capital": "Brazzaville",
            "country_name": "Republic of the Congo",
            "borders": ["AGO", "CMR", "CAF", "COD", "GAB"],
            "continent": "Africa",
            "currency_code": "XAF",
            "population": 3039126
        }, {
            "calling_code": "40",
            "area": 237500,
            "cca3": "ROU",
            "languages": ["ro", "hu", "rom"],
            "country_code": "RO",
            "capital": "Bucharest",
            "country_name": "Romania",
            "borders": ["BGR", "HUN", "MDA", "SRB", "UKR"],
            "continent": "Europe",
            "currency_code": "RON",
            "population": 21959278
        }, {
            "calling_code": "7",
            "area": 17100000,
            "cca3": "RUS",
            "languages": ["ru", "tt", "xal", "cau", "ady", "kv", "ce", "tyv", "cv", "udm", "tut", "mns", "bua", "myv", "mdf", "chm", "ba", "inh", "tut", "kbd", "krc", "ava", "sah", "nog"],
            "country_code": "RU",
            "capital": "Moscow",
            "country_name": "Russia",
            "borders": ["AZE", "BLR", "CHN", "EST", "FIN", "GEO", "KAZ", "PRK", "LVA", "LTU", "MNG", "NOR", "POL", "UKR"],
            "continent": "Europe",
            "currency_code": "RUB",
            "population": 140702000
        }, {
            "calling_code": "250",
            "area": 26338,
            "cca3": "RWA",
            "languages": ["rw", "en-RW", "fr-RW", "sw"],
            "country_code": "RW",
            "capital": "Kigali",
            "country_name": "Rwanda",
            "borders": ["BDI", "COD", "TZA", "UGA"],
            "continent": "Africa",
            "currency_code": "RWF",
            "population": 11055976
        }, {
            "calling_code": "262",
            "area": 2517,
            "cca3": "REU",
            "languages": ["fr-RE"],
            "country_code": "RE",
            "capital": "Saint-Denis",
            "country_name": "R\u00e9union",
            "borders": [],
            "continent": "Africa",
            "currency_code": "EUR",
            "population": 776948
        }, {
            "calling_code": "590",
            "area": 21,
            "cca3": "BLM",
            "languages": ["fr"],
            "country_code": "BL",
            "capital": "Gustavia",
            "country_name": "Saint Barth\u00e9lemy",
            "borders": [],
            "continent": "North America",
            "currency_code": "EUR",
            "population": 8450
        }, {
            "calling_code": "1869",
            "area": 261,
            "cca3": "KNA",
            "languages": ["en-KN"],
            "country_code": "KN",
            "capital": "Basseterre",
            "country_name": "Saint Kitts and Nevis",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 51134
        }, {
            "calling_code": "1758",
            "area": 616,
            "cca3": "LCA",
            "languages": ["en-LC"],
            "country_code": "LC",
            "capital": "Castries",
            "country_name": "Saint Lucia",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 160922
        }, {
            "calling_code": "590",
            "area": 53,
            "cca3": "MAF",
            "languages": ["fr"],
            "country_code": "MF",
            "capital": "Marigot",
            "country_name": "Saint Martin",
            "borders": ["SXM"],
            "continent": "North America",
            "currency_code": "EUR",
            "population": 35925
        }, {
            "calling_code": "508",
            "area": 242,
            "cca3": "SPM",
            "languages": ["fr-PM"],
            "country_code": "PM",
            "capital": "Saint-Pierre",
            "country_name": "Saint Pierre and Miquelon",
            "borders": [],
            "continent": "North America",
            "currency_code": "EUR",
            "population": 7012
        }, {
            "calling_code": "1784",
            "area": 389,
            "cca3": "VCT",
            "languages": ["en-VC", "fr"],
            "country_code": "VC",
            "capital": "Kingstown",
            "country_name": "Saint Vincent and the Grenadines",
            "borders": [],
            "continent": "North America",
            "currency_code": "XCD",
            "population": 104217
        }, {
            "calling_code": "685",
            "area": 2944,
            "cca3": "WSM",
            "languages": ["sm", "en-WS"],
            "country_code": "WS",
            "capital": "Apia",
            "country_name": "Samoa",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "WST",
            "population": 192001
        }, {
            "calling_code": "378",
            "area": 61.2,
            "cca3": "SMR",
            "languages": ["it-SM"],
            "country_code": "SM",
            "capital": "San Marino",
            "country_name": "San Marino",
            "borders": ["ITA"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 31477
        }, {
            "calling_code": "966",
            "area": 1960582,
            "cca3": "SAU",
            "languages": ["ar-SA"],
            "country_code": "SA",
            "capital": "Riyadh",
            "country_name": "Saudi Arabia",
            "borders": ["IRQ", "JOR", "KWT", "OMN", "QAT", "ARE", "YEM"],
            "continent": "Asia",
            "currency_code": "SAR",
            "population": 25731776
        }, {
            "calling_code": "221",
            "area": 196190,
            "cca3": "SEN",
            "languages": ["fr-SN", "wo", "fuc", "mnk"],
            "country_code": "SN",
            "capital": "Dakar",
            "country_name": "Senegal",
            "borders": ["GMB", "GIN", "GNB", "MLI", "MRT"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 12323252
        }, {
            "calling_code": "381",
            "area": 88361,
            "cca3": "SRB",
            "languages": ["sr", "hu", "bs", "rom"],
            "country_code": "RS",
            "capital": "Belgrade",
            "country_name": "Serbia",
            "borders": ["BIH", "BGR", "HRV", "HUN", "UNK", "MKD", "MNE", "ROU"],
            "continent": "Europe",
            "currency_code": "RSD",
            "population": 7344847
        }, {
            "calling_code": "248",
            "area": 455,
            "cca3": "SYC",
            "languages": ["en-SC", "fr-SC"],
            "country_code": "SC",
            "capital": "Victoria",
            "country_name": "Seychelles",
            "borders": [],
            "continent": "Africa",
            "currency_code": "SCR",
            "population": 88340
        }, {
            "calling_code": "232",
            "area": 71740,
            "cca3": "SLE",
            "languages": ["en-SL", "men", "tem"],
            "country_code": "SL",
            "capital": "Freetown",
            "country_name": "Sierra Leone",
            "borders": ["GIN", "LBR"],
            "continent": "Africa",
            "currency_code": "SLL",
            "population": 5245695
        }, {
            "calling_code": "65",
            "area": 692.7,
            "cca3": "SGP",
            "languages": ["cmn", "en-SG", "ms-SG", "ta-SG", "zh-SG"],
            "country_code": "SG",
            "capital": "Singapore",
            "country_name": "Singapore",
            "borders": [],
            "continent": "Asia",
            "currency_code": "SGD",
            "population": 4701069
        }, {
            "calling_code": "1721",
            "area": 21,
            "cca3": "SXM",
            "languages": ["nl", "en"],
            "country_code": "SX",
            "capital": "Philipsburg",
            "country_name": "Sint Maarten",
            "borders": ["MAF"],
            "continent": "North America",
            "currency_code": "ANG",
            "population": 37429
        }, {
            "calling_code": "421",
            "area": 48845,
            "cca3": "SVK",
            "languages": ["sk", "hu"],
            "country_code": "SK",
            "capital": "Bratislava",
            "country_name": "Slovakia",
            "borders": ["AUT", "CZE", "HUN", "POL", "UKR"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 5455000
        }, {
            "calling_code": "386",
            "area": 20273,
            "cca3": "SVN",
            "languages": ["sl", "sh"],
            "country_code": "SI",
            "capital": "Ljubljana",
            "country_name": "Slovenia",
            "borders": ["AUT", "HRV", "ITA", "HUN"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 2007000
        }, {
            "calling_code": "677",
            "area": 28450,
            "cca3": "SLB",
            "languages": ["en-SB", "tpi"],
            "country_code": "SB",
            "capital": "Honiara",
            "country_name": "Solomon Islands",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "SBD",
            "population": 559198
        }, {
            "calling_code": "252",
            "area": 637657,
            "cca3": "SOM",
            "languages": ["so-SO", "ar-SO", "it", "en-SO"],
            "country_code": "SO",
            "capital": "Mogadishu",
            "country_name": "Somalia",
            "borders": ["DJI", "ETH", "KEN"],
            "continent": "Africa",
            "currency_code": "SOS",
            "population": 10112453
        }, {
            "calling_code": "27",
            "area": 1219912,
            "cca3": "ZAF",
            "languages": ["zu", "xh", "af", "nso", "en-ZA", "tn", "st", "ts", "ss", "ve", "nr"],
            "country_code": "ZA",
            "capital": "Pretoria",
            "country_name": "South Africa",
            "borders": ["BWA", "LSO", "MOZ", "NAM", "SWZ", "ZWE"],
            "continent": "Africa",
            "currency_code": "ZAR",
            "population": 49000000
        }, {
            "calling_code": "500",
            "area": 3903,
            "cca3": "SGS",
            "languages": ["en"],
            "country_code": "GS",
            "capital": "Grytviken",
            "country_name": "South Georgia and the South Sandwich Islands",
            "borders": [],
            "continent": "Antarctica",
            "currency_code": "GBP",
            "population": 30
        }, {
            "calling_code": "82",
            "area": 98480,
            "cca3": "KOR",
            "languages": ["ko-KR", "en"],
            "country_code": "KR",
            "capital": "Seoul",
            "country_name": "South Korea",
            "borders": ["PRK"],
            "continent": "Asia",
            "currency_code": "KRW",
            "population": 48422644
        }, {
            "calling_code": "211",
            "area": 644329,
            "cca3": "SSD",
            "languages": ["en"],
            "country_code": "SS",
            "capital": "Juba",
            "country_name": "South Sudan",
            "borders": ["CAF", "COD", "ETH", "KEN", "SDN", "UGA"],
            "continent": "Africa",
            "currency_code": "SSP",
            "population": 8260490
        }, {
            "calling_code": "34",
            "area": 504782,
            "cca3": "ESP",
            "languages": ["es-ES", "ca", "gl", "eu", "oc"],
            "country_code": "ES",
            "capital": "Madrid",
            "country_name": "Spain",
            "borders": ["AND", "FRA", "GIB", "PRT", "MAR"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 46505963
        }, {
            "calling_code": "94",
            "area": 65610,
            "cca3": "LKA",
            "languages": ["si", "ta", "en"],
            "country_code": "LK",
            "capital": "Colombo",
            "country_name": "Sri Lanka",
            "borders": ["IND"],
            "continent": "Asia",
            "currency_code": "LKR",
            "population": 21513990
        }, {
            "calling_code": "249",
            "area": 1861484,
            "cca3": "SDN",
            "languages": ["ar-SD", "en", "fia"],
            "country_code": "SD",
            "capital": "Khartoum",
            "country_name": "Sudan",
            "borders": ["CAF", "TCD", "EGY", "ERI", "ETH", "LBY", "SSD"],
            "continent": "Africa",
            "currency_code": "SDG",
            "population": 35000000
        }, {
            "calling_code": "597",
            "area": 163270,
            "cca3": "SUR",
            "languages": ["nl-SR", "en", "srn", "hns", "jv"],
            "country_code": "SR",
            "capital": "Paramaribo",
            "country_name": "Suriname",
            "borders": ["BRA", "GUF", "GUY"],
            "continent": "South America",
            "currency_code": "SRD",
            "population": 492829
        }, {
            "calling_code": "4779",
            "area": 62049,
            "cca3": "SJM",
            "languages": ["no", "ru"],
            "country_code": "SJ",
            "capital": "Longyearbyen",
            "country_name": "Svalbard and Jan Mayen",
            "borders": [],
            "continent": "Europe",
            "currency_code": "NOK",
            "population": 2550
        }, {
            "calling_code": "268",
            "area": 17363,
            "cca3": "SWZ",
            "languages": ["en-SZ", "ss-SZ"],
            "country_code": "SZ",
            "capital": "Mbabane",
            "country_name": "Swaziland",
            "borders": ["MOZ", "ZAF"],
            "continent": "Africa",
            "currency_code": "SZL",
            "population": 1354051
        }, {
            "calling_code": "46",
            "area": 449964,
            "cca3": "SWE",
            "languages": ["sv-SE", "se", "sma", "fi-SE"],
            "country_code": "SE",
            "capital": "Stockholm",
            "country_name": "Sweden",
            "borders": ["FIN", "NOR"],
            "continent": "Europe",
            "currency_code": "SEK",
            "population": 9555893
        }, {
            "calling_code": "41",
            "area": 41290,
            "cca3": "CHE",
            "languages": ["de-CH", "fr-CH", "it-CH", "rm"],
            "country_code": "CH",
            "capital": "Berne",
            "country_name": "Switzerland",
            "borders": ["AUT", "FRA", "ITA", "LIE", "DEU"],
            "continent": "Europe",
            "currency_code": "CHF",
            "population": 7581000
        }, {
            "calling_code": "963",
            "area": 185180,
            "cca3": "SYR",
            "languages": ["ar-SY", "ku", "hy", "arc", "fr", "en"],
            "country_code": "SY",
            "capital": "Damascus",
            "country_name": "Syria",
            "borders": ["IRQ", "ISR", "JOR", "LBN", "TUR"],
            "continent": "Asia",
            "currency_code": "SYP",
            "population": 22198110
        }, {
            "calling_code": "239",
            "area": 1001,
            "cca3": "STP",
            "languages": ["pt-ST"],
            "country_code": "ST",
            "capital": "S\u00e3o Tom\u00e9",
            "country_name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
            "borders": [],
            "continent": "Africa",
            "currency_code": "STD",
            "population": 175808
        }, {
            "calling_code": "886",
            "area": 35980,
            "cca3": "TWN",
            "languages": ["zh-TW", "zh", "nan", "hak"],
            "country_code": "TW",
            "capital": "Taipei",
            "country_name": "Taiwan",
            "borders": [],
            "continent": "Asia",
            "currency_code": "TWD",
            "population": 22894384
        }, {
            "calling_code": "992",
            "area": 143100,
            "cca3": "TJK",
            "languages": ["tg", "ru"],
            "country_code": "TJ",
            "capital": "Dushanbe",
            "country_name": "Tajikistan",
            "borders": ["AFG", "CHN", "KGZ", "UZB"],
            "continent": "Asia",
            "currency_code": "TJS",
            "population": 7487489
        }, {
            "calling_code": "255",
            "area": 945087,
            "cca3": "TZA",
            "languages": ["sw-TZ", "en", "ar"],
            "country_code": "TZ",
            "capital": "Dodoma",
            "country_name": "Tanzania",
            "borders": ["BDI", "COD", "KEN", "MWI", "MOZ", "RWA", "UGA", "ZMB"],
            "continent": "Africa",
            "currency_code": "TZS",
            "population": 41892895
        }, {
            "calling_code": "66",
            "area": 514000,
            "cca3": "THA",
            "languages": ["th", "en"],
            "country_code": "TH",
            "capital": "Bangkok",
            "country_name": "Thailand",
            "borders": ["MMR", "KHM", "LAO", "MYS"],
            "continent": "Asia",
            "currency_code": "THB",
            "population": 67089500
        }, {
            "calling_code": "228",
            "area": 56785,
            "cca3": "TGO",
            "languages": ["fr-TG", "ee", "hna", "kbp", "dag", "ha"],
            "country_code": "TG",
            "capital": "Lom\u00e9",
            "country_name": "Togo",
            "borders": ["BEN", "BFA", "GHA"],
            "continent": "Africa",
            "currency_code": "XOF",
            "population": 6587239
        }, {
            "calling_code": "676",
            "area": 748,
            "cca3": "TON",
            "languages": ["to", "en-TO"],
            "country_code": "TO",
            "capital": "Nuku'alofa",
            "country_name": "Tonga",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "TOP",
            "population": 122580
        }, {
            "calling_code": "1868",
            "area": 5128,
            "cca3": "TTO",
            "languages": ["en-TT", "hns", "fr", "es", "zh"],
            "country_code": "TT",
            "capital": "Port of Spain",
            "country_name": "Trinidad and Tobago",
            "borders": [],
            "continent": "North America",
            "currency_code": "TTD",
            "population": 1228691
        }, {
            "calling_code": "216",
            "area": 163610,
            "cca3": "TUN",
            "languages": ["ar-TN", "fr"],
            "country_code": "TN",
            "capital": "Tunis",
            "country_name": "Tunisia",
            "borders": ["DZA", "LBY"],
            "continent": "Africa",
            "currency_code": "TND",
            "population": 10589025
        }, {
            "calling_code": "90",
            "area": 780580,
            "cca3": "TUR",
            "languages": ["tr-TR", "ku", "diq", "az", "av"],
            "country_code": "TR",
            "capital": "Ankara",
            "country_name": "Turkey",
            "borders": ["ARM", "AZE", "BGR", "GEO", "GRC", "IRN", "IRQ", "SYR"],
            "continent": "Asia",
            "currency_code": "TRY",
            "population": 77804122
        }, {
            "calling_code": "993",
            "area": 488100,
            "cca3": "TKM",
            "languages": ["tk", "ru", "uz"],
            "country_code": "TM",
            "capital": "Ashgabat",
            "country_name": "Turkmenistan",
            "borders": ["AFG", "IRN", "KAZ", "UZB"],
            "continent": "Asia",
            "currency_code": "TMT",
            "population": 4940916
        }, {
            "calling_code": "1649",
            "area": 430,
            "cca3": "TCA",
            "languages": ["en-TC"],
            "country_code": "TC",
            "capital": "Cockburn Town",
            "country_name": "Turks and Caicos Islands",
            "borders": [],
            "continent": "North America",
            "currency_code": "USD",
            "population": 20556
        }, {
            "calling_code": "688",
            "area": 26,
            "cca3": "TUV",
            "languages": ["tvl", "en", "sm", "gil"],
            "country_code": "TV",
            "capital": "Funafuti",
            "country_name": "Tuvalu",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "AUD",
            "population": 10472
        }, {
            "calling_code": "1340",
            "area": 352,
            "cca3": "VIR",
            "languages": ["en-VI"],
            "country_code": "VI",
            "capital": "Charlotte Amalie",
            "country_name": "U.S. Virgin Islands",
            "borders": [],
            "continent": "North America",
            "currency_code": "USD",
            "population": 108708
        }, {
            "calling_code": "256",
            "area": 236040,
            "cca3": "UGA",
            "languages": ["en-UG", "lg", "sw", "ar"],
            "country_code": "UG",
            "capital": "Kampala",
            "country_name": "Uganda",
            "borders": ["COD", "KEN", "RWA", "SSD", "TZA"],
            "continent": "Africa",
            "currency_code": "UGX",
            "population": 33398682
        }, {
            "calling_code": "380",
            "area": 603700,
            "cca3": "UKR",
            "languages": ["uk", "ru-UA", "rom", "pl", "hu"],
            "country_code": "UA",
            "capital": "Kyiv",
            "country_name": "Ukraine",
            "borders": ["BLR", "HUN", "MDA", "POL", "ROU", "RUS", "SVK"],
            "continent": "Europe",
            "currency_code": "UAH",
            "population": 45415596
        }, {
            "calling_code": "971",
            "area": 82880,
            "cca3": "ARE",
            "languages": ["ar-AE", "fa", "en", "hi", "ur"],
            "country_code": "AE",
            "capital": "Abu Dhabi",
            "country_name": "United Arab Emirates",
            "borders": ["OMN", "SAU"],
            "continent": "Asia",
            "currency_code": "AED",
            "population": 4975593
        }, {
            "calling_code": "44",
            "area": 244820,
            "cca3": "GBR",
            "languages": ["en-GB", "cy-GB", "gd"],
            "country_code": "GB",
            "capital": "London",
            "country_name": "United Kingdom",
            "borders": ["IRL"],
            "continent": "Europe",
            "currency_code": "GBP",
            "population": 62348447
        }, {
            "calling_code": "1",
            "area": 9629091,
            "cca3": "USA",
            "languages": ["en-US", "es-US", "haw", "fr"],
            "country_code": "US",
            "capital": "Washington",
            "country_name": "United States",
            "borders": ["CAN", "MEX"],
            "continent": "North America",
            "currency_code": "USD",
            "population": 310232863
        }, {
            "calling_code": "598",
            "area": 176220,
            "cca3": "URY",
            "languages": ["es-UY"],
            "country_code": "UY",
            "capital": "Montevideo",
            "country_name": "Uruguay",
            "borders": ["ARG", "BRA"],
            "continent": "South America",
            "currency_code": "UYU",
            "population": 3477000
        }, {
            "calling_code": "998",
            "area": 447400,
            "cca3": "UZB",
            "languages": ["uz", "ru", "tg"],
            "country_code": "UZ",
            "capital": "Tashkent",
            "country_name": "Uzbekistan",
            "borders": ["AFG", "KAZ", "KGZ", "TJK", "TKM"],
            "continent": "Asia",
            "currency_code": "UZS",
            "population": 27865738
        }, {
            "calling_code": "678",
            "area": 12200,
            "cca3": "VUT",
            "languages": ["bi", "en-VU", "fr-VU"],
            "country_code": "VU",
            "capital": "Port Vila",
            "country_name": "Vanuatu",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "VUV",
            "population": 221552
        }, {
            "calling_code": "3906698",
            "area": 0.44,
            "cca3": "VAT",
            "languages": ["la", "it", "fr"],
            "country_code": "VA",
            "capital": "Vatican",
            "country_name": "Vatican City",
            "borders": ["ITA"],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 921
        }, {
            "calling_code": "58",
            "area": 912050,
            "cca3": "VEN",
            "languages": ["es-VE"],
            "country_code": "VE",
            "capital": "Caracas",
            "country_name": "Venezuela",
            "borders": ["BRA", "COL", "GUY"],
            "continent": "South America",
            "currency_code": "VEF",
            "population": 27223228
        }, {
            "calling_code": "84",
            "area": 329560,
            "cca3": "VNM",
            "languages": ["vi", "en", "fr", "zh", "km"],
            "country_code": "VN",
            "capital": "Hanoi",
            "country_name": "Vietnam",
            "borders": ["KHM", "CHN", "LAO"],
            "continent": "Asia",
            "currency_code": "VND",
            "population": 89571130
        }, {
            "calling_code": "681",
            "area": 274,
            "cca3": "WLF",
            "languages": ["wls", "fud", "fr-WF"],
            "country_code": "WF",
            "capital": "Mata-Utu",
            "country_name": "Wallis and Futuna",
            "borders": [],
            "continent": "Oceania",
            "currency_code": "XPF",
            "population": 16025
        }, {
            "calling_code": "212",
            "area": 266000,
            "cca3": "ESH",
            "languages": ["ar", "mey"],
            "country_code": "EH",
            "capital": "El Aai\u00fan",
            "country_name": "Western Sahara",
            "borders": ["DZA", "MRT", "MAR"],
            "continent": "Africa",
            "currency_code": "MAD",
            "population": 273008
        }, {
            "calling_code": "967",
            "area": 527970,
            "cca3": "YEM",
            "languages": ["ar-YE"],
            "country_code": "YE",
            "capital": "Sanaa",
            "country_name": "Yemen",
            "borders": ["OMN", "SAU"],
            "continent": "Asia",
            "currency_code": "YER",
            "population": 23495361
        }, {
            "calling_code": "260",
            "area": 752614,
            "cca3": "ZMB",
            "languages": ["en-ZM", "bem", "loz", "lun", "lue", "ny", "toi"],
            "country_code": "ZM",
            "capital": "Lusaka",
            "country_name": "Zambia",
            "borders": ["AGO", "BWA", "COD", "MWI", "MOZ", "NAM", "TZA", "ZWE"],
            "continent": "Africa",
            "currency_code": "ZMW",
            "population": 13460305
        }, {
            "calling_code": "263",
            "area": 390580,
            "cca3": "ZWE",
            "languages": ["en-ZW", "sn", "nr", "nd"],
            "country_code": "ZW",
            "capital": "Harare",
            "country_name": "Zimbabwe",
            "borders": ["BWA", "MOZ", "ZAF", "ZMB"],
            "continent": "Africa",
            "currency_code": "ZWL",
            "population": 11651858
        }, {
            "calling_code": "358",
            "area": 1580,
            "cca3": "ALA",
            "languages": ["sv-AX"],
            "country_code": "AX",
            "capital": "Mariehamn",
            "country_name": "\u00c5land",
            "borders": [],
            "continent": "Europe",
            "currency_code": "EUR",
            "population": 26711
        },
        function() {
            console.log("finished populating Countries");
        }
    );
});

Location.find({}).remove(function() {
    Location.create({
        "name": "New York, État de New York, États-Unis",
        "loc": [
            40.7127837000000028, -74.0059413000000035
        ]
    }, {
        "name": "Gagan Mahal, Domalguda, Himayatnagar, Hyderabad, Telangana, Inde",
        "loc": [
            17.4079957000000007,
            78.4801671000000027
        ]
    }, function(err, loc1, loc2) {
        setTimeout(function() {
            Country.find({
                'country_code': "AD"
            }, function(err, country) {
                loc1.country = country[0];
                loc2.country = country[0];
                loc1.save();
                loc2.save();
            });

            console.log('finished populating Locations');
        }, 2000);
    });
});



Transport.find({}).remove(function() {
    setTimeout(function() {
        Location.find({}, function(err, locs) {
            Transport.create({
                distance: 1000,
                class: "HIGH",
                cost: 200,
                date_departure: Date.now(),
                departure: locs[0],
                arrival: locs[1]
            }, function() {
                console.log('finished populating transports');
            });
        });
    }, 3000);
});


Travel.find({}).remove(function() {
    Travel.create({
        name: "Voyage en Turquie",
        budget: 3000,
        nbTravellers: 3
    }, function(err, travel) {
        setTimeout(function() {
            Transport.find({}, function(err, transports) {
                travel.transports.push(transports[0]);
                travel.save();
                console.log('finished populating travels');
            });
        }, 4000);
    });
});
// Remove all rates
Rate.find({}).remove(function() {});
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
    }, {
        provider: 'local',
        role: 'adminInfo',
        email: 'admin@info.com',
        name: 'Admin Info',
        password: 'admin',
        travels: []
    }, function(err, user1, user2, user3) {
        // Populate AdminInfo Travels
        setTimeout(function() {
            Travel.find({}, function(err, travels) {
                for (var i = 0; i < travels.length; i++) {
                    user3.travels.push(travels[i]);
                }
                user3.save();
                console.log('finished populating users');
            });
        }, 5000);

        Company.find().remove(function() {
            Company.create({
                name: 'Liligo',
                img: 'assets/images/cruise2.jpg',
                url: 'http://liligo.fr'
            },
            {
                name: 'AirFrance',
                img: 'assets/images/cruise2.jpg',
                url: 'http://airfrance.fr'
            }, function(err, company, company2) {

                // 2 Rates used by comparators comments
                Rate.create({
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, {
                    score: 0,
                    type: "Stack"
                }, function(err, rate1, rate2, rate3, rate4, rate5, rate6, rate7) {
                    TransportComparator.find({}).remove(function() {
                        TransportComparator.create({
                            type: ['transport'],
                            company: company._id,
                            transport: {
                              type: [transportTypeId],
                              nbCompanies: 36,
                              comments: [{
                                comment: "Très bon comparateur",
                                user: user1._id,
                                rate: rate1._id
                              }, {
                                comment: "Très bon comparateur oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui oui",
                                user: user1._id,
                                rate: rate2._id
                              }, {
                                comment: "U commentaire comme un autre",
                                user: user1._id,
                                rate: rate3._id
                              }, {
                                comment: "Oui, c'est plutôt intéressant !",
                                user: user1._id,
                                rate: rate4._id
                              }, {
                                comment: "Très satisfait de leurs services ! ",
                                user: user1._id,
                                rate: rate5._id
                              }, {
                                comment: "hahahahahahahahahahahahaha",
                                user: user1._id,
                                rate: rate6._id
                              }, {
                                comment: "Très bon ",
                                user: user1._id,
                                rate: rate7._id
                            }]
                          }
                        });

                        TransportComparator.create({
                          type: 'transport',
                          company: company2._id,
                          transport: {
                            type: [transportTypeId2],
                            nbCompanies: 35,
                            comments: []
                          }
                        });
                    })
                });
            });
        });
    });
});




Timeline.find().remove(function() {
    Timeline.create({
        name: 'transport_timeline',
        description: 'Timeline de l\'étape de choix de transport de l\'utilisateur',
        operations: []
    }, function(err, timeline) {
        console.log("Finished populating timelines");
        Operation.find().remove(function() {
            Operation.create({
                type: "Advice",
                title: "Premier Conseil",
                content: "Voici le contenu du premier conseil",
                steps: [{
                    step: 0,
                    id: timeline._id
                }]
            }, {
                type: "Advice",
                title: "Deuxieme Conseil",
                content: "Voici le contenu du deuxieme conseil",
                steps: [{
                    step: 1,
                    id: timeline._id
                }]
            }, function(err, operation1, operation2) {
                timeline.operations.push(operation1._id);
                timeline.operations.push(operation2._id);
            });
        });
    })
});
