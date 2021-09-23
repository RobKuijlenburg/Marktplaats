import Echo from 'laravel-echo';

import Jack from 'pusher-js';

window.Pusher = Jack;
console.log(import.meta.env.VITE_PUSHER_APP_KEY)
window.Echo = new Echo({
    broadcaster: 'pusher',
    // key:"f0355f4c8e2720af350d",
    // cluster:"eu",
    
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
});