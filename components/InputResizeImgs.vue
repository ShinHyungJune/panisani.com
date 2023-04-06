<template>
    <div class="m-input-files-wrap">
        <label :for="id" class="m-input-btn">
            <input type="file" name="file" :id="id" accept="image/*" @change="changeFile" multiple v-if="multiple">
            <input type="file" name="file" :id="id" accept="image/*" @change="changeFile" v-else>
            파일 업로드
        </label>

        <div class="m-input-files">
            <div class="m-input-file-wrap" v-for="(file, index) in files" :key="index">
                <div class="m-input-file">
                    <div class="img" :style="`background-image:url(${getUrl(file)})`"></div>
                    <button type="button" class="m-input-btn-remove" @click="remove(index)">
                        <i class="xi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.m-input-files-wrap input {
    display:none;
}
.m-input-files-wrap {}
.m-input-files-wrap .m-input-btn {
    display: flex; align-items: center; justify-content: center;
    width: 194px; height: 48px;
    border-radius: 32px; background: #9747FF; color:#fff;
    cursor:pointer;
}

.m-input-files {
    display:flex; flex-wrap:wrap;
    margin:-8px; margin-top:8px;
}
.m-input-files .m-input-file-wrap {
    padding:8px;
}
.m-input-files .m-input-file {
    position:relative;
}
.m-input-files .m-input-file .img {
    width:160px; height:160px;
    background-color:#F8F2FF;
    border-radius:16px; background-size:cover; background-repeat: no-repeat; background-position:center;
}
.m-input-files-wrap .m-input-btn-remove {
    width: 25px; height: 25px;
    position: absolute; top: 8px; right: 12px;
    background-color:#fff; border-radius:100%;
}
.file-image-box ul {}
.file-image-box ul li {display:inline-block; width:calc(25% - 16px); margin-right:16px; position:relative;}
.file-image-box ul li:after {display:block; content:""; padding-bottom:100%;}
.file-image-box ul li label {border:2px solid #E4E4E4; border-radius:8px; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; align-content:center; position:absolute; left:0; top:0; width:100%; height:100%;}
.file-image-box ul li label b {display:block; width:100%; font-size:14px; color:#585858; text-align:center;}
.file-image-box ul li label input {position:absolute; left:0; top:0; width:100%; height:100%; opacity:0; cursor:pointer;}
.file-image-box ul li.file-image {overflow:hidden; border-radius:8px; background-color:#F5F5F5; background-size:cover; background-position:center; background-repeat:no-repeat;}
@media (max-width:991px){
    .file-image-box ul {margin:0 -10px;}
    .file-image-box ul li {width:25%; margin-right:10px;}
    .file-image-box ul li:first-of-type {margin-left:10px;}
}
</style>
<script>
export default {
    props: {
        "maxWidth": {
            default: () => {
                return 700;
            },
        },

        "id": {
            default: () => {
                return "img";
            }
        },

        "multiple": {
            default: true,
        }
    },

    data(){
        return {
            files: [],
        }
    },

    methods: {
        changeFile(event) {
            let self = this;
            let readers = [];
            let images = [];

            let length = event.target.files.length;
            let countResize = 0;

            if(!this.multiple)
                this.files = [];

            Array.from(event.target.files).map((file, index) => {
                readers.push(new FileReader());
                images.push(new Image());

                readers[index].readAsDataURL(file);

                readers[index].onload = function (readerEvent) {
                    images[index].onload = function () {
                        let result = self.resize(images[index]);

                        self.files.push(result);

                        countResize++;

                        if(length === countResize)
                            self.$emit("change", self.files);

                        return result;
                    };

                    images[index].src = readerEvent.target.result;
                };
            })


            /*this.files = [];

            Array.from(event.target.files).map(file => {
                this.files.push({
                    file: file,
                    img: URL.createObjectURL(file)
                })
            })

            this.$emit("change", this.files.map(file => file.file));*/
        },

        remove(index){
            this.files = this.files.filter((img, indexData) => indexData != index);

            this.$emit("change", this.files.map(file => file.file));
        },

        resize(image){
            let width = image.width;
            let height = image.height;
            let canvas = document.createElement("canvas");

            height *= this.maxWidth / width;
            width = this.maxWidth;


            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/png');

            return this.dataURLtoBlob(dataUrl);
        },

        dataURLtoBlob(dataURI){
            const bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

            return new Blob([ia], { type: mime });
        },

        getUrl(file){
            return URL.createObjectURL(file);
        }
    },

}
</script>
