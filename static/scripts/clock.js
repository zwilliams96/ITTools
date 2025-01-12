document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        setBasicTime();
        setMilitaryTime();
        setBinaryTime();
        setHexTime();
        setOctal();
    }, 1000);
});

function setBasicTime() {
    const clock = document.getElementById('clock');
    const date = new Date();
    clock.innerHTML = date.toLocaleTimeString();
}

function setMilitaryTime() {
    const clock = document.getElementById('military');
    const date = new Date();
    clock.innerHTML = date.toTimeString().split(' ')[0];
}

function convertToBinary(value) {
    return value.toString(2).padStart(6, '0');
}

function setBinaryTime() {
    const clock = document.getElementById('binary');
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const binaryTime = `${convertToBinary(hours)}:${convertToBinary(minutes)}:${convertToBinary(seconds)}`;
    clock.innerHTML = binaryTime;
}

function setHexTime() {
    const clock = document.getElementById('hex');
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hexTime = `${hours.toString(16)}:${minutes.toString(16)}:${seconds.toString(16)}`;
    clock.innerHTML = hexTime;
}

function setOctal() {
    const clock = document.getElementById('octal');
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const octalTime = `${hours.toString(8)}:${minutes.toString(8)}:${seconds.toString(8)}`;
    clock.innerHTML = octalTime;
}