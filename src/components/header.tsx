import {  useEffect } from "react";

import { atomWithStorage } from 'jotai/utils'
import { useAtom } from "jotai/react";

export const themeAtom = atomWithStorage('common-chords-theme', 'light', undefined, {getOnInit: true})
export const themes = ["light", "dark"];

export type HeaderProps = {
    title: string,
    avatar : string
}


export default function Header({title, avatar} : HeaderProps) {
    const  [ theme, setTheme ] = useAtom(themeAtom);

    const image_src =   import.meta.env.BASE_URL + avatar;

    useEffect(() => {
        console.log(`setting theme: ${theme}`);
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    function handleClick() {
        const themeIndex = themes.indexOf(theme);
        const newIndex = (themeIndex + 1) % themes.length;
        const newTheme = themes[newIndex];
        setTheme(newTheme);
        console.log(`newTheme : ${newTheme}, index : ${newIndex}`);
    }

    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    const iconClasses = "me-1 bi bi-" + (nextTheme === "light" ? "brightness-high-fill" : "moon-stars");

    return (
        <header className="d-flex justify-content-between align-items-center w-100 mb-3 bg-gray">
            <img src={image_src} width="40" height="40" className="d-inline-block align-text-top ms-3"></img>
            <p className="my-0 mx-3 align-content-center fs-3">{title}</p>
            <button className="btn btn-secondary mx-3 my-2" onClick={handleClick}><i className={iconClasses}></i>{nextTheme}</button>
        </header>
    );
}
