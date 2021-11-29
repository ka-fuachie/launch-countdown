const dateBox = Array.from(document.querySelectorAll('span.number > span'))

const launchDate = new Date(2021, 11, 17, 4, 30, 45, 0)


const getDateFromMilliseconds = milli => {
    const days = Math.floor(milli / (1000 * 60 * 60 * 24))
    const hours = Math.floor(milli / (1000 * 60 * 60)) - (days * 24)
    const minutes = Math.floor(milli / (1000 * 60)) - (days * 24 * 60) - (hours * 60)
    const seconds = Math.floor(milli / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

    return [days, hours, minutes, seconds]
}

const arraysEqual = (a, b) => {
    return JSON.stringify(a) == JSON.stringify(b)
}

const groupedArray = (array, number) => {
    let newArray = [], group
    for (let i = 0; i < number; i++) {
        group = array.filter((value, index) => {
            return Math.floor(index / number) == i
        })

        newArray.push(group)
    }
    // array.filter((value, index) => {
    //     newArray[Math.floor(index/ number)][index % number] = value
    // })

    return newArray
}


let groupedDateBox = groupedArray(dateBox, 4)
const trans1 = 'transform 300ms ease-in, filter 300ms ease-out'
const trans0 = 'transform 0s, filter 0s'

const updateDOM = (date, prevDate) => {

    const isChanged = date.map((value, index) => {
        return value !== prevDate[index]
    })


    isChanged.forEach((value, index) => {
        if (value) {
            groupedDateBox[index][0].innerText = date[index]
            groupedDateBox[index][1].innerText = prevDate[index]
            groupedDateBox[index][2].innerText = prevDate[index]
            groupedDateBox[index][3].innerText = date[index]

            groupedDateBox[index][0].style.transition = trans1
            groupedDateBox[index][1].style.transition = trans1
            groupedDateBox[index][2].style.transition = trans1
            groupedDateBox[index][3].style.transition = trans1

            groupedDateBox[index][2].style.transform = 'rotateX(-180deg)'
            groupedDateBox[index][3].style.transform = 'rotateX(-360deg)'

            groupedDateBox[index][0].style.filter = 'brightness(100%)'
            groupedDateBox[index][1].style.filter = 'brightness(50%)'
            groupedDateBox[index][2].style.filter = 'brightness(0%)'
            groupedDateBox[index][3].style.filter = 'brightness(100%)'

            setTimeout(() => {
                groupedDateBox[index][1].innerText = date[index]
                groupedDateBox[index][2].innerText = date[index]

                groupedDateBox[index][0].style.transition = trans0
                groupedDateBox[index][1].style.transition = trans0
                groupedDateBox[index][2].style.transition = trans0
                groupedDateBox[index][3].style.transition = trans0

                groupedDateBox[index][2].style.transform = 'rotateX(0deg)'
                groupedDateBox[index][3].style.transform = 'rotateX(-180deg)'

                groupedDateBox[index][0].style.filter = 'brightness(50%)'
                groupedDateBox[index][1].style.filter = 'brightness(100%)'
                groupedDateBox[index][2].style.filter = 'brightness(100%)'
                groupedDateBox[index][3].style.filter = 'brightness(0%)'

            }, 500)
        }
    });

    // dateBox.forEach((box, index) => {
    //     box.innerText = date[index]
    // })    
}

const calcDateDiff = () => {
    const currentDate = new Date()
    const timeLeft = launchDate.getTime() - currentDate.getTime()
    const dateDiff = getDateFromMilliseconds(timeLeft).map(value => {
        if (value.toString().length < 2) return '0' + value.toString()
        return value.toString()
    })

    return dateDiff
}


let prevDateDiff = ['00', '00', '00', '00']
const init = () => {
    const dateDiff = calcDateDiff()
    console.log(dateDiff);
    groupedDateBox.forEach((box, boxIndex) => {
        box.forEach((value) => {
            console.log(value);
            value.innerText = dateDiff[boxIndex]
        })
    })

    prevDateDiff = dateDiff
}

const updateLoop = () => {
    const currentDate = new Date()
    const timeLeft = launchDate.getTime() - currentDate.getTime()
    const dateDiff = getDateFromMilliseconds(timeLeft).map(value => {
        if (value.toString().length < 2) return '0' + value.toString()
        return value.toString()
    })

    !arraysEqual(prevDateDiff, dateDiff) && updateDOM(dateDiff, prevDateDiff)
    prevDateDiff = dateDiff
    requestAnimationFrame(updateLoop)

}

init()
requestAnimationFrame(updateLoop)