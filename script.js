const qS = a => document.querySelector(a);

setInterval(() => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    qS('.date').textContent = `${day}:${month}:${year}`;
});

let addNull = function (a) {
    if (a < 10) {
        return '0' + a;
    } else {
        return a;
    }
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    qS('.time').textContent = `${addNull(hours)}:${addNull(minutes)}:${addNull(seconds)} `;
});

let stopwatch = new Date();
let hoursStop = stopwatch.getHours();
let minutesStop = stopwatch.getMinutes();
let secondsStop = stopwatch.getSeconds();
hoursStop = 0;
minutesStop = 0;
secondsStop = 0;
let f1 = document.forms['f1'];
let f2 = document.forms['f2'];
let stopwatchTime;
f1.elements[0].onclick = function () {
    f1.elements[0].disabled = true;
    f1.elements[1].disabled = false;
    stopwatchTime = setInterval(() => {
        secondsStop++;
        if (hoursStop == 24) {
            hoursStop = 0;
        }
        if (minutesStop == 60) {
            minutesStop = 0;
            hoursStop++;
        }
        if (secondsStop == 60) {
            secondsStop = 0;
            minutesStop++;
        }

        qS('.pStopDiv>p').textContent = `${addNull(hoursStop)}:${addNull(minutesStop)}:${addNull(secondsStop)}`;
    }, 1000);
}

f1.elements[1].onclick = function () {
    let createNote = document.createElement('p');
    qS('.result').appendChild(createNote);
    createNote.textContent = qS('.pStopDiv>p').textContent;
}
f1.elements[2].onclick = function () {
    f1.elements[0].disabled = false;
    f1.elements[1].disabled = true;
    clearInterval(stopwatchTime);
}
f1.elements[3].onclick = function () {
    f1.elements[0].disabled = false;
    clearInterval(stopwatchTime);
    hoursStop = 0;
    minutesStop = 0;
    secondsStop = 0;
    qS('.pStopDiv>p').textContent = `${addNull(hoursStop)}:${addNull(minutesStop)}:${addNull(secondsStop)}`;
}


let step = 1;
let setTime1 = 25;
let setTime = 25;

f2[0].onclick = function () {
    if (qS('.setTimerDig').textContent == 1) {
        this.disabled = true;
    } else {
        qS('.setTimerDig').textContent = setTime1 - step;
        setTime1 = setTime1 - step;
        setTime = setTime1;
    }
    qS('.timerDig').textContent = qS('.setTimerDig').textContent + ':00';
}

f2[1].onclick = function () {
    if (qS('.setTimerDig').textContent == 60) {
        this.disabled = true;
    } else {
        qS('.setTimerDig').textContent = setTime1 + step;
        setTime1 = setTime1 + step;
        setTime = setTime1;
    }
    qS('.timerDig').textContent = qS('.setTimerDig').textContent + ':00';
}

let f3 = document.forms['f3'];
let secondsTimer = 0;
let setTimer;
f3[0].onclick = function () {
    this.disabled = true;
    f2.elements[0].disabled = true;
    f2.elements[1].disabled = true;
    setTimer = setInterval(() => {
        if (setTime == 0 && secondsTimer == 0) {
            clearInterval(setTimer);
            return;
        } else {
            if (secondsTimer == 0) {
                setTime--;
                secondsTimer = 60;
            }
            secondsTimer--;
        }
        qS('.timerDig').textContent = `${addNull(setTime)}:${addNull(secondsTimer)}`;
    }, 1000);
}

f3[1].onclick = function () {
    f3[0].disabled = false;
    clearInterval(setTimer);
}
f3[2].onclick = function () {
    f3[0].disabled = false;
    f2.elements[0].disabled = false;
    f2.elements[1].disabled = false;
    clearInterval(setTimer);
    secondsTimer = 0;
    qS('.timerDig').textContent = `${addNull(0)}:${addNull(0)}`;
}