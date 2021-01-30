var today = new Date()
var getIP = new XMLHttpRequest();
getIP.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var ip = JSON.parse(getIP.responseText).ip;
    var getLoc = new XMLHttpRequest();
    getLoc.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var loc = JSON.parse(getLoc.responseText).city.toLowerCase();
        var getJadwal = new XMLHttpRequest();
        getJadwal.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var jadwal = JSON.parse(getJadwal.responseText).results;
            var jadwalSholat = jadwal.datetime[0].times;
            var jamSekarang = ("0"+today.getHours()).slice(-2)
            var menitSekarang = ("0"+today.getMinutes()).slice(-2)
            var waktuSekarang = `${jamSekarang}:${menitSekarang}`;
            var index = 0;
            var except = ['Sunrise', 'Imsak','Sunset'];
            for (const key in jadwalSholat) {
              if (Object.hasOwnProperty.call(jadwalSholat, key)) {
                if (!(except.includes(Object.keys(jadwalSholat)[index]))) {
                  if (jamSekarang == jadwalSholat[key].split(':')[0]) {
                    if (menitSekarang == jadwalSholat[key].split(':')[1]) {
                      document.getElementById('menjelangText').innerHTML = 'Sudah memasuki waktu';
                      document.getElementById('menjelangJadwal').innerHTML = Object.keys(jadwalSholat)[index];
                      document.getElementById('waktuShalat').innerHTML = jadwalSholat[key];
                      break
                    } else if (menitSekarang > jadwalSholat[key].split(':')[1]) {
                      document.getElementById('menjelangText').innerHTML = 'Sudah memasuki waktu';
                      document.getElementById('menjelangJadwal').innerHTML = Object.keys(jadwalSholat)[index];
                      document.getElementById('waktuShalat').innerHTML = jadwalSholat[key];
                      break
                    } else {
                      document.getElementById('menjelangText').innerHTML = 'Menjelang waktu';
                      document.getElementById('menjelangJadwal').innerHTML = Object.keys(jadwalSholat)[index];
                      document.getElementById('waktuShalat').innerHTML = jadwalSholat[key];
                      break   
                    }
                  } else if (jamSekarang < jadwalSholat[key].split(':')[0]) {
                    document.getElementById('menjelangText').innerHTML = 'Menjelang waktu';
                    document.getElementById('menjelangJadwal').innerHTML = Object.keys(jadwalSholat)[index];
                    document.getElementById('waktuShalat').innerHTML = jadwalSholat[key];
                    break                  
                  } 
                }
              }
              index++;
            }
            document.getElementById('lokasi').innerHTML = jadwal.location.city;
            console.log(jadwalSholat)
          }
        }
        getJadwal.open("GET", `https://api.pray.zone/v2/times/day.json?city=${loc}&date=${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, true);
        getJadwal.send();    
      }
    };
    getLoc.open("GET", `http://ip-api.com/json/${ip}`, true);
    getLoc.send();
  }
};
getIP.open("GET", "https://api.ipify.org?format=json&callback=?", true);
getIP.send();


window.onscroll = () => {
  wScroll = window.scrollY;
  if (window.innerWidth > 768) {
    document.getElementById('layer-1').setAttribute('style', `transform: translate(0, -${wScroll/8}px)`);
    document.getElementById('layer-2').setAttribute('style', `transform: translate(0, -${wScroll/7}px)`);
    document.getElementById('layer-3').setAttribute('style', `transform: translate(0, -${wScroll/6}px)`);
    document.getElementById('layer-4').setAttribute('style', `transform: translate(0, -${wScroll/6}px)`);
    document.getElementById('layer-5').setAttribute('style', `transform: translate(0, -${wScroll/2}px)`);
  } else {
    document.getElementById('layer-1').setAttribute('style', `transform: translate(0, -${wScroll/25}px)`);
    document.getElementById('layer-2').setAttribute('style', `transform: translate(0, -${wScroll/20}px)`);
    document.getElementById('layer-3').setAttribute('style', `transform: translate(0, -${wScroll/15}px)`);
    document.getElementById('layer-4').setAttribute('style', `transform: translate(0, -${wScroll/10}px)`);
    document.getElementById('layer-5').setAttribute('style', `transform: translate(0, -${wScroll/50}px)`);
  }
};