import { useState, useEffect } from 'react';

/**Custom hook for keeping state data synced with localStorage.
 * 
 */

function useLocalStorage(key, firstValue = null){
    const initialValue = localStorage.getItem(key) || firstValue //get the value from localStorage or use the firstValue if not found
    const [item, setItem] = useState(initialValue); //set the state to the initial value

    useEffect(
        function setKeyInLocalStorage(){
            console.debug("hooks useLocalStorage useEffect" , "item=", item);

            if (item === null){
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, item);
            }
        } , [key,item] //only run the effect if the key or item changes
    );
    return [item, setItem];
}

export default useLocalStorage;