import { useRef , useState , useEffect } from 'react';

//Custom hook for managing "flash messages"

function useTimedMessage(timeInMsec = 3000){//default time is 3 seconds
    const [active , setActive] = useState(false);

    const messageShownRef = useRef(false);

    useEffect(
        function showSavedMessage(){
            console.debug("useTimedMessage useEffect showSavedMessage", "active=", active);

            if(active && !messageShownRef.current){
                messageShownRef.current = true;
                setTimeout(function removeMessage(){
                    setActive(false);
                    messageShownRef.current = false //reset the flag
                } , timeInMsec);
            }
        },
        [active , timeInMsec], //only re-run if active changes
    );
    return [active , setActive];//returns an array with the current state and a function to set it
}

export default useTimedMessage;