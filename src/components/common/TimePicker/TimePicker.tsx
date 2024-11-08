import * as React from 'react';
import {Wheel} from "./Wheel";
import "../../common/TimePicker/styles.css"

export const TimePicker = () => {

    const options = ["Ежедневно", "Каждые 2 дня", "Каждые 3 дня", "Еженедельно"]

    const getDay = (relative: number) => {
        return options[relative%options.length].toString()
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
            <div style={{width: 200, height: 250}}>
                <Wheel
                    loop
                    wheelSize={20}
                    slidesPerView={4}
                    length={options.length*2}
                    width={200}
                    perspective="left"
                    setValue={getDay}
                />
            </div>
            <div style={{width: 50, height: 180}}>
                <Wheel
                    loop
                    wheelSize={10}
                    slidesPerView={3}
                    length={24}
                    width={23}
                    perspective="center"
                />
            </div>
            <div style={{width: 50, height: 180}}>
                <Wheel
                    loop
                    wheelSize={10}
                    slidesPerView={3}
                    length={60}
                    width={23}
                    perspective="right"
                />
            </div>
        </div>
    );
};