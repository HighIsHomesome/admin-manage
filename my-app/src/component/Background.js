import {useRef,useEffect} from 'react'
export const Background = ()=>{
    const canvasBox = useRef()
    useEffect(()=>{
        // const canvasBox = useRef()
        console.log(canvasBox.current)
        const {clientWidth: width, clientHeight: height} = document.documentElement
        canvasBox.current.width = width
        canvasBox.current.height = height
        const ctx = canvasBox.current.getContext('2d')
        console.log(1)
        const text = '10'
        ctx.font = '14px 微软雅黑'


        const bl = 20
        const testObj = {}
        const startRates = {}
        const rates = {}
        const endRates = {}

        const animate = () =>{

            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()

            for (let i = 0; i < width; i += bl) {

                const gradient = ctx.createLinearGradient(0,0,0,height)
                const s1 = 0.2 * Math.random()
                const s2 = 0.8 * Math.random()
                const step = 0.05 * Math.random()
                rates[i] =  rates[i] || -s1
                startRates[i] = startRates[i]||s2
                endRates[i] = endRates[i]||0
                gradient.addColorStop(0,'#000000')
                gradient.addColorStop(startRates[i]<0?0:startRates[i],'#000000')
                gradient.addColorStop(rates[i]<0?0:rates[i],'#0ee30e')
                gradient.addColorStop(endRates[i]<0?0:endRates[i],'#000000')
                gradient.addColorStop(1,'#000000')
                ctx.fillStyle = gradient
                for (let j = 0; j < height; j += bl) {
                    testObj[`${i}-${j}`] = testObj[`${i}-${j}`] || text[parseInt(Math.random() * text.length)]
                    console.log(testObj[`${i}-${j}`])
                    ctx.fillText(testObj[`${i}-${j}`], i, j)

                }
                rates[i] += step
                startRates[i] += step
                endRates[i] += step
                if(startRates[i]>1){
                    startRates[i] = -s2
                }
                if(rates[i]>1){
                    if(startRates[i] === -s2){
                        rates[i] = -s1
                    }else{
                        rates[i] = 1
                    }
                }
                if(endRates[i]>1){
                    if(startRates[i]===-s2 && rates[i] === -s1){
                        endRates[i] = step
                    }else{
                        endRates[i] = 1
                    }
                }
            }
            ctx.closePath()
            requestAnimationFrame(animate)
        }
        animate()
    })



    return (
        <div>
            <canvas ref={canvasBox} ></canvas>
        </div>
        )

}