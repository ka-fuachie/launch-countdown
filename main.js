const dateBox = document.querySelectorAll('span.number > .top-half')

const launchDate = new Date(2021, 11, 17, 4, 30, 45, 0)


const getDateFromMilliseconds = milli => {
    const days = Math.floor(milli / (1000 * 60 * 60 * 24))
    const hours = Math.floor(milli / (1000 * 60 * 60)) - (days * 24)
    const minutes = Math.floor(milli / (1000 * 60))  - (days * 24 * 60)- (hours * 60)
    const seconds = Math.floor(milli / 1000)  - (days * 24 * 60 * 60)- (hours * 60 * 60) - (minutes * 60)
    
    return [days, hours, minutes, seconds]
}

const updateDOM = (date) => {
    dateBox.forEach((box, index) => {
        box.innerText = date[index]
    })    
}

const updateLoop = () => {
    const currentDate = new Date()
    const timeLeft = launchDate.getTime() -currentDate.getTime()
    const dateDiff = getDateFromMilliseconds(timeLeft).map(value => {
        if (value.toString().length < 2 ) return '0' + value.toString()
        return value.toString()
    })  
    
    updateDOM(dateDiff)
    requestAnimationFrame(updateLoop)

}

requestAnimationFrame(updateLoop)