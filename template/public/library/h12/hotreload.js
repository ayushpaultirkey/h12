function RegisterSSE() {
    const _event = new EventSource("/@hotreload");
    _event.onerror = function() {
        console.log("H12: Error => Hot reload connection error");
        window.location.href = window.location.href;
    }
    _event.onopen = function() {
        console.log("H12: Success => Hot reload connection found");
    }
    _event.onmessage = function() {
        console.log("H12: Success => Hot reload message fetched");
    }
}
RegisterSSE();