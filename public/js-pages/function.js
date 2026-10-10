var os_data = detect.parse(navigator.userAgent);

const color_list = [
    [['#202030','#EFF1C5'],['32,32,48','239, 241, 197']],
    [['#002E2C','#E3E7AF'],['0,46,44','227,231,175']],
    [['#4F000B','#ffd4b6'],['79, 0, 11','255, 212, 182']],
    [['#381940','#C1A5A9'],['56, 25, 64','193, 165, 169']]
  ]
function colorization(type){
  sessionStorage.setItem('colorization',type)
  document.querySelector(':root').style.setProperty('--bg-hex', color_list[type][0][0]);
  document.querySelector(':root').style.setProperty('--color-hex', color_list[type][0][1]);
  document.querySelector(':root').style.setProperty('--bg-rgb', color_list[type][1][0]);
  document.querySelector(':root').style.setProperty('--color-rgb', color_list[type][1][1]);
}
if(!sessionStorage.getItem('colorization')){
  colorization(0)
}else{
  colorization(sessionStorage.getItem('colorization'))
}



document.addEventListener('mousemove', (event)=>{
    document.querySelector('.mouse_follower').style.top = event.y + 'px';
    document.querySelector('.mouse_follower').style.left = event.x + 'px';
});

document.querySelector('.brow-data .data').innerHTML = os_data.browser.family;
document.querySelector('.os-data .data').innerHTML = os_data.os.name;


function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('.time-data .data').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
      startTime()
    }, 500);
  }
  startTime();


  function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}
