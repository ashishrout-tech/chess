"use client"

import TypewriterComponent from 'typewriter-effect';

const GetTypewriter = () => {
    return (
        <TypewriterComponent
            options={{
                strings: ['Play.', 'Challenge.', 'Enjoy.'],
                autoStart: true,
                loop: true,
            }}
        />
    )
}
export default GetTypewriter;