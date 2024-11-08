import * as React from 'react';
import {Wheel} from "./Wheel";
import "../../common/TimePicker/styles.css"

export const TimePicker = () => {

    const daysOptions = ["Ежедневно", "Каждые 2 дня", "Каждые 3 дня", "Еженедельно"]

    const getDay = (relative: number) => {
        return daysOptions[relative%daysOptions.length].toString()
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
            <div style={{width: 200, height: 90}}>
                <Wheel
                    loop
                    wheelSize={9}
                    slidesPerView={3}
                    length={daysOptions.length*4}
                    width={200}
                    perspective="right"
                    setValue={getDay}
                />
            </div>
            <div style={{width: 50, height: 90}}>
                <Wheel
                    loop
                    wheelSize={9}
                    slidesPerView={3}
                    length={24}
                    width={23}
                    perspective="right"
                    setValue={getTime}
                />
            </div>
            <div style={{width: 50, height: 90}}>
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