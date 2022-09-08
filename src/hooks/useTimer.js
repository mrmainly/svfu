import { useState, useRef } from 'react'

const useTimer = (Time) => {
    const Ref = useRef(null)
    const [timer, setTimer] = useState(0)

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / 1000 / 60 / 60) % 24)
        return {
            total,
            minutes,
            seconds,
            hours,
        }
    }

    const startTimer = (e) => {
        const { total, minutes, seconds, hours } = getTimeRemaining(e)
        if (total >= 0) {
            setTimer(
                (hours === 0 ? '' : hours > 9 ? hours : '0' + hours + ':') +
                    (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current)
        const id = setInterval(() => {
            startTimer(e)
        }, 1000)
        Ref.current = id
    }

    const getDeadTime = (newTime) => {
        const deadline = new Date()

        deadline.setSeconds(deadline.getSeconds() + newTime * 60)
        return deadline
    }

    const start = () => {
        clearTimer(getDeadTime(Time))
    }

    return { timer, start }
}

export default useTimer
