const hourEL = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const ampmEl = document.querySelector('.ampm');
const dateEl = document.querySelector('.top-date');

const updateDateTime = () => {
    const currentDate = new Date();
    //Time
    let h = currentDate.getHours();
    let m = currentDate.getMinutes();
    let s = currentDate.getSeconds();
    let ampm = 'AM';
    if(h > 12) { //Pm from military time to normal time
        h -= 12;
        ampm = 'PM';
    }
    //Date
    let mon = currentDate.toLocaleString('default', { month: 'long' });
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    //Update Elements
    hourEL.textContent = h;
    minuteEl.textContent = m;
    secondEl.textContent = s;
    ampmEl.textContent = ampm;
    dateEl.textContent = `${mon} ${day}, ${year}`;
    
    setTimeout(() => {
        updateDateTime();
    }, 1000);
}

updateDateTime(); //start time cycle

const body = document.querySelector('body');

const backgroundControl = (() => {
    let interval = null;
    let timeInterval = 0;
    let i = 0;
    const morningRef = ['morning1.jpg', 'morning2.jpg'];
    const afternoonRef = ['afternoon1.jpg', 'afternoon2.jpg'];
    const eveningRef = ['evening1.jpg', 'evening2.jpg'];
    const nightRef = ['night1.jpg', 'night2.jpg', 'night3.webp'];

    //Functions:
    const shuffle = ((array) => {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    });
    //Morning = 0, Afternoon = 1, Evening = 2, Night = 3
    const determineTimeInterval = ((x) => {
        if(x >= 5 && x < 12) return 0;
        else if (x >= 12 && x < 17) return 1;
        else if (x >= 17 && x <= 19) return 2;
        else return 3;
    });
    const changeBackground = () => {
        body.style.backgroundImage = `url(images/${randomizedRef[timeInterval][i]})`;
        if(i < randomizedRef[timeInterval].length - 1) i += 1;
        else i = 0;
    }
    const startInterval = () => {
        interval = setInterval(changeBackground, 10000); //Change to higher interval later
    };
    const endInterval = () => {
        clearInterval(interval);
        interval = null;
    }

    //Code Run:
    timeInterval = determineTimeInterval(new Date().getHours()); //Sets starting BG Image time pool
    //Randomizes time pool elements and pushes it into 1 big 2d array
    const randomizedRef = [];
    randomizedRef.push(shuffle(morningRef));
    randomizedRef.push(shuffle(afternoonRef));
    randomizedRef.push(shuffle(eveningRef));
    randomizedRef.push(shuffle(nightRef));
    console.log(randomizedRef);

    changeBackground(); //Starting Image
    startInterval();

})();