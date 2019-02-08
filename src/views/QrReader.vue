<template>
    <qrcode-stream @decode="onDecode"></qrcode-stream>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },
    methods: {
        onDecode (decodedString) {
            console.log(decodedString)
        }
    }
}
</script>


<style>

</style>
