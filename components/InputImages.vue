<template>
    <div>
        <div class="input-file-wrap" style="padding-top:10px; padding-bottom:10px;">
            <input type="file" name="f" id="f" @change="changeFile" accept="image/*">
            <label for="f">파일찾기</label>
        </div>

        <div class="file-imgs" v-if="defaultFiles.length > 0 && files.length === 0">
            <div class="file-img-wrap" v-for="(file, index) in defaultFiles" :key="index">
                <div class="m-ratioBox-wrap">
                    <div class="m-ratioBox">
                        <img :src="file.url" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="file-imgs" v-else>
            <div class="file-img-wrap" v-for="(file, index) in files" :key="index">
                <div class="m-ratioBox-wrap">
                    <div class="m-ratioBox">
                        <img :src="file.thumbnail" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
    .input-file-wrap input {
        display:none;
    }
    .input-file-wrap label {
        display: flex; align-items: center; justify-content: center;
        width: 150px; height: 56px;
        text-align: center; font-size: 18px;

        border-radius: 28px;

        transition: .3s;
        border: 2px solid #fe433a;
        color: #fe433a;
    }
</style>
<script>
export default {
    props: {
        default: {
            default() {
                return []
            }
        },
        required: {
            default: true
        },
        multiple: {
            default: false
        }
    },

    data(){
        return {
            defaultFiles: this.default,
            files: []
        }
    },

    methods: {
        changeFile(event) {
            this.files = Array.from(event.target.files).map(file => {
                return {
                    name: file.name,
                    file: file,
                    thumbnail: URL.createObjectURL(file),
                };
            });

            this.$emit("change", this.files);
        },
    },

    mounted() {
        console.log(this.default);
    }
}
</script>
