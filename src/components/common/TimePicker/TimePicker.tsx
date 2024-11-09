import * as React from 'react';
import {Wheel} from "./Wheel";
import "../../common/TimePicker/styles.css"

export const daysOptions = {
    "1": "Ежедневно",
    "2": "Каждые 2 дня",
    "3": "Каждые 3 дня",
    "7": "Еженедельно"
}


export const TimePicker = () => {

    const days = Object.values(daysOptions)

    const getDay = (relative: number) => {
        return days[relative % days.length].toString()
    }

    const getTime = (relative: number) => {
        return relative < 10 ? `0${relative}` : `${relative}`
    }

    return (
        <div
            style={{
                height: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{width: 200, height: 50}}>
                <Wheel
                    loop
                    wheelSize={9}
                    slidesPerView={2}
                    length={days.length*4}
                    width={200}
                    perspective="right"
                    setValue={getDay}
                />
            </div>
            <div style={{width: 50, height: 50}}>
                <Wheel
                    loop
                    wheelSize={9}
                    slidesPerView={2}
                    length={24}
                    width={23}
                    perspective="right"
                    setValue={getTime}
                />
            </div>
            <div style={{width: 50, height: 50}}>
                <Wheel
                    loop
                    wheelSize={9}
                    slidesPerView={3}
                    length={60}
                    width={23}
                    perspective="right"
                    setValue={getTime}
                />
            </div>
        </div>
    );
};