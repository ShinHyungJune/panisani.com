<template>
    <div className="ql-editor">
        <div id="editor" ref="editor" style="height:400px;"></div>
        <input type="file" id="getFile" accept="image/*"
               style="position: absolute; z-index:-1; opacity:0; left:-1000px; bottom:-1000px;" @change="changeImg">
    </div>

</template>
<script>

export default {
    components: {},

    props: {
        default: "",

        required: {
            default: true
        },
    },

    data() {
        return {
            value: this.default,
            editor: "",
        }
    },

    methods: {
        changeImg(event) {
            let formData = new FormData();

            formData.append("file", event.target.files[0]);

            this.$axios.post("/api/images", formData)
                .then(response => {
                    let url = response.data.data;

                    const range = this.editor.getSelection();

                    this.editor.insertEmbed(range.index, 'image', url);

                    /*this.editor.root.innerHTML += `<img src="${response.data.data}" alt=""/>`
                    return response.data;*/
                });
        },

        changeContents() {
            this.$emit("change", this.editor.root.innerHTML);
        },

        imageHandler() {
            document.getElementById('getFile').click();
        }
    },

    mounted() {
        let self = this;
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'color': []}, {'background': []}],
            [{'font': []}],
            [{'align': []}],
            ['clean', 'image']
        ]

        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        'image': self.imageHandler
                    }
                }
            },
            theme: 'snow',
        })

        this.editor.on("text-change", () => {
            this.changeContents();
        })

        this.editor.pasteHTML(this.default);

        // this.$refs.editor.quill.setContents(this.default);
        // this.$store.commit('setQuillInstance', quill)
    },

    watch: {
        value: function (value, oldValue) {
            this.$emit("change", value);
        }
    }
}
</script>
