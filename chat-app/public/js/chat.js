const socket = io();

const $chatForm = document.querySelector('#form-data');
const $chatFormInput = $chatForm.querySelector('input');
const $chatFormButton = $chatForm.querySelector('button');

const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm:s a')
    })
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();

});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate,{
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm:s a')
    })
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $chatFormButton.setAttribute('disabled', 'disabled');

    // const message = document.querySelector('input').value;
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {
        $chatFormButton.removeAttribute('disabled')
        $chatFormInput.value = ''
        $chatFormInput.focus();
        
        if(error){
            return console.log(error);
        }
        console.log('Message delivered');
    });
    console.log();  
});

$sendLocationButton.addEventListener('click', () => {
    $sendLocationButton.setAttribute('disabled', 'disabled');
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('geolocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location Shared');
        }); 
    })
});

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error);
        location.href = '/'
    }
});