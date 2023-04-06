<template>
    <toast-editor :options="options" ref="editor" :initialValue="value" initialEditType="wysiwyg" @change="changeContents" />
</template>
<style>
.toastui-editor-mode-switch .tab-item {display:none !important;}
</style>
<script>

export default {
    components: {},

    props: {
        default: "",
    },

    data(){
        return {
            value: this.default,
            editor: "",
            hideModeSwitch: false,
            options: {
                previewStyle: 'vertical',
                height: '500px',
                initialValue: this.value,
                options: {
                    minHeight: '200px',
                    language: 'en-US',
                    useCommandShortcut: true,
                    usageStatistics: true,
                    hideModeSwitch: true,
                    toolbarItems: [
                        ['heading', 'bold', 'image'],
                    ]
                },
                toolbarItems: [
                    ['heading', 'bold', 'image'],
                ],
                hooks: {
                    addImageBlobHook: this.onUploadImage
                },
                events: {
                    change: this.changeContents
                }
            }
        }
    },

    methods: {
        changeContents(e){
            if(this.$refs.editor)
                this.$emit("change", this.$refs.editor.invoke('getHTML'));
        },

        async uploadImage(blob){
            let formData = new FormData();

            formData.append("file", blob);

            return this.$axios.post("http://localhost/api/imageUpload", formData)
                .then(response => {
                    return response.data;
                });
        },

        async onUploadImage(blob, callback) {
            const url = await this.uploadImage(blob);

            callback(url, '');

            this.changeContents();

            return false;
        },

        setFrame(){
            /*
            if(this.category === "전자제품")
                this.editor.setHTML("<p>1.제품<br/><br/>2.브랜드<br/><br/>3.모델명<br/><br/>4.증상<br/><br/>5.연락처<br/><br/>6.방문가능 일자 및 시간<br/><br/>7.사진 및 동영상 첨부(필수/ 대용량 파일은 하단 첨부파일을 통해 업로드)</p>");
                */
        }
    },

    mounted() {

    },

    watch: {
        value: function(value, oldValue) {
            this.$emit("change", value);
        },
    }
}
</script>
