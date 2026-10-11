// var endpoint = 'https://api.geoapify.com/v1/ipinfo?&apiKey={KEY}';

const api_data = {
  "city": {
    "name": "Haarlem",
    "names": {
      "en": "Haarlem",
      "de": "Haarlem",
      "es": "Haarlem",
      "fa": "هارلم",
      "fr": "Haarlem",
      "ja": "ハールレム",
      "ko": "하를럼",
      "pt-BR": "Haarlem",
      "ru": "Харлем",
      "zh-CN": "哈勒姆"
    }
  },
  "country": {
    "name": "The Netherlands",
    "iso_code": "NL",
    "names": {
      "en": "The Netherlands",
      "de": "Niederlande",
      "es": "Países Bajos (los)",
      "fa": "هلند",
      "fr": "Pays-Bas",
      "ja": "オランダ",
      "ko": "네덜란드",
      "pt-BR": "Holanda",
      "ru": "Нидерланды",
      "zh-CN": "荷兰"
    },
    "is_in_european_union": true,
    "geoname_id": 2750405,
    "name_native": "Nederland",
    "phone_code": "31",
    "capital": "Amsterdam",
    "currency": "EUR",
    "flag": "🇳🇱",
    "languages": [
      {
        "iso_code": "nl",
        "name": "Dutch",
        "name_native": "Nederlands"
      }
    ]
  },
  "state": {
    "name": "North Holland"
  },
  "location": {
    "latitude": 52.3874,
    "longitude": 4.64622
  },
  "continent": {
    "code": "EU",
    "name": "Europe",
    "names": {
      "de": "Europa",
      "en": "Europe",
      "es": "Europa",
      "fa": "اروپا",
      "fr": "Europe",
      "ja": "ヨーロッパ",
      "ko": "유럽",
      "pt-BR": "Europa",
      "ru": "Европа",
      "zh-CN": "欧洲"
    },
    "geoname_id": 6255148
  },
  "subdivisions": [
    {
      "names": {
        "en": "North Holland",
        "de": "Nordholland",
        "es": "Holanda Septentrional",
        "fa": "هلند شمالی",
        "fr": "Hollande-Septentrionale",
        "ja": "北ホラント州",
        "ko": "노르트홀란트 주",
        "pt-BR": "Holanda do Norte",
        "ru": "Северная Голландия",
        "zh-CN": "北荷兰省"
      }
    },
    {
      "names": {
        "en": "Haarlem"
      }
    }
  ],
  "postal": {
    "code": "2011"
  },
  "ip": "51.158.254.154"
}

function body_design(){
	// var api_data = JSON.parse(sessionStorage.getItem("api_data"));
	document.querySelector('.spend-data .data').innerHTML = api_data.country.name.substring(0, 16);
	document.querySelector('.location-data .data').innerHTML = api_data.city.name.substring(0, 16);
	document.querySelector('.ip-data .data').innerHTML = api_data.ip.substring(0, 16);
	document.querySelector('.long-data .data').innerHTML = api_data.location.longitude;
	document.querySelector('.late-data .data').innerHTML = api_data.location.latitude;
}
// Called for testing only
// body_design();

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
// 	var response = JSON.parse(this.responseText);
// 	var api_data = sessionStorage.setItem("api_data",this.responseText);
// 	body_design();
// };

// if(!sessionStorage.getItem("api_data")){
// 	xhr.open('GET', endpoint, true);
// 	xhr.send()
// }else{
// 	body_design();
// }