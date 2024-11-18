import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import classes from './App.module.scss';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';

// Tree shaking, один из встроенных механизмов оптимизации, в конечную сборку не входят неиспользуемые импорты, функции, ветвления кода
function TODOFUNCTION(number: number) {
    console.log(`TOOD, ${number}`);
}

function FUNCTIONSOURCEMAP() {
    FUNCTIONSOURCEMAP1();
}

function FUNCTIONSOURCEMAP1() {
    throw new Error();
}



export const App = () => {
    const [count, setCount] = React.useState<number>(0);

    const increment = () => { FUNCTIONSOURCEMAP(); /*setCount(prev => prev + 1); console.log(`Button clicked, increment - ${count}`);*/ };
/* Здесь встроенная проверка типов загрузчиком отключена через параметр transpileOnly, так как этот процесс замедляет сборку. Но включена отдельным процессом через
использование плагина ForkTsCheckerWebpackPlugin*/
    //TODOFUNCTION('34f');
    // Этот блок будет отброшен механизмом Tree shaking, т.к. никогда не будет использован
    // if (false){
    //     console.log("Not used block");
    // }
    // if (__PLATFORM__ === 'desktop') {
    //     return (
    //         <div>ISDESKTOPPLATFORM</div>
    //     );
    // }
    // if (__PLATFORM__ === 'mobile') {
    //     return (
    //         <div>ISMOBILEPLATFORM</div>
    //     );
    // }

    return (
        <div>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div data-testid="App.DATATESTID">
                {/* <img width={100} height={100} src={avatarPng} alt='Изображение PNG'></img>
                <img width={100} height={100} src={avatarJpg} alt='Изображение JPG'></img> */}
            </div>
            <div>
                <Calendar width={100} height={100} style={{color: 'green'}}/>
            </div>
            <Link to={'/about'} >about</Link>
            <br />
            <Link to={'/shop'}>shop1</Link>
            <h1 className = { classes.value }>{count}</h1>
            <button className = { classes.button } onClick={increment}>
                <span>Hamster Combat</span>
            </button>
            <Outlet/>
        </div>
    );
};
