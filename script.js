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

updateDateTime();