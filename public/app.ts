if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.ts").then(
        registeration => {
            console.log("registeration is successfull. more info: ", registeration)
        }
    ).catch(
        error => {
            console.log("registeration faild! more info: ", error)
        }
    ).finally(
        () => {
            console.log("service workers supported.")
        }
    )
} else {
    console.log("Service Workers UnSupported!");
}

// let installPromptEvent: Event;

// window.addEventListener('beforeinstallprompt', (e) => {
//     e.preventDefault();
//     console.log("before install prompt event.")
//     installPromptEvent = e
// })

// document.getElementById('pwabtn')?.addEventListener('click', (e) => {
//     if(installPromptEvent) {
//         installPromptEvent.prompt()
//         installPromptEvent.userChoise.then(cr => {
//             if(cr.outcome=== 'accepted')
//                 console.log('user Accepted')
//             else {
//                 console.log('user Dissmised')
//             }
//     })
//     }
// })